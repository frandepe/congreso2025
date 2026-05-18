import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Marta Iriarte",
    designation: "CEO en Marta Iriarte Consultoría Laboral",
    image: "/assets/speakers/cara/marta-iriarte.jpg",
  },
  // {
  //   id: 2,
  //   name: "Nicolas De Paulo",
  //   designation: "Instrucor de primeros auxilios",
  //   image: "/assets/speakers/cara/nicolas-de-paulo.jpg",
  // },
  {
    id: 3,
    name: "Esteban Verón",
    designation: "Capacitador en emergencias inclusivas",
    image: "/assets/speakers/cara/esteban-veron.jpg",
  },
  {
    id: 4,
    name: "Dr. Guillermo Sandrone",
    designation: "Abogado",
    image: "/assets/speakers/cara/guillermo-sandrone.jpg",
  },
  {
    id: 5,
    name: "Martín Labarrieta",
    designation: "Lic. Tecnología Médica - Abogado",
    image: "/assets/speakers/cara/martin-labarrieta.jpg",
  },
  {
    id: 6,
    name: "Miguel Ángel Grima Salinas",
    designation: "Emprendedor en el ámbito de las emergencias",
    image: "/assets/speakers/cara/miguel-angel-grima-cara.jpg",
  },
  {
    id: 7,
    name: "Meritxell Ros",
    designation: "Técnico de Emergencias Sanitarias.",
    image: "/assets/speakers/cara/meritxell-ros.jpg",
  },
  {
    id: 8,
    name: "Emiliano Velasco",
    designation: "Emprendedor en el ámbito de las emergencias",
    image: "/assets/speakers/cara/emiliano-velasco.jpg",
  },
  {
    id: 9,
    name: "Javier Gonzalez",
    designation: "Superintendencia de comunicaciones",
    image: "/assets/speakers/cara/javier-gonzalez.jpg",
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
