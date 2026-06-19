import { useState } from "react";
import { HelpChatbotWidget } from "@/features/help-chatbot";
import { MainFooter } from "./MainFooter";
import { NavbarPrincipal } from "./NavbarPrincipal";
import { PrecongressInfoBar } from "./PrecongressInfoBar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isInfoBarVisible, setIsInfoBarVisible] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <div className={isInfoBarVisible ? "mb-[147.30px]" : "mb-[101.89px]"}>
        {isInfoBarVisible && (
          <PrecongressInfoBar onDismiss={() => setIsInfoBarVisible(false)} />
        )}
        <NavbarPrincipal
          topOffsetClassName={isInfoBarVisible ? "top-12 md:top-11" : "top-0"}
        />
      </div>

      {/* Contenido principal */}
      <main className="flex-grow bg-gray-50">{children}</main>

      {/* Pie de página */}
      <MainFooter />
      <HelpChatbotWidget />
    </div>
  );
};
