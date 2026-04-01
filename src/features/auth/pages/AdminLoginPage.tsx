import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthHydrationFallback } from "@/features/auth/AuthHydrationFallback";
import { useAuth } from "@/features/auth/useAuth";
import { InlineNotice } from "@/shared/ui/InlineNotice";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";

const SESSION_EXPIRED_STORAGE_KEY = "congreso.admin.session-expired";

const adminLoginSchema = z.object({
  email: z.string().trim().email("Ingresa un email valido."),
  password: z.string().min(1, "Ingresa tu contraseña."),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

function resolveRedirectTarget(
  from: unknown,
  fallback: string,
  currentPath: string,
) {
  if (typeof from !== "string") {
    return fallback;
  }

  if (!from.startsWith("/")) {
    return fallback;
  }

  if (from === "/admin/login" || from === currentPath) {
    return fallback;
  }

  return from;
}

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isHydrating, login } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);

  const redirectTo = useMemo(
    () =>
      resolveRedirectTarget(location.state?.from, "/admin", location.pathname),
    [location.pathname, location.state],
  );

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.sessionStorage.getItem(SESSION_EXPIRED_STORAGE_KEY) === "1") {
      setSessionNotice(
        "Tu sesion vencio o ya no es valida. Ingresa nuevamente para continuar.",
      );
      window.sessionStorage.removeItem(SESSION_EXPIRED_STORAGE_KEY);
    }
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSessionNotice(null);

    try {
      await login({
        email: values.email,
        password: values.password,
      });

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setSubmitError(
        getUserFacingErrorMessage(
          error,
          "No se pudo iniciar sesion. Intenta nuevamente.",
        ),
      );
    }
  });

  if (isHydrating) {
    return <AuthHydrationFallback />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-[2rem] border border-stone-300 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-stone-900">
              Iniciar sesion
            </h1>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Acceso exclusivo para el comite organizador del Congreso Nacional
              de RCP.
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit} noValidate>
            {sessionNotice ? (
              <InlineNotice variant="info">{sessionNotice}</InlineNotice>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="comite@..."
                disabled={isSubmitting}
                {...register("email")}
              />
              {errors.email ? (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
                disabled={isSubmitting}
                {...register("password")}
              />
              {errors.password ? (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            {submitError ? (
              <InlineNotice variant="error">{submitError}</InlineNotice>
            ) : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
