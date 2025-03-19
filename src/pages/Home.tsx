import Countdown from "@/components/Countdown/Countdown";
import { Button } from "@/components/ui/button";
import React from "react";
// https://ar.pinterest.com/pin/921760248723153667/visual-search/?surfaceType=flashlight&rs=pin
// https://ar.pinterest.com/pin/879468633471773463/visual-search/?surfaceType=flashlight&rs=search
export const Home = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-700">
          Página en construcción
        </h1>
      </div>
      {/* <div className="bg-darkGreen text-white p-4">
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
      <Button className="bg-primary">a ver</Button> */}
      <Countdown />
    </div>
  );
};
