export type AdminRole = "ADMIN";

export type RegistrationOptionCode =
  | "ONE_DAY"
  | "THREE_DAYS"
  | "THREE_DAYS_WITH_LODGING";

export type PaymentPlanType = "ONE_PAYMENT" | "TWO_INSTALLMENTS";

export type RegistrationStatus =
  | "PENDING_REVIEW"
  | "PARTIALLY_PAID"
  | "FULLY_PAID"
  | "REJECTED";

export type PaymentReceiptStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED";

export type ApiSuccessResponse<T, M = undefined> = {
  success: true;
  data: T;
  meta?: M;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<T, M = undefined> =
  | ApiSuccessResponse<T, M>
  | ApiErrorResponse;

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type AdminDto = {
  id: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminAuthResponseDto = {
  admin: AdminDto;
  token: string;
};

export type AdminMeResponseDto = {
  admin: AdminDto;
};

export type AdminSubmissionListItemDto = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  registrationOptionCode: RegistrationOptionCode;
  registrationOptionLabelSnapshot: string;
  totalAmountExpected: number;
  paymentPlanType: PaymentPlanType;
  installmentCountExpected: number;
  approvedReceiptsCount: number;
  submittedReceiptsCount: number;
  status: RegistrationStatus;
  lastReviewedAt: string | null;
  reviewedByAdminEmail?: string;
};

export type AdminSubmissionDetailReceiptDto = {
  id: string;
  installmentNumber: number;
  amountReported: number;
  paymentDate: string | null;
  receiptUrl: string;
  receiptOriginalFilename: string | null;
  receiptMimeType: string | null;
  receiptSizeBytes: number | null;
  status: PaymentReceiptStatus;
  rejectionReason: string | null;
  reviewedAt: string | null;
  reviewedByAdminEmail?: string;
};

export type AdminSubmissionDetailDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  registrationOptionCode: RegistrationOptionCode;
  registrationOptionLabelSnapshot: string;
  currencyCode: string;
  baseAmountExpected: number | null;
  discountAppliedPercentage: number | null;
  discountAppliedAmount: number | null;
  discountEligibleEmailNormalized: string | null;
  discountCouponCode: string | null;
  totalAmountExpected: number;
  installmentsAllowed: boolean;
  paymentPlanType: PaymentPlanType;
  installmentCountExpected: number;
  installmentAmountExpected: number | null;
  secondInstallmentDueAt: string | null;
  secondInstallmentExpired: boolean;
  status: RegistrationStatus;
  notes: string | null;
  internalNote: string | null;
  reviewedAt: string | null;
  reviewedByAdmin: { id: string; email: string } | null;
  receipts: AdminSubmissionDetailReceiptDto[];
};

export type AdminSubmissionUpdateDto = {
  id: string;
  status: RegistrationStatus;
  internalNote: string | null;
  reviewedAt: string | null;
  reviewedByAdmin: { id: string; email: string } | null;
  updatedAt: string;
};

export type PublicSubmissionCreatedDto = {
  registrationId: string;
  trackingCode: string;
  status: RegistrationStatus;
  registrationOption: {
    code: RegistrationOptionCode;
    label: string;
    totalAmountExpected: number;
  };
  paymentPlanType: PaymentPlanType;
  installmentCountExpected: number;
  installmentAmountExpected: number | null;
  secondInstallmentDueAt: string | null;
  receipt: {
    installmentNumber: number;
    status: PaymentReceiptStatus;
  };
  createdAt: string;
  message: string;
};

export type PublicAdditionalReceiptCreatedDto = {
  registrationId: string;
  trackingCode: string;
  status: RegistrationStatus;
  paymentPlanType: PaymentPlanType;
  installmentCountExpected: number;
  installmentAmountExpected: number | null;
  secondInstallmentDueAt: string | null;
  secondInstallmentExpired: boolean;
  receipt: {
    installmentNumber: number;
    status: PaymentReceiptStatus;
  };
  createdAt: string;
  message: string;
};

export type PublicSubmissionStatusDto = {
  registrationId: string;
  trackingCode: string;
  createdAt: string;
  updatedAt: string;
  status: RegistrationStatus;
  registrationOption: {
    code: RegistrationOptionCode;
    label: string;
    totalAmountExpected: number;
  };
  paymentPlanType: PaymentPlanType;
  installmentCountExpected: number;
  installmentAmountExpected: number | null;
  secondInstallmentDueAt: string | null;
  secondInstallmentExpired: boolean;
  secondInstallmentUploadAllowed: boolean;
  submittedReceiptsCount: number;
  approvedReceiptsCount: number;
  pendingReceiptsCount: number;
  receipts: Array<{
    installmentNumber: number;
    status: PaymentReceiptStatus;
    createdAt: string;
  }>;
};

export type PublicTrackingCodeRecoveryResponseDto = {
  found: boolean;
  message: string;
};

export type PublicPendingSecondInstallmentLookupResponseDto = {
  found: boolean;
  trackingCode: string | null;
  participantName: string | null;
  secondInstallmentDueAt: string | null;
  secondInstallmentExpired: boolean;
  secondInstallmentUploadAllowed: boolean;
  message: string;
};

export type PublicPricingPlanDto = {
  type: PaymentPlanType;
  label: string;
  installmentCount: number;
  baseInstallmentAmount: number;
  discountedInstallmentAmount: number;
};

export type PublicPricingOptionDto = {
  code: RegistrationOptionCode;
  label: string;
  baseTotalAmount: number;
  discountedTotalAmount: number;
  paymentPlans: PublicPricingPlanDto[];
};

export type PublicPricingCatalogDto = {
  discountPercentage: number;
  installmentsAvailable: boolean;
  installmentsAvailableUntil: string;
  installmentsTimezone: string;
  options: PublicPricingOptionDto[];
};

export type PublicDiscountCouponRequestResponseDto = {
  issued: boolean;
  message: string;
  expiresAt: string | null;
};

export type PublicDiscountCouponValidationResponseDto = {
  valid: boolean;
  message: string;
  discountPercentage: number | null;
  expiresAt: string | null;
};

export type AdminLoginRequest = {
  email: string;
  password: string;
};

export type AdminSubmissionsListQuery = {
  page?: number;
  pageSize?: number;
  status?: RegistrationStatus;
  registrationOptionCode?: RegistrationOptionCode;
  paymentPlanType?: PaymentPlanType;
  hasDiscountCoupon?: "true";
};

export type AdminSubmissionUpdateRequest = {
  status?: RegistrationStatus;
  internalNote?: string | null;
};

export type PublicCreateSubmissionRequest = {
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  registrationOptionCode: RegistrationOptionCode;
  paymentPlanType: PaymentPlanType;
  installmentNumber: number;
  amountReported: number;
  discountCouponCode?: string;
  paymentDate?: string;
  notes?: string;
  receipt: File;
};

export type PublicCreateAdditionalReceiptRequest = {
  installmentNumber: number;
  amountReported: number;
  paymentDate?: string;
  receipt: File;
};
