import Map from "@/components/Map/Map";
import { Hoteles } from "@/components/Hoteles/hoteles";
import { Feature } from "@/components/ui/feature-with-image-carousel";
import React from "react";
import { HotelPagination } from "@/components/HotelPagination/HotelPagination";
import { Badge } from "lucide-react";
import { Transporte } from "@/components/Transporte/Transporte";

export const UbicacionYAlojamiento = () => {
  return (
    <div>
      <Hoteles />
      <div className="mb-48 px-6">
        <Transporte />
      </div>
      <Map />
    </div>
  );
};
