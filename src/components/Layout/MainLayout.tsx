import { MainFooter } from "./MainFooter";
import { NavbarPrincipal } from "./NavbarPrincipal";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <div className="mb-[101.89px] ">
        <NavbarPrincipal />
      </div>

      {/* Contenido principal */}
      <main className="flex-grow bg-gray-50">{children}</main>

      {/* Pie de página */}
      <MainFooter />
    </div>
  );
};
