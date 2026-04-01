import type {
  CommercialAdditionalReceiptCreatedDto,
  CommercialDiscountCouponRequestResponseDto,
  CommercialDiscountCouponValidationResponseDto,
  CommercialPricingCatalogDto,
  CommercialSubmissionCreatedDto,
  CommercialTrackingCodeRecoveryResponseDto,
  PublicCommercialSubmissionStatusDto,
} from "@/features/api/types";
import { apiRequest } from "@/shared/api/client";
import { normalizeCommercialTrackingCode } from "@/features/commercial-submissions/commercial-submissions.utils";

export function getCommercialPricingCatalogRequest() {
  return apiRequest<CommercialPricingCatalogDto>({
    path: "/commercial-submissions/pricing",
    method: "GET",
  });
}

export function requestCommercialStandDiscountCouponRequest(email: string) {
  return apiRequest<CommercialDiscountCouponRequestResponseDto>({
    path: "/commercial-submissions/request-stand-discount-coupon",
    method: "POST",
    body: {
      email,
    },
  });
}

export function validateCommercialStandDiscountCouponRequest(payload: {
  email: string;
  couponCode: string;
}) {
  return apiRequest<CommercialDiscountCouponValidationResponseDto>({
    path: "/commercial-submissions/validate-stand-discount-coupon",
    method: "POST",
    body: payload,
  });
}

export function createCommercialSubmissionRequest(formData: FormData) {
  return apiRequest<CommercialSubmissionCreatedDto>({
    path: "/commercial-submissions",
    method: "POST",
    body: formData,
  });
}

export function createCommercialAdditionalReceiptRequest(
  submissionId: string,
  formData: FormData,
) {
  const normalizedId = normalizeCommercialTrackingCode(submissionId);

  return apiRequest<CommercialAdditionalReceiptCreatedDto>({
    path: `/commercial-submissions/${normalizedId}/receipts`,
    method: "POST",
    body: formData,
  });
}

export function getCommercialSubmissionStatusRequest(trackingCode: string) {
  const normalizedId = normalizeCommercialTrackingCode(trackingCode);

  return apiRequest<PublicCommercialSubmissionStatusDto>({
    path: `/commercial-submissions/${normalizedId}/status`,
    method: "GET",
  });
}

export function recoverCommercialTrackingCodeRequest(email: string) {
  return apiRequest<CommercialTrackingCodeRecoveryResponseDto>({
    path: "/commercial-submissions/recover-tracking-code",
    method: "POST",
    body: {
      email,
    },
  });
}
