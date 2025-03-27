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
  CalendarCheck,
  CalendarRange,
  BedDouble,
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
            Inscripción al Congreso Nacional de RCP: ¡No te quedes afuera!
          </h1>
          <p className="text-lg mt-4">Incluye certificado de participación</p>
        </motion.div>
      </section>

      <motion.section
        className="bg-gray-100 py-16 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="inscribirse"
      >
        <h2 className="text-4xl font-bold">Opciones de inscripción</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
          {/* Un solo día */}
          <motion.div
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <CalendarCheck className="w-12 h-12 text-blue-600" />
            <h3 className="text-lg font-semibold mt-2">Un solo día - $5.000</h3>
            <p className="text-gray-600">
              Acceso completo al congreso por un día, con programa, credencial,
              desayuno, refrigerios y uso de instalaciones.
            </p>
            <Button asChild className="mt-4">
              <a
                href="https://forms.gle/bGpzXueC3CvU8uVZ7"
                target="_blank"
                rel="noopener noreferrer"
              >
                Inscribirse
              </a>
            </Button>
          </motion.div>

          {/* Tres días sin alojamiento */}
          <motion.div
            className="flex flex-col items-center bg-primary text-white p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <CalendarRange className="w-12 h-12 text-secondary" />
            <h3 className="text-lg font-semibold mt-2">
              Tres días sin alojamiento - $15.000
            </h3>
            <p className="text-gray-300">
              Incluye acceso completo durante los 3 días, programa, credencial,
              desayuno diario, refrigerios y uso de instalaciones.
            </p>
            <Button asChild className="mt-4 text-black" variant="outline">
              <a
                href="https://forms.gle/SUugngtLudHCXD7M8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Inscribirse
              </a>
            </Button>
          </motion.div>

          {/* Tres días con alojamiento */}
          <motion.div
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <BedDouble className="w-12 h-12 text-purple-600" />
            <h3 className="text-lg font-semibold mt-2">
              Tres días con alojamiento (dormitorios compartidos) - $30.000
            </h3>
            <p className="text-gray-600">
              Todo lo anterior + alojamiento limpio y cómodo en dormitorios
              compartidos. Disponible desde el día anterior al congreso (4
              noches).
            </p>
            <span className="text-gray-600 font-bold">
              🎟️ Cupos limitados a 70 personas. ¡Asegura tu lugar y no te
              pierdas esta oportunidad!
            </span>
            <Button asChild className="mt-4">
              <a
                href="https://forms.gle/YcAAUcLJNr165PQS6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Inscribirse
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Información Clave */}
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
            <h3 className="text-lg font-semibold mt-2">Cupo Limitado</h3>
            <p className="text-gray-600">
              Solo 70 participantes para asegurar una capacitación
              personalizada.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Cards */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <PricingCardDemo />
      </motion.div>

      {/* Beneficios */}
      <motion.section
        className="bg-gray-100 py-16 px-6 text-center"
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
        className="py-16 text-center px-6"
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
