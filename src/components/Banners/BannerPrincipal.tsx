import { Calendar, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedModalVideo } from "../AnimatedModal/AnimatedModalVideo";
// https://forms.gle/JS16Ez9W5EaRyiBx5
export default function BannerPrincipal() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center md:bg-center flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: "url('/assets/conference-banner-principal.webp')",
        backgroundPosition: "37% center", // Más hacia la derecha en mobile
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 max-w-2xl px-4">
        <p className="text-lg flex items-center justify-center gap-2 font-semibold text-start ml-8 sm:ml-0">
          <Calendar size={20} className="text-secondary" /> 15-16-17 Octubre,
          2025
          <MapPin size={20} className="text-secondary" /> Trenque Lauquen
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mt-4">
          Primer congreso nacional de instructores de RCP
        </h1>
        {/* <h3>¡Un gran comienzo! Nos vemos en la edición 2026</h3> */}

        <Button
          // onClick={() =>
          //   window.open("https://forms.gle/JS16Ez9W5EaRyiBx5", "_blank")
          // }
          className="mt-6 mr-6"
          disabled
        >
          Inscribirme
        </Button>
        {/* <Button
          onClick={() =>
            window.open("https://forms.gle/JS16Ez9W5EaRyiBx5", "_blank")
          }
          className="mt-6 mr-6"
        >
          Contanos tu experiencia
        </Button> */}
        <AnimatedModalVideo />
      </div>
    </div>
  );
}
