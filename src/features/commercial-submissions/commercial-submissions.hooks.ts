import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCommercialAdditionalReceiptRequest,
  createCommercialSubmissionRequest,
  getCommercialPricingCatalogRequest,
  getCommercialSubmissionStatusRequest,
  recoverCommercialTrackingCodeRequest,
  requestCommercialStandDiscountCouponRequest,
  validateCommercialStandDiscountCouponRequest,
} from "@/features/commercial-submissions/commercial-submissions.api";

export function useCommercialPricingCatalogQuery() {
  return useQuery({
    queryKey: ["commercial-pricing-catalog"],
    queryFn: async () => {
      const response = await getCommercialPricingCatalogRequest();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateCommercialSubmissionMutation() {
  return useMutation({
    mutationFn: (formData: FormData) => createCommercialSubmissionRequest(formData),
  });
}

export function useRequestCommercialStandDiscountCouponMutation() {
  return useMutation({
    mutationFn: (email: string) => requestCommercialStandDiscountCouponRequest(email),
  });
}

export function useValidateCommercialStandDiscountCouponMutation() {
  return useMutation({
    mutationFn: (payload: { email: string; couponCode: string }) =>
      validateCommercialStandDiscountCouponRequest(payload),
  });
}

export function useCreateCommercialAdditionalReceiptMutation() {
  return useMutation({
    mutationFn: ({
      submissionId,
      formData,
    }: {
      submissionId: string;
      formData: FormData;
    }) => createCommercialAdditionalReceiptRequest(submissionId, formData),
  });
}

export function useCommercialSubmissionStatusMutation() {
  return useMutation({
    mutationFn: (trackingCode: string) =>
      getCommercialSubmissionStatusRequest(trackingCode),
  });
}

export function useRecoverCommercialTrackingCodeMutation() {
  return useMutation({
    mutationFn: (email: string) => recoverCommercialTrackingCodeRequest(email),
  });
}
