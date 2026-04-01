import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AdminDto,
  AdminLoginRequest,
} from "@/features/api/types";
import { getCurrentAdminRequest, loginAdminRequest } from "@/features/auth/auth.api";
import {
  AuthContext,
  type AuthContextValue,
} from "@/features/auth/AuthContext";
import {
  clearApiAuthToken,
  setApiAuthToken,
  setUnauthorizedHandler,
} from "@/shared/api/client";

const STORAGE_KEY = "congreso.admin.token";
const SESSION_EXPIRED_STORAGE_KEY = "congreso.admin.session-expired";

const getStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(STORAGE_KEY);
};

const persistToken = (token: string | null) => {
  if (typeof window === "undefined") {
    return;
  }

  if (token) {
    window.localStorage.setItem(STORAGE_KEY, token);
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
};

const markSessionExpired = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(SESSION_EXPIRED_STORAGE_KEY, "1");
};

const clearSessionExpiredMark = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(SESSION_EXPIRED_STORAGE_KEY);
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [admin, setAdmin] = useState<AdminDto | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  const clearSession = useCallback(() => {
    setToken(null);
    setAdmin(null);
    persistToken(null);
    clearApiAuthToken();
  }, []);

  const applySession = useCallback((nextToken: string, nextAdmin: AdminDto) => {
    setToken(nextToken);
    setAdmin(nextAdmin);
    persistToken(nextToken);
    setApiAuthToken(nextToken);
  }, []);

  const logout = useCallback(() => {
    clearSessionExpiredMark();
    clearSession();
  }, [clearSession]);

  const login = useCallback(
    async (payload: AdminLoginRequest) => {
      const response = await loginAdminRequest(payload);
      clearSessionExpiredMark();
      applySession(response.data.token, response.data.admin);
      return response.data;
    },
    [applySession],
  );

  useEffect(() => {
    setUnauthorizedHandler(() => {
      markSessionExpired();
      clearSession();
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [clearSession]);

  useEffect(() => {
    if (!token) {
      clearApiAuthToken();
      setIsHydrating(false);
      return;
    }

    let isMounted = true;

    setApiAuthToken(token);

    const hydrateSession = async () => {
      try {
        const response = await getCurrentAdminRequest();

        if (!isMounted) {
          return;
        }

        setAdmin(response.data.admin);
      } catch {
        if (!isMounted) {
          return;
        }

        clearSession();
      } finally {
        if (isMounted) {
          setIsHydrating(false);
        }
      }
    };

    void hydrateSession();

    return () => {
      isMounted = false;
    };
  }, [clearSession, token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      admin,
      isHydrating,
      isAuthenticated: Boolean(token && admin),
      login,
      logout,
    }),
    [admin, isHydrating, login, logout, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
