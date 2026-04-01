import type { AdminCommercialSubmissionDetailDto } from "@/features/api/types";
import { buildAdminCommercialWorkbookXml } from "@/features/admin-commercial-submissions/admin-commercial-submissions.export-core";

export function downloadAdminCommercialSubmissionsExcel(
  submissions: AdminCommercialSubmissionDetailDto[],
) {
  const workbookXml = buildAdminCommercialWorkbookXml(
    submissions,
    new Date().toISOString().replace("T", " ").slice(0, 19),
  );
  const blob = new Blob([workbookXml], {
    type: "application/vnd.ms-excel;charset=utf-8;",
  });
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = downloadUrl;
  anchor.download = `solicitudes-comerciales-admin-${new Date()
    .toISOString()
    .slice(0, 16)
    .replaceAll(":", "_")}.xls`;
  anchor.click();

  URL.revokeObjectURL(downloadUrl);
}
