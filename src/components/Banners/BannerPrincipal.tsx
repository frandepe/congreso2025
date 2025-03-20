import { Calendar, MapPin } from "lucide-react";
import { Button } from "../ui/button";

export default function BannerPrincipal() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: "url('/assets/conference-banner-principal.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 max-w-2xl px-4">
        <p className="text-lg flex items-center justify-center gap-2 font-semibold">
          <Calendar size={20} className="text-secondary" /> 15-16-17 Octubre,
          2025 <MapPin size={20} className="text-secondary" /> Trenque Lauquen
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mt-4">
          Primer congreso nacional de instructores de RCP
        </h1>
        <a
          href="https://forms.gle/72nQn2VmMnE58EVq5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mt-6">Inscribirme</Button>
        </a>
      </div>
    </div>
  );
}
