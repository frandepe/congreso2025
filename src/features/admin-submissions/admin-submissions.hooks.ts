import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AdminSubmissionUpdateRequest,
  AdminSubmissionsListQuery,
} from "@/features/api/types";
import {
  getAdminSubmissionDetailRequest,
  getAdminSubmissionsRequest,
  updateAdminSubmissionRequest,
} from "@/features/admin-submissions/admin-submissions.api";

export function useAdminSubmissionsQuery(filters: AdminSubmissionsListQuery) {
  return useQuery({
    queryKey: ["admin-submissions", filters],
    queryFn: async () => {
      const response = await getAdminSubmissionsRequest(filters);
      return {
        items: response.data,
        meta: response.meta,
      };
    },
    placeholderData: keepPreviousData,
  });
}

export function useAdminSubmissionDetailQuery(submissionId: string) {
  return useQuery({
    queryKey: ["admin-submission-detail", submissionId],
    queryFn: async () => {
      const response = await getAdminSubmissionDetailRequest(submissionId);
      return response.data;
    },
    enabled: Boolean(submissionId),
  });
}

export function useUpdateAdminSubmissionMutation(submissionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminSubmissionUpdateRequest) =>
      updateAdminSubmissionRequest(submissionId, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["admin-submission-detail", submissionId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["admin-submissions"],
        }),
      ]);
    },
  });
}
