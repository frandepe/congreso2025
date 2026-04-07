import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { Check, FileText, Loader, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InlineNotice } from "@/shared/ui/InlineNotice";
import { useBackendWarmup } from "@/shared/api/useBackendWarmup";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";
import type { PublicSubmissionStatusDto } from "@/features/api/types";
import {
  useCreatePublicAdditionalReceiptMutation,
  usePublicSubmissionStatusMutation,
  useRecoverPublicTrackingCodeMutation,
} from "@/features/public-registration/public-registration.hooks";
import {
  formatPublicRegistrationCurrency,
  getCurrentSubmissionDate,
} from "@/features/public-registration/public-registration.utils";
import { BankTransferDetails } from "@/features/public-registration/components/BankTransferDetails";
import {
  formatAdminDate,
  getReceiptStatusLabel,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";

const secondInstallmentSchema = z.object({
  registrationId: z.string().trim().min(1, "Ingresa tu código de seguimiento."),
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

type SecondInstallmentFormValues = z.infer<typeof secondInstallmentSchema>;

function buildAdditionalReceiptFormData(
  values: SecondInstallmentFormValues,
  amountReported: number,
) {
  if (!values.receipt) {
    throw new Error("Falta el recibo");
  }

  const formData = new FormData();
  formData.append("installmentNumber", "2");
  formData.append("amountReported", String(amountReported));
  formData.append("paymentDate", getCurrentSubmissionDate());
  formData.append("receipt", values.receipt);

  return formData;
}

export function PublicSecondInstallmentPage() {
  useBackendWarmup();

  const contactEmail = "congresonacionalrcp@gmail.com";
  const contactWhatsapp = "2392-460227";
  const [searchParams] = useSearchParams();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submissionData, setSubmissionData] =
    useState<PublicSubmissionStatusDto | null>(null);
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState<string | null>(null);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);

  const createReceiptMutation = useCreatePublicAdditionalReceiptMutation();
  const statusMutation = usePublicSubmissionStatusMutation();
  const recoverTrackingCodeMutation = useRecoverPublicTrackingCodeMutation();
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const submitResponseRef = useRef<HTMLDivElement | null>(null);

  const form = useForm<SecondInstallmentFormValues>({
    resolver: zodResolver(secondInstallmentSchema),
    defaultValues: {
      registrationId: searchParams.get("trackingCode") ?? "",
      receipt: null,
    },
  });

  const receiptFile = form.watch("receipt");
  const fieldClassName =
    "h-12 rounded-md border-stone-300 px-4 text-sm shadow-none";

  const fixedAmount = submissionData
    ? (submissionData.installmentAmountExpected ??
      submissionData.registrationOption.totalAmountExpected / 2)
    : 0;
  const secondInstallmentExpired =
    submissionData?.secondInstallmentExpired ?? false;

  useEffect(() => {
    if (!submissionData) {
      return;
    }

    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [submissionData]);

  useEffect(() => {
    if (!submitError && !successMessage) {
      return;
    }

    submitResponseRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [submitError, successMessage]);

  useEffect(() => {
    const trackingCode = searchParams.get("trackingCode")?.trim();

    if (!trackingCode) {
      return;
    }

    form.setValue("registrationId", trackingCode, {
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [form, searchParams]);

  const handleLookup = async () => {
    setLookupError(null);
    setSuccessMessage(null);
    setSubmitError(null);

    const registrationId = form.getValues("registrationId").trim();

    if (!registrationId) {
      void form.trigger("registrationId");
      return;
    }

    try {
      const response = await statusMutation.mutateAsync(registrationId);
      const data = response.data;

      if (data.paymentPlanType !== "TWO_INSTALLMENTS") {
        setSubmissionData(null);
        setLookupError(
          "Este código corresponde a una inscripción que no admite segunda cuota.",
        );
        return;
      }

      if (data.submittedReceiptsCount >= data.installmentCountExpected) {
        setSubmissionData(data);
        setLookupError(
          "Esta inscripción ya tiene todas sus cuotas informadas.",
        );
        return;
      }

      if (data.secondInstallmentExpired) {
        setSubmissionData(data);
        setLookupError(
          `Se venció el plazo para informar la segunda cuota. Comunicate a ${contactEmail} o por WhatsApp al ${contactWhatsapp}.`,
        );
        return;
      }

      setSubmissionData(data);
      form.setValue("registrationId", data.trackingCode, {
        shouldDirty: true,
      });
    } catch (error) {
      setSubmissionData(null);
      setLookupError(
        getUserFacingErrorMessage(
          error,
          "No se pudo consultar el estado de la inscripción.",
        ),
      );
    }
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

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    setSuccessMessage(null);

    if (!submissionData) {
      setSubmitError("Primero consulta un código de seguimiento válido.");
      return;
    }

    if (submissionData.secondInstallmentExpired) {
      setSubmitError(
        `Se venció el plazo para informar la segunda cuota. Comunicate a ${contactEmail} o por WhatsApp al ${contactWhatsapp}.`,
      );
      return;
    }

    try {
      const formData = buildAdditionalReceiptFormData(values, fixedAmount);
      const response = await createReceiptMutation.mutateAsync({
        registrationId: submissionData.trackingCode,
        formData,
      });

      setSuccessMessage(response.data.message);
      setSubmissionData((current) =>
        current
          ? {
              ...current,
              submittedReceiptsCount: current.submittedReceiptsCount + 1,
              pendingReceiptsCount: current.pendingReceiptsCount + 1,
              secondInstallmentUploadAllowed: false,
              updatedAt: new Date().toISOString(),
              receipts: [
                ...current.receipts,
                {
                  installmentNumber: 2,
                  status: response.data.receipt.status,
                  createdAt: response.data.createdAt,
                },
              ],
            }
          : current,
      );
      form.reset({
        registrationId: submissionData.trackingCode,
        receipt: null,
      });
    } catch (error) {
      setSubmitError(
        getUserFacingErrorMessage(
          error,
          "No se pudo enviar la segunda cuota. Intenta nuevamente.",
        ),
      );
    }
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <section className="mx-auto max-w-[88rem] px-8 py-20 sm:px-10 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
          <div className="space-y-10 lg:sticky lg:top-10">
            <div className="space-y-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Segunda cuota
              </p>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                  Segunda cuota para inscripciones en 2 pagos
                </h1>
                <p className="max-w-xl text-base leading-7 text-stone-600">
                  Consultá el código de seguimiento, verificá el importe fijo de
                  la cuota 2 y adjuntá el comprobante de transferencia.
                </p>
              </div>
            </div>

            <div className="max-w-xl border-t border-stone-200 pt-8">
              <p className="text-sm leading-7 text-stone-600">
                Esta pantalla es solo para inscripciones que eligieron modalidad
                de pago en 2 cuotas.
              </p>
            </div>

            <div className="max-w-xl space-y-4 border-t border-stone-200 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                Antes de enviar
              </p>
              <ul className="space-y-3 text-sm leading-6 text-stone-700">
                <li>
                  1 - Usa el código de seguimiento recibido en la inscripción
                  inicial.
                </li>
                <li>
                  2 - El monto se calcula automáticamente según tu inscripción.
                </li>
                <li>
                  3 - Adjuntá solo el comprobante correspondiente a la cuota 2.
                </li>
              </ul>
              <Link
                to="/inscripcion"
                className="inline-flex text-sm font-medium text-emerald-700 underline-offset-4 hover:underline"
              >
                Necesitas hacer la inscripción inicial?
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-7 py-9 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)] sm:px-10 sm:py-10 lg:px-12">
            <div className="mt-2 max-w-2xl space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight text-stone-950">
                Consultá el código y cargá el comprobante
              </h2>
              <p className="text-sm leading-7 text-stone-600">
                Primero validamos la inscripción. Cuando el código corresponde a
                un plan en 2 cuotas, mostramos el resumen fijo del envío y
                habilitamos la carga del archivo.
              </p>
            </div>

            <FormProvider {...form}>
              <form className="mt-12 space-y-10" onSubmit={onSubmit}>
                <section className="space-y-5 border-b border-stone-200 pb-8">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                      Código de seguimiento
                    </p>
                    <Label htmlFor="registrationId">
                      Consultar inscripción
                    </Label>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="registrationId"
                      placeholder="Ej. RCP-CMN7-1GB6-M000-E4TW-2IME-RXR2"
                      className={fieldClassName}
                      {...form.register("registrationId")}
                    />
                    <Button
                      type="button"
                      onClick={() => void handleLookup()}
                      disabled={statusMutation.isPending}
                    >
                      {statusMutation.isPending
                        ? "Consultando..."
                        : "Consultar"}
                    </Button>
                  </div>

                  {form.formState.errors.registrationId ? (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.registrationId.message}
                    </p>
                  ) : null}

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setShowRecoveryForm((current) => !current);
                        setRecoveryError(null);
                        setRecoveryMessage(null);
                      }}
                      className="font-medium text-emerald-700 underline-offset-4 hover:underline"
                    >
                      No tengo mi código
                    </button>
                    <p className="text-stone-500">
                      Podés recuperarlo por email si tu inscripción está
                      registrada.
                    </p>
                  </div>

                  {showRecoveryForm ? (
                    <div className="space-y-4 rounded-lg border border-stone-200 bg-stone-50 px-4 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-stone-900">
                          Recuperar código por email
                        </p>
                        <p className="text-sm leading-6 text-stone-600">
                          Ingresá el email que usaste al inscribirte. Si
                          encontramos una inscripción válida, te enviaremos el
                          código por correo.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Input
                          type="email"
                          value={recoveryEmail}
                          onChange={(event) =>
                            setRecoveryEmail(event.target.value)
                          }
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
                        <InlineNotice variant="error">
                          {recoveryError}
                        </InlineNotice>
                      ) : null}

                      {recoveryMessage ? (
                        <InlineNotice variant="success">
                          {recoveryMessage}
                        </InlineNotice>
                      ) : null}
                    </div>
                  ) : null}

                  {lookupError ? (
                    <InlineNotice variant="error">{lookupError}</InlineNotice>
                  ) : null}
                </section>

                {submissionData ? (
                  <div
                    ref={resultsRef}
                    className="mx-auto max-w-[720px] space-y-10"
                  >
                    {secondInstallmentExpired ? (
                      <InlineNotice variant="error">
                        <div className="space-y-3">
                          <p className="font-medium text-stone-900">
                            Se venció el plazo para informar la segunda cuota.
                          </p>
                          {submissionData.secondInstallmentDueAt ? (
                            <p className="text-sm leading-6">
                              {`Fecha límite: ${formatAdminDate(
                                submissionData.secondInstallmentDueAt,
                              )}.`}
                            </p>
                          ) : null}
                          <p className="text-sm leading-6">
                            Comunicate a{" "}
                            <a
                              href={`mailto:${contactEmail}`}
                              className="font-medium underline-offset-4 hover:underline"
                            >
                              {contactEmail}
                            </a>{" "}
                            o por WhatsApp al{" "}
                            <a
                              href="https://wa.me/542392460227"
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium underline-offset-4 hover:underline"
                            >
                              {contactWhatsapp}
                            </a>
                            .
                          </p>
                        </div>
                      </InlineNotice>
                    ) : null}

                    <BankTransferDetails />

                    <section className="space-y-5 border-b border-stone-200 pb-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                        Resumen
                      </p>
                      <dl className="space-y-5">
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                            Código de seguimiento
                          </dt>
                          <dd className="text-base font-medium text-stone-950">
                            {submissionData.trackingCode}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                            Inscripción
                          </dt>
                          <dd className="text-base font-medium text-stone-950">
                            {submissionData.registrationOption.label}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                            Estado actual
                          </dt>
                          <dd className="text-base font-medium text-stone-950">
                            {getRegistrationStatusLabel(submissionData.status)}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                            Cuota a informar
                          </dt>
                          <dd className="text-base font-medium text-stone-950">
                            Cuota 2 de 2
                          </dd>
                        </div>
                        {submissionData.secondInstallmentDueAt ? (
                          <div className="space-y-1">
                            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                              Fecha límite
                            </dt>
                            <dd className="text-base font-medium text-stone-950">
                              {formatAdminDate(
                                submissionData.secondInstallmentDueAt,
                              )}
                            </dd>
                          </div>
                        ) : null}
                        <div className="space-y-2 pt-2">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                            Monto fijo
                          </dt>
                          <dd className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-[2.15rem]">
                            {formatPublicRegistrationCurrency(fixedAmount)}
                          </dd>
                          <p className="text-sm leading-6 text-stone-600">
                            Importe definido por el backend para la segunda
                            cuota de esta inscripción.
                          </p>
                        </div>
                      </dl>
                    </section>

                    <section className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                          Comprobante
                        </p>
                        <p className="text-base font-medium text-stone-950">
                          Subí el comprobante de la cuota 2
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
                              Listo para enviarse con la segunda cuota.
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
                        El comprobante será revisado por el comité organizador.
                      </p>
                    </section>

                    <section className="space-y-4 border-t border-stone-200 pt-8">
                      <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                          Estado previo
                        </p>
                        {submissionData.receipts.map((receipt) => (
                          <div
                            key={`${receipt.installmentNumber}-${receipt.createdAt}`}
                            className="flex items-center justify-between gap-4 text-sm"
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
                    </section>
                  </div>
                ) : null}

                {submitError || successMessage ? (
                  <div ref={submitResponseRef} className="space-y-3">
                    {submitError ? (
                      <InlineNotice variant="error">{submitError}</InlineNotice>
                    ) : null}

                    {successMessage ? (
                      <InlineNotice variant="success">
                        {successMessage}
                      </InlineNotice>
                    ) : null}
                  </div>
                ) : null}

                <div className="mx-auto max-w-[720px] border-t border-stone-200 pt-8 sm:pt-10">
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      to="/inscripcion/participantes"
                      className="inline-flex rounded-md border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400"
                    >
                      Volver
                    </Link>

                    <Button
                      type="submit"
                      disabled={
                        !submissionData ||
                        createReceiptMutation.isPending ||
                        secondInstallmentExpired
                      }
                      className="rounded-md bg-stone-900 px-6 text-white hover:bg-stone-800"
                    >
                      {createReceiptMutation.isPending ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar comprobante"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </section>
    </div>
  );
}
