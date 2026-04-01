import { Button } from "@/components/ui/button";
import {
  paymentPlanOptions,
  registrationOptionOptions,
  registrationStatusOptions,
} from "@/features/admin-submissions/admin-submissions.constants";

type AdminSubmissionFiltersProps = {
  status: string;
  registrationOptionCode: string;
  paymentPlanType: string;
  hasDiscountCoupon: string;
  onStatusChange: (value: string) => void;
  onRegistrationOptionChange: (value: string) => void;
  onPaymentPlanChange: (value: string) => void;
  onDiscountCouponChange: (value: string) => void;
  onReset: () => void;
};

const selectClassName =
  "h-11 w-full rounded-2xl border border-stone-200 bg-white/90 px-4 text-sm text-stone-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

export function AdminSubmissionFilters({
  status,
  registrationOptionCode,
  paymentPlanType,
  hasDiscountCoupon,
  onStatusChange,
  onRegistrationOptionChange,
  onPaymentPlanChange,
  onDiscountCouponChange,
  onReset,
}: AdminSubmissionFiltersProps) {
  const activeFilters = [
    status
      ? `Estado: ${
          registrationStatusOptions.find((option) => option.value === status)
            ?.label ?? status
        }`
      : null,
    registrationOptionCode
      ? `Inscripcion: ${
          registrationOptionOptions.find(
            (option) => option.value === registrationOptionCode,
          )?.label ?? registrationOptionCode
        }`
      : null,
    paymentPlanType
      ? `Pago: ${
          paymentPlanOptions.find((option) => option.value === paymentPlanType)
            ?.label ?? paymentPlanType
        }`
      : null,
    hasDiscountCoupon === "true" ? "Descuento: Con cupon" : null,
  ].filter((filter): filter is string => Boolean(filter));

  return (
    <section className="overflow-hidden rounded-[28px] border border-stone-200 bg-white/90 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Filtros
          </p>
          <h2 className="mt-1 text-lg font-semibold text-stone-950">
            Revisar inscripciones
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Ajusta el panel para encontrar rapido los casos que requieren accion.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="border-stone-300 bg-white"
          onClick={onReset}
        >
          Limpiar
        </Button>
      </div>

      {activeFilters.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
            >
              {filter}
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-stone-200 bg-stone-50/80 px-4 py-3 text-sm text-stone-500">
          No hay filtros activos. Estas viendo todas las solicitudes.
        </div>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Estado</span>
          <select
            className={selectClassName}
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="">Todos</option>
            {registrationStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Inscripcion</span>
          <select
            className={selectClassName}
            value={registrationOptionCode}
            onChange={(event) => onRegistrationOptionChange(event.target.value)}
          >
            <option value="">Todas</option>
            {registrationOptionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">
            Modalidad de pago
          </span>
          <select
            className={selectClassName}
            value={paymentPlanType}
            onChange={(event) => onPaymentPlanChange(event.target.value)}
          >
            <option value="">Todas</option>
            {paymentPlanOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Descuento</span>
          <select
            className={selectClassName}
            value={hasDiscountCoupon}
            onChange={(event) => onDiscountCouponChange(event.target.value)}
          >
            <option value="">Todas</option>
            <option value="true">Con cupon</option>
          </select>
        </label>
      </div>
    </section>
  );
}
