import { Agradecimientos } from "@/components/Agradecimientos/Agradecimientos";
import BannerPrincipal from "@/components/Banners/BannerPrincipal";
import { Comite } from "@/components/Comite/Comite";
import Countdown from "@/components/Countdown/Countdown";
import { DescImgs } from "@/components/DescImgs/DescImgs";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Activity, Eye, Projector, Sandwich, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LiveVideo from "@/components/Videos/Vivo";
import { AnimatedFeatureSpotlight } from "@/components/Banners/PromoCardio";

const features = [
  {
    id: 1,
    icon: Projector,
    title: "Ep Eventos",
    description:
      "Este congreso contará con sonido, iluminación y pantalla de EP EVENTOS",
    image: "/assets/ep-eventos.jpeg",
  },
  {
    id: 2,
    icon: Sandwich,
    title: "Food truck Los Cuscus",
    description:
      "La mejor calidad y servicio en comida rápida la tenemos con nosotros",
    image: "/assets/foot-truck2.jpg",
  },
];

export const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // < md en Tailwind
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Abrir modal luego de 3s SOLO si es mobile
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => setOpenModal(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const testimonials = [
    {
      img: "/assets/speakers/cara/nicolas-de-paulo.jpg",
      quote: "Nicolas De Paulo",
      role: "Presidente",
    },
    {
      img: "/assets/logo-navbar.png",
      quote: "Patricia Soto - Guillermo Carranza - Sergio Felice",
      role: "Secretaria general",
    },
    {
      img: "https://frandepe.vercel.app/imgs/foto2.png",
      quote: "Franco De Paulo",
      role: "Secretaria técnica",
    },
  ];

  return (
    <div className="relative dark:bg-background">
      {/* Modal solo en mobile */}
      <AnimatePresence>
        {openModal && isMobile && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl p-6 max-w-lg mx-4 shadow-xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-3 right-3 text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-bold text-center mb-4 text-primary">
                🙌 ¡Gracias por ser parte del Congreso Nacional de RCP 2025! 🙌
              </h2>
              <p className="text-center mb-4">
                Queremos seguir mejorando. Nos encantaría conocer tu opinión
                sobre esta edición.
              </p>
              <p className="text-center mb-4 font-semibold text-destructive">
                📝 Completá una breve encuesta a continuación:
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={() =>
                    window.open("https://forms.gle/JS16Ez9W5EaRyiBx5", "_blank")
                  }
                >
                  💬 RESPONDER ENCUESTA
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resto de la página */}
      <div className="relative">
        <BannerPrincipal />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Countdown />
        </div>
      </div>
      <div className="my-20">
        <LiveVideo />
      </div>
      <div className="flex items-center justify-center w-full bg-muted py-20">
        <AnimatedFeatureSpotlight
          preheaderIcon={<Activity className="h-4 w-4" />}
          preheaderText="Tecnología cardiovascular de vanguardia desde 1981"
          heading={
            <>
              <span className="text-primary">
                Equipamiento Médico Hospitalario | Bioingeniería
              </span>
            </>
          }
          description="Cardiosistemas tiene como propósito proveer productos y servicios de óptima calidad destinados a satisfacer las necesidades de los profesionales médicos en el diagnóstico, tratamiento y rehabilitación cardiovascular para mejorar la práctica médica, la atención de los pacientes y la salud de la población en su conjunto."
          buttonText="Visitar web"
          buttonProps={{
            onClick: () =>
              window.open("https://cardiosistemas.com.ar/", "_blank"),
          }}
          imageUrl="/assets/patrocinadores/cardiosistemas.png"
          imageAlt="Cardiosistemas tiene como propósito proveer productos"
        />
      </div>
      <DescImgs />

      <section className="relative md:h-[400px] h-[450px] flex items-center justify-center mb-10 md:mb-40">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('/assets/radio1.jpg')] bg-cover"
            style={{ backgroundPosition: "center top 30%" }}
          ></div>
          <div className="absolute inset-0 bg-green-500 opacity-30 mix-blend-multiply"></div>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white max-w-4xl px-6 py-6"
        >
          <AudioPlayer />
        </motion.div>
      </section>

      <div>
        <Agradecimientos
          primaryColor="sky-500"
          progressGradientLight="bg-gradient-to-r from-secondary/70 to-secondary"
          progressGradientDark="bg-gradient-to-r from-secondary/70 to-secondary"
          features={features}
        />
      </div>

      <div className="relative w-full overflow-hidden rounded-lg">
        <h3 className="text-center font-bold text-primary">
          Comité organizador
        </h3>
        <div className="mt-4 flex justify-center px-12">
          <Comite testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
};
