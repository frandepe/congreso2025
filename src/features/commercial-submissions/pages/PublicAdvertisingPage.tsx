import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Check, FileText, Loader, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import type {
  CommercialOptionCode,
  CommercialSubmissionCreatedDto,
} from "@/features/api/types";
import {
  useCommercialPricingCatalogQuery,
  useCommercialSubmissionStatusMutation,
  useCreateCommercialSubmissionMutation,
} from "@/features/commercial-submissions/commercial-submissions.hooks";
import {
  buildCommercialSubmissionFormData,
  normalizeCommercialWebsiteOrSocialUrl,
} from "@/features/commercial-submissions/commercial-submissions.utils";
import { CommercialSubmissionSuccessBlock } from "@/features/commercial-submissions/components/CommercialSubmissionSuccessState";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";
import { getCommercialAdvertisingOptionDescription } from "@/features/commercial-submissions/commercial-submissions.constants";
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
  websiteOrSocialUrl: z
    .string()
    .trim()
    .min(
      1,
      "Ingresá la web de la empresa o, si no tiene, Facebook o Instagram.",
    )
    .refine((value) => {
      try {
        new URL(normalizeCommercialWebsiteOrSocialUrl(value));
        return true;
      } catch {
        return false;
      }
    }, "Ingresá una web o red social válida."),
  commercialKind: z.literal("ADVERTISING"),
  paymentPlanType: z.enum(["ONE_PAYMENT", "TWO_INSTALLMENTS"], {
    message: "Selecciona una modalidad.",
  }),
  commercialOptionCode: z
    .string()
    .min(1, "Seleccioná una opción de publicidad."),
  includesEquipment: z.boolean(),
  amountReported: z.number().positive(),
  paymentDate: z.string().min(1, "Ingresá la fecha de pago."),
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

type FormValues = z.infer<typeof schema>;

const fieldClassName =
  "h-12 rounded-md border-stone-300 px-4 text-sm shadow-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500";
const textareaClassName =
  "min-h-[120px] rounded-md border-stone-300 px-4 py-3 text-sm shadow-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500";

