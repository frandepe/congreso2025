import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthHydrationFallback } from "@/features/auth/AuthHydrationFallback";
import { useAuth } from "@/features/auth/useAuth";

export function RequireAdminAuth() {
  const location = useLocation();
  const { isAuthenticated, isHydrating } = useAuth();

  if (isHydrating) {
    return <AuthHydrationFallback />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }

  return <Outlet />;
}
