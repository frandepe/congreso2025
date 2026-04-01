import type {
  PaymentReceiptStatus,
  PaymentPlanType,
  RegistrationStatus,
} from "@/features/api/types";

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "short",
  timeStyle: "short",
});

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatAdminDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return dateFormatter.format(new Date(value));
}

export function formatArsCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function getRegistrationStatusLabel(status: RegistrationStatus) {
  switch (status) {
    case "PENDING_REVIEW":
      return "Pendiente";
    case "PARTIALLY_PAID":
      return "Parcial";
    case "FULLY_PAID":
      return "Completa";
    case "REJECTED":
      return "Rechazada";
    default:
      return status;
  }
}

export function getReceiptStatusLabel(status: PaymentReceiptStatus) {
  switch (status) {
    case "PENDING_REVIEW":
      return "Pendiente";
    case "APPROVED":
      return "Aprobado";
    case "REJECTED":
      return "Rechazado";
    default:
      return status;
  }
}

export function getPaymentPlanLabel(paymentPlanType: PaymentPlanType) {
  switch (paymentPlanType) {
    case "ONE_PAYMENT":
      return "1 pago";
    case "TWO_INSTALLMENTS":
      return "2 cuotas";
    default:
      return paymentPlanType;
  }
}

type StatusAppearance = {
  badgeClassName: string;
  dotClassName: string;
  softClassName: string;
  accentClassName: string;
};

export function getRegistrationStatusAppearance(
  status: RegistrationStatus,
): StatusAppearance {
  switch (status) {
    case "PENDING_REVIEW":
      return {
        badgeClassName:
          "border-amber-200 bg-amber-50 text-amber-900 ring-1 ring-amber-100 hover:bg-amber-50 hover:text-amber-900",
        dotClassName: "bg-amber-500",
        softClassName: "bg-amber-50 text-amber-900",
        accentClassName: "from-amber-500/20 via-amber-100/60 to-transparent",
      };
    case "PARTIALLY_PAID":
      return {
        badgeClassName:
          "border-sky-200 bg-sky-50 text-sky-900 ring-1 ring-sky-100 hover:bg-sky-50 hover:text-sky-900",
        dotClassName: "bg-sky-500",
        softClassName: "bg-sky-50 text-sky-900",
        accentClassName: "from-sky-500/20 via-sky-100/60 to-transparent",
      };
    case "FULLY_PAID":
      return {
        badgeClassName:
          "border-emerald-200 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100 hover:bg-emerald-50 hover:text-emerald-900",
        dotClassName: "bg-emerald-500",
        softClassName: "bg-emerald-50 text-emerald-900",
        accentClassName:
          "from-emerald-500/20 via-emerald-100/60 to-transparent",
      };
    case "REJECTED":
      return {
        badgeClassName:
          "border-rose-200 bg-rose-50 text-rose-900 ring-1 ring-rose-100 hover:bg-rose-50 hover:text-rose-900",
        dotClassName: "bg-rose-500",
        softClassName: "bg-rose-50 text-rose-900",
        accentClassName: "from-rose-500/20 via-rose-100/60 to-transparent",
      };
    default:
      return {
        badgeClassName:
          "border-stone-200 bg-stone-50 text-stone-800 ring-1 ring-stone-100 hover:bg-stone-50 hover:text-stone-800",
        dotClassName: "bg-stone-400",
        softClassName: "bg-stone-50 text-stone-800",
        accentClassName: "from-stone-400/20 via-stone-100/60 to-transparent",
      };
  }
}

export function getReceiptStatusAppearance(
  status: PaymentReceiptStatus,
): StatusAppearance {
  switch (status) {
    case "PENDING_REVIEW":
      return {
        badgeClassName:
          "border-amber-200 bg-amber-50 text-amber-900 ring-1 ring-amber-100 hover:bg-amber-50 hover:text-amber-900",
        dotClassName: "bg-amber-500",
        softClassName: "bg-amber-50 text-amber-900",
        accentClassName: "from-amber-500/20 via-amber-100/60 to-transparent",
      };
    case "APPROVED":
      return {
        badgeClassName:
          "border-emerald-200 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100 hover:bg-emerald-50 hover:text-emerald-900",
        dotClassName: "bg-emerald-500",
        softClassName: "bg-emerald-50 text-emerald-900",
        accentClassName:
          "from-emerald-500/20 via-emerald-100/60 to-transparent",
      };
    case "REJECTED":
      return {
        badgeClassName:
          "border-rose-200 bg-rose-50 text-rose-900 ring-1 ring-rose-100 hover:bg-rose-50 hover:text-rose-900",
        dotClassName: "bg-rose-500",
        softClassName: "bg-rose-50 text-rose-900",
        accentClassName: "from-rose-500/20 via-rose-100/60 to-transparent",
      };
    default:
      return {
        badgeClassName:
          "border-stone-200 bg-stone-50 text-stone-800 ring-1 ring-stone-100 hover:bg-stone-50 hover:text-stone-800",
        dotClassName: "bg-stone-400",
        softClassName: "bg-stone-50 text-stone-800",
        accentClassName: "from-stone-400/20 via-stone-100/60 to-transparent",
      };
  }
}

export function formatBytesToReadableSize(value: number | null) {
  if (value == null || Number.isNaN(value)) {
    return "-";
  }

  if (value < 1024) {
    return `${value} B`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}