export function PublicAdvertisingPage() {
  useBackendWarmup();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successState, setSuccessState] =
    useState<CommercialSubmissionCreatedDto | null>(null);
  const [trackingCodeInput, setTrackingCodeInput] = useState("");
  const [lookupError, setLookupError] = useState<string | null>(null);
  const successStateRef = useRef<HTMLElement | null>(null);
  const statusResultRef = useRef<HTMLDivElement | null>(null);
  const pricingCatalogQuery = useCommercialPricingCatalogQuery();
  const statusMutation = useCommercialSubmissionStatusMutation();
  const createMutation = useCreateCommercialSubmissionMutation();
  const advertisingOptions = pricingCatalogQuery.data?.advertisingOptions ?? [];

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "",
      contactFirstName: "",
      contactLastName: "",
      email: "",
      phone: "",
      websiteOrSocialUrl: "",
      commercialKind: "ADVERTISING",
      paymentPlanType: "ONE_PAYMENT",
      commercialOptionCode: "",
      includesEquipment: false,
      amountReported: 0,
      paymentDate: getCurrentSubmissionDate(),
      notes: "",
      receipt: null,
    },
  });

  const selectedOptionCode = form.watch("commercialOptionCode");
  const paymentPlanType = form.watch("paymentPlanType");
  const receiptFile = form.watch("receipt");
  const selectedOption = advertisingOptions.find(
    (option) => option.code === selectedOptionCode,
  );
  const selectedPaymentPlans = useMemo(
    () => selectedOption?.paymentPlans ?? [],
    [selectedOption],
  );

  const totalAmount = useMemo(
    () => selectedOption?.totalAmount ?? 0,
    [selectedOption],
  );

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
    if (!selectedOption || selectedPaymentPlans.length === 0) {
      return;
    }

    if (selectedPaymentPlans.some((plan) => plan.type === paymentPlanType)) {
      return;
    }

    form.setValue("paymentPlanType", selectedPaymentPlans[0].type, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [form, paymentPlanType, selectedOption, selectedPaymentPlans]);

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

      if (result.commercial.kind !== "ADVERTISING") {
        setLookupError(
          "Este código no corresponde a una solicitud de publicidad.",
        );
      }
    } catch (error) {
      setLookupError(
        getUserFacingErrorMessage(
          error,
          "No se pudo consultar el estado de la solicitud de publicidad.",
        ),
      );
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const response = await createMutation.mutateAsync(
        buildCommercialSubmissionFormData({
          ...values,
          commercialOptionCode:
            values.commercialOptionCode as CommercialOptionCode,
          paymentDate: getCurrentSubmissionDate(),
        }),
      );
      setSuccessState(response.data);
    } catch (error) {
      setSubmitError(
        getUserFacingErrorMessage(
          error,
          "No se pudo enviar la solicitud de publicidad.",
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
                Publicidad
              </p>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl dark:text-stone-100">
                  Contratá una opción publicitaria para el congreso
                </h1>
                <p className="max-w-xl text-base leading-7 text-stone-600 dark:text-stone-400">
                  Elegí el formato de presencia de marca, realizá la
                  transferencia y subí el comprobante para revisión.
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t border-stone-200 pt-8 text-sm text-stone-700 dark:border-stone-800 dark:text-stone-300">
              <p className="rounded-2xl bg-white px-4 py-3 dark:bg-stone-900 dark:text-stone-200">
                Las publicidades no admiten cupón de descuento.
              </p>
              <p className="rounded-2xl bg-white px-4 py-3 dark:bg-stone-900 dark:text-stone-200">
                Cada opción tiene valor fijo y modalidad de pago configurable.
              </p>
            </div>

            <section className="space-y-5 border-t border-stone-200 pt-8 dark:border-stone-800">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                  Seguimiento
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-100">
                  Consultar estado de la publicidad
                </h2>
                <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
                  Ingresá tu código de seguimiento para ver el estado actual de
                  la solicitud y del comprobante enviado.
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
                    "No se pudo consultar el estado de la solicitud de publicidad.",
                  )}
                </InlineNotice>
              ) : null}

              {statusMutation.data?.data &&
              statusMutation.data.data.commercial.kind === "ADVERTISING" ? (
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
                            Comprobante {receipt.installmentNumber}
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
                  Seleccioná el formato
                </h2>
                {pricingCatalogQuery.isLoading ? (
                  <p className="flex items-center gap-2 rounded-lg border border-stone-300 p-2 text-sm text-stone-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-400">
                    <Loader className="animate-spin" /> Cargando opciones y
                    precios, esto puede demorar algunos segundos...
                  </p>
                ) : null}
                {advertisingOptions.map((option) => (
                  <RegistrationOptionCard
                    key={option.code}
                    title={option.label}
                    price={formatPublicRegistrationCurrency(option.totalAmount)}
                    description={getCommercialAdvertisingOptionDescription(
                      option,
                    )}
                    selected={selectedOptionCode === option.code}
                    onSelect={() =>
                      form.setValue("commercialOptionCode", option.code, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                  />
                ))}
                {form.formState.errors.commercialOptionCode ? (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.commercialOptionCode.message}
                  </p>
                ) : null}
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
                {!selectedOption ? (
                  <InlineNotice variant="info">
                    Selecciona una opcion de publicidad para ver las modalidades
                    disponibles.
                  </InlineNotice>
                ) : null}
                {selectedPaymentPlans.map((plan) => (
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
                <label className="space-y-2 md:col-span-2">
                  <Label htmlFor="websiteOrSocialUrl">
                    Sitio web o red social
                  </Label>
                  <Input
                    id="websiteOrSocialUrl"
                    type="text"
                    inputMode="url"
                    placeholder="www.tuempresa.com o www.instagram.com/tuempresa"
                    className={fieldClassName}
                    {...form.register("websiteOrSocialUrl")}
                  />
                  <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                    Ingresá la web de la empresa. Si no tiene, colocá el enlace
                    de Facebook o Instagram.
                  </p>
                </label>
              </section>

              <BankTransferDetails />

              <section className="space-y-5 border-b border-stone-200 pb-8 dark:border-stone-800">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                  Resumen
                </p>
                <div className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                  <p>Opción: {selectedOption?.label ?? "-"}</p>
                  <p>
                    Modalidad:{" "}
                    {paymentPlanType === "TWO_INSTALLMENTS"
                      ? "2 cuotas"
                      : paymentPlanType === "ONE_PAYMENT"
                        ? "1 pago"
                        : "-"}
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
                            : "Aceptamos solo imágenes."}
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
                        Listo para enviarse con la solicitud de publicidad.
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
                  El comprobante será revisado por el comité organizador
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
