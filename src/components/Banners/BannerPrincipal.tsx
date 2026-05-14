import { Calendar, MapPin } from "lucide-react";

import { Button } from "../ui/button";
// import { useNavigate } from "react-router-dom";

export default function BannerPrincipal() {
  // const navigate = useNavigate();
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
      <div className="relative z-10 max-w-2xl px-4">
        <p className="text-lg flex items-center justify-center gap-2 font-semibold text-start ml-8 sm:ml-0">
          <Calendar size={20} className="text-secondary" /> 2-3-4 Octubre, 2026
          <MapPin size={20} className="text-secondary" /> Trenque Lauquen
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mt-4">
          Segundo congreso nacional de instructores de RCP
        </h1>

        <Button
          // onClick={() => navigate("/inscripcion")}
          className="mt-6 mr-6 cursor-not-allowed"
        >
          Inscripción abierta el 18-05
        </Button>
      </div>
    </div>
  );
}
