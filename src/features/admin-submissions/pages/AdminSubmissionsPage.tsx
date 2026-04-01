import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  AdminSubmissionsListQuery,
  PaymentPlanType,
  RegistrationOptionCode,
  RegistrationStatus,
} from "@/features/api/types";
import { getAllAdminSubmissionDetailsRequest } from "@/features/admin-submissions/admin-submissions.api";
import { downloadAdminSubmissionsExcel } from "@/features/admin-submissions/admin-submissions.export";
import { AdminSubmissionCompactTable } from "@/features/admin-submissions/components/AdminSubmissionCompactTable";
import { AdminSubmissionFilters } from "@/features/admin-submissions/components/AdminSubmissionFilters";
import { AdminSubmissionsPagination } from "@/features/admin-submissions/components/AdminSubmissionsPagination";
import { useAdminSubmissionsQuery } from "@/features/admin-submissions/admin-submissions.hooks";
import { ADMIN_SUBMISSIONS_PAGE_SIZE } from "@/features/admin-submissions/admin-submissions.constants";
import {
  formatArsCurrency,
  getRegistrationStatusAppearance,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";
import { FeedbackPanel } from "@/shared/ui/FeedbackPanel";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return parsedValue;
}

export function AdminSubmissionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState("");

  const filters: AdminSubmissionsListQuery = {
    page: parsePositiveInt(searchParams.get("page"), 1),
    pageSize: parsePositiveInt(
      searchParams.get("pageSize"),
      ADMIN_SUBMISSIONS_PAGE_SIZE,
    ),
    status:
      (searchParams.get("status") as RegistrationStatus | null) || undefined,
    registrationOptionCode:
      (searchParams.get(
        "registrationOptionCode",
      ) as RegistrationOptionCode | null) || undefined,
    paymentPlanType:
      (searchParams.get("paymentPlanType") as PaymentPlanType | null) ||
      undefined,
    hasDiscountCoupon:
      (searchParams.get("hasDiscountCoupon") as "true" | null) || undefined,
  };

  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminSubmissionsQuery(filters);

  const totalsByStatus = {
    PENDING_REVIEW:
      data?.items.filter((item) => item.status === "PENDING_REVIEW").length ??
      0,
    PARTIALLY_PAID:
      data?.items.filter((item) => item.status === "PARTIALLY_PAID").length ??
      0,
    FULLY_PAID:
      data?.items.filter((item) => item.status === "FULLY_PAID").length ?? 0,
    REJECTED:
      data?.items.filter((item) => item.status === "REJECTED").length ?? 0,
  };
  const completedRevenue =
    data?.items
      .filter((item) => item.status === "FULLY_PAID")
      .reduce((total, item) => total + item.totalAmountExpected, 0) ?? 0;
  const nonRejectedRevenue =
    data?.items
      .filter((item) => item.status !== "REJECTED")
      .reduce((total, item) => total + item.totalAmountExpected, 0) ?? 0;

  const updateSearchParams = (
    updates: Partial<Record<string, string | null>>,
    resetPage = false,
  ) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        nextParams.delete(key);
        return;
      }

      nextParams.set(key, value);
    });

    if (resetPage) {
      nextParams.set("page", "1");
    }

    setSearchParams(nextParams);
  };

  const handleReset = () => {
    setSearchParams({
      page: "1",
      pageSize: String(ADMIN_SUBMISSIONS_PAGE_SIZE),
    });
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setExportError(null);
      setLiveMessage("Iniciando exportacion completa de solicitudes.");

      const submissions = await getAllAdminSubmissionDetailsRequest();

      downloadAdminSubmissionsExcel(submissions);
      setLiveMessage(
        `Exportacion completada. Se descargaron ${submissions.length} solicitudes.`,
      );
    } catch (exportActionError) {
      setExportError(
        getUserFacingErrorMessage(
          exportActionError,
          "No pudimos generar el archivo Excel.",
        ),
      );
      setLiveMessage("La exportacion fallo.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <nav
        aria-label="Accesos rapidos del panel admin"
        className="sr-only focus-within:not-sr-only"
      >
        <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 shadow-sm">
          <a className="mr-4 underline" href="#admin-filters-section">
            Saltar a filtros
          </a>
          <a className="mr-4 underline" href="#admin-results-section">
            Saltar a resultados
          </a>
          <a className="underline" href="#admin-export-button">
            Saltar a exportacion
          </a>
        </div>
      </nav>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
        {isLoading
          ? "Cargando inscripciones."
          : isFetching
            ? "Actualizando resultados."
            : data?.meta
              ? `${data.meta.total} solicitudes disponibles.`
              : ""}
      </div>

      <section
        aria-labelledby="admin-dashboard-heading"
        className="overflow-hidden rounded-[32px] border border-stone-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(240,253,250,0.96))] p-6 shadow-[0_28px_90px_-52px_rgba(15,23,42,0.45)]"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Panel de solicitudes
            </p>
            <h1
              id="admin-dashboard-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-stone-950"
            >
              Administra inscripciones en vista compacta
            </h1>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              El listado prioriza velocidad de revision, navegacion por teclado
              y acceso rapido al detalle de cada solicitud.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              id="admin-export-button"
              type="button"
              variant="outline"
              className="border-stone-300 bg-white/90 text-stone-800"
              onClick={() => void handleExport()}
              disabled={isExporting}
            >
              {isExporting ? "Generando Excel..." : "Descargar Excel completo"}
            </Button>
            <Badge className="border-stone-200 bg-white/90 px-3 py-1 text-stone-700 hover:bg-white/90 hover:text-stone-700">
              {isFetching ? "Actualizando resultados" : "Panel sincronizado"}
            </Badge>
            <Badge className="border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-800">
              {data?.meta?.total ?? 0} solicitudes
            </Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {(
            [
              ["PENDING_REVIEW", totalsByStatus.PENDING_REVIEW],
              ["PARTIALLY_PAID", totalsByStatus.PARTIALLY_PAID],
              ["FULLY_PAID", totalsByStatus.FULLY_PAID],
              ["REJECTED", totalsByStatus.REJECTED],
            ] as Array<[RegistrationStatus, number]>
          ).map(([status, total]) => {
            const appearance = getRegistrationStatusAppearance(status);

            return (
              <div
                key={status}
                className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${appearance.dotClassName}`}
                  />
                  <Badge className={appearance.badgeClassName}>
                    {getRegistrationStatusLabel(status)}
                  </Badge>
                </div>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
                  {total}
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  solicitudes en esta pagina
                </p>
              </div>
            );
          })}

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-emerald-500"
              />
              <Badge className="border-emerald-200 bg-white/80 text-emerald-900 ring-1 ring-emerald-100 hover:bg-white/80 hover:text-emerald-900">
                Recaudacion
              </Badge>
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
              {formatArsCurrency(completedRevenue)}
            </p>
            <p className="mt-1 text-sm text-stone-500">
              acumulado (solo aprobadas)
            </p>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-sky-50/80 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-sky-500"
              />
              <Badge className="border-sky-200 bg-white/80 text-sky-900 ring-1 ring-sky-100 hover:bg-white/80 hover:text-sky-900">
                No rechazadas
              </Badge>
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
              {formatArsCurrency(nonRejectedRevenue)}
            </p>
            <p className="mt-1 text-sm text-stone-500">
              total visible excepto rechazadas
            </p>
          </div>
        </div>
      </section>

      <div id="admin-filters-section">
        <AdminSubmissionFilters
          status={filters.status ?? ""}
          registrationOptionCode={filters.registrationOptionCode ?? ""}
          paymentPlanType={filters.paymentPlanType ?? ""}
          hasDiscountCoupon={filters.hasDiscountCoupon ?? ""}
          onStatusChange={(value) =>
            updateSearchParams({ status: value || null }, true)
          }
          onRegistrationOptionChange={(value) =>
            updateSearchParams({ registrationOptionCode: value || null }, true)
          }
          onPaymentPlanChange={(value) =>
            updateSearchParams({ paymentPlanType: value || null }, true)
          }
          onDiscountCouponChange={(value) =>
            updateSearchParams({ hasDiscountCoupon: value || null }, true)
          }
          onReset={handleReset}
        />
      </div>

      {exportError ? (
        <FeedbackPanel
          variant="error"
          title="No pudimos exportar el Excel"
          description={exportError}
          role="alert"
          ariaLive="assertive"
        />
      ) : null}

      {isLoading ? (
        <FeedbackPanel
          variant="loading"
          title="Cargando inscripciones"
          description="Estamos consultando el panel para mostrar las ultimas cargas."
          role="status"
          ariaLive="polite"
          titleId="admin-loading-title"
        />
      ) : null}

      {isError ? (
        <FeedbackPanel
          variant="error"
          title="No pudimos cargar el listado"
          description={getUserFacingErrorMessage(
            error,
            "Vuelve a intentarlo en unos segundos.",
          )}
          actionLabel="Reintentar"
          onAction={() => void refetch()}
          role="alert"
          ariaLive="assertive"
          titleId="admin-list-error-title"
        />
      ) : null}

      {!isLoading && !isError && data?.items.length === 0 ? (
        <FeedbackPanel
          variant="empty"
          title="Sin resultados"
          description="No hay inscripciones para los filtros actuales. Prueba limpiar filtros o cambiar el estado buscado."
          role="status"
          ariaLive="polite"
          titleId="admin-empty-title"
        />
      ) : null}

      {!isLoading && !isError && data?.items.length ? (
        <section
          id="admin-results-section"
          aria-labelledby="admin-results-heading"
        >
          <h2 id="admin-results-heading" className="sr-only">
            Resultados de solicitudes
          </h2>

          <div className="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white/75 px-4 py-3 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {isFetching
                ? "Actualizando resultados..."
                : "Listado listo para revision"}
            </p>
            <p>
              Pagina {data.meta?.page ?? 1} de {data.meta?.totalPages ?? 1} /{" "}
              {data.meta?.total ?? 0} resultados
            </p>
          </div>

          <AdminSubmissionCompactTable submissions={data.items} />

          {data.meta ? (
            <AdminSubmissionsPagination
              meta={data.meta}
              onPageChange={(page) =>
                updateSearchParams({ page: String(page) }, false)
              }
            />
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
