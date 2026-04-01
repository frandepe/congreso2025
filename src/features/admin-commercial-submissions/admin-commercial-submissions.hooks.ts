import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AdminCommercialSubmissionUpdateRequest,
  AdminCommercialSubmissionsListQuery,
} from "@/features/api/types";
import {
  getAdminCommercialSubmissionDetailRequest,
  getAdminCommercialSubmissionsRequest,
  updateAdminCommercialSubmissionRequest,
} from "@/features/admin-commercial-submissions/admin-commercial-submissions.api";

export function useAdminCommercialSubmissionsQuery(
  filters: AdminCommercialSubmissionsListQuery,
) {
  return useQuery({
    queryKey: ["admin-commercial-submissions", filters],
    queryFn: async () => {
      const response = await getAdminCommercialSubmissionsRequest(filters);
      return {
        items: response.data,
        meta: response.meta,
      };
    },
    placeholderData: keepPreviousData,
  });
}

export function useAdminCommercialSubmissionDetailQuery(submissionId: string) {
  return useQuery({
    queryKey: ["admin-commercial-submission-detail", submissionId],
    queryFn: async () => {
      const response = await getAdminCommercialSubmissionDetailRequest(submissionId);
      return response.data;
    },
    enabled: Boolean(submissionId),
  });
}

export function useUpdateAdminCommercialSubmissionMutation(submissionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminCommercialSubmissionUpdateRequest) =>
      updateAdminCommercialSubmissionRequest(submissionId, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["admin-commercial-submission-detail", submissionId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["admin-commercial-submissions"],
        }),
      ]);
    },
  });
}
