import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  AdminCommercialSubmissionsListQuery,
  CommercialKind,
  CommercialOptionCode,
  RegistrationStatus,
} from "@/features/api/types";
import {
  getAllAdminCommercialSubmissionDetailsRequest,
} from "@/features/admin-commercial-submissions/admin-commercial-submissions.api";
import { downloadAdminCommercialSubmissionsExcel } from "@/features/admin-commercial-submissions/admin-commercial-submissions.export";
import { useAdminCommercialSubmissionsQuery } from "@/features/admin-commercial-submissions/admin-commercial-submissions.hooks";
import { ADMIN_COMMERCIAL_SUBMISSIONS_PAGE_SIZE } from "@/features/admin-commercial-submissions/admin-commercial-submissions.constants";
import { AdminCommercialSubmissionCompactTable } from "@/features/admin-commercial-submissions/components/AdminCommercialSubmissionCompactTable";
import { AdminCommercialSubmissionFilters } from "@/features/admin-commercial-submissions/components/AdminCommercialSubmissionFilters";
import {
  formatArsCurrency,
  getRegistrationStatusAppearance,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";
import { FeedbackPanel } from "@/shared/ui/FeedbackPanel";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsedValue = Number.parseInt(value, 10);
  return Number.isNaN(parsedValue) || parsedValue <= 0 ? fallback : parsedValue;
}

export function AdminCommercialSubmissionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const filters: AdminCommercialSubmissionsListQuery = {
    page: parsePositiveInt(searchParams.get("page"), 1),
    pageSize: parsePositiveInt(searchParams.get("pageSize"), ADMIN_COMMERCIAL_SUBMISSIONS_PAGE_SIZE),
    status: (searchParams.get("status") as RegistrationStatus | null) || undefined,
    commercialKind: (searchParams.get("commercialKind") as CommercialKind | null) || undefined,
    commercialOptionCode:
      (searchParams.get("commercialOptionCode") as CommercialOptionCode | null) || undefined,
    hasDiscountCoupon:
      (searchParams.get("hasDiscountCoupon") as "true" | null) || undefined,
  };

  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminCommercialSubmissionsQuery(filters);

  const totalsByStatus = {
    PENDING_REVIEW:
      data?.items.filter((item) => item.status === "PENDING_REVIEW").length ?? 0,
    PARTIALLY_PAID:
      data?.items.filter((item) => item.status === "PARTIALLY_PAID").length ?? 0,
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

  const updateSearchParams = (updates: Partial<Record<string, string | null>>, resetPage = false) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) nextParams.delete(key);
      else nextParams.set(key, value);
    });
    if (resetPage) nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  const handleReset = () => {
    setSearchParams({
      page: "1",
      pageSize: String(ADMIN_COMMERCIAL_SUBMISSIONS_PAGE_SIZE),
    });
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setExportError(null);
      const submissions = await getAllAdminCommercialSubmissionDetailsRequest();
      downloadAdminCommercialSubmissionsExcel(submissions);
    } catch (exportActionError) {
      setExportError(
        getUserFacingErrorMessage(exportActionError, "No pudimos generar el archivo Excel."),
      );
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return <FeedbackPanel variant="loading" title="Cargando solicitudes comerciales" description="Estamos recuperando las solicitudes comerciales." />;
  }

  if (isError) {
    return (
      <FeedbackPanel
        variant="error"
        title="No pudimos cargar las solicitudes comerciales"
        description={getUserFacingErrorMessage(error, "Hubo un problema al consultar el backend.")}
      >
        <Button type="button" variant="outline" onClick={() => void refetch()}>
          Reintentar
        </Button>
      </FeedbackPanel>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-stone-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(240,253,250,0.96))] p-6 shadow-[0_28px_90px_-52px_rgba(15,23,42,0.45)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Panel comercial
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
              Administra stands y publicidades
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
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
              <div key={status} className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${appearance.dotClassName}`} />
                  <Badge className={appearance.badgeClassName}>
                    {getRegistrationStatusLabel(status)}
                  </Badge>
                </div>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">{total}</p>
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

      <AdminCommercialSubmissionFilters
        status={searchParams.get("status") ?? ""}
        commercialKind={searchParams.get("commercialKind") ?? ""}
        commercialOptionCode={searchParams.get("commercialOptionCode") ?? ""}
        hasDiscountCoupon={searchParams.get("hasDiscountCoupon") ?? ""}
        onStatusChange={(value) => updateSearchParams({ status: value || null }, true)}
        onCommercialKindChange={(value) => updateSearchParams({ commercialKind: value || null }, true)}
        onCommercialOptionChange={(value) => updateSearchParams({ commercialOptionCode: value || null }, true)}
        onDiscountCouponChange={(value) => updateSearchParams({ hasDiscountCoupon: value || null }, true)}
        onReset={handleReset}
      />

      {exportError ? (
        <FeedbackPanel variant="error" title="No pudimos exportar el Excel" description={exportError} />
      ) : null}

      <AdminCommercialSubmissionCompactTable submissions={data?.items ?? []} />
    </div>
  );
}
