import { Link } from "react-router-dom";
import type { PublicRegistrationSuccessState } from "@/features/public-registration/public-registration.types";
import { formatAdminDate } from "@/features/admin-submissions/admin-submissions.utils";

type PublicRegistrationSuccessStateProps = {
  result: PublicRegistrationSuccessState;
};

export function PublicRegistrationSuccessBlock({
  result,
}: PublicRegistrationSuccessStateProps) {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-6 py-7 shadow-[0_20px_50px_-36px_rgba(5,150,105,0.5)] sm:px-7">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
        {"Inscripci\u00f3n enviada"}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900">
        Recibimos tu comprobante
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700">
        {result.message}
      </p>

      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-emerald-200/80 bg-white/75 px-5 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            {"C\u00f3digo de seguimiento"}
          </p>
          <p className="mt-2 text-2xl font-semibold text-stone-900">
            {result.trackingCode}
          </p>
        </div>

        {result.paymentPlanType === "TWO_INSTALLMENTS" ? (
          <Link
            to="/inscripcion/segunda-cuota"
            className="text-sm font-medium text-emerald-700 underline-offset-4 hover:underline"
          >
            {"Ir a la p\u00e1gina de segunda cuota"}
          </Link>
        ) : null}
      </div>

      <div className="mt-8 space-y-3 border-t border-emerald-200 pt-6 text-sm leading-6 text-stone-700">
        <p>
          {"Tu inscripci\u00f3n queda pendiente de revisi\u00f3n manual por parte del comit\u00e9 organizador."}
        </p>
        {result.paymentPlanType === "TWO_INSTALLMENTS" ? (
          <p>
            {"Elegiste pagar en 2 cuotas. Cuando completes la transferencia de la cuota restante podr\u00e1s cargarla desde la pantalla p\u00fablica de segunda cuota usando tu c\u00f3digo de seguimiento."}
          </p>
        ) : null}
        {result.paymentPlanType === "TWO_INSTALLMENTS" &&
        result.secondInstallmentDueAt ? (
          <p>
            {`Fecha límite para informar la segunda cuota: ${formatAdminDate(
              result.secondInstallmentDueAt,
            )}.`}
          </p>
        ) : null}
      </div>
    </section>
  );
}
