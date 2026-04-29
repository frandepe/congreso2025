import type {
  AdminCommercialSubmissionDetailDto,
  AdminCommercialSubmissionDetailReceiptDto,
} from "../api/types";
import {
  formatAdminDate,
  getReceiptStatusLabel,
  getRegistrationStatusLabel,
} from "../admin-submissions/admin-submissions.utils";
import {
  getCommercialKindLabel,
  getCommercialOptionLabel,
} from "./admin-commercial-submissions.utils";

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

function buildSubmissionRow(
  submission: AdminCommercialSubmissionDetailDto,
): SpreadsheetRow {
  return {
    "ID solicitud": submission.id,
    "Fecha creacion": formatAdminDate(submission.createdAt),
    "Fecha actualizacion": formatAdminDate(submission.updatedAt),
    "Fecha revision": formatAdminDate(submission.reviewedAt),
    Estado: getRegistrationStatusLabel(submission.status),
    "Codigo estado": submission.status,
    Tipo: getCommercialKindLabel(submission.commercialKind),
    "Codigo tipo": submission.commercialKind,
    Opcion: getCommercialOptionLabel(submission.commercialOptionCode),
    "Codigo opcion": submission.commercialOptionCode,
    Empresa: submission.companyName,
    "Nombre contacto": submission.contactFirstName,
    "Apellido contacto": submission.contactLastName,
    Email: submission.email,
    Telefono: submission.phone,
    "Web o red social": submission.websiteOrSocialUrl ?? "",
    Moneda: submission.currencyCode,
    "Base original": submission.baseAmountExpected,
    "Descuento monto": submission.discountAppliedAmount ?? "",
    "Cupon descuento": submission.discountCouponCode ?? "",
    "Email descuento": submission.discountEligibleEmailNormalized ?? "",
    "Total esperado": submission.totalAmountExpected,
    "Modalidad pago": submission.paymentPlanType === "TWO_INSTALLMENTS" ? "2 cuotas" : "1 pago",
    "Cantidad cuotas": submission.installmentCountExpected,
    "Importe cuota": submission.installmentAmountExpected ?? "",
    "Vencimiento cuota 2": formatAdminDate(submission.secondInstallmentDueAt),
    "Nota publica": submission.notes ?? "",
    "Nota interna": submission.internalNote ?? "",
    "Admin revisor ID": submission.reviewedByAdmin?.id ?? "",
    "Admin revisor email": submission.reviewedByAdmin?.email ?? "",
  };
}

function buildReceiptRow(
  submission: AdminCommercialSubmissionDetailDto,
  receipt: AdminCommercialSubmissionDetailReceiptDto,
): SpreadsheetRow {
  return {
    "ID solicitud": submission.id,
    Cuota: receipt.installmentNumber,
    Empresa: submission.companyName,
    Email: submission.email,
    "Monto informado": receipt.amountReported,
    "Fecha pago": formatAdminDate(receipt.paymentDate),
    "Estado comprobante": getReceiptStatusLabel(receipt.status),
    "Codigo estado comprobante": receipt.status,
    "Motivo rechazo": receipt.rejectionReason ?? "",
    "Fecha revision": formatAdminDate(receipt.reviewedAt),
    "Admin revisor": receipt.reviewedByAdminEmail ?? "",
    "URL comprobante": receipt.receiptUrl,
    Archivo: receipt.receiptOriginalFilename ?? "",
    "Mime type": receipt.receiptMimeType ?? "",
    "Tamano bytes": receipt.receiptSizeBytes ?? "",
  };
}

function buildReceiptRows(
  submission: AdminCommercialSubmissionDetailDto,
): SpreadsheetRow[] {
  const receipts = submission.receipts;

  if (receipts.length === 0) {
    return [
      {
        "ID solicitud": submission.id,
        Cuota: "",
        Empresa: submission.companyName,
        Email: submission.email,
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

  return receipts.map((receipt) => buildReceiptRow(submission, receipt));
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

  return `<Worksheet ss:Name="${escapeSpreadsheetValue(sheetName)}"><Table>${rowsXml}</Table></Worksheet>`;
}

export function buildAdminCommercialWorkbookXml(
  submissions: AdminCommercialSubmissionDetailDto[],
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
