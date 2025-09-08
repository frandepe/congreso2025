import { PatrocinadoresComponent } from "@/components/SliderPatrocinadores/Patrocinadores";
import SliderPatrocinadores from "@/components/SliderPatrocinadores/SliderPatrocinadores";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import React from "react";
import { CardsPatrocinadoresPagination } from "@/components/CardsPatrocinadoresPagination/CardsPatrocinadoresPagination";
import { PropuestaPatrocinio } from "@/components/PropuestaPatrocinio/PropuestaPatrocinio";

export const Patrocinadores = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Hero Section with Intro */}
      <section className="relative w-full h-[350px] flex items-center justify-center">
        {/* Capa con imagen de fondo y desenfoque filter blur-xs*/}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('/assets/banner2.jpg')] bg-cover"
            style={{ backgroundPosition: "center top 30%" }}
          ></div>
          <div className="absolute inset-0 bg-green-500 opacity-30 mix-blend-multiply"></div>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white max-w-4xl px-6"
        >
          <h1 className="text-4xl font-extrabold leading-tight">
            Patrocinadores y Auspiciantes del Congreso Nacional de RCP
          </h1>
          <p className="mt-4 text-lg">
            El Congreso Nacional de RCP es posible gracias al apoyo de empresas
            e instituciones comprometidas con la capacitación en primeros
            auxilios y emergencias.
          </p>
        </motion.div>
      </section>

      {/* Introduction to Sponsorships */}
      <section className="py-16 text-center bg-gray-100 dark:bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-lg text-gray-600 mb-8">
            Si deseas que tu marca forme parte de este evento, te invitamos a
            sumarte como Patrocinador o Auspiciante.
          </p>
          <h2 className="text-3xl font-bold mb-6">
            ¿Quieres ser Patrocinador o Auspiciante del Congreso Nacional de
            RCP?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Tu marca puede formar parte de este gran evento apoyando la
            capacitación en RCP y primeros auxilios.
          </p>

          {/* Buttons to the Forms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <PropuestaPatrocinio />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="https://forms.gle/3mQqU8Y2nwj3PoR49"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" className="w-full">
                  ¿Quieres ser Auspiciante?
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Closing Statement */}
          <p className="mt-8 text-lg text-gray-600">
            Juntos, podemos hacer la diferencia y salvar más vidas.
          </p>
        </motion.div>
      </section>
      <section className="flex justify-center flex-col">
        <p className="underline text-primary text-center my-6">
          Distribución del congreso 👇
        </p>
        <div className="w-full max-w-screen-md mx-auto mb-6">
          <img
            src="/assets/mapa-patrocinadores.jpeg"
            alt="mapa de patrocinadores"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Patrocinadores and Slider */}
      <div className="bg-white py-16 dark:bg-gray-700">
        <PatrocinadoresComponent />
        <SliderPatrocinadores />
      </div>
      <div className="w-full flex justify-center">
        <CardsPatrocinadoresPagination />
      </div>
    </div>
  );
};
