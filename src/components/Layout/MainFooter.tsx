import {
  Twitter,
  Facebook,
  Instagram,
  Heart,
  MessageCircle,
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
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: <Facebook className="h-5 w-5" />,
            href: "https://www.facebook.com/profile.php?id=61574079247674",
            label: "Facebook",
          },
          {
            icon: <Instagram className="h-5 w-5" />,
            href: "https://www.instagram.com/congresonacionalrcp/",
            label: "Instagram",
          },
          {
            icon: <MessageCircle className="h-5 w-5" />,
            href: "https://wa.me/111111111111",
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
          text: "© 2025 Todos los derechos reservados.",
          license: "Diseñado y desarrollado por - ",
        }}
      />
    </div>
  );
}

export { MainFooter };
