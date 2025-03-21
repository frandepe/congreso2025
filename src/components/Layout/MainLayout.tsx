import { MainFooter } from "./MainFooter";
import { NavbarPrincipal } from "./NavbarPrincipal";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegación */}
      <NavbarPrincipal />

      {/* Contenido principal */}
      <main className="flex-grow bg-gray-50">{children}</main>

      {/* Pie de página */}
      <MainFooter />
    </div>
  );
};
