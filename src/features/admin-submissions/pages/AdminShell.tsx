import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/useAuth";

const adminNavItems = [
  {
    to: "/admin/submissions",
    label: "Participantes",
    description: "Inscripciones de participantes",
  },
  {
    to: "/admin/commercial",
    label: "Comercial",
    description: "Stands y publicidades",
  },
];

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
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
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

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="border-stone-300 bg-white/70"
                onClick={logout}
              >
                Cerrar sesion
              </Button>
            </div>
          </div>

          <nav className="mt-5 flex flex-wrap gap-3 border-t border-stone-200/80 pt-4">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-2xl border px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border-stone-200 bg-white/80 text-stone-700 hover:border-stone-300"
                  }`
                }
              >
                <span className="block font-medium">{item.label}</span>
                <span className="mt-1 block text-xs text-stone-500">
                  {item.description}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="admin-main-content" className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
