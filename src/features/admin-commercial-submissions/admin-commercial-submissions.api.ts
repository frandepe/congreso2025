import type {
  AdminCommercialSubmissionDetailDto,
  AdminCommercialSubmissionListItemDto,
  AdminCommercialSubmissionUpdateDto,
  AdminCommercialSubmissionUpdateRequest,
  AdminCommercialSubmissionsListQuery,
  PaginationMeta,
} from "@/features/api/types";
import { apiRequest } from "@/shared/api/client";

const ADMIN_COMMERCIAL_SUBMISSIONS_EXPORT_PAGE_SIZE = 50;

function buildQuery(params: AdminCommercialSubmissionsListQuery) {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("pageSize", String(params.pageSize));
  if (params.status) searchParams.set("status", params.status);
  if (params.commercialKind) {
    searchParams.set("commercialKind", params.commercialKind);
  }
  if (params.commercialOptionCode) {
    searchParams.set("commercialOptionCode", params.commercialOptionCode);
  }
  if (params.hasDiscountCoupon) {
    searchParams.set("hasDiscountCoupon", params.hasDiscountCoupon);
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function getAdminCommercialSubmissionsRequest(
  params: AdminCommercialSubmissionsListQuery,
) {
  return apiRequest<AdminCommercialSubmissionListItemDto[], PaginationMeta>({
    path: `/admin/commercial-submissions${buildQuery(params)}`,
    method: "GET",
  });
}

export function getAdminCommercialSubmissionDetailRequest(submissionId: string) {
  return apiRequest<AdminCommercialSubmissionDetailDto>({
    path: `/admin/commercial-submissions/${submissionId}`,
    method: "GET",
  });
}

export function updateAdminCommercialSubmissionRequest(
  submissionId: string,
  payload: AdminCommercialSubmissionUpdateRequest,
) {
  return apiRequest<AdminCommercialSubmissionUpdateDto>({
    path: `/admin/commercial-submissions/${submissionId}`,
    method: "PATCH",
    body: payload,
  });
}

export async function getAllAdminCommercialSubmissionDetailsRequest() {
  const firstPageResponse = await getAdminCommercialSubmissionsRequest({
    page: 1,
    pageSize: ADMIN_COMMERCIAL_SUBMISSIONS_EXPORT_PAGE_SIZE,
  });

  const totalPages = firstPageResponse.meta?.totalPages ?? 1;
  const listItems = [...firstPageResponse.data];

  if (totalPages > 1) {
    const remainingPageResponses = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        getAdminCommercialSubmissionsRequest({
          page: index + 2,
          pageSize: ADMIN_COMMERCIAL_SUBMISSIONS_EXPORT_PAGE_SIZE,
        }),
      ),
    );

    listItems.push(...remainingPageResponses.flatMap((response) => response.data));
  }

  const detailResponses = [];

  for (let index = 0; index < listItems.length; index += 10) {
    const batch = listItems.slice(index, index + 10);
    const batchResponses = await Promise.all(
      batch.map((submission) =>
        getAdminCommercialSubmissionDetailRequest(submission.id),
      ),
    );

    detailResponses.push(...batchResponses.map((response) => response.data));
  }

  return detailResponses;
}
