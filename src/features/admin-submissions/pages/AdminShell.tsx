import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/useAuth";

export function AdminShell() {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(5,150,105,0.12),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#f3f4f6_42%,_#f8fafc_100%)] text-stone-900">
      <a
        href="#admin-main-content"
        className="sr-only z-50 rounded-md bg-white px-4 py-2 text-sm font-medium text-stone-900 shadow focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Saltar al contenido principal
      </a>

      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <div className="flex items-start gap-4">
            <div
              aria-hidden="true"
              className="hidden h-11 w-11 rounded-2xl bg-[linear-gradient(135deg,#14532d,#059669)] shadow-[0_18px_40px_-20px_rgba(5,150,105,0.85)] sm:block"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Admin
              </p>
              <h1 className="text-lg font-semibold text-stone-950">
                Congreso Nacional de RCP
              </h1>
              <p className="mt-1 text-sm text-stone-500">
                {admin
                  ? `Sesion activa: ${admin.email}`
                  : "Panel administrativo"}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="border-stone-300 bg-white/70"
            onClick={logout}
          >
            Cerrar sesion
          </Button>
        </div>
      </header>

      <main id="admin-main-content" className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
