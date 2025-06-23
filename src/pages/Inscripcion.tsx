import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Activity,
  Mic,
} from "lucide-react";
import { PricingCardDemo } from "@/components/PricingCard/PricingCard";

export const Inscripcion = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[350px] flex items-center justify-center bg-[url('/assets/banner1-edit.jpg')] bg-cover bg-[center_top_30%]">
        <div className="absolute inset-0 bg-green-500 opacity-30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white max-w-3xl"
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            Inscripción al Congreso Nacional de RCP: ¡No te quedes afuera!
          </h1>
          <p className="text-lg mt-4">Incluye certificado de participación</p>
        </motion.div>
      </section>

      <motion.section
        className="py-16 text-center max-w-6xl mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold">Detalles del Congreso</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Calendar className="w-12 h-12 text-blue-600" />
            <h3 className="text-lg font-semibold mt-2">15 - 17 de Octubre</h3>
            <p className="text-gray-600">
              Tres días de formación intensiva con expertos en la materia.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <MapPin className="w-12 h-12 text-lightGreen" />
            <h3 className="text-lg font-semibold mt-2">Trenque Lauquen</h3>
            <p className="text-gray-600">
              Un evento nacional en una ciudad clave para la formación en
              emergencias.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Users className="w-12 h-12 text-red-600" />
            <h3 className="text-lg font-semibold mt-2">
              Solo 70 lugares disponibles.
            </h3>
            <p className="text-gray-600">
              Asegurá tu lugar con alojamiento en nuestros "Dormis Municipales"!
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Cards */}
      <motion.div
        className="flex justify-center bg-gray-100 py-4 my-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="inscribirse"
      >
        <PricingCardDemo />
      </motion.div>

      {/* Beneficios */}
      <motion.section
        className=" py-16 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold">¿Por qué asistir?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle className="w-12 h-12 text-blue-600" />
            <h3 className="text-lg font-semibold mt-2">
              Capacitación Profesional
            </h3>
            <p className="text-gray-600">
              Charlas y talleres impartidos por expertos en emergencias.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Mic className="w-12 h-12 text-purple-600" />
            <h3 className="text-lg font-semibold mt-2">Networking</h3>
            <p className="text-gray-600">
              Conéctate con profesionales del sector y amplía tus oportunidades.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Activity className="w-12 h-12 text-secondary" />
            <h3 className="text-lg font-semibold mt-2">Experiencia Práctica</h3>
            <p className="text-gray-600">
              Simulacros en vivo y uso de DEA en escenarios reales.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Inscripción */}
      <motion.section
        className="py-24 text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold">Asegura tu lugar</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          No pierdas la oportunidad de formar parte de este evento único en
          Argentina. Las inscripciones están abiertas hasta agotar cupos.
        </p>
        <div className="mt-6">
          <a href="/inscripcion#inscribirse">
            <Button variant={"secondary"}>Inscribirme Ahora</Button>
          </a>
        </div>
      </motion.section>
    </div>
  );
};
