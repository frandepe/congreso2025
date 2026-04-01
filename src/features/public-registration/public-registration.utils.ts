import { defaultPublicRegistrationDraft } from "@/features/public-registration/public-registration.constants";
import type { PublicPricingOptionDto } from "@/features/api/types";
import type {
  PublicRegistrationDraft,
  PublicRegistrationFormValues,
} from "@/features/public-registration/public-registration.types";

export function formatPublicRegistrationCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

const TRACKING_CODE_PREFIX = "RCP";

export function normalizePublicTrackingCode(value: string) {
  const sanitized = value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  if (!sanitized) {
    return "";
  }

  const withoutPrefix = sanitized.startsWith(TRACKING_CODE_PREFIX)
    ? sanitized.slice(TRACKING_CODE_PREFIX.length)
    : sanitized;

  return withoutPrefix.toLowerCase();
}

export function formatPublicTrackingCode(registrationId: string) {
  const normalized = normalizePublicTrackingCode(registrationId);
  const chunks = normalized.toUpperCase().match(/.{1,4}/g) ?? [];

  return `${TRACKING_CODE_PREFIX}-${chunks.join("-")}`;
}

export function getPublicRegistrationOption(
  options: PublicPricingOptionDto[],
  code: string,
) {
  return options.find((option) => option.code === code);
}

export function getSuggestedInstallmentAmount(
  options: PublicPricingOptionDto[],
  registrationOptionCode: string,
  paymentPlanType: string,
) {
  const option = getPublicRegistrationOption(options, registrationOptionCode);

  if (!option) {
    return undefined;
  }

  return option.paymentPlans.find((plan) => plan.type === paymentPlanType)
    ?.baseInstallmentAmount;
}

export function readPublicRegistrationDraft(
  storageKey: string,
): PublicRegistrationDraft {
  if (typeof window === "undefined") {
    return defaultPublicRegistrationDraft;
  }

  const rawDraft = window.sessionStorage.getItem(storageKey);

  if (!rawDraft) {
    return defaultPublicRegistrationDraft;
  }

  try {
    const parsed = JSON.parse(rawDraft) as Partial<PublicRegistrationDraft>;

    return {
      ...defaultPublicRegistrationDraft,
      ...parsed,
    };
  } catch {
    return defaultPublicRegistrationDraft;
  }
}

export function persistPublicRegistrationDraft(
  storageKey: string,
  draft: PublicRegistrationDraft,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(storageKey, JSON.stringify(draft));
}

export function clearPublicRegistrationDraft(storageKey: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(storageKey);
}

export function toPublicRegistrationDraft(
  values: PublicRegistrationFormValues,
  step: PublicRegistrationDraft["step"],
): PublicRegistrationDraft {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    dni: values.dni,
    email: values.email,
    phone: values.phone,
    registrationOptionCode: values.registrationOptionCode,
    paymentPlanType: values.paymentPlanType,
    amountReported: values.amountReported,
    paymentDate: values.paymentDate,
    notes: values.notes,
    step,
  };
}

export function buildPublicSubmissionFormData(
  values: PublicRegistrationFormValues,
  options?: {
    discountCouponCode?: string;
  },
) {
  const formData = new FormData();

  if (!values.receipt) {
    throw new Error("Falta el recibo");
  }

  formData.append("firstName", values.firstName);
  formData.append("lastName", values.lastName);
  formData.append("dni", values.dni);
  formData.append("email", values.email);
  formData.append("phone", values.phone);
  formData.append("registrationOptionCode", values.registrationOptionCode);
  formData.append("paymentPlanType", values.paymentPlanType);
  formData.append("installmentNumber", "1");
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

export function getCurrentSubmissionDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
