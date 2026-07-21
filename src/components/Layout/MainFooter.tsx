import {
  Facebook,
  Instagram,
  Heart,
  MessageCircle,
  Youtube,
  Linkedin,
} from "lucide-react";
import { Footer } from "./Footer";

function MainFooter() {
  return (
    <div className="w-full">
      <Footer
        logo={<Heart className="h-10 w-10" />}
        brandName="Congreso Nacional RCP"
        socialLinks={[
          {
            icon: <Facebook className="h-5 w-5" />,
            href: "https://www.facebook.com/profile.php?id=61590514847618",
            label: "Facebook",
          },
          {
            icon: <Instagram className="h-5 w-5" />,
            href: "https://www.instagram.com/congresonacionalrcp/",
            label: "Instagram",
          },
          {
            icon: <Youtube className="h-5 w-5" />,
            href: "https://www.youtube.com/@CongresoNacionalRCP",
            label: "YouTube",
          },
          {
            icon: <Linkedin className="h-5 w-5" />,
            href: "https://www.linkedin.com/company/congreso-nacional-de-rcp",
            label: "LinkedIn",
          },
          {
            icon: <MessageCircle className="h-5 w-5" />,
            href: "https://wa.me/5492392460227",
            label: "WhatsApp",
          },
        ]}
        mainLinks={[
          { href: "/programa", label: "Programa" },
          { href: "/inscripcion", label: "Inscripción" },
          {
            href: "/ubicacion-y-alojamiento",
            label: "Ubicación y Alojamiento",
          },
          { href: "/patrocinadores", label: "Patrocinadores" },
          { href: "/contacto", label: "Contacto" },
        ]}
        copyright={{
          text: "© 2026 Todos los derechos reservados.",
          license: "Diseñado y desarrollado por - ",
        }}
      />
    </div>
  );
}

export { MainFooter };
