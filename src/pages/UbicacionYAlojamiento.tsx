import Map from "@/components/Map/Map";
import { Hoteles } from "@/components/Hoteles/hoteles";
import React from "react";
import { Transporte } from "@/components/Transporte/Transporte";
import { Button } from "@/components/ui/button";

export const UbicacionYAlojamiento = () => {

  return (
    <div className="dark:bg-background">
      <Hoteles />
      <div className="mb-48 px-6">
        <Transporte />
      </div>
      <div className="flex items-center justify-center gap-4 py-8 text-center mb-48">
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
            Descubrí Trenque Lauquen
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            Explorá todo lo que esta ciudad tiene para ofrecer: cultura,
            naturaleza, historia y mucho más.
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button variant="secondary" className="w-full sm:w-auto" asChild>
              <a
                href="https://www.trenquelauquen.gov.ar/turismo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visitar sitio oficial
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Map />
    </div>
  );
};
