import type {
  AdminSubmissionDetailDto,
  AdminSubmissionListItemDto,
  AdminSubmissionUpdateDto,
  AdminSubmissionUpdateRequest,
  AdminSubmissionsListQuery,
  PaginationMeta,
} from "@/features/api/types";
import { apiRequest } from "@/shared/api/client";

const ADMIN_SUBMISSIONS_EXPORT_PAGE_SIZE = 50;

function buildAdminSubmissionsQuery(params: AdminSubmissionsListQuery) {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set("page", String(params.page));
  }

  if (params.pageSize) {
    searchParams.set("pageSize", String(params.pageSize));
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.registrationOptionCode) {
    searchParams.set("registrationOptionCode", params.registrationOptionCode);
  }

  if (params.paymentPlanType) {
    searchParams.set("paymentPlanType", params.paymentPlanType);
  }

  if (params.hasDiscountCoupon) {
    searchParams.set("hasDiscountCoupon", params.hasDiscountCoupon);
  }

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : "";
}

export function getAdminSubmissionsRequest(params: AdminSubmissionsListQuery) {
  return apiRequest<AdminSubmissionListItemDto[], PaginationMeta>({
    path: `/admin/submissions${buildAdminSubmissionsQuery(params)}`,
    method: "GET",
  });
}

export function getAdminSubmissionDetailRequest(submissionId: string) {
  return apiRequest<AdminSubmissionDetailDto>({
    path: `/admin/submissions/${submissionId}`,
    method: "GET",
  });
}

export function updateAdminSubmissionRequest(
  submissionId: string,
  payload: AdminSubmissionUpdateRequest,
) {
  return apiRequest<AdminSubmissionUpdateDto>({
    path: `/admin/submissions/${submissionId}`,
    method: "PATCH",
    body: payload,
  });
}

export async function getAllAdminSubmissionDetailsRequest() {
  const firstPageResponse = await getAdminSubmissionsRequest({
    page: 1,
    pageSize: ADMIN_SUBMISSIONS_EXPORT_PAGE_SIZE,
  });

  const totalPages = firstPageResponse.meta?.totalPages ?? 1;
  const listItems = [...firstPageResponse.data];

  if (totalPages > 1) {
    const remainingPageResponses = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        getAdminSubmissionsRequest({
          page: index + 2,
          pageSize: ADMIN_SUBMISSIONS_EXPORT_PAGE_SIZE,
        }),
      ),
    );

    listItems.push(
      ...remainingPageResponses.flatMap((response) => response.data),
    );
  }

  const detailResponses = [];

  for (let index = 0; index < listItems.length; index += 10) {
    const batch = listItems.slice(index, index + 10);
    const batchResponses = await Promise.all(
      batch.map((submission) => getAdminSubmissionDetailRequest(submission.id)),
    );

    detailResponses.push(...batchResponses.map((response) => response.data));
  }

  return detailResponses;
}
