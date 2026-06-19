import {
  BadgeCheck,
  BedDouble,
  Calendar,
  CalendarDays,
  Globe2,
  MapPin,
} from "lucide-react";
import BtnHover from "../Buttons/BtnHover";

const heroBenefits = [
  {
    icon: CalendarDays,
    text: "3 días de formación",
  },
  {
    icon: Globe2,
    text: "Disertantes nacionales e internacionales",
  },
  {
    icon: BadgeCheck,
    text: "Certificado de participación",
  },
  {
    icon: BedDouble,
    text: "Cupos con alojamiento disponibles",
  },
];

export default function BannerPrincipal() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center md:bg-center flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: "url('/assets/2025/todos.jpg')",
        backgroundPosition: "37% center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 w-full max-w-5xl px-4">
        <p className="text-lg flex items-center justify-center gap-2 font-semibold text-start ml-8 sm:ml-0">
          <Calendar size={20} className="text-secondary" /> 2-3-4 Octubre, 2026
          <MapPin size={20} className="text-secondary" /> Trenque Lauquen
        </p>
        <h1 className="mx-auto max-w-2xl text-3xl md:text-5xl font-bold mt-4">
          Segundo congreso nacional de instructores de RCP
        </h1>

        {/* <Button
          onClick={() => navigate("/inscripcion/participantes")}
          className="mt-6 mr-6"
        >
          Inscribirme
        </Button> */}
        <BtnHover />
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-y-5 border-y border-white/20 bg-white/[0.04] px-3 py-5 text-left backdrop-blur-[2px] md:grid-cols-4 md:gap-y-0 md:px-6">
          {heroBenefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.text}
                className={`flex items-center gap-3 px-2 md:justify-center md:px-5 ${
                  index < heroBenefits.length - 1
                    ? "md:border-r md:border-white/20"
                    : ""
                }`}
              >
                <Icon className="h-5 w-5 shrink-0 text-secondary" />
                <span className="text-sm font-medium leading-snug text-white/90 md:text-center">
                  {benefit.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
