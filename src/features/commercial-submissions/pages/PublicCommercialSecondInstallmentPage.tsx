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
import type { PublicCommercialSubmissionStatusDto } from "@/features/api/types";
import {
  useCommercialSubmissionStatusMutation,
  useCreateCommercialAdditionalReceiptMutation,
  useRecoverCommercialTrackingCodeMutation,
} from "@/features/commercial-submissions/commercial-submissions.hooks";
import {
  buildCommercialAdditionalReceiptFormData,
} from "@/features/commercial-submissions/commercial-submissions.utils";
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

const schema = z.object({
  submissionId: z.string().trim().min(1, "Ingresá tu código de seguimiento."),
  receipt: z
    .custom<File | null>((value) => value instanceof File, {
      message: "Adjuntá el comprobante.",
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

const getCommercialKindLabel = (
  kind: PublicCommercialSubmissionStatusDto["commercial"]["kind"],
) => (kind === "STAND" ? "stand" : "publicidad");

const getCommercialSubmissionPath = (
  kind: PublicCommercialSubmissionStatusDto["commercial"]["kind"] | null,
) => (kind === "ADVERTISING" ? "/inscripcion/publicidad" : "/inscripcion/expositores");

export function PublicCommercialSecondInstallmentPage() {
  useBackendWarmup();

  const [searchParams] = useSearchParams();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submissionData, setSubmissionData] =
    useState<PublicCommercialSubmissionStatusDto | null>(null);
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState<string | null>(null);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const submitResponseRef = useRef<HTMLDivElement | null>(null);

  const createReceiptMutation = useCreateCommercialAdditionalReceiptMutation();
  const statusMutation = useCommercialSubmissionStatusMutation();
  const recoverTrackingCodeMutation = useRecoverCommercialTrackingCodeMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      submissionId: searchParams.get("trackingCode") ?? "",
      receipt: null,
    },
  });

  const receiptFile = form.watch("receipt");
  const fieldClassName =
    "h-12 rounded-md border-stone-300 px-4 text-sm shadow-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500";
  const fixedAmount = submissionData
    ? submissionData.installmentAmountExpected ??
      submissionData.commercial.totalAmountExpected / 2
    : 0;

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

  const handleLookup = async () => {
    setLookupError(null);
    setSuccessMessage(null);
    setSubmitError(null);

    const submissionId = form.getValues("submissionId").trim();

    if (!submissionId) {
      void form.trigger("submissionId");
      return;
    }

    try {
      const response = await statusMutation.mutateAsync(submissionId);
      const data = response.data;


      if (data.paymentPlanType !== "TWO_INSTALLMENTS") {
        setSubmissionData(null);
        setLookupError(
          "Este código corresponde a una solicitud comercial que no eligió 2 cuotas.",
        );
        return;
      }

      if (data.submittedReceiptsCount >= data.installmentCountExpected) {
        setSubmissionData(data);
        setLookupError(
          "Esta solicitud ya tiene todas sus cuotas informadas.",
        );
        return;
      }

      if (data.secondInstallmentExpired) {
        setSubmissionData(data);
        setLookupError(
          "Se venció el plazo para informar la segunda cuota de la solicitud comercial. Comunicate con el comité organizador.",
        );
        return;
      }

      setSubmissionData(data);
      form.setValue("submissionId", data.trackingCode, {
        shouldDirty: true,
      });
    } catch (error) {
      setSubmissionData(null);
      setLookupError(
        getUserFacingErrorMessage(
          error,
          "No se pudo consultar el estado de la solicitud comercial.",
        ),
      );
    }
  };

  const handleRecoverySubmit = async () => {
    setRecoveryError(null);
    setRecoveryMessage(null);

    const email = recoveryEmail.trim();

    if (!email) {
      setRecoveryError("Ingresá tu email.");
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
          "No se pudo enviar el correo de recuperación. Intentá nuevamente.",
        ),
      );
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    setSuccessMessage(null);

    if (!submissionData) {
      setSubmitError("Primero consultá un código de seguimiento válido.");
      return;
    }

    if (!values.receipt) {
      setSubmitError("Adjuntá el comprobante de la cuota 2.");
      return;
    }

    if (submissionData.secondInstallmentExpired) {
      setSubmitError(
        "Se venció el plazo para informar la segunda cuota de la solicitud comercial. Comunicate con el comité organizador.",
      );
      return;
    }

    try {
      const formData = buildCommercialAdditionalReceiptFormData(
        values.receipt,
        fixedAmount,
        getCurrentSubmissionDate(),
      );
      const response = await createReceiptMutation.mutateAsync({
        submissionId: submissionData.trackingCode,
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
        submissionId: submissionData.trackingCode,
        receipt: null,
      });
    } catch (error) {
      setSubmitError(
        getUserFacingErrorMessage(
          error,
          "No se pudo enviar la segunda cuota. Intentá nuevamente.",
        ),
      );
    }
  });

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <section className="mx-auto max-w-[88rem] px-8 py-20 sm:px-10 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
          <div className="space-y-10 lg:sticky lg:top-10">
            <div className="space-y-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700 dark:text-emerald-300">
                Comercial
              </p>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl dark:text-stone-100">
                  Segunda cuota comercial
                </h1>
                <p className="max-w-xl text-base leading-7 text-stone-600 dark:text-stone-400">
                  Consultá el código de seguimiento, verificá el importe fijo de
                  la cuota 2 y adjuntá el comprobante de transferencia.
                </p>
              </div>
            </div>

            <div className="max-w-xl space-y-4 border-t border-stone-200 pt-8 dark:border-stone-800">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                Antes de enviar
              </p>
              <ul className="space-y-3 text-sm leading-6 text-stone-700 dark:text-stone-300">
                <li>1 - Usá el código de seguimiento recibido al cargar la solicitud comercial.</li>
                <li>2 - El monto se calcula automáticamente según tu solicitud.</li>
                <li>3 - Adjuntá solo el comprobante correspondiente a la cuota 2.</li>
              </ul>
              <Link
                to={getCommercialSubmissionPath(submissionData?.commercial.kind ?? null)}
                className="inline-flex text-sm font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-300"
              >
                ¿Necesitás cargar la solicitud comercial inicial?
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-7 py-9 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)] sm:px-10 sm:py-10 lg:px-12 dark:border-stone-800 dark:bg-stone-900">
            <FormProvider {...form}>
              <form className="space-y-10" onSubmit={onSubmit}>
                <section className="space-y-5 border-b border-stone-200 pb-8 dark:border-stone-800">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                      Código de seguimiento
                    </p>
                    <Label htmlFor="submissionId">Consultar solicitud</Label>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="submissionId"
                      placeholder="Ej. COM-ABCD-EFGH-IJKL"
                      className={fieldClassName}
                      {...form.register("submissionId")}
                    />
                    <Button
                      type="button"
                      onClick={() => void handleLookup()}
                      disabled={statusMutation.isPending}
                    >
                      {statusMutation.isPending ? "Consultando..." : "Consultar"}
                    </Button>
                  </div>

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
                    <p className="text-stone-500 dark:text-stone-400">
                      Si es una solicitud de stand, podés recuperarlo por email.
                    </p>
                  </div>

                  {showRecoveryForm ? (
                    <div className="space-y-4 rounded-lg border border-stone-200 bg-stone-50 px-4 py-4 dark:border-stone-800 dark:bg-stone-950/60">
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
                        >
                          {recoverTrackingCodeMutation.isPending ? "Enviando..." : "Enviar email"}
                        </Button>
                      </div>
                      {recoveryError ? <InlineNotice variant="error">{recoveryError}</InlineNotice> : null}
                      {recoveryMessage ? <InlineNotice variant="success">{recoveryMessage}</InlineNotice> : null}
                    </div>
                  ) : null}

                  {lookupError ? <InlineNotice variant="error">{lookupError}</InlineNotice> : null}
                </section>

                {submissionData ? (
                  <div ref={resultsRef} className="space-y-10">
                    <BankTransferDetails />

                    <section className="space-y-5 border-b border-stone-200 pb-8 dark:border-stone-800">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                        Resumen
                      </p>
                      <dl className="space-y-5">
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                            Código de seguimiento
                          </dt>
                          <dd className="text-base font-medium text-stone-950 dark:text-stone-100">
                            {submissionData.trackingCode}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                            Solicitud
                          </dt>
                          <dd className="text-base font-medium text-stone-950 dark:text-stone-100">
                            {submissionData.commercial.label}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                            Tipo
                          </dt>
                          <dd className="text-base font-medium text-stone-950 dark:text-stone-100">
                            {getCommercialKindLabel(submissionData.commercial.kind)}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                            Empresa
                          </dt>
                          <dd className="text-base font-medium text-stone-950 dark:text-stone-100">
                            {submissionData.commercial.companyName}
                          </dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                            Estado actual
                          </dt>
                          <dd className="text-base font-medium text-stone-950 dark:text-stone-100">
                            {getRegistrationStatusLabel(submissionData.status)}
                          </dd>
                        </div>
                        {submissionData.secondInstallmentDueAt ? (
                          <div className="space-y-1">
                            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                              Fecha límite
                            </dt>
                            <dd className="text-base font-medium text-stone-950 dark:text-stone-100">
                              {formatAdminDate(submissionData.secondInstallmentDueAt)}
                            </dd>
                          </div>
                        ) : null}
                        <div className="space-y-2 pt-2">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                            Monto fijo
                          </dt>
                          <dd className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-[2.15rem] dark:text-stone-100">
                            {formatPublicRegistrationCurrency(fixedAmount)}
                          </dd>
                        </div>
                      </dl>
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
                            <div className={`mt-0.5 rounded-full p-2 ${receiptFile ? "bg-stone-900 text-white dark:bg-emerald-600" : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"}`}>
                              {receiptFile ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
                            </div>
                            <div className="min-w-0 space-y-1">
                              <p className="text-sm font-medium text-stone-950 dark:text-stone-100">
                                {receiptFile ? "Archivo cargado" : "Sube el comprobante"}
                              </p>
                              <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                                {receiptFile ? receiptFile.name : "Aceptamos imagen o PDF."}
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
                              Listo para enviarse con la segunda cuota.
                            </span>
                          </div>
                        ) : null}
                      </label>
                    </section>

                    <section className="space-y-4 border-t border-stone-200 pt-8 dark:border-stone-800">
                      <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                          Estado previo
                        </p>
                        {submissionData.receipts.map((receipt) => (
                          <div
                            key={`${receipt.installmentNumber}-${receipt.createdAt}`}
                            className="flex items-center justify-between gap-4 text-sm"
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
                    </section>
                  </div>
                ) : null}

                {submitError || successMessage ? (
                  <div ref={submitResponseRef} className="space-y-3">
                    {submitError ? <InlineNotice variant="error">{submitError}</InlineNotice> : null}
                    {successMessage ? <InlineNotice variant="success">{successMessage}</InlineNotice> : null}
                  </div>
                ) : null}

                <div className="border-t border-stone-200 pt-8 dark:border-stone-800">
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      to={getCommercialSubmissionPath(submissionData?.commercial.kind ?? null)}
                      className="inline-flex rounded-md border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-stone-600"
                    >
                      Volver
                    </Link>
                    <Button
                      type="submit"
                      disabled={
                        !submissionData ||
                        createReceiptMutation.isPending ||
                        submissionData.secondInstallmentExpired
                      }
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
