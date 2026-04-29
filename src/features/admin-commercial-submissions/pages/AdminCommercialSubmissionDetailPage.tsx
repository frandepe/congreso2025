import { Link, useLocation, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeedbackPanel } from "@/shared/ui/FeedbackPanel";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";
import { useAdminCommercialSubmissionDetailQuery } from "@/features/admin-commercial-submissions/admin-commercial-submissions.hooks";
import {
  formatAdminDate,
  formatArsCurrency,
  getRegistrationStatusAppearance,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";
import {
  getCommercialKindLabel,
  getCommercialOptionLabel,
} from "@/features/admin-commercial-submissions/admin-commercial-submissions.utils";
import { AdminCommercialSubmissionReceiptCard } from "@/features/admin-commercial-submissions/components/AdminCommercialSubmissionReceiptCard";
import { AdminCommercialSubmissionReviewForm } from "@/features/admin-commercial-submissions/components/AdminCommercialSubmissionReviewForm";

export function AdminCommercialSubmissionDetailPage() {
  const { id = "" } = useParams();
  const location = useLocation();
  const backTarget =
    typeof location.state?.from === "string"
      ? location.state.from
      : "/admin/commercial";

  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminCommercialSubmissionDetailQuery(id);

  if (isLoading) {
    return (
      <FeedbackPanel
        variant="loading"
        title="Cargando detalle comercial"
        description="Estamos recuperando la solicitud comercial y su comprobante."
      />
    );
  }

  if (isError || !data) {
    return (
      <FeedbackPanel
        variant="error"
        title="No pudimos cargar el detalle"
        description={getUserFacingErrorMessage(
          error,
          "La solicitud comercial no esta disponible o hubo un problema al consultar el backend.",
        )}
      >
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => void refetch()}>
            Reintentar
          </Button>
          <Button asChild type="button" variant="outline">
            <Link to={backTarget}>Volver al listado</Link>
          </Button>
        </div>
      </FeedbackPanel>
    );
  }

  const statusAppearance = getRegistrationStatusAppearance(data.status);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button asChild type="button" variant="outline" className="border-stone-300 bg-white/70">
            <Link to={backTarget}>Volver al listado</Link>
          </Button>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Detalle comercial
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-stone-900">{data.companyName}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className={statusAppearance.badgeClassName}>
              {getRegistrationStatusLabel(data.status)}
            </Badge>
            <Badge className="border-stone-200 bg-white px-3 py-1 text-stone-700 hover:bg-white hover:text-stone-700">
              {getCommercialKindLabel(data.commercialKind)}
            </Badge>
            <Badge className="border-stone-200 bg-white px-3 py-1 text-stone-700 hover:bg-white hover:text-stone-700">
              {getCommercialOptionLabel(data.commercialOptionCode)}
            </Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-500">
          {isFetching ? "Actualizando detalle..." : "Detalle sincronizado"}
        </div>
      </header>

      <section className="overflow-hidden rounded-[30px] border border-stone-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.38)]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className={`rounded-2xl p-4 ${statusAppearance.softClassName}`}>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Estado</p>
            <p className="mt-1 font-medium text-stone-900">{getRegistrationStatusLabel(data.status)}</p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Tipo</p>
            <p className="mt-1 font-medium text-stone-900">{getCommercialKindLabel(data.commercialKind)}</p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Opcion</p>
            <p className="mt-1 font-medium text-stone-900">{getCommercialOptionLabel(data.commercialOptionCode)}</p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Total esperado</p>
            <p className="mt-1 font-medium text-stone-900">{formatArsCurrency(data.totalAmountExpected)}</p>
          </div>
        </div>

        <dl className="mt-6 grid gap-3 text-sm text-stone-700 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Empresa</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.companyName}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Contacto</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.contactFirstName} {data.contactLastName}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Email</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.email}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Telefono</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.phone}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3 md:col-span-2 xl:col-span-4">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Web o red social</dt>
            <dd className="mt-1 break-all font-medium text-stone-900">
              {data.websiteOrSocialUrl ?? "-"}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Creada</dt>
            <dd className="mt-1 font-medium text-stone-900">{formatAdminDate(data.createdAt)}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Actualizada</dt>
            <dd className="mt-1 font-medium text-stone-900">{formatAdminDate(data.updatedAt)}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Revisada</dt>
            <dd className="mt-1 font-medium text-stone-900">{formatAdminDate(data.reviewedAt)}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Revisor</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.reviewedByAdmin?.email ?? "-"}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-[30px] border border-stone-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
        <h2 className="text-xl font-semibold text-stone-900">Economia</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Base</p>
            <p className="mt-1 font-medium text-stone-900">{formatArsCurrency(data.baseAmountExpected)}</p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Descuento</p>
            <p className="mt-1 font-medium text-stone-900">{data.discountAppliedAmount !== null ? formatArsCurrency(data.discountAppliedAmount) : "Sin descuento"}</p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Total final</p>
            <p className="mt-1 font-medium text-stone-900">{formatArsCurrency(data.totalAmountExpected)}</p>
          </div>
        </div>

        {data.equipmentAdditionalAmount !== null || data.includesEquipment ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Registro histórico con equipamiento adicional:
            {" "}
            {data.equipmentAdditionalAmount !== null
              ? formatArsCurrency(data.equipmentAdditionalAmount)
              : "sin monto disponible"}.
          </div>
        ) : null}

        <dl className="mt-6 grid gap-3 text-sm text-stone-700 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Modalidad</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.paymentPlanType === "TWO_INSTALLMENTS" ? "2 cuotas" : "1 pago"}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Cantidad cuotas</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.installmentCountExpected}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Importe por cuota</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.installmentAmountExpected !== null ? formatArsCurrency(data.installmentAmountExpected) : "-"}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Vencimiento cuota 2</dt>
            <dd className="mt-1 font-medium text-stone-900">{formatAdminDate(data.secondInstallmentDueAt)}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Cupon</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.discountCouponCode ?? "-"}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Email descuento</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.discountEligibleEmailNormalized ?? "-"}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Moneda</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.currencyCode}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-[30px] border border-stone-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
        <h2 className="text-xl font-semibold text-stone-900">Notas</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-stone-500">Nota del solicitante</h3>
            <p className="mt-2 text-sm text-stone-700">{data.notes ?? "-"}</p>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-stone-500">Nota interna del comite</h3>
            <p className="mt-2 text-sm text-stone-700">{data.internalNote ?? "-"}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <AdminCommercialSubmissionReceiptCard receipts={data.receipts} />
        <AdminCommercialSubmissionReviewForm submission={data} />
      </div>
    </div>
  );
}
