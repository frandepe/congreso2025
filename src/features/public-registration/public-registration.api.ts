import type {
  PublicAdditionalReceiptCreatedDto,
  PublicDiscountCouponRequestResponseDto,
  PublicDiscountCouponValidationResponseDto,
  PublicPendingSecondInstallmentLookupResponseDto,
  PublicPricingCatalogDto,
  PublicSubmissionCreatedDto,
  PublicSubmissionStatusDto,
  PublicTrackingCodeRecoveryResponseDto,
} from "@/features/api/types";
import { apiRequest } from "@/shared/api/client";
import { normalizePublicTrackingCode } from "@/features/public-registration/public-registration.utils";

export function createPublicSubmissionRequest(formData: FormData) {
  return apiRequest<PublicSubmissionCreatedDto>({
    path: "/submissions",
    method: "POST",
    body: formData,
  });
}

export function getPublicPricingCatalogRequest() {
  return apiRequest<PublicPricingCatalogDto>({
    path: "/submissions/pricing",
    method: "GET",
  });
}

export function requestPublicDiscountCouponRequest(email: string) {
  return apiRequest<PublicDiscountCouponRequestResponseDto>({
    path: "/submissions/request-discount-coupon",
    method: "POST",
    body: {
      email,
    },
  });
}

export function validatePublicDiscountCouponRequest(payload: {
  email: string;
  couponCode: string;
}) {
  return apiRequest<PublicDiscountCouponValidationResponseDto>({
    path: "/submissions/validate-discount-coupon",
    method: "POST",
    body: payload,
  });
}

export function createPublicAdditionalReceiptRequest(
  registrationId: string,
  formData: FormData,
) {
  const normalizedId = normalizePublicTrackingCode(registrationId);

  return apiRequest<PublicAdditionalReceiptCreatedDto>({
    path: `/submissions/${normalizedId}/receipts`,
    method: "POST",
    body: formData,
  });
}

export function getPublicSubmissionStatusRequest(trackingCode: string) {
  const normalizedId = normalizePublicTrackingCode(trackingCode);

  return apiRequest<PublicSubmissionStatusDto>({
    path: `/submissions/${normalizedId}/status`,
    method: "GET",
  });
}

export function recoverPublicTrackingCodeRequest(email: string) {
  return apiRequest<PublicTrackingCodeRecoveryResponseDto>({
    path: "/submissions/recover-tracking-code",
    method: "POST",
    body: {
      email,
    },
  });
}

export function checkPendingSecondInstallmentRequest(payload: {
  email?: string;
  dni?: string;
}) {
  return apiRequest<PublicPendingSecondInstallmentLookupResponseDto>({
    path: "/submissions/check-pending-second-installment",
    method: "POST",
    body: payload,
  });
}
