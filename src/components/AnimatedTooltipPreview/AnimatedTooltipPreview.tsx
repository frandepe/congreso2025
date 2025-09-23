"use client";

import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Marta Iriarte",
    designation: "CEO en Marta Iriarte Consultoría Laboral",
    image: "/assets/speakers/cara/marta-iriarte.jpg",
  },
  {
    id: 2,
    name: "Nicolas De Paulo",
    designation: "Instrucor de primeros auxilios",
    image: "/assets/speakers/cara/nicolas-de-paulo.jpg",
  },
  // {
  //   id: 3,
  //   name: "Juan Sebastian Fabi",
  //   designation: "Socio cofundador de Nexo Tecnológico",
  //   image: "/assets/speakers/cara/juan-sebastian-fabi-cara.jpg",
  // },
  {
    id: 4,
    name: "Patricia Soto",
    designation: "Fundadora y CEO de Nexo Tecnológico",
    image: "/assets/speakers/cara/patricia-soto-cara.jpg",
  },
  {
    id: 5,
    name: "Miguel Angel Grima",
    designation: "Grupo PAS",
    image: "/assets/speakers/cara/miguel-angel-grima-cara.jpg",
  },
  {
    id: 6,
    name: "Guillermo Carranza",
    designation: "Fundador de CEEByPS",
    image: "/assets/speakers/cara/guille-carranza.jpg",
  },
  {
    id: 7,
    name: "Rodrigo Baluk",
    designation: "Licenciado en Administración",
    image: "/assets/speakers/cara/rodrigo-baluk-cara.jpg",
  },
  {
    id: 8,
    name: "Borja Díez Sainz",
    designation: "Médico especialista en Medicina Intensiva",
    image: "/assets/speakers/cara/Borja-Diez-Sainz.jpg",
  },
];

function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}

export { AnimatedTooltipPreview };
