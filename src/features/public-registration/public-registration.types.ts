import type { PublicSubmissionCreatedDto } from "@/features/api/types";

export type PublicRegistrationWizardStep = 1 | 2 | 3 | 4;

export type PublicRegistrationDraft = {
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  registrationOptionCode: string;
  paymentPlanType: string;
  amountReported: number;
  paymentDate: string;
  notes: string;
  step: PublicRegistrationWizardStep;
};

export type PublicRegistrationFormValues = Omit<PublicRegistrationDraft, "step"> & {
  receipt: File | null;
};

export type PublicRegistrationSuccessState = PublicSubmissionCreatedDto;
