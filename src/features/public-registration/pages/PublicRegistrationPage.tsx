import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InlineNotice } from "@/shared/ui/InlineNotice";
import type {
  PublicDiscountCouponValidationResponseDto,
  PublicSubmissionStatusDto,
} from "@/features/api/types";
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
  useRecoverPublicTrackingCodeMutation,
  usePublicSubmissionStatusMutation,
  useValidatePublicDiscountCouponMutation,
} from "@/features/public-registration/public-registration.hooks";
import { PublicRegistrationStepIndicator } from "@/features/public-registration/components/PublicRegistrationStepIndicator";
import { PublicRegistrationWizardActions } from "@/features/public-registration/components/PublicRegistrationWizardActions";
import { RegistrationOptionCard } from "@/features/public-registration/components/RegistrationOptionCard";
import { PaymentPlanCard } from "@/features/public-registration/components/PaymentPlanCard";
import { PublicRegistrationSuccessBlock } from "@/features/public-registration/components/PublicRegistrationSuccessState";
import { BankTransferDetails } from "@/features/public-registration/components/BankTransferDetails";
import {
  formatAdminDate,
  getPaymentPlanLabel,
  getReceiptStatusLabel,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";

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
  const [trackingCodeInput, setTrackingCodeInput] = useState("");
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState<string | null>(null);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [showDiscountRequestForm, setShowDiscountRequestForm] = useState(false);
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
  const statusResultRef = useRef<HTMLDivElement | null>(null);
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
  const statusMutation = usePublicSubmissionStatusMutation();
  const recoverTrackingCodeMutation = useRecoverPublicTrackingCodeMutation();
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
      setTrackingCodeInput(response.data.trackingCode);
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
    "h-12 rounded-md border-stone-300 px-4 text-sm shadow-none";
  const textareaClassName = "rounded-md border-stone-300 px-4 py-3 shadow-none";
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

  const handleStatusLookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trackingCodeInput.trim()) {
      return;
    }

    await statusMutation.mutateAsync(trackingCodeInput.trim());
  };

  const handleRecoverySubmit = async () => {
    setRecoveryError(null);
    setRecoveryMessage(null);

    const email = recoveryEmail.trim();

    if (!email) {
      setRecoveryError("Ingresa tu email.");
      return;
    }

    try {
      const response = await recoverTrackingCodeMutation.mutateAsync(email);
      if (response.data.found) {
        setRecoveryMessage(response.data.message);
      } else {
        setRecoveryError(response.data.message);
      }
    } catch (error) {
      setRecoveryError(
        getUserFacingErrorMessage(
          error,
          "No se pudo enviar el correo de recuperación. Intenta nuevamente.",
        ),
      );
    }
  };

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

  const statusResult = statusMutation.data?.data as
    | PublicSubmissionStatusDto
    | undefined;

  useEffect(() => {
    if (!statusResult) {
      return;
    }

    statusResultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [statusResult]);

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
  const hasPendingSecondInstallment =
    statusResult?.paymentPlanType === "TWO_INSTALLMENTS" &&
    statusResult.submittedReceiptsCount < statusResult.installmentCountExpected;
  const canUploadPendingSecondInstallment =
    statusResult?.secondInstallmentUploadAllowed ?? false;

  return (
    <div className="min-h-screen bg-stone-50">
      <section className="mx-auto max-w-[88rem] px-8 py-20 sm:px-10 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
          <div className="space-y-10 lg:sticky lg:top-10">
            <div className="space-y-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Inscripción online
              </p>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                  Inscripción al congreso
                </h1>
                <p className="max-w-xl text-base leading-7 text-stone-600">
                  Completá tus datos, seleccioná la modalidad correspondiente y
                  adjuntá el comprobante de transferencia. Cada envío queda
                  sujeto a revisión manual por parte del comité organizador.
                </p>
              </div>
            </div>

            <div className="max-w-xl border-t border-stone-200 pt-8">
              <p className="text-sm leading-7 text-stone-600">
                La transferencia se realiza fuera de la web. En este formulario
                solo registramos la inscripción, el comprobante enviado y la
                modalidad elegida para que el comité pueda revisarlo luego.
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
                  <p className="font-medium text-stone-900">
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
                      className="border-stone-300 bg-white"
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

            <section className="max-w-xl space-y-5 border-t border-stone-200 pt-8">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Seguimiento
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
                  Consultar estado
                </h2>
                <p className="text-sm leading-7 text-stone-600">
                  Ingresá tu código de seguimiento para ver el estado actual de
                  la inscripción y de los comprobantes enviados.
                </p>
              </div>

              <form
                className="space-y-4"
                onSubmit={(event) => void handleStatusLookup(event)}
              >
                <label className="space-y-2">
                  <Label htmlFor="trackingCode">Código de seguimiento</Label>
                  <Input
                    id="trackingCode"
                    value={trackingCodeInput}
                    onChange={(event) =>
                      setTrackingCodeInput(event.target.value)
                    }
                    placeholder="Ej. RCP-CMN7-1GB6-M000-E4TW-2IME-RXR2"
                    className={fieldClassName}
                  />
                </label>

                <div className="flex items-center justify-between gap-3">
                  <p
                    className="text-xs leading-5 text-primary cursor-pointer hover:underline"
                    onClick={() => {
                      setShowRecoveryForm((current) => !current);
                      setRecoveryError(null);
                      setRecoveryMessage(null);
                    }}
                  >
                    No tengo mi código de identificación.
                  </p>
                  <Button
                    type="submit"
                    disabled={
                      statusMutation.isPending || !trackingCodeInput.trim()
                    }
                  >
                    {statusMutation.isPending ? "Consultando..." : "Consultar"}
                  </Button>
                </div>
              </form>

              {showRecoveryForm ? (
                <div className="space-y-4 rounded-lg border border-stone-200 bg-stone-50 px-4 py-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-stone-900">
                      Recuperar código por email
                    </p>
                    <p className="text-sm leading-6 text-stone-600">
                      Ingresá el email que usaste al inscribirte. Si encontramos
                      una inscripción válida, te enviaremos el código por
                      correo.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      type="email"
                      value={recoveryEmail}
                      onChange={(event) => setRecoveryEmail(event.target.value)}
                      placeholder="tuemail@dominio.com"
                      className={fieldClassName}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => void handleRecoverySubmit()}
                      disabled={recoverTrackingCodeMutation.isPending}
                      className="rounded-md border-stone-300 bg-white px-5 text-stone-700"
                    >
                      {recoverTrackingCodeMutation.isPending
                        ? "Enviando..."
                        : "Enviar email"}
                    </Button>
                  </div>

                  {recoveryError ? (
                    <InlineNotice variant="error">{recoveryError}</InlineNotice>
                  ) : null}

                  {recoveryMessage ? (
                    <InlineNotice variant="success">
                      {recoveryMessage}
                    </InlineNotice>
                  ) : null}
                </div>
              ) : null}

              {statusMutation.isError ? (
                <InlineNotice variant="error">
                  {getUserFacingErrorMessage(
                    statusMutation.error,
                    "No se pudo consultar el estado de la inscripción.",
                  )}
                </InlineNotice>
              ) : null}

              {statusResult ? (
                <div
                  ref={statusResultRef}
                  className="space-y-5 border-t border-stone-200 pt-5"
                >
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                      Estado actual
                    </p>
                    <p className="text-lg font-semibold text-stone-950">
                      {getRegistrationStatusLabel(statusResult.status)}
                    </p>
                    <p className="text-sm leading-6 text-stone-600">
                      {statusResult.registrationOption.label} ·{" "}
                      {getPaymentPlanLabel(statusResult.paymentPlanType)}
                    </p>
                  </div>

                  <dl className="space-y-3 text-sm leading-6 text-stone-700">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-stone-500">Código</dt>
                      <dd className="text-right font-medium text-stone-900">
                        {statusResult.trackingCode}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-stone-500">Enviados</dt>
                      <dd className="text-right font-medium text-stone-900">
                        {statusResult.submittedReceiptsCount} de{" "}
                        {statusResult.installmentCountExpected} comprobantes
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-stone-500">Última actualización</dt>
                      <dd className="text-right font-medium text-stone-900">
                        {formatAdminDate(statusResult.updatedAt)}
                      </dd>
                    </div>
                  </dl>

                  {hasPendingSecondInstallment ? (
                    <InlineNotice
                      variant={
                        statusResult.secondInstallmentExpired ? "error" : "info"
                      }
                    >
                      <div className="space-y-3">
                        <p className="font-medium text-stone-900">
                          {statusResult.secondInstallmentExpired
                            ? "Esta inscripción tiene la segunda cuota vencida."
                            : "Esta inscripcion aún tiene una cuota pendiente."}
                        </p>
                        {statusResult.secondInstallmentDueAt ? (
                          <p className="text-sm leading-6">
                            {`Fecha límite para informar la segunda cuota: ${formatAdminDate(
                              statusResult.secondInstallmentDueAt,
                            )}.`}
                          </p>
                        ) : null}
                        {statusResult.secondInstallmentExpired ? (
                          <p className="text-sm leading-6">
                            Comunicate a{" "}
                            <a
                              href="mailto:congresonacionalrcp@gmail.com"
                              className="font-medium underline-offset-4 hover:underline"
                            >
                              congresonacionalrcp@gmail.com
                            </a>{" "}
                            o por WhatsApp al{" "}
                            <a
                              href="https://wa.me/542392460227"
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium underline-offset-4 hover:underline"
                            >
                              2392-460227
                            </a>
                            .
                          </p>
                        ) : null}
                        <div className="flex flex-wrap gap-3">
                          {canUploadPendingSecondInstallment ? (
                            <Button asChild type="button">
                              <Link
                                to={`/inscripcion/segunda-cuota?trackingCode=${encodeURIComponent(
                                  statusResult.trackingCode,
                                )}`}
                              >
                                Pagar segunda cuota
                              </Link>
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </InlineNotice>
                  ) : null}

                  <div className="space-y-3">
                    {statusResult.receipts.map((receipt) => (
                      <div
                        key={receipt.installmentNumber}
                        className="flex items-center justify-between gap-4 border-t border-stone-200 pt-3 text-sm"
                      >
                        <div>
                          <p className="font-medium text-stone-900">
                            Cuota {receipt.installmentNumber}
                          </p>
                          <p className="text-stone-500">
                            Recibido el {formatAdminDate(receipt.createdAt)}
                          </p>
                        </div>
                        <p className="font-medium text-stone-900">
                          {getReceiptStatusLabel(receipt.status)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-7 py-9 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)] sm:px-10 sm:py-10 lg:px-12">
            <PublicRegistrationStepIndicator currentStep={currentStep} />

            <div className="mt-10 max-w-2xl space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight text-stone-950">
                {currentStep === 1 ? "Datos personales" : ""}
                {currentStep === 2 ? "Opción de inscripción" : ""}
                {currentStep === 3 ? "Modalidad de pago" : ""}
                {currentStep === 4
                  ? "Revisá el envío y adjuntá el comprobante"
                  : ""}
              </h2>
              <p className="text-sm leading-7 text-stone-600">
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

                    <section className="space-y-4 border-t border-stone-200 pt-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-medium text-stone-900">
                            Descuento para participantes del primer congreso
                          </p>
                          <p className="text-sm text-stone-600">
                            Solicitá el cupón y aplicalo con el mismo email de
                            la inscripción.
                          </p>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          className="h-auto justify-start px-0 text-emerald-700 hover:bg-transparent hover:text-emerald-800"
                          onClick={() => {
                            setShowDiscountRequestForm((current) => !current);
                            setDiscountRequestError(null);
                            setDiscountRequestMessage(null);
                            setDiscountRequestEmail(
                              watchedValues.email?.trim()
                                ? watchedValues.email.trim()
                                : "",
                            );
                          }}
                        >
                          {showDiscountRequestForm
                            ? "Ocultar solicitud"
                            : "Obtener cupón"}
                        </Button>
                      </div>

                      {showDiscountRequestForm ? (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                          <div className="flex-1 space-y-2">
                            <Label htmlFor="discount-request-email">
                              Email para recibir el cupón
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
                              : "Enviar cupón"}
                          </Button>
                        </div>
                      ) : null}

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="discount-coupon-code">
                            Cupón de descuento
                          </Label>
                          <Input
                            id="discount-coupon-code"
                            value={discountCouponInput}
                            placeholder="Ingresa el código recibido"
                            className={fieldClassName}
                            onChange={(event) =>
                              setDiscountCouponInput(event.target.value)
                            }
                          />
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => void handleApplyDiscountCoupon()}
                          disabled={validateDiscountCouponMutation.isPending}
                        >
                          {validateDiscountCouponMutation.isPending
                            ? "Validando..."
                            : "Aplicar"}
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
                      <p className="text-sm text-stone-500">
                        Cargando opciones y precios...
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
                      <p className="text-sm text-stone-500">
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

                    <section className="space-y-5 border-b border-stone-200 pb-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                        Resumen
                      </p>
                      <dl className="space-y-5">
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                            Opción elegida
                          </dt>
                          <dd className="text-base font-medium text-stone-950">
                            {selectedRegistrationOption?.title ?? "-"}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                            Modalidad
                          </dt>
                          <dd className="text-base font-medium text-stone-950">
                            {paymentPlanLabel}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                            Cuota actual
                          </dt>
                          <dd className="text-base font-medium text-stone-950">
                            {currentInstallmentLabel}
                          </dd>
                        </div>
                        <div className="space-y-2 pt-2">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                            Monto
                          </dt>
                          <dd className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-[2.15rem]">
                            {formatPublicRegistrationCurrency(
                              currentInstallmentAmount ??
                                suggestedAmount ??
                                watchedValues.amountReported,
                            )}
                          </dd>
                          <p className="text-sm leading-6 text-stone-600">
                            Importe definido según la opción y la modalidad
                            seleccionadas.
                          </p>
                          {hasAppliedDiscount && selectedPaymentPlan ? (
                            <p className="text-sm leading-6 text-emerald-700">
                              {`Incluye ${appliedDiscount?.discountPercentage}% OFF sobre el total de la inscripción.`}
                            </p>
                          ) : null}
                        </div>
                      </dl>
                    </section>

                    <section className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                          Comprobante
                        </p>
                        <p className="text-base font-medium text-stone-950">
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
                            ? "border-red-300 bg-red-50/40"
                            : receiptFile
                              ? "border-stone-300 bg-stone-50/60"
                              : "border-stone-300 bg-white hover:border-stone-400"
                        }`}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex min-w-0 items-start gap-3">
                            <div
                              className={`mt-0.5 rounded-full p-2 ${
                                receiptFile
                                  ? "bg-stone-900 text-white"
                                  : "bg-stone-100 text-stone-600"
                              }`}
                            >
                              {receiptFile ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Upload className="h-4 w-4" />
                              )}
                            </div>
                            <div className="min-w-0 space-y-1">
                              <p className="text-sm font-medium text-stone-950">
                                {receiptFile
                                  ? "Archivo cargado"
                                  : "Subí el comprobante"}
                              </p>
                              <p className="text-sm leading-6 text-stone-600">
                                {receiptFile
                                  ? receiptFile.name
                                  : "Aceptamos archivos de imagen. Puedes arrastrar el archivo o seleccionarlo manualmente."}
                              </p>
                            </div>
                          </div>

                          <span className="inline-flex shrink-0 items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700">
                            {receiptFile
                              ? "Cambiar archivo"
                              : "Seleccionar archivo"}
                          </span>
                        </div>

                        {receiptFile ? (
                          <div className="mt-4 flex items-center gap-2 border-t border-stone-200 pt-4 text-sm text-stone-600">
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

                      <p className="text-sm leading-6 text-stone-600">
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
                className="mt-10 border-t border-stone-200 pt-10"
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
