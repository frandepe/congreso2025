import { createContext } from "react";
import type {
  AdminAuthResponseDto,
  AdminDto,
  AdminLoginRequest,
} from "@/features/api/types";

export type AuthContextValue = {
  token: string | null;
  admin: AdminDto | null;
  isHydrating: boolean;
  isAuthenticated: boolean;
  login: (payload: AdminLoginRequest) => Promise<AdminAuthResponseDto>;
  logout: () => void;
};

const initialAuthContextValue: AuthContextValue = {
  token: null,
  admin: null,
  isHydrating: true,
  isAuthenticated: false,
  login: async () => {
    throw new Error("AuthProvider not mounted");
  },
  logout: () => undefined,
};

export const AuthContext = createContext<AuthContextValue>(
  initialAuthContextValue,
);
