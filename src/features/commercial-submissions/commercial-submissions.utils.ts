import type { CommercialSubmissionFormValues } from "@/features/commercial-submissions/commercial-submissions.types";

export function normalizeCommercialWebsiteOrSocialUrl(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (/^[a-z][a-z\d+\-.]*:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

export function buildCommercialSubmissionFormData(
  values: CommercialSubmissionFormValues,
  options?: {
    discountCouponCode?: string;
  },
) {
  const formData = new FormData();

  if (!values.receipt) {
    throw new Error("Falta el recibo");
  }

  formData.append("companyName", values.companyName);
  formData.append("contactFirstName", values.contactFirstName);
  formData.append("contactLastName", values.contactLastName);
  formData.append("email", values.email);
  formData.append("phone", values.phone);

  if (values.websiteOrSocialUrl) {
    formData.append(
      "websiteOrSocialUrl",
      normalizeCommercialWebsiteOrSocialUrl(values.websiteOrSocialUrl),
    );
  }

  formData.append("commercialKind", values.commercialKind);
  formData.append("commercialOptionCode", values.commercialOptionCode);
  formData.append("paymentPlanType", values.paymentPlanType);
  formData.append("installmentNumber", "1");
  formData.append("includesEquipment", String(values.includesEquipment));
  formData.append("amountReported", String(values.amountReported));

  if (options?.discountCouponCode) {
    formData.append("discountCouponCode", options.discountCouponCode);
  }

  if (values.paymentDate) {
    formData.append("paymentDate", values.paymentDate);
  }

  if (values.notes) {
    formData.append("notes", values.notes);
  }

  formData.append("receipt", values.receipt);

  return formData;
}

const COMMERCIAL_TRACKING_CODE_PREFIX = "COM";

export function normalizeCommercialTrackingCode(value: string) {
  const sanitized = value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  if (!sanitized) {
    return "";
  }

  const withoutPrefix = sanitized.startsWith(COMMERCIAL_TRACKING_CODE_PREFIX)
    ? sanitized.slice(COMMERCIAL_TRACKING_CODE_PREFIX.length)
    : sanitized;

  return withoutPrefix.toLowerCase();
}

export function buildCommercialAdditionalReceiptFormData(
  receipt: File,
  amountReported: number,
  paymentDate: string,
) {
  const formData = new FormData();

  formData.append("installmentNumber", "2");
  formData.append("amountReported", String(amountReported));
  formData.append("paymentDate", paymentDate);
  formData.append("receipt", receipt);

  return formData;
}
