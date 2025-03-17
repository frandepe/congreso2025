import { NavbarPrincipal } from "./NavbarPrincipal";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegación */}
      <NavbarPrincipal />

      {/* Contenido principal */}
      <main className="flex-grow p-4 bg-gray-50">{children}</main>

      {/* Pie de página */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Mi Proyecto. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
