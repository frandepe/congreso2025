import { Agradecimientos } from "@/components/Agradecimientos/Agradecimientos";
import BannerPrincipal from "@/components/Banners/BannerPrincipal";
import { Comite } from "@/components/Comite/Comite";
import Countdown from "@/components/Countdown/Countdown";
import { DescImgs } from "@/components/DescImgs/DescImgs";
import { Projector, Sandwich } from "lucide-react";
import React from "react";

const features= [
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
  // {
  //   id: 3,
  //   icon: Brain,
  //   title: "AI-Powered Learning",
  //   description:
  //     "Experience personalized, AI-driven learning tailored for BCA, BBA, and other students.",
  //   image: "https://bcalabs.org/companions_group_2.jpg",
  // },
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

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
          <Countdown />
        </div>
      </div>
      <DescImgs />

      <div className="mt-10">
        <Agradecimientos primaryColor="sky-500"
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
