import type {
  CommercialKind,
  CommercialOptionCode,
  PaymentPlanType,
  CommercialSubmissionCreatedDto,
} from "@/features/api/types";

export type CommercialSubmissionFormValues = {
  companyName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  websiteOrSocialUrl?: string;
  commercialKind: CommercialKind;
  commercialOptionCode: CommercialOptionCode;
  paymentPlanType: PaymentPlanType;
  amountReported: number;
  paymentDate: string;
  notes: string;
  receipt: File | null;
};

export type CommercialSubmissionSuccessState = CommercialSubmissionCreatedDto;
