"use client";

import React, { type SVGProps } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel } from "@/components/ui/logo-carousel";

function NDcapacitaciones(props: SVGProps<SVGSVGElement>) {
  return (
    <img
      src={"/assets/patrocinadores/nd-capacitaciones.png"}
      width={100}
      height={100}
    />
  );
}

function NexoTecnologico(props: SVGProps<SVGSVGElement>) {
  return (
    <img
      src={"/assets/patrocinadores/nexo-tecnologico.png"}
      width={100}
      height={100}
    />
  );
}

function TL(props: SVGProps<SVGSVGElement>) {
  return (
    <img src={"/assets/patrocinadores/patro-tl.png"} width={100} height={100} />
  );
}

const DC = (props: SVGProps<SVGSVGElement>) => (
  <img src={"/assets/patrocinadores/patro-dc.png"} width={100} height={100} />
);

// const ArgentinaReanima = (props: SVGProps<SVGSVGElement>) => (
//   <img src={"/assets/patrocinadores/argentinareanima.png"} width={100} height={100} />
// );

// Массив с логотипами
const allLogos = [
  { name: "DC", id: 1, img: DC },
  { name: "TL", id: 2, img: TL },
  { name: "NexoTecnologico", id: 3, img: NexoTecnologico },
  { name: "NDcapacitaciones", id: 4, img: NDcapacitaciones },
  // { name: "ArgentinaReanima", id: 5, img: ArgentinaReanima },
];

export function PatrocinadoresComponent() {
  return (
    <div className="space-y-8 py-24">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
        <div className="text-center">
          <GradientHeading variant="secondary">
            Empresas e instituciones
          </GradientHeading>
          <GradientHeading size="xxl">Destacados</GradientHeading>
        </div>
        <LogoCarousel columnCount={3} logos={allLogos} />
      </div>
    </div>
  );
}
