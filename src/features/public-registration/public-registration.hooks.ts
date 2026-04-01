import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkPendingSecondInstallmentRequest,
  createPublicAdditionalReceiptRequest,
  createPublicSubmissionRequest,
  getPublicPricingCatalogRequest,
  getPublicSubmissionStatusRequest,
  recoverPublicTrackingCodeRequest,
  requestPublicDiscountCouponRequest,
  validatePublicDiscountCouponRequest,
} from "@/features/public-registration/public-registration.api";

export function usePublicPricingCatalogQuery() {
  return useQuery({
    queryKey: ["public-pricing-catalog"],
    queryFn: async () => {
      const response = await getPublicPricingCatalogRequest();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreatePublicSubmissionMutation() {
  return useMutation({
    mutationFn: (formData: FormData) => createPublicSubmissionRequest(formData),
  });
}

export function useRequestPublicDiscountCouponMutation() {
  return useMutation({
    mutationFn: (email: string) => requestPublicDiscountCouponRequest(email),
  });
}

export function useValidatePublicDiscountCouponMutation() {
  return useMutation({
    mutationFn: (payload: { email: string; couponCode: string }) =>
      validatePublicDiscountCouponRequest(payload),
  });
}

export function useCreatePublicAdditionalReceiptMutation() {
  return useMutation({
    mutationFn: ({
      registrationId,
      formData,
    }: {
      registrationId: string;
      formData: FormData;
    }) => createPublicAdditionalReceiptRequest(registrationId, formData),
  });
}

export function usePublicSubmissionStatusMutation() {
  return useMutation({
    mutationFn: (trackingCode: string) =>
      getPublicSubmissionStatusRequest(trackingCode),
  });
}

export function useRecoverPublicTrackingCodeMutation() {
  return useMutation({
    mutationFn: (email: string) => recoverPublicTrackingCodeRequest(email),
  });
}

export function usePendingSecondInstallmentLookupMutation() {
  return useMutation({
    mutationFn: (payload: { email?: string; dni?: string }) =>
      checkPendingSecondInstallmentRequest(payload),
  });
}
