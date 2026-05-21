import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, FileText, Loader, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InlineNotice } from "@/shared/ui/InlineNotice";
import { useBackendWarmup } from "@/shared/api/useBackendWarmup";
import type { PublicDiscountCouponValidationResponseDto } from "@/features/api/types";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";
import {
  defaultPublicRegistrationDraft,
  PUBLIC_REGISTRATION_DRAFT_STORAGE_KEY,
  publicPaymentPlanContent,
  publicRegistrationOptionContent,
} from "@/features/public-registration/public-registration.constants";
import {
  buildPublicSubmissionFormData,
  clearPublicRegistrationDraft,
  formatPublicRegistrationCurrency,
  getCurrentSubmissionDate,
  getPublicRegistrationOption,
  getSuggestedInstallmentAmount,
  persistPublicRegistrationDraft,
  readPublicRegistrationDraft,
  toPublicRegistrationDraft,
} from "@/features/public-registration/public-registration.utils";
import type {
  PublicRegistrationFormValues,
  PublicRegistrationSuccessState,
  PublicRegistrationWizardStep,
} from "@/features/public-registration/public-registration.types";
import {
  useCreatePublicSubmissionMutation,
  usePendingSecondInstallmentLookupMutation,
  usePublicPricingCatalogQuery,
  useRequestPublicDiscountCouponMutation,
  useValidatePublicDiscountCouponMutation,
} from "@/features/public-registration/public-registration.hooks";
import { PublicRegistrationStepIndicator } from "@/features/public-registration/components/PublicRegistrationStepIndicator";
import { PublicRegistrationWizardActions } from "@/features/public-registration/components/PublicRegistrationWizardActions";
import { RegistrationOptionCard } from "@/features/public-registration/components/RegistrationOptionCard";
import { PaymentPlanCard } from "@/features/public-registration/components/PaymentPlanCard";
import { PublicRegistrationSuccessBlock } from "@/features/public-registration/components/PublicRegistrationSuccessState";
import { BankTransferDetails } from "@/features/public-registration/components/BankTransferDetails";
import { formatAdminDate } from "@/features/admin-submissions/admin-submissions.utils";

const publicRegistrationSchema = z.object({
  firstName: z.string().trim().min(1, "Ingresa tu nombre."),
  lastName: z.string().trim().min(1, "Ingresa tu apellido."),
  dni: z.string().trim().min(1, "Ingresa tu DNI."),
  email: z.string().trim().email("Ingresa un email válido."),
  phone: z.string().trim().min(1, "Ingresa un teléfono."),
  registrationOptionCode: z.string().min(1, "Selecciona una opción."),
  paymentPlanType: z.string().min(1, "Selecciona una modalidad."),
  amountReported: z.number().positive("Ingresa un monto válido."),
  paymentDate: z
    .string()
    .refine((value) => !value || !Number.isNaN(new Date(value).getTime()), {
      message: "Ingresa una fecha válida.",
    }),
  notes: z.string(),
  receipt: z
    .custom<File | null>((value) => value instanceof File, {
      message: "Adjunta el comprobante.",
    })
    .refine(
      (value) => !value || value.type.startsWith("image/"),
      "El comprobante debe ser una imagen.",
    )
    .nullable(),
});

const stepFieldMap: Record<
  PublicRegistrationWizardStep,
  Array<keyof PublicRegistrationFormValues>
> = {
  1: ["firstName", "lastName", "dni", "email", "phone"],
  2: ["registrationOptionCode"],
  3: ["paymentPlanType"],
  4: ["receipt"],
};

type AppliedDiscountState = {
  couponCode: string;
  email: string;
  discountPercentage: number;
  expiresAt: string | null;
};

