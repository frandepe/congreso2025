import type {
  PaymentPlanType,
  RegistrationOptionCode,
} from "@/features/api/types";
import type { PublicRegistrationDraft } from "@/features/public-registration/public-registration.types";

export const PUBLIC_REGISTRATION_DRAFT_STORAGE_KEY =
  "congreso.public-registration.draft";

export const defaultPublicRegistrationDraft: PublicRegistrationDraft = {
  firstName: "",
  lastName: "",
  dni: "",
  email: "",
  phone: "",
  registrationOptionCode: "",
  paymentPlanType: "",
  amountReported: 0,
  paymentDate: "",
  notes: "",
  step: 1,
};

export const publicRegistrationOptionContent: Record<
  RegistrationOptionCode,
  {
    title: string;
    description: string;
  }
> = {
  ONE_DAY: {
    title: "1 dia",
    description: "Ideal si vas a asistir a una sola jornada del congreso.",
  },
  THREE_DAYS: {
    title: "3 dias",
    description: "Acceso completo a las tres jornadas del evento.",
  },
  THREE_DAYS_WITH_LODGING: {
    title: "3 dias con alojamiento",
    description: "Incluye acceso completo y alojamiento para la estadia.",
  },
};

export const publicPaymentPlanContent: Record<
  PaymentPlanType,
  {
    title: string;
    description: string;
  }
> = {
  ONE_PAYMENT: {
    title: "1 pago",
    description: "Informas un unico comprobante por el monto total.",
  },
  TWO_INSTALLMENTS: {
    title: "2 cuotas",
    description:
      "Informas ahora la primera cuota y luego podras cargar la segunda.",
  },
};
