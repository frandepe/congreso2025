import { Agradecimientos } from "@/components/Agradecimientos/Agradecimientos";
import BannerPrincipal from "@/components/Banners/BannerPrincipal";
import { Comite } from "@/components/Comite/Comite";
import Countdown from "@/components/Countdown/Countdown";
import { DescImgs } from "@/components/DescImgs/DescImgs";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Projector, Sandwich } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

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
      <div className="relative">
        <BannerPrincipal />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Countdown />
        </div>
      </div>
      <DescImgs />

      <section className="relative md:h-[400px] h-[450px] flex items-center justify-center mb-10 md:mb-40">
        {/* Capa con imagen de fondo y desenfoque filter blur-xs*/}
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
