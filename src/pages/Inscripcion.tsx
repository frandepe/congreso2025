import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  GraduationCap,
  Activity,
  Mic,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { PricingCardDemo } from "@/components/PricingCard/PricingCard";

export const Inscripcion = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center bg-[url('/assets/bannerInscripcion.jpeg')] bg-cover bg-[center_top_60%]">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white max-w-3xl"
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            Congreso Nacional de RCP 2025
          </h1>
          <p className="text-lg mt-4">
            Capacitate con los mejores expertos en primeros auxilios y RCP.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="https://forms.gle/72nQn2VmMnE58EVq5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button> Inscribirme Ahora</Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Información Clave */}
      <section className="py-16 text-center max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold">Detalles del Congreso</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="flex flex-col items-center">
            <Calendar className="w-12 h-12 text-blue-600" />
            <h3 className="text-lg font-semibold mt-2">15 - 17 de Octubre</h3>
            <p className="text-gray-600">
              Tres días de formación intensiva con expertos en la materia.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-12 h-12 text-lightGreen" />
            <h3 className="text-lg font-semibold mt-2">Trenque Lauquen</h3>
            <p className="text-gray-600">
              Un evento nacional en una ciudad clave para la formación en
              emergencias.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-12 h-12 text-red-600" />
            <h3 className="text-lg font-semibold mt-2">Cupo Limitado</h3>
            <p className="text-gray-600">
              Solo 70 participantes para asegurar una capacitación
              personalizada.
            </p>
          </div>
        </div>
      </section>
      {/* Pricing Cards */}
      <div className="flex justify-center">
        <PricingCardDemo />
      </div>
      {/* Beneficios */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-4xl font-bold">¿Por qué asistir?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-blue-600" />
            <h3 className="text-lg font-semibold mt-2">
              Capacitación Profesional
            </h3>
            <p className="text-gray-600">
              Charlas y talleres impartidos por expertos en emergencias.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Mic className="w-12 h-12 text-purple-600" />
            <h3 className="text-lg font-semibold mt-2">Networking</h3>
            <p className="text-gray-600">
              Conéctate con profesionales del sector y amplía tus oportunidades.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Activity className="w-12 h-12 text-secondary" />
            <h3 className="text-lg font-semibold mt-2">Experiencia Práctica</h3>
            <p className="text-gray-600">
              Simulacros en vivo y uso de DEA en escenarios reales.
            </p>
          </div>
        </div>
      </section>

      {/* Inscripción */}
      <section className="py-16 text-center px-6">
        <h2 className="text-4xl font-bold">Asegura tu lugar</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          No pierdas la oportunidad de formar parte de este evento único en
          Argentina. Las inscripciones están abiertas hasta agotar cupos.
        </p>
        <div className="mt-6">
          <a
            href="https://forms.gle/72nQn2VmMnE58EVq5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={"secondary"}>Inscribirme Ahora</Button>
          </a>
        </div>
      </section>
    </div>
  );
};
