import type {
  AdminSubmissionDetailDto,
  AdminSubmissionDetailReceiptDto,
} from "@/features/api/types";
import {
  getPaymentPlanLabel,
  getReceiptStatusLabel,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";

type SpreadsheetCellValue = number | string;

type SpreadsheetRow = Record<string, SpreadsheetCellValue>;

function escapeSpreadsheetValue(value: SpreadsheetCellValue) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getSpreadsheetCellType(value: SpreadsheetCellValue) {
  return typeof value === "number" && Number.isFinite(value)
    ? "Number"
    : "String";
}

function formatExportDate(value: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function buildSubmissionRow(
  submission: AdminSubmissionDetailDto,
): SpreadsheetRow {
  const approvedReceiptsCount = submission.receipts.filter(
    (receipt) => receipt.status === "APPROVED",
  ).length;

  return {
    "ID solicitud": submission.id,
    "Fecha creacion": formatExportDate(submission.createdAt),
    "Fecha actualizacion": formatExportDate(submission.updatedAt),
    "Fecha revision": formatExportDate(submission.reviewedAt),
    Estado: getRegistrationStatusLabel(submission.status),
    "Codigo estado": submission.status,
    Nombre: submission.firstName,
    Apellido: submission.lastName,
    DNI: submission.dni,
    Email: submission.email,
    Telefono: submission.phone,
    "Opcion inscripcion": submission.registrationOptionLabelSnapshot,
    "Codigo opcion": submission.registrationOptionCode,
    Moneda: submission.currencyCode,
    "Base original": submission.baseAmountExpected ?? "",
    "Descuento porcentaje": submission.discountAppliedPercentage ?? "",
    "Descuento monto": submission.discountAppliedAmount ?? "",
    "Cupon descuento": submission.discountCouponCode ?? "",
    "Email descuento": submission.discountEligibleEmailNormalized ?? "",
    "Total esperado": submission.totalAmountExpected,
    "Cuotas habilitadas": submission.installmentsAllowed ? "Si" : "No",
    "Plan de pago": getPaymentPlanLabel(submission.paymentPlanType),
    "Codigo plan de pago": submission.paymentPlanType,
    "Cantidad cuotas esperadas": submission.installmentCountExpected,
    "Importe por cuota": submission.installmentAmountExpected ?? "",
    "Vencimiento cuota 2": formatExportDate(submission.secondInstallmentDueAt),
    "Cuota 2 vencida": submission.secondInstallmentExpired ? "Si" : "No",
    "Cantidad comprobantes enviados": submission.receipts.length,
    "Cantidad comprobantes aprobados": approvedReceiptsCount,
    "Nota publica": submission.notes ?? "",
    "Nota interna": submission.internalNote ?? "",
    "Admin revisor ID": submission.reviewedByAdmin?.id ?? "",
    "Admin revisor email": submission.reviewedByAdmin?.email ?? "",
  };
}

function buildReceiptRows(
  submission: AdminSubmissionDetailDto,
): SpreadsheetRow[] {
  if (submission.receipts.length === 0) {
    return [
      {
        "ID solicitud": submission.id,
        "Nombre completo": `${submission.firstName} ${submission.lastName}`,
        Email: submission.email,
        DNI: submission.dni,
        "Cuota numero": "",
        "Monto informado": "",
        "Fecha pago": "",
        "Estado comprobante": "",
        "Codigo estado comprobante": "",
        "Motivo rechazo": "",
        "Fecha revision": "",
        "Admin revisor": "",
        "URL comprobante": "",
        Archivo: "",
        "Mime type": "",
        "Tamano bytes": "",
      },
    ];
  }

  return submission.receipts.map(
    (receipt: AdminSubmissionDetailReceiptDto): SpreadsheetRow => ({
      "ID solicitud": submission.id,
      "Nombre completo": `${submission.firstName} ${submission.lastName}`,
      Email: submission.email,
      DNI: submission.dni,
      "Cuota numero": receipt.installmentNumber,
      "Monto informado": receipt.amountReported,
      "Fecha pago": formatExportDate(receipt.paymentDate),
      "Estado comprobante": getReceiptStatusLabel(receipt.status),
      "Codigo estado comprobante": receipt.status,
      "Motivo rechazo": receipt.rejectionReason ?? "",
      "Fecha revision": formatExportDate(receipt.reviewedAt),
      "Admin revisor": receipt.reviewedByAdminEmail ?? "",
      "URL comprobante": receipt.receiptUrl,
      Archivo: receipt.receiptOriginalFilename ?? "",
      "Mime type": receipt.receiptMimeType ?? "",
      "Tamano bytes": receipt.receiptSizeBytes ?? "",
    }),
  );
}

function buildWorksheetXml(sheetName: string, rows: SpreadsheetRow[]) {
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
  const allRows = [
    headers,
    ...rows.map((row) => headers.map((header) => row[header] ?? "")),
  ];

  const rowsXml = allRows
    .map((row, rowIndex) => {
      const cellsXml = row
        .map((value) => {
          const cellValue = value ?? "";
          const styleId = rowIndex === 0 ? ' ss:StyleID="Header"' : "";

          return `<Cell${styleId}><Data ss:Type="${getSpreadsheetCellType(
            cellValue,
          )}">${escapeSpreadsheetValue(cellValue)}</Data></Cell>`;
        })
        .join("");

      return `<Row>${cellsXml}</Row>`;
    })
    .join("");

  return `<Worksheet ss:Name="${escapeSpreadsheetValue(
    sheetName,
  )}"><Table>${rowsXml}</Table></Worksheet>`;
}

function buildWorkbookXml(
  submissions: AdminSubmissionDetailDto[],
  exportedAt: string,
) {
  const submissionRows = submissions.map(buildSubmissionRow);
  const receiptRows = submissions.flatMap(buildReceiptRows);
  const summaryRows: SpreadsheetRow[] = [
    { Campo: "Exportado en", Valor: exportedAt },
    { Campo: "Total solicitudes", Valor: submissions.length },
    {
      Campo: "Total comprobantes",
      Valor: submissions.reduce(
        (total, submission) => total + submission.receipts.length,
        0,
      ),
    },
  ];

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Styles>
    <Style ss:ID="Header">
      <Font ss:Bold="1" />
      <Interior ss:Color="#DFF5EC" ss:Pattern="Solid" />
    </Style>
  </Styles>
  ${buildWorksheetXml("Resumen", summaryRows)}
  ${buildWorksheetXml("Solicitudes", submissionRows)}
  ${buildWorksheetXml("Comprobantes", receiptRows)}
</Workbook>`;
}

function buildExportFilename() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `solicitudes-admin-${year}_${month}_${day}-${hours}_${minutes}.xls`;
}

export function downloadAdminSubmissionsExcel(
  submissions: AdminSubmissionDetailDto[],
) {
  const exportedAt = formatExportDate(new Date().toISOString());
  const workbookXml = buildWorkbookXml(submissions, exportedAt);
  const blob = new Blob([workbookXml], {
    type: "application/vnd.ms-excel;charset=utf-8;",
  });
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = downloadUrl;
  anchor.download = buildExportFilename();
  anchor.click();

  URL.revokeObjectURL(downloadUrl);
}
