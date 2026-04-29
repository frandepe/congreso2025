import { Button } from "@/components/ui/button";
import {
  commercialKindOptions,
  commercialOptionOptions,
  commercialStatusOptions,
} from "@/features/admin-commercial-submissions/admin-commercial-submissions.constants";

type Props = {
  status: string;
  commercialKind: string;
  commercialOptionCode: string;
  hasDiscountCoupon: string;
  onStatusChange: (value: string) => void;
  onCommercialKindChange: (value: string) => void;
  onCommercialOptionChange: (value: string) => void;
  onDiscountCouponChange: (value: string) => void;
  onReset: () => void;
};

const selectClassName =
  "h-11 w-full rounded-2xl border border-stone-200 bg-white/90 px-4 text-sm text-stone-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

export function AdminCommercialSubmissionFilters({
  status,
  commercialKind,
  commercialOptionCode,
  hasDiscountCoupon,
  onStatusChange,
  onCommercialKindChange,
  onCommercialOptionChange,
  onDiscountCouponChange,
  onReset,
}: Props) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-stone-200 bg-white/90 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Filtros
          </p>
          <h2 className="mt-1 text-lg font-semibold text-stone-950">
            Revisar solicitudes comerciales
          </h2>
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

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Estado</span>
          <select className={selectClassName} value={status} onChange={(event) => onStatusChange(event.target.value)}>
            <option value="">Todos</option>
            {commercialStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Tipo</span>
          <select className={selectClassName} value={commercialKind} onChange={(event) => onCommercialKindChange(event.target.value)}>
            <option value="">Todos</option>
            {commercialKindOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Opcion</span>
          <select className={selectClassName} value={commercialOptionCode} onChange={(event) => onCommercialOptionChange(event.target.value)}>
            <option value="">Todas</option>
            {commercialOptionOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Descuento</span>
          <select className={selectClassName} value={hasDiscountCoupon} onChange={(event) => onDiscountCouponChange(event.target.value)}>
            <option value="">Todas</option>
            <option value="true">Con cupon</option>
          </select>
        </label>
      </div>
    </section>
  );
}
