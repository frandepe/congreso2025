import BannerPrincipal from "@/components/Banners/BannerPrincipal";
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
  return (
    <div className="relative">
      <div className="relative">
        <BannerPrincipal />
        {/* Posicionamos Countdown exactamente entre ambos */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
          <Countdown />
        </div>
      </div>
      <DescImgs />
      {/* <div className="bg-redOrange text-white h-48 p-4">
        <h1 className="text-3xl">Este es un ro</h1>
      </div> */}
      {/* <StickyScroll content={content} /> */}
    </div>
  );
};
