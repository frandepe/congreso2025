import { Link, useLocation, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatAdminDate,
  formatArsCurrency,
  getPaymentPlanLabel,
  getRegistrationStatusAppearance,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";
import { useAdminSubmissionDetailQuery } from "@/features/admin-submissions/admin-submissions.hooks";
import { AdminSubmissionReviewForm } from "@/features/admin-submissions/components/AdminSubmissionReviewForm";
import { AdminSubmissionReceiptList } from "@/features/admin-submissions/components/AdminSubmissionReceiptList";
import { FeedbackPanel } from "@/shared/ui/FeedbackPanel";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";

export function AdminSubmissionDetailPage() {
  const { id = "" } = useParams();
  const location = useLocation();
  const backTarget =
    typeof location.state?.from === "string" ? location.state.from : "/admin";

  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminSubmissionDetailQuery(id);

  if (isLoading) {
    return (
      <FeedbackPanel
        variant="loading"
        title="Cargando detalle"
        description="Estamos recuperando la inscripcion y sus comprobantes."
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
          "La inscripcion no esta disponible o hubo un problema al consultar el backend.",
        )}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => void refetch()}
          >
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
      <nav
        aria-label="Accesos rapidos del detalle"
        className="sr-only focus-within:not-sr-only"
      >
        <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 shadow-sm">
          <a className="mr-4 underline" href="#admin-submission-summary">
            Saltar a resumen
          </a>
          <a className="mr-4 underline" href="#admin-notes-heading">
            Saltar a notas
          </a>
          <a className="mr-4 underline" href="#admin-receipts-heading">
            Saltar a comprobantes
          </a>
          <a className="underline" href="#admin-review-heading">
            Saltar a revision
          </a>
        </div>
      </nav>

      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button
            asChild
            type="button"
            variant="outline"
            className="border-stone-300 bg-white/70"
          >
            <Link to={backTarget}>Volver al listado</Link>
          </Button>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Detalle admin
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-stone-900">
            {data.firstName} {data.lastName}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className={statusAppearance.badgeClassName}>
              <span
                aria-hidden="true"
                className={`mr-2 inline-block h-2 w-2 rounded-full ${statusAppearance.dotClassName}`}
              />
              {getRegistrationStatusLabel(data.status)}
            </Badge>
            <Badge className="border-stone-200 bg-white px-3 py-1 text-stone-700 hover:bg-white hover:text-stone-700">
              {getPaymentPlanLabel(data.paymentPlanType)}
            </Badge>
            <Badge className="border-stone-200 bg-white px-3 py-1 text-stone-700 hover:bg-white hover:text-stone-700">
              {data.installmentCountExpected} cuotas esperadas
            </Badge>
            {data.discountCouponCode ? (
              <Badge className="border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-800">
                Descuento aplicado
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-500">
          {isFetching ? "Actualizando detalle..." : "Detalle sincronizado"}
        </div>
      </header>

      <section
        id="admin-submission-summary"
        aria-labelledby="admin-submission-summary-heading"
        className="overflow-hidden rounded-[30px] border border-stone-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.38)]"
      >
        <h2 id="admin-submission-summary-heading" className="sr-only">
          Resumen de la solicitud
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className={`rounded-2xl p-4 ${statusAppearance.softClassName}`}>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Estado
            </p>
            <p className="mt-1 font-medium text-stone-900">
              {getRegistrationStatusLabel(data.status)}
            </p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Opcion
            </p>
            <p className="mt-1 font-medium text-stone-900">
              {data.registrationOptionLabelSnapshot}
            </p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Modalidad
            </p>
            <p className="mt-1 font-medium text-stone-900">
              {getPaymentPlanLabel(data.paymentPlanType)}
            </p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Total esperado
            </p>
            <p className="mt-1 font-medium text-stone-900">
              {formatArsCurrency(data.totalAmountExpected)}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-3 text-sm text-stone-700 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              DNI
            </dt>
            <dd className="mt-1 font-medium text-stone-900">{data.dni}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Email
            </dt>
            <dd className="mt-1 font-medium text-stone-900">{data.email}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Telefono
            </dt>
            <dd className="mt-1 font-medium text-stone-900">{data.phone}</dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Moneda
            </dt>
            <dd className="mt-1 font-medium text-stone-900">
              {data.currencyCode}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Creada
            </dt>
            <dd className="mt-1 font-medium text-stone-900">
              {formatAdminDate(data.createdAt)}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Actualizada
            </dt>
            <dd className="mt-1 font-medium text-stone-900">
              {formatAdminDate(data.updatedAt)}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Revisada
            </dt>
            <dd className="mt-1 font-medium text-stone-900">
              {formatAdminDate(data.reviewedAt)}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Revisor
            </dt>
            <dd className="mt-1 font-medium text-stone-900">
              {data.reviewedByAdmin?.email ?? "-"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-[30px] border border-stone-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
        <h2 className="text-xl font-semibold text-stone-900">
          Economia y cuotas
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Base original
            </p>
            <p className="mt-1 font-medium text-stone-900">
              {data.baseAmountExpected !== null
                ? formatArsCurrency(data.baseAmountExpected)
                : "-"}
            </p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Descuento
            </p>
            <p className="mt-1 font-medium text-stone-900">
              {data.discountAppliedPercentage && data.discountAppliedAmount !== null
                ? `${data.discountAppliedPercentage}% (${formatArsCurrency(
                    data.discountAppliedAmount,
                  )})`
                : "Sin descuento"}
            </p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Cupón usado
            </p>
            <p className="mt-1 font-medium text-stone-900">
              {data.discountCouponCode ?? "-"}
            </p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Importe por cuota
            </p>
            <p className="mt-1 font-medium text-stone-900">
              {data.installmentAmountExpected !== null
                ? formatArsCurrency(data.installmentAmountExpected)
                : "-"}
            </p>
          </div>
          <div
            className={`rounded-2xl p-4 ${
              data.secondInstallmentExpired
                ? "bg-red-50"
                : "bg-stone-50"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Estado cuota 2
            </p>
            <p className="mt-1 font-medium text-stone-900">
              {data.paymentPlanType !== "TWO_INSTALLMENTS"
                ? "No aplica"
                : data.secondInstallmentExpired
                  ? "Vencida"
                  : "Vigente o ya enviada"}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-3 text-sm text-stone-700 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Email descuento
            </dt>
            <dd className="mt-1 font-medium text-stone-900">
              {data.discountEligibleEmailNormalized ?? "-"}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Cuotas habilitadas
            </dt>
            <dd className="mt-1 font-medium text-stone-900">
              {data.installmentsAllowed ? "Si" : "No"}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Vencimiento cuota 2
            </dt>
            <dd className="mt-1 font-medium text-stone-900">
              {formatAdminDate(data.secondInstallmentDueAt)}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Total final
            </dt>
            <dd className="mt-1 font-medium text-stone-900">
              {formatArsCurrency(data.totalAmountExpected)}
            </dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="admin-notes-heading"
        className="rounded-[30px] border border-stone-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]"
      >
        <h2 id="admin-notes-heading" className="text-xl font-semibold text-stone-900">
          Notas
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Nota del participante
            </h3>
            <p className="mt-2 text-sm text-stone-700">{data.notes ?? "-"}</p>
          </div>

          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Nota interna del comite
            </h3>
            <p className="mt-2 text-sm text-stone-700">
              {data.internalNote ?? "-"}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <AdminSubmissionReceiptList receipts={data.receipts} />
        <AdminSubmissionReviewForm submission={data} />
      </div>
    </div>
  );
}
