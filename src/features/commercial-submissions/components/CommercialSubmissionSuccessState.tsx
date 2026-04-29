import type { CommercialSubmissionSuccessState } from "@/features/commercial-submissions/commercial-submissions.types";
import { Link } from "react-router-dom";
import { formatAdminDate } from "@/features/admin-submissions/admin-submissions.utils";

type CommercialSubmissionSuccessBlockProps = {
  result: CommercialSubmissionSuccessState;
};

const getCommercialSecondInstallmentPath = (trackingCode: string) =>
  `/inscripcion/comercial/segunda-cuota?trackingCode=${encodeURIComponent(
    trackingCode,
  )}`;

export function CommercialSubmissionSuccessBlock({
  result,
}: CommercialSubmissionSuccessBlockProps) {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-6 py-7 shadow-[0_20px_50px_-36px_rgba(5,150,105,0.5)] sm:px-7 dark:border-emerald-900/70 dark:bg-emerald-950/25">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
        Solicitud enviada
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
        Recibimos tu comprobante
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700 dark:text-stone-300">
        {result.message}
      </p>

      <div className="mt-8 rounded-xl border border-emerald-200/80 bg-white/75 px-5 py-5 dark:border-emerald-900/60 dark:bg-stone-900/75">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
          Código de seguimiento
        </p>
        <p className="mt-2 text-2xl font-semibold text-stone-900 dark:text-stone-100">
          {result.trackingCode}
        </p>
      </div>

      <div className="mt-8 space-y-3 border-t border-emerald-200 pt-6 text-sm leading-6 text-stone-700 dark:border-emerald-900/60 dark:text-stone-300">
        <p>La solicitud queda pendiente de revisión manual por parte del comité organizador.</p>
        <p>
          {`Opcion contratada: ${result.commercial.label}. Total esperado: ${new Intl.NumberFormat(
            "es-AR",
            {
              style: "currency",
              currency: "ARS",
              maximumFractionDigits: 0,
            },
          ).format(result.commercial.totalAmountExpected)}.`}
        </p>
        <p>
          {`Modalidad: ${
            result.paymentPlanType === "TWO_INSTALLMENTS" ? "2 cuotas" : "1 pago"
          }.`}
        </p>
        {result.commercial.kind === "STAND" ? (
          <p>
            El equipamiento adicional para el stand se gestiona aparte.{" "}
            <Link
              to="/catalogos-livings"
              className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-300"
            >
              Ver opciones de livings y equipamiento
            </Link>
          </p>
        ) : null}
        {result.paymentPlanType === "TWO_INSTALLMENTS" ? (
          <>
            <p>
              {`Importe informado en esta carga: ${new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              }).format(result.installmentAmountExpected ?? result.commercial.totalAmountExpected / 2)}.`}
            </p>
            {result.secondInstallmentDueAt ? (
              <p>{`Fecha límite para informar la cuota 2: ${formatAdminDate(
                result.secondInstallmentDueAt,
              )}.`}</p>
            ) : null}
            <p>
              <Link
                to={getCommercialSecondInstallmentPath(result.trackingCode)}
                className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-300"
              >
                Ir a la página de segunda cuota comercial
              </Link>
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
