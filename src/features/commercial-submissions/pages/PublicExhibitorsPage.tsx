import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RegistrationOptionCard } from "@/features/public-registration/components/RegistrationOptionCard";
import { PaymentPlanCard } from "@/features/public-registration/components/PaymentPlanCard";
import { BankTransferDetails } from "@/features/public-registration/components/BankTransferDetails";
import {
  formatPublicRegistrationCurrency,
  getCurrentSubmissionDate,
} from "@/features/public-registration/public-registration.utils";
import { publicPaymentPlanContent } from "@/features/public-registration/public-registration.constants";
import { InlineNotice } from "@/shared/ui/InlineNotice";
import { useBackendWarmup } from "@/shared/api/useBackendWarmup";
import type { CommercialSubmissionCreatedDto } from "@/features/api/types";
import {
  useCommercialPricingCatalogQuery,
  useCommercialSubmissionStatusMutation,
  useCreateCommercialSubmissionMutation,
  useRequestCommercialStandDiscountCouponMutation,
  useValidateCommercialStandDiscountCouponMutation,
} from "@/features/commercial-submissions/commercial-submissions.hooks";
import { buildCommercialSubmissionFormData } from "@/features/commercial-submissions/commercial-submissions.utils";
import { CommercialSubmissionSuccessBlock } from "@/features/commercial-submissions/components/CommercialSubmissionSuccessState";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";
import {
  formatAdminDate,
  getReceiptStatusLabel,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";

const schema = z.object({
  companyName: z.string().trim().min(1, "Ingresá el nombre de la empresa."),
  contactFirstName: z.string().trim().min(1, "Ingresá el nombre del contacto."),
  contactLastName: z
    .string()
    .trim()
    .min(1, "Ingresá el apellido del contacto."),
  email: z.string().trim().email("Ingresá un email válido."),
  phone: z.string().trim().min(1, "Ingresá un teléfono."),
  commercialKind: z.literal("STAND"),
  commercialOptionCode: z.literal("STAND_SPACE_3X3"),
  paymentPlanType: z.string().min(1, "Selecciona una modalidad."),
  includesEquipment: z.boolean(),
  amountReported: z.number().positive(),
  paymentDate: z.string().min(1, "Ingresá la fecha de pago."),
  notes: z.string(),
  receipt: z
    .custom<File | null>((value) => value instanceof File, {
      message: "Adjunta el comprobante.",
    })
    .refine(
      (value) =>
        !value ||
        value.type.startsWith("image/") ||
        value.type === "application/pdf",
      "El comprobante debe ser una imagen o PDF.",
    )
    .nullable(),
});

type FormValues = z.infer<typeof schema>;

type AppliedDiscountState = {
  couponCode: string;
  email: string;
  discountAmount: number;
  expiresAt: string | null;
};

const fieldClassName =
  "h-12 rounded-md border-stone-300 px-4 text-sm shadow-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500";
const textareaClassName =
  "min-h-[120px] rounded-md border-stone-300 px-4 py-3 text-sm shadow-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500";

export function PublicExhibitorsPage() {
  useBackendWarmup();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successState, setSuccessState] =
    useState<CommercialSubmissionCreatedDto | null>(null);
  const [requestEmail, setRequestEmail] = useState("");
  const [requestMessage, setRequestMessage] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [trackingCodeInput, setTrackingCodeInput] = useState("");
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] =
    useState<AppliedDiscountState | null>(null);
  const successStateRef = useRef<HTMLElement | null>(null);
  const statusResultRef = useRef<HTMLDivElement | null>(null);

  const pricingCatalogQuery = useCommercialPricingCatalogQuery();
  const statusMutation = useCommercialSubmissionStatusMutation();
  const createMutation = useCreateCommercialSubmissionMutation();
  const requestCouponMutation =
    useRequestCommercialStandDiscountCouponMutation();
  const validateCouponMutation =
    useValidateCommercialStandDiscountCouponMutation();
  const standOption = pricingCatalogQuery.data?.standOptions[0];

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "",
      contactFirstName: "",
      contactLastName: "",
      email: "",
      phone: "",
      commercialKind: "STAND",
      commercialOptionCode: "STAND_SPACE_3X3",
      paymentPlanType: "",
      includesEquipment: false,
      amountReported: 0,
      paymentDate: getCurrentSubmissionDate(),
      notes: "",
      receipt: null,
    },
  });

  const watchedEmail = form.watch("email").trim().toLowerCase();
  const paymentPlanType = form.watch("paymentPlanType");
  const includesEquipment = form.watch("includesEquipment");
  const receiptFile = form.watch("receipt");

  const totalAmount = useMemo(() => {
    if (!standOption) {
      return 0;
    }

    const discountAmount =
      appliedDiscount?.email === watchedEmail
        ? appliedDiscount.discountAmount
        : 0;

    return (
      standOption.baseAmount -
      discountAmount +
      (includesEquipment ? standOption.equipmentAdditionalAmount : 0)
    );
  }, [appliedDiscount, includesEquipment, standOption, watchedEmail]);

  const installmentAmount = useMemo(() => {
    if (!paymentPlanType) {
      return 0;
    }

    return paymentPlanType === "TWO_INSTALLMENTS"
      ? totalAmount / 2
      : totalAmount;
  }, [paymentPlanType, totalAmount]);

  useEffect(() => {
    form.setValue("amountReported", installmentAmount);
  }, [form, installmentAmount]);

  useEffect(() => {
    if (!appliedDiscount) {
      return;
    }

    if (!watchedEmail || watchedEmail === appliedDiscount.email) {
      return;
    }

    setAppliedDiscount(null);
    setCouponInput("");
    setCouponMessage(null);
    setCouponError("El cupón se quitó porque cambiaste el email del contacto.");
  }, [appliedDiscount, watchedEmail]);

  useEffect(() => {
    if (!watchedEmail) {
      return;
    }

    setRequestEmail((current) => (current.trim() ? current : watchedEmail));
  }, [watchedEmail]);

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
    if (!statusMutation.data?.data || lookupError) {
      return;
    }

    statusResultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [lookupError, statusMutation.data]);

  const handleStatusLookup = async () => {
    setLookupError(null);

    if (!trackingCodeInput.trim()) {
      return;
    }

    try {
      const response = await statusMutation.mutateAsync(
        trackingCodeInput.trim(),
      );
      const result = response.data;

      if (result.commercial.kind !== "STAND") {
        setLookupError("Este código no corresponde a una solicitud de stand.");
      }
    } catch (error) {
      setLookupError(
        getUserFacingErrorMessage(
          error,
          "No se pudo consultar el estado de la solicitud de stand.",
        ),
      );
    }
  };

  const handleRequestCoupon = async () => {
    setRequestError(null);
    setRequestMessage(null);
    const email = requestEmail.trim().toLowerCase();

    if (!email) {
      setRequestError("Ingresá el email para solicitar el cupón.");
      return;
    }

    try {
      const response = await requestCouponMutation.mutateAsync(email);
      setRequestMessage(response.data.message);
    } catch (error) {
      setRequestError(
        getUserFacingErrorMessage(
          error,
          "No se pudo solicitar el cupón de descuento para stand.",
        ),
      );
    }
  };

  const handleApplyCoupon = async () => {
    setCouponError(null);
    setCouponMessage(null);

    if (!watchedEmail) {
      setCouponError(
        "Primero ingresá en el formulario el email al que pertenece el cupón.",
      );
      return;
    }

    if (!couponInput.trim()) {
      setCouponError("Ingresá el cupón recibido por email.");
      return;
    }

    try {
      const response = await validateCouponMutation.mutateAsync({
        email: watchedEmail,
        couponCode: couponInput.trim(),
      });

      if (!response.data.valid || !response.data.discountAmount) {
        setAppliedDiscount(null);
        setCouponError(response.data.message);
        return;
      }

      setAppliedDiscount({
        couponCode: couponInput.trim(),
        email: watchedEmail,
        discountAmount: response.data.discountAmount,
        expiresAt: response.data.expiresAt,
      });
      setCouponMessage(response.data.message);
    } catch (error) {
      setAppliedDiscount(null);
      setCouponError(
        getUserFacingErrorMessage(
          error,
          "No se pudo validar el cupón de descuento para stand.",
        ),
      );
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const response = await createMutation.mutateAsync(
        buildCommercialSubmissionFormData(
          {
            ...values,
            paymentPlanType: values.paymentPlanType as
              | "ONE_PAYMENT"
              | "TWO_INSTALLMENTS",
            paymentDate: getCurrentSubmissionDate(),
          },
          {
            discountCouponCode:
              appliedDiscount?.email === watchedEmail
                ? appliedDiscount.couponCode
                : undefined,
          },
        ),
      );
      setSuccessState(response.data);
    } catch (error) {
      setSubmitError(
        getUserFacingErrorMessage(
          error,
          "No se pudo enviar la solicitud para expositores.",
        ),
      );
    }
  });

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <section className="mx-auto max-w-[88rem] px-8 py-20 sm:px-10 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="space-y-10 lg:sticky lg:top-10">
            <div className="space-y-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700 dark:text-emerald-300">
                Expositores
              </p>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl dark:text-stone-100">
                  Contratá tu stand para el congreso
                </h1>
                <p className="max-w-xl text-base leading-7 text-stone-600 dark:text-stone-400">
                  Reservá el espacio comercial de 3x3, sumá equipamiento si lo
                  necesitás y adjuntá el comprobante para revisión.
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t border-stone-200 pt-8 text-sm text-stone-700 dark:border-stone-800 dark:text-stone-300">
              <p className="rounded-2xl bg-white px-4 py-3 dark:bg-stone-900 dark:text-stone-200">
                Stand 3x3:{" "}
                {formatPublicRegistrationCurrency(
                  standOption?.baseAmount ?? 300000,
                )}
              </p>
              <p className="rounded-2xl bg-white px-4 py-3 dark:bg-stone-900 dark:text-stone-200">
                Plus por stand equipado:{" "}
                {formatPublicRegistrationCurrency(
                  standOption?.equipmentAdditionalAmount ?? 150000,
                )}
              </p>
              <p className="rounded-2xl bg-white px-4 py-3 dark:bg-stone-900 dark:text-stone-200">
                Descuento habilitado solo con cupón para expositores del primer
                congreso.
              </p>
            </div>

            <section className="space-y-5 border-t border-stone-200 pt-8 dark:border-stone-800">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                  Seguimiento
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-100">
                  Consultar estado del stand
                </h2>
                <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
                  Ingresá tu código de seguimiento para ver el estado actual de
                  la solicitud y de los comprobantes enviados.
                </p>
              </div>

              <div className="space-y-4">
                <label className="space-y-2">
                  <Label htmlFor="trackingCode">Código de seguimiento</Label>
                  <Input
                    id="trackingCode"
                    value={trackingCodeInput}
                    onChange={(event) =>
                      setTrackingCodeInput(event.target.value)
                    }
                    placeholder="Ej. COM-ABCD-EFGH-IJKL"
                    className={fieldClassName}
                  />
                </label>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    disabled={
                      statusMutation.isPending || !trackingCodeInput.trim()
                    }
                    onClick={() => void handleStatusLookup()}
                  >
                    {statusMutation.isPending ? "Consultando..." : "Consultar"}
                  </Button>
                </div>
              </div>

              {lookupError ? (
                <InlineNotice variant="error">{lookupError}</InlineNotice>
              ) : null}

              {statusMutation.isError && !lookupError ? (
                <InlineNotice variant="error">
                  {getUserFacingErrorMessage(
                    statusMutation.error,
                    "No se pudo consultar el estado de la solicitud de stand.",
                  )}
                </InlineNotice>
              ) : null}

              {statusMutation.data?.data &&
              statusMutation.data.data.commercial.kind === "STAND" ? (
                <div
                  ref={statusResultRef}
                  className="space-y-5 border-t border-stone-200 pt-5 dark:border-stone-800"
                >
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                      Estado actual
                    </p>
                    <p className="text-lg font-semibold text-stone-950 dark:text-stone-100">
                      {getRegistrationStatusLabel(
                        statusMutation.data.data.status,
                      )}
                    </p>
                    <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                      {statusMutation.data.data.commercial.label} ·{" "}
                      {statusMutation.data.data.paymentPlanType ===
                      "TWO_INSTALLMENTS"
                        ? "2 cuotas"
                        : "1 pago"}
                    </p>
                  </div>

                  <dl className="space-y-3 text-sm leading-6 text-stone-700 dark:text-stone-300">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-stone-500 dark:text-stone-400">
                        Código
                      </dt>
                      <dd className="text-right font-medium text-stone-900 dark:text-stone-100">
                        {statusMutation.data.data.trackingCode}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-stone-500 dark:text-stone-400">
                        Enviados
                      </dt>
                      <dd className="text-right font-medium text-stone-900 dark:text-stone-100">
                        {statusMutation.data.data.submittedReceiptsCount} de{" "}
                        {statusMutation.data.data.installmentCountExpected}{" "}
                        comprobantes
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-stone-500 dark:text-stone-400">
                        Ultima actualizacion
                      </dt>
                      <dd className="text-right font-medium text-stone-900 dark:text-stone-100">
                        {formatAdminDate(statusMutation.data.data.updatedAt)}
                      </dd>
                    </div>
                  </dl>

                  {statusMutation.data.data.paymentPlanType ===
                    "TWO_INSTALLMENTS" &&
                  statusMutation.data.data.submittedReceiptsCount <
                    statusMutation.data.data.installmentCountExpected ? (
                    <InlineNotice
                      variant={
                        statusMutation.data.data.secondInstallmentExpired
                          ? "error"
                          : "info"
                      }
                    >
                      <div className="space-y-3">
                        <p className="font-medium text-stone-900 dark:text-stone-100">
                          {statusMutation.data.data.secondInstallmentExpired
                            ? "Esta solicitud tiene la segunda cuota vencida."
                            : "Esta solicitud aún tiene una cuota pendiente."}
                        </p>
                        {statusMutation.data.data.secondInstallmentDueAt ? (
                          <p className="text-sm leading-6">
                            {`Fecha límite para informar la segunda cuota: ${formatAdminDate(
                              statusMutation.data.data.secondInstallmentDueAt,
                            )}.`}
                          </p>
                        ) : null}
                        {statusMutation.data.data
                          .secondInstallmentUploadAllowed ? (
                          <Button asChild type="button">
                            <Link
                              to={`/inscripcion/comercial/segunda-cuota?trackingCode=${encodeURIComponent(
                                statusMutation.data.data.trackingCode,
                              )}`}
                            >
                              Informar segunda cuota
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </InlineNotice>
                  ) : null}

                  <div className="space-y-3">
                    {statusMutation.data.data.receipts.map((receipt) => (
                      <div
                        key={receipt.installmentNumber}
                        className="flex items-center justify-between gap-4 border-t border-stone-200 pt-3 text-sm dark:border-stone-800"
                      >
                        <div>
                          <p className="font-medium text-stone-900 dark:text-stone-100">
                            Cuota {receipt.installmentNumber}
                          </p>
                          <p className="text-stone-500 dark:text-stone-400">
                            Recibido el {formatAdminDate(receipt.createdAt)}
                          </p>
                        </div>
                        <p className="font-medium text-stone-900 dark:text-stone-100">
                          {getReceiptStatusLabel(receipt.status)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-7 py-9 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)] sm:px-10 sm:py-10 lg:px-12 dark:border-stone-800 dark:bg-stone-900">
            <form className="space-y-10" onSubmit={onSubmit}>
              <section className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-100">
                  Configura el stand
                </h2>
                <RegistrationOptionCard
                  title="Stand 3x3"
                  price={formatPublicRegistrationCurrency(
                    standOption?.baseAmount ?? 300000,
                  )}
                  description="Espacio comercial para presencia de marca durante el congreso."
                  selected
                  onSelect={() => undefined}
                />
                <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4 dark:border-stone-800 dark:bg-stone-950/60">
                  <Checkbox
                    checked={includesEquipment}
                    onCheckedChange={(checked) =>
                      form.setValue("includesEquipment", checked === true, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                  />
                  <span className="space-y-1">
                    <span className="block text-sm font-medium text-stone-900 dark:text-stone-100">
                      Agregar stand equipado
                    </span>
                    <span className="block text-sm leading-6 text-stone-600 dark:text-stone-400">
                      Incluye equipamiento adicional por{" "}
                      {formatPublicRegistrationCurrency(
                        standOption?.equipmentAdditionalAmount ?? 150000,
                      )}
                      .
                    </span>
                  </span>
                </label>
              </section>

              <section className="space-y-4 border-t border-stone-200 pt-6 dark:border-stone-800">
                <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-100">
                  Modalidad de pago
                </h2>
                {pricingCatalogQuery.data?.installmentsAvailable === false ? (
                  <InlineNotice variant="info">
                    {`La modalidad en cuotas estuvo disponible hasta ${formatAdminDate(
                      pricingCatalogQuery.data.installmentsAvailableUntil,
                    )} (${pricingCatalogQuery.data.installmentsTimezone}).`}
                  </InlineNotice>
                ) : null}
                {(standOption?.paymentPlans ?? []).map((plan) => (
                  <PaymentPlanCard
                    key={plan.type}
                    title={publicPaymentPlanContent[plan.type].title}
                    description={
                      publicPaymentPlanContent[plan.type].description
                    }
                    selected={paymentPlanType === plan.type}
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
              </section>

              <section className="space-y-4 border-t border-stone-200 pt-6 dark:border-stone-800">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="coupon-request-email">
                      Email para solicitar el cupón (solo si contrataste un
                      stand en el primer congreso)
                    </Label>
                    <Input
                      id="coupon-request-email"
                      value={requestEmail}
                      placeholder="tuempresa@dominio.com"
                      className={fieldClassName}
                      onChange={(event) => setRequestEmail(event.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => void handleRequestCoupon()}
                    disabled={requestCouponMutation.isPending}
                  >
                    {requestCouponMutation.isPending
                      ? "Solicitando..."
                      : "Enviar cupón"}
                  </Button>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="coupon-code">Cupón de descuento</Label>
                    <Input
                      id="coupon-code"
                      value={couponInput}
                      placeholder="Ingresá el código recibido"
                      className={fieldClassName}
                      onChange={(event) => setCouponInput(event.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void handleApplyCoupon()}
                    disabled={validateCouponMutation.isPending}
                  >
                    {validateCouponMutation.isPending
                      ? "Validando..."
                      : "Aplicar"}
                  </Button>
                </div>

                {requestMessage ? (
                  <InlineNotice variant="success">
                    {requestMessage}
                    {requestCouponMutation.data?.data.expiresAt
                      ? ` Vigente hasta ${formatAdminDate(requestCouponMutation.data.data.expiresAt)}.`
                      : ""}
                  </InlineNotice>
                ) : null}
                {requestError ? (
                  <InlineNotice variant="error">{requestError}</InlineNotice>
                ) : null}
                {appliedDiscount?.email === watchedEmail ? (
                  <InlineNotice variant="success">
                    {`Descuento aplicado por ${formatPublicRegistrationCurrency(appliedDiscount.discountAmount)} para ${appliedDiscount.email}.`}
                    {appliedDiscount.expiresAt
                      ? ` Vigente hasta ${formatAdminDate(appliedDiscount.expiresAt)}.`
                      : ""}
                  </InlineNotice>
                ) : null}
                {couponMessage && !appliedDiscount ? (
                  <InlineNotice variant="success">{couponMessage}</InlineNotice>
                ) : null}
                {couponError ? (
                  <InlineNotice variant="error">{couponError}</InlineNotice>
                ) : null}
              </section>

              <section className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <Label htmlFor="companyName">Empresa</Label>
                  <Input
                    id="companyName"
                    placeholder="Nombre de la empresa"
                    className={fieldClassName}
                    {...form.register("companyName")}
                  />
                </label>
                <label className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    placeholder="Número de contacto"
                    className={fieldClassName}
                    {...form.register("phone")}
                  />
                </label>
                <label className="space-y-2">
                  <Label htmlFor="contactFirstName">Nombre del contacto</Label>
                  <Input
                    id="contactFirstName"
                    placeholder="Nombre de quien gestiona"
                    className={fieldClassName}
                    {...form.register("contactFirstName")}
                  />
                </label>
                <label className="space-y-2">
                  <Label htmlFor="contactLastName">Apellido del contacto</Label>
                  <Input
                    id="contactLastName"
                    placeholder="Apellido del contacto"
                    className={fieldClassName}
                    {...form.register("contactLastName")}
                  />
                </label>
                <label className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email del contacto</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tuempresa@dominio.com"
                    className={fieldClassName}
                    {...form.register("email")}
                  />
                </label>
              </section>

              <BankTransferDetails />

              <section className="space-y-5 border-b border-stone-200 pb-8 dark:border-stone-800">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                  Resumen
                </p>
                <div className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                  <p>Opción: Stand 3x3</p>
                  <p>
                    Modalidad:{" "}
                    {paymentPlanType === "TWO_INSTALLMENTS"
                      ? "2 cuotas"
                      : paymentPlanType === "ONE_PAYMENT"
                        ? "1 pago"
                        : "-"}
                  </p>
                  <p>
                    Base:{" "}
                    {formatPublicRegistrationCurrency(
                      standOption?.baseAmount ?? 300000,
                    )}
                  </p>
                  <p>
                    Equipamiento:{" "}
                    {includesEquipment ? "Incluido" : "No incluido"}
                  </p>
                  <p>
                    Descuento:{" "}
                    {appliedDiscount?.email === watchedEmail
                      ? formatPublicRegistrationCurrency(
                          appliedDiscount.discountAmount,
                        )
                      : "Sin descuento"}
                  </p>
                  <p>
                    Total contratado:{" "}
                    <span className="font-semibold text-stone-950 dark:text-stone-100">
                      {formatPublicRegistrationCurrency(totalAmount)}
                    </span>
                  </p>
                  <p>
                    Importe de este envío:{" "}
                    <span className="font-semibold text-stone-950 dark:text-stone-100">
                      {formatPublicRegistrationCurrency(installmentAmount)}
                    </span>
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <input
                  id="receipt"
                  type="file"
                  accept="image/*,application/pdf"
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
                      ? "border-red-300 bg-red-50/40 dark:border-red-900 dark:bg-red-950/30"
                      : receiptFile
                        ? "border-stone-300 bg-stone-50/60 dark:border-stone-700 dark:bg-stone-950/60"
                        : "border-stone-300 bg-white hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-600"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <div
                        className={`mt-0.5 rounded-full p-2 ${receiptFile ? "bg-stone-900 text-white dark:bg-emerald-600" : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"}`}
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
                            : "Sube el comprobante"}
                        </p>
                        <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                          {receiptFile
                            ? receiptFile.name
                            : "Aceptamos imagen o PDF."}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200">
                      {receiptFile ? "Cambiar archivo" : "Seleccionar archivo"}
                    </span>
                  </div>
                  {receiptFile ? (
                    <div className="mt-4 flex items-center gap-2 border-t border-stone-200 pt-4 text-sm text-stone-600 dark:border-stone-800 dark:text-stone-400">
                      <FileText className="h-4 w-4 shrink-0" />
                      <span className="truncate">
                        Listo para enviarse con la solicitud del stand.
                      </span>
                    </div>
                  ) : null}
                </label>
              </section>

              <label className="block space-y-2">
                <Label htmlFor="notes">Observaciones</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  placeholder="Dato adicional para el comité organizador"
                  className={textareaClassName}
                  {...form.register("notes")}
                />
                <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                  El comprobante será revisado por el comité organizador.
                </p>
              </label>

              {submitError ? (
                <InlineNotice variant="error">{submitError}</InlineNotice>
              ) : null}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || pricingCatalogQuery.isLoading
                  }
                >
                  {createMutation.isPending
                    ? "Enviando..."
                    : "Enviar solicitud"}
                </Button>
              </div>
            </form>

            {successState ? (
              <section
                ref={successStateRef}
                className="mt-10 border-t border-stone-200 pt-10 dark:border-stone-800"
              >
                <CommercialSubmissionSuccessBlock result={successState} />
              </section>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
