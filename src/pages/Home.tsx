import BannerPrincipal from "@/components/Banners/BannerPrincipal";
import { Comite } from "@/components/Comite/Comite";
import Countdown from "@/components/Countdown/Countdown";
import { DescImgs } from "@/components/DescImgs/DescImgs";
import { Button } from "@/components/ui/button";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import React from "react";

// const content = [
//   {
//     title: "Título 1",
//     description:
//       "Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1",
//     content: "Contenido 1",
//   },
//   {
//     title: "Título 2",
//     description:
//       "Descripción 2 Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1",
//     content: "Contenido 2",
//   },
//   {
//     title: "Título 2",
//     description:
//       "Descripción 2 Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1Descripción 1",
//     content: "Contenido 2",
//   },
// ];
// https://ar.pinterest.com/pin/921760248723153667/visual-search/?surfaceType=flashlight&rs=pin
// https://ar.pinterest.com/pin/879468633471773463/visual-search/?surfaceType=flashlight&rs=search
{
  /* <div className="bg-darkGreen text-white p-4">
        <h1 className="text-3xl">Este es un título con fondo verde oscuro</h1>
      </div>

      <div className="bg-orange text-white p-4">
        <h1 className="text-3xl">Este es un título con fondo naranja</h1>
      </div>

      <div className="bg-redOrange text-white p-4">
        <h1 className="text-3xl">
          Este es un título con fondo rojo anaranjado
        </h1>
      </div>

      <div className="bg-lightGreen text-white p-4">
        <h1 className="text-3xl">Este es un título con fondo verde claro</h1>
      </div>
      <Button className="bg-primary">a ver</Button> */
}
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
    <div className="relative">
      <div className="relative">
        <BannerPrincipal />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
          <Countdown />
        </div>
      </div>
      <DescImgs />
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