export function PublicRegistrationPage() {
  useBackendWarmup();

  const storedDraft = useMemo(
    () => readPublicRegistrationDraft(PUBLIC_REGISTRATION_DRAFT_STORAGE_KEY),
    [],
  );
  const [currentStep, setCurrentStep] = useState<PublicRegistrationWizardStep>(
    storedDraft.step,
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successState, setSuccessState] =
    useState<PublicRegistrationSuccessState | null>(null);
  const [discountRequestEmail, setDiscountRequestEmail] = useState("");
  const [discountRequestMessage, setDiscountRequestMessage] = useState<
    string | null
  >(null);
  const [discountRequestError, setDiscountRequestError] = useState<
    string | null
  >(null);
  const [discountCouponInput, setDiscountCouponInput] = useState("");
  const [discountCouponMessage, setDiscountCouponMessage] = useState<
    string | null
  >(null);
  const [discountCouponError, setDiscountCouponError] = useState<string | null>(
    null,
  );
  const [appliedDiscount, setAppliedDiscount] =
    useState<AppliedDiscountState | null>(null);
  const [dismissedPendingInstallmentCode, setDismissedPendingInstallmentCode] =
    useState<string | null>(null);
  const lastPendingInstallmentLookupKeyRef = useRef<string | null>(null);
  const successStateRef = useRef<HTMLElement | null>(null);

  const form = useForm<PublicRegistrationFormValues>({
    resolver: zodResolver(publicRegistrationSchema),
    defaultValues: {
      ...defaultPublicRegistrationDraft,
      ...storedDraft,
      receipt: null,
    },
  });

  const mutation = useCreatePublicSubmissionMutation();
  const pricingCatalogQuery = usePublicPricingCatalogQuery();
  const requestDiscountCouponMutation =
    useRequestPublicDiscountCouponMutation();
  const validateDiscountCouponMutation =
    useValidatePublicDiscountCouponMutation();
  const pendingSecondInstallmentMutation =
    usePendingSecondInstallmentLookupMutation();
  const watchedValues = useWatch({
    control: form.control,
  }) as PublicRegistrationFormValues;

  const pricingOptions = pricingCatalogQuery.data?.options ?? [];
  const normalizedFormEmail = watchedValues.email.trim().toLowerCase();
  const hasAppliedDiscount =
    Boolean(appliedDiscount) && appliedDiscount?.email === normalizedFormEmail;
  const registrationOptions = pricingOptions.map((option) => ({
    ...option,
    title: publicRegistrationOptionContent[option.code].title,
    description: publicRegistrationOptionContent[option.code].description,
  }));
  const selectedOption = getPublicRegistrationOption(
    pricingOptions,
    watchedValues.registrationOptionCode ?? "",
  );
  const selectedRegistrationOption = registrationOptions.find(
    (option) => option.code === selectedOption?.code,
  );
  const selectedPaymentPlan = selectedOption?.paymentPlans.find(
    (plan) => plan.type === (watchedValues.paymentPlanType ?? ""),
  );
  const suggestedAmount = getSuggestedInstallmentAmount(
    pricingOptions,
    watchedValues.registrationOptionCode ?? "",
    watchedValues.paymentPlanType ?? "",
  );
  const currentInstallmentAmount = selectedPaymentPlan
    ? hasAppliedDiscount
      ? selectedPaymentPlan.discountedInstallmentAmount
      : selectedPaymentPlan.baseInstallmentAmount
    : suggestedAmount;

  useEffect(() => {
    if (!selectedOption) {
      return;
    }

    const currentPaymentPlanType = watchedValues.paymentPlanType ?? "";
    const paymentPlanStillAvailable = selectedOption.paymentPlans.some(
      (plan) => plan.type === currentPaymentPlanType,
    );

    if (!currentPaymentPlanType || paymentPlanStillAvailable) {
      return;
    }

    form.setValue("paymentPlanType", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [form, selectedOption, watchedValues.paymentPlanType]);

  useEffect(() => {
    if (!appliedDiscount) {
      return;
    }

    if (!normalizedFormEmail || normalizedFormEmail === appliedDiscount.email) {
      return;
    }

    setAppliedDiscount(null);
    setDiscountCouponInput("");
    setDiscountCouponMessage(null);
    setDiscountCouponError(
      "El cupon se quitó porque cambiaste el email de la inscripción.",
    );
  }, [appliedDiscount, normalizedFormEmail]);

  useEffect(() => {
    if (!normalizedFormEmail) {
      return;
    }

    setDiscountRequestEmail((current) =>
      current.trim() ? current : normalizedFormEmail,
    );
  }, [normalizedFormEmail]);

  useEffect(() => {
    persistPublicRegistrationDraft(
      PUBLIC_REGISTRATION_DRAFT_STORAGE_KEY,
      toPublicRegistrationDraft(
        {
          ...defaultPublicRegistrationDraft,
          ...watchedValues,
          receipt: null,
        },
        currentStep,
      ),
    );
  }, [currentStep, watchedValues]);

  const handleBack = () => {
    setSubmitError(null);
    setCurrentStep(
      (step) => Math.max(1, step - 1) as PublicRegistrationWizardStep,
    );
  };

  const handleNext = async () => {
    const isCurrentStepValid = await form.trigger(stepFieldMap[currentStep]);

    if (!isCurrentStepValid) {
      return;
    }

    if (currentStep === 3 && suggestedAmount) {
      form.setValue("amountReported", suggestedAmount, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    setCurrentStep(
      (step) => Math.min(4, step + 1) as PublicRegistrationWizardStep,
    );
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const normalizedAmount =
        currentInstallmentAmount ?? values.amountReported;
      const formData = buildPublicSubmissionFormData(
        {
          ...values,
          amountReported: normalizedAmount,
          paymentDate: getCurrentSubmissionDate(),
        },
        {
          discountCouponCode: hasAppliedDiscount
            ? appliedDiscount?.couponCode
            : undefined,
        },
      );
      const response = await mutation.mutateAsync(formData);
      setSuccessState(response.data);
      clearPublicRegistrationDraft(PUBLIC_REGISTRATION_DRAFT_STORAGE_KEY);
      form.reset({
        ...defaultPublicRegistrationDraft,
        receipt: null,
      });
      setAppliedDiscount(null);
      setDiscountCouponInput("");
      setDiscountCouponMessage(null);
      setDiscountCouponError(null);
      setCurrentStep(1);
    } catch (error) {
      setSubmitError(
        getUserFacingErrorMessage(
          error,
          "No se pudo enviar la inscripción. Intenta nuevamente.",
        ),
      );
    }
  });

  const isSubmitting = mutation.isPending;
  const fieldClassName =
    "h-12 rounded-md border-stone-300 bg-white px-4 text-sm text-stone-900 shadow-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100";
  const textareaClassName =
    "rounded-md border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100";
  const receiptFile = form.watch("receipt");
  const pricingErrorMessage = pricingCatalogQuery.isError
    ? getUserFacingErrorMessage(
        pricingCatalogQuery.error,
        "No se pudo cargar la configuracion actual de precios.",
      )
    : null;
  const installmentsAvailabilityMessage =
    pricingCatalogQuery.data && !pricingCatalogQuery.data.installmentsAvailable
      ? `La modalidad en cuotas estuvo disponible hasta ${formatAdminDate(
          pricingCatalogQuery.data.installmentsAvailableUntil,
        )} (${pricingCatalogQuery.data.installmentsTimezone}).`
      : null;
  const paymentPlanLabel =
    form.getValues("paymentPlanType") === "TWO_INSTALLMENTS"
      ? "2 cuotas"
      : "1 pago";
  const currentInstallmentLabel =
    form.getValues("paymentPlanType") === "TWO_INSTALLMENTS"
      ? "Cuota 1 de 2"
      : "Pago único";

  const handleRequestDiscountCoupon = async () => {
    setDiscountRequestError(null);
    setDiscountRequestMessage(null);

    const email = discountRequestEmail.trim().toLowerCase();

    if (!email) {
      setDiscountRequestError("Ingresa el email para solicitar el cupon.");
      return;
    }

    try {
      const response = await requestDiscountCouponMutation.mutateAsync(email);

      if (response.data.issued) {
        setDiscountRequestMessage(response.data.message);
      } else {
        setDiscountRequestError(response.data.message);
      }
    } catch (error) {
      setDiscountRequestError(
        getUserFacingErrorMessage(
          error,
          "No se pudo solicitar el cupon de descuento.",
        ),
      );
    }
  };

  const handleApplyDiscountCoupon = async () => {
    setDiscountCouponError(null);
    setDiscountCouponMessage(null);

    if (!normalizedFormEmail) {
      setDiscountCouponError(
        "Primero ingresa en el formulario el email al que pertenece el cupon.",
      );
      return;
    }

    if (!discountCouponInput.trim()) {
      setDiscountCouponError("Ingresa el cupon recibido por email.");
      return;
    }

    try {
      const response = await validateDiscountCouponMutation.mutateAsync({
        email: normalizedFormEmail,
        couponCode: discountCouponInput.trim(),
      });
      const result = response.data as PublicDiscountCouponValidationResponseDto;

      if (!result.valid || !result.discountPercentage) {
        setAppliedDiscount(null);
        setDiscountCouponError(result.message);
        return;
      }

      setAppliedDiscount({
        couponCode: discountCouponInput.trim(),
        email: normalizedFormEmail,
        discountPercentage: result.discountPercentage,
        expiresAt: result.expiresAt,
      });
      setDiscountCouponMessage(result.message);
    } catch (error) {
      setAppliedDiscount(null);
      setDiscountCouponError(
        getUserFacingErrorMessage(
          error,
          "No se pudo validar el cupon de descuento.",
        ),
      );
    }
  };

  useEffect(() => {
    if (!successState) {
      return;
    }

    successStateRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [successState]);

  useEffect(() => {
    const email = watchedValues.email?.trim().toLowerCase();
    const dni = watchedValues.dni?.trim();

    if ((!email || !email.includes("@")) && !dni) {
      lastPendingInstallmentLookupKeyRef.current = null;
      return;
    }

    const lookupKey = JSON.stringify({
      email: email || "",
      dni: dni || "",
    });

    if (lastPendingInstallmentLookupKeyRef.current === lookupKey) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      lastPendingInstallmentLookupKeyRef.current = lookupKey;
      void pendingSecondInstallmentMutation.mutate({
        email: email || undefined,
        dni: dni || undefined,
      });
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    pendingSecondInstallmentMutation,
    watchedValues.dni,
    watchedValues.email,
  ]);

  const pendingSecondInstallmentSuggestion =
    pendingSecondInstallmentMutation.data?.data.found &&
    pendingSecondInstallmentMutation.data.data.trackingCode !==
      dismissedPendingInstallmentCode
      ? pendingSecondInstallmentMutation.data.data
      : null;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <section className="mx-auto max-w-[88rem] px-8 py-20 sm:px-10 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
          <div className="space-y-10 lg:sticky lg:top-10">
            <div className="space-y-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700 dark:text-emerald-300">
                Inscripción online
              </p>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-stone-950 dark:text-stone-100 sm:text-5xl">
                  Inscripción al congreso
                </h1>
                <div className="grid grid-cols-1 gap-4 border-y border-primary/15 py-4 sm:grid-cols-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-500 dark:text-stone-400">
                      1 día
                    </span>
                    <span className="text-2xl font-semibold text-primary">
                      $15.000
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-stone-500 dark:text-stone-400">
                      3 días
                    </span>
                    <span className="text-2xl font-semibold text-primary">
                      $40.000
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-stone-500 dark:text-stone-400">
                      3 días con alojamiento
                    </span>
                    <span className="text-2xl font-semibold text-primary">
                      $70.000
                    </span>
                  </div>
                </div>
                <p className="max-w-xl text-base leading-7 text-stone-600 dark:text-stone-400">
                  Completá tus datos, seleccioná la modalidad y adjuntá el
                  comprobante de transferencia para que el comité pueda revisar
                  tu inscripción.
                </p>
              </div>
            </div>

            <div className="max-w-xl border-t border-stone-200 pt-8 dark:border-stone-800">
              <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
                La transferencia se realiza fuera de la web.
              </p>
            </div>

            {pendingSecondInstallmentSuggestion ? (
              <InlineNotice
                variant={
                  pendingSecondInstallmentSuggestion.secondInstallmentExpired
                    ? "error"
                    : "info"
                }
              >
                <div className="space-y-3">
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    Detectamos una inscripcion previa en 2 cuotas
                    {pendingSecondInstallmentSuggestion.participantName
                      ? ` para ${pendingSecondInstallmentSuggestion.participantName}`
                      : ""}
                    .
                  </p>
                  <p className="text-sm leading-6">
                    {pendingSecondInstallmentSuggestion.message}
                  </p>
                  {pendingSecondInstallmentSuggestion.secondInstallmentDueAt ? (
                    <p className="text-sm leading-6">
                      {`Fecha límite: ${formatAdminDate(
                        pendingSecondInstallmentSuggestion.secondInstallmentDueAt,
                      )}.`}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-3">
                    {pendingSecondInstallmentSuggestion.secondInstallmentUploadAllowed ? (
                      <Button asChild type="button">
                        <Link
                          to={`/inscripcion/segunda-cuota?trackingCode=${encodeURIComponent(
                            pendingSecondInstallmentSuggestion.trackingCode ??
                              "",
                          )}`}
                        >
                          Ir a segunda cuota
                        </Link>
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant="outline"
                      className="border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:hover:bg-stone-900"
                      onClick={() =>
                        setDismissedPendingInstallmentCode(
                          pendingSecondInstallmentSuggestion.trackingCode,
                        )
                      }
                    >
                      Continuar con una inscripcion nueva
                    </Button>
                  </div>
                </div>
              </InlineNotice>
            ) : null}
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-7 py-9 text-stone-900 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:shadow-[0_22px_70px_-45px_rgba(0,0,0,0.65)] sm:px-10 sm:py-10 lg:px-12">
            <PublicRegistrationStepIndicator currentStep={currentStep} />

            <div className="mt-10 max-w-2xl space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-100">
                {currentStep === 1 ? "Datos personales" : ""}
                {currentStep === 2 ? "Opción de inscripción" : ""}
                {currentStep === 3 ? "Modalidad de pago" : ""}
                {currentStep === 4
                  ? "Revisá el envío y adjuntá el comprobante"
                  : ""}
              </h2>
              <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
                {currentStep === 1
                  ? "Ingresa los datos del participante tal como deben quedar registrados en la inscripción."
                  : ""}
                {currentStep === 2
                  ? "Seleccioná la opción correspondiente."
                  : ""}
                {currentStep === 3
                  ? "Indica si informarás un pago único o si luego podrás cargar una segunda cuota."
                  : ""}
                {currentStep === 4
                  ? "Confirmá los datos del pago y subí el comprobante de la transferencia para completar este envío."
                  : ""}
              </p>
            </div>

            <FormProvider {...form}>
              <form
                className="mt-12 space-y-10"
                onSubmit={
                  currentStep === 4
                    ? onSubmit
                    : (event) => {
                        event.preventDefault();
                        void handleNext();
                      }
                }
              >
                {currentStep === 1 ? (
                  <div className="space-y-8">
                    <div className="grid gap-x-6 gap-y-7 md:grid-cols-2">
                      <label className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          placeholder="Tu nombre"
                          className={fieldClassName}
                          {...form.register("firstName")}
                        />
                        {form.formState.errors.firstName ? (
                          <p className="text-sm text-red-600">
                            {form.formState.errors.firstName.message}
                          </p>
                        ) : null}
                      </label>

                      <label className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          placeholder="Tu apellido"
                          className={fieldClassName}
                          {...form.register("lastName")}
                        />
                        {form.formState.errors.lastName ? (
                          <p className="text-sm text-red-600">
                            {form.formState.errors.lastName.message}
                          </p>
                        ) : null}
                      </label>

                      <label className="space-y-2">
                        <Label htmlFor="dni">DNI</Label>
                        <Input
                          id="dni"
                          placeholder="Sin puntos ni guiones"
                          className={fieldClassName}
                          {...form.register("dni")}
                        />
                        {form.formState.errors.dni ? (
                          <p className="text-sm text-red-600">
                            {form.formState.errors.dni.message}
                          </p>
                        ) : null}
                      </label>

                      <label className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tuemail@dominio.com"
                          className={fieldClassName}
                          {...form.register("email")}
                        />
                        {form.formState.errors.email ? (
                          <p className="text-sm text-red-600">
                            {form.formState.errors.email.message}
                          </p>
                        ) : null}
                      </label>

                      <label className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          placeholder="Número de contacto"
                          className={fieldClassName}
                          {...form.register("phone")}
                        />
                        {form.formState.errors.phone ? (
                          <p className="text-sm text-red-600">
                            {form.formState.errors.phone.message}
                          </p>
                        ) : null}
                      </label>
                    </div>

                    <section className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <span className="mb-2 inline-flex rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
                            Beneficio exclusivo
                          </span>
                          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                            Descuento para participantes del primer congreso
                          </p>
                          <p className="text-sm text-stone-600 dark:text-stone-400">
                            Solicitá tu cupón utilizando el mismo email con el
                            que te inscribiste en el primer congreso.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-end mt-2">
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="discount-request-email">
                            Email para solicitar el cupón
                          </Label>
                          <Input
                            id="discount-request-email"
                            type="email"
                            value={discountRequestEmail}
                            placeholder="tuemail@dominio.com"
                            className={fieldClassName}
                            onChange={(event) =>
                              setDiscountRequestEmail(event.target.value)
                            }
                          />
                        </div>

                        <Button
                          type="button"
                          onClick={() => void handleRequestDiscountCoupon()}
                          disabled={requestDiscountCouponMutation.isPending}
                        >
                          {requestDiscountCouponMutation.isPending
                            ? "Solicitando..."
                            : "Solicitar cupón"}
                        </Button>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex-1 space-y-2">
                          <p className="text-xs text-stone-700 dark:text-stone-400">
                            Una vez solicitado, ingresá el código recibido (por
                            ejemplo: DESC-F3E6-EF33-0531) y luego presioná
                            “Aplicar descuento”.
                          </p>
                          <Label htmlFor="discount-coupon-code">
                            Cupón de descuento
                          </Label>
                          <Input
                            id="discount-coupon-code"
                            value={discountCouponInput}
                            placeholder="Ingresa el código recibido por email"
                            className={fieldClassName}
                            onChange={(event) =>
                              setDiscountCouponInput(event.target.value)
                            }
                          />
                        </div>

                        <Button
                          type="button"
                          variant="default"
                          onClick={() => void handleApplyDiscountCoupon()}
                          disabled={validateDiscountCouponMutation.isPending}
                        >
                          {validateDiscountCouponMutation.isPending
                            ? "Validando..."
                            : "Aplicar descuento"}
                        </Button>
                      </div>

                      {discountRequestMessage ? (
                        <InlineNotice variant="success">
                          {discountRequestMessage}
                          {requestDiscountCouponMutation.data?.data.expiresAt
                            ? ` Vigente hasta ${formatAdminDate(
                                requestDiscountCouponMutation.data.data
                                  .expiresAt,
                              )}.`
                            : ""}
                        </InlineNotice>
                      ) : null}

                      {discountRequestError ? (
                        <InlineNotice variant="error">
                          {discountRequestError}
                        </InlineNotice>
                      ) : null}

                      {hasAppliedDiscount ? (
                        <InlineNotice variant="success">
                          {`Descuento del ${appliedDiscount?.discountPercentage}% aplicado para ${appliedDiscount?.email}.`}
                          {appliedDiscount?.expiresAt
                            ? ` Vigente hasta ${formatAdminDate(
                                appliedDiscount.expiresAt,
                              )}.`
                            : ""}
                        </InlineNotice>
                      ) : null}

                      {discountCouponMessage && !hasAppliedDiscount ? (
                        <InlineNotice variant="success">
                          {discountCouponMessage}
                        </InlineNotice>
                      ) : null}

                      {discountCouponError ? (
                        <InlineNotice variant="error">
                          {discountCouponError}
                        </InlineNotice>
                      ) : null}
                    </section>
                  </div>
                ) : null}

                {currentStep === 2 ? (
                  <div className="space-y-4">
                    {pricingCatalogQuery.isLoading ? (
                      <p className="flex items-center gap-2 rounded-lg border border-stone-300 p-2 text-sm text-stone-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-400">
                        <Loader className="animate-spin" /> Cargando opciones y
                        precios, esto puede demorar algunos segundos...
                      </p>
                    ) : null}
                    {registrationOptions.map((option) => (
                      <RegistrationOptionCard
                        key={option.code}
                        title={option.title}
                        price={formatPublicRegistrationCurrency(
                          hasAppliedDiscount
                            ? option.discountedTotalAmount
                            : option.baseTotalAmount,
                        )}
                        priceDetail={
                          hasAppliedDiscount
                            ? `Antes ${formatPublicRegistrationCurrency(
                                option.baseTotalAmount,
                              )}`
                            : undefined
                        }
                        description={option.description}
                        selected={
                          form.watch("registrationOptionCode") === option.code
                        }
                        onSelect={() =>
                          form.setValue("registrationOptionCode", option.code, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          })
                        }
                      />
                    ))}
                    {form.formState.errors.registrationOptionCode ? (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.registrationOptionCode.message}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {currentStep === 3 ? (
                  <div className="space-y-4">
                    {installmentsAvailabilityMessage ? (
                      <InlineNotice variant="info">
                        {installmentsAvailabilityMessage}
                      </InlineNotice>
                    ) : null}
                    {!selectedOption ? (
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Primero selecciona una opcion de inscripcion.
                      </p>
                    ) : null}
                    {selectedOption?.paymentPlans.map((plan) => (
                      <PaymentPlanCard
                        key={plan.type}
                        title={publicPaymentPlanContent[plan.type].title}
                        description={
                          publicPaymentPlanContent[plan.type].description
                        }
                        selected={form.watch("paymentPlanType") === plan.type}
                        onSelect={() =>
                          form.setValue("paymentPlanType", plan.type, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          })
                        }
                      />
                    ))}
                    {form.formState.errors.paymentPlanType ? (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.paymentPlanType.message}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {currentStep === 4 ? (
                  <div className="mx-auto max-w-[720px] space-y-10">
                    <BankTransferDetails />

                    <section className="space-y-5 border-b border-stone-200 pb-8 dark:border-stone-800">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                        Resumen
                      </p>
                      <dl className="space-y-5">
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                            Opción elegida
                          </dt>
                          <dd className="text-base font-medium text-stone-950 dark:text-stone-100">
                            {selectedRegistrationOption?.title ?? "-"}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                            Modalidad
                          </dt>
                          <dd className="text-base font-medium text-stone-950 dark:text-stone-100">
                            {paymentPlanLabel}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                            Cuota actual
                          </dt>
                          <dd className="text-base font-medium text-stone-950 dark:text-stone-100">
                            {currentInstallmentLabel}
                          </dd>
                        </div>
                        <div className="space-y-2 pt-2">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                            Monto
                          </dt>
                          <dd className="text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-100 sm:text-[2.15rem]">
                            {formatPublicRegistrationCurrency(
                              currentInstallmentAmount ??
                                suggestedAmount ??
                                watchedValues.amountReported,
                            )}
                          </dd>
                          <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                            Importe definido según la opción y la modalidad
                            seleccionadas.
                          </p>
                          {hasAppliedDiscount && selectedPaymentPlan ? (
                            <p className="text-sm leading-6 text-emerald-700 dark:text-emerald-300">
                              {`Incluye ${appliedDiscount?.discountPercentage}% OFF sobre el total de la inscripción.`}
                            </p>
                          ) : null}
                        </div>
                      </dl>
                    </section>

                    <section className="space-y-4 pb-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                          Comprobante
                        </p>
                        <p className="text-base font-medium text-stone-950 dark:text-stone-100">
                          Subí el comprobante
                        </p>
                      </div>

                      <input
                        id="receipt"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;
                          form.setValue("receipt", file, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          });
                        }}
                      />

                      <label
                        htmlFor="receipt"
                        className={`block cursor-pointer rounded-lg border px-5 py-5 transition-colors ${
                          form.formState.errors.receipt
                            ? "border-red-300 bg-red-50/40 dark:border-red-900/70 dark:bg-red-950/30"
                            : receiptFile
                              ? "border-stone-300 bg-stone-50/60 dark:border-stone-700 dark:bg-stone-950"
                              : "border-stone-300 bg-white hover:border-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:hover:border-stone-500"
                        }`}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex min-w-0 items-start gap-3">
                            <div
                              className={`mt-0.5 rounded-full p-2 ${
                                receiptFile
                                  ? "bg-stone-900 text-white dark:bg-emerald-500 dark:text-stone-950"
                                  : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                              }`}
                            >
                              {receiptFile ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Upload className="h-4 w-4" />
                              )}
                            </div>
                            <div className="min-w-0 space-y-1">
                              <p className="text-sm font-medium text-stone-950 dark:text-stone-100">
                                {receiptFile
                                  ? "Archivo cargado"
                                  : "Subí el comprobante"}
                              </p>
                              <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                                {receiptFile
                                  ? receiptFile.name
                                  : "Aceptamos archivos de imagen."}
                              </p>
                            </div>
                          </div>

                          <span className="inline-flex shrink-0 items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200">
                            {receiptFile
                              ? "Cambiar archivo"
                              : "Seleccionar archivo"}
                          </span>
                        </div>

                        {receiptFile ? (
                          <div className="mt-4 flex items-center gap-2 border-t border-stone-200 pt-4 text-sm text-stone-600 dark:border-stone-800 dark:text-stone-400">
                            <FileText className="h-4 w-4 shrink-0" />
                            <span className="truncate">
                              Listo para enviarse con la inscripción.
                            </span>
                          </div>
                        ) : null}
                      </label>

                      {form.formState.errors.receipt ? (
                        <p className="text-sm text-red-600">
                          {form.formState.errors.receipt.message as string}
                        </p>
                      ) : null}

                      <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                        El comprobante será revisado por el comité organizador
                        antes de confirmar la inscripción.
                      </p>
                    </section>

                    <label className="space-y-2">
                      <Label htmlFor="notes">Observaciones</Label>
                      <Textarea
                        id="notes"
                        rows={4}
                        className={textareaClassName}
                        placeholder="Dato adicional opcional para el comité"
                        {...form.register("notes")}
                      />
                    </label>
                  </div>
                ) : null}

                {submitError ? (
                  <InlineNotice variant="error">{submitError}</InlineNotice>
                ) : null}

                {pricingErrorMessage ? (
                  <InlineNotice variant="error">
                    {pricingErrorMessage}
                  </InlineNotice>
                ) : null}

                <PublicRegistrationWizardActions
                  isFirstStep={currentStep === 1}
                  isLastStep={currentStep === 4}
                  isSubmitting={isSubmitting}
                  onBack={handleBack}
                />
              </form>
            </FormProvider>

            {successState ? (
              <section
                ref={successStateRef}
                className="mt-10 border-t border-stone-200 pt-10 dark:border-stone-800"
              >
                <PublicRegistrationSuccessBlock result={successState} />
              </section>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
