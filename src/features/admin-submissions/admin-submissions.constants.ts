import type {
  PaymentPlanType,
  RegistrationOptionCode,
  RegistrationStatus,
} from "@/features/api/types";

export const ADMIN_SUBMISSIONS_PAGE_SIZE = 20;

export const registrationStatusOptions: Array<{
  value: RegistrationStatus;
  label: string;
}> = [
  { value: "PENDING_REVIEW", label: "Pendiente de revision" },
  { value: "PARTIALLY_PAID", label: "Parcialmente pagada" },
  { value: "FULLY_PAID", label: "Pagada completa" },
  { value: "REJECTED", label: "Rechazada" },
];

export const registrationOptionOptions: Array<{
  value: RegistrationOptionCode;
  label: string;
}> = [
  { value: "ONE_DAY", label: "1 dia" },
  { value: "THREE_DAYS", label: "3 dias" },
  {
    value: "THREE_DAYS_WITH_LODGING",
    label: "3 dias con alojamiento",
  },
];

export const paymentPlanOptions: Array<{
  value: PaymentPlanType;
  label: string;
}> = [
  { value: "ONE_PAYMENT", label: "1 pago" },
  { value: "TWO_INSTALLMENTS", label: "2 cuotas" },
];
