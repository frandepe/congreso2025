import Map from "@/components/Map/Map";
import { OpcionesDeTransporte } from "@/components/OpcionesDeTransporte/opciones-de-transporte";
import { Feature } from "@/components/ui/feature-with-image-carousel";
import React from "react";

export const UbicacionYAlojamiento = () => {
  return (
    <div>
      <div className="w-full">
        <OpcionesDeTransporte />
      </div>
      <div className="w-full">
        <Feature />
      </div>
      <Map />
    </div>
  );
};
