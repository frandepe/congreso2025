import type {
  AdminAuthResponseDto,
  AdminLoginRequest,
  AdminMeResponseDto,
} from "@/features/api/types";
import { apiRequest } from "@/shared/api/client";

export function loginAdminRequest(payload: AdminLoginRequest) {
  return apiRequest<AdminAuthResponseDto>({
    path: "/admin/auth/login",
    method: "POST",
    body: payload,
    skipUnauthorizedHandler: true,
  });
}

export function getCurrentAdminRequest() {
  return apiRequest<AdminMeResponseDto>({
    path: "/admin/auth/me",
    method: "GET",
    skipUnauthorizedHandler: true,
  });
}
