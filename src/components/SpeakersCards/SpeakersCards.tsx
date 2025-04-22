import { FocusCards } from "@/components/ui/focus-cards";

export function SpeakersCards() {
  const cards = [
    {
      title: "Marta Iriarte",
      src: "/assets/speakers/marta-iriarte2.jpg",
    },
    {
      title: "Nicolás De Paulo",
      src: "/assets/speakers/nicolas-de-paulo2.png",
      subtitle:
        "Coordinador de Defensa Civil del Municipio de Trenque Lauquen.",
      description:
        "Ex Bombero Voluntario en cuartel de la ciudad de Pellegrini, con ingreso Septiembre de 1980, siendo parte del grupo fundacional del mismo, con las capacitaciones recibidas de la Federación de Asociaciones de Bomberos Voluntarios de la Provincia de Bs As.  Se desempeñó  como: Bombero, Oficial, Segundo Jefe de C.A. y Jefe del C.A. en esa institución, en lo referente a la Federación, ocupo los cargos de Inspector Zonal (Región Oeste de la F.A.B.V.P.B.A.) Y de Director de Capacitación de la F.A.B.V.P.B.A. Región Oeste con 33 cuarteles a cargo de la capacitación.  Promovió desde ese lugar, en la década del 90, junto a un grupo de Bomberos de la Región Oeste, en el congreso de la federación que se realiza cada dos años, que la materia “PSICOLOGIA EN EMERGENCIAS” fuese parte del curso de ingreso a los cuarteles de la Provincia, prevaleciendo la salud psíquica del bombero por sobre todas las cosas. Realizo y aprobó  el “Diplomado Internacional Universitario en Psicología de la Emergencia, Autocuidados y Soporte Preventivo para diferentes Victimas y Personal Interviniente en Crisis, Emergencias, Desastres y Catástrofes” Dictado por la Universidad Católica de Cuyo Sede San Luis Capital, El Instituto de Capacitación e Investigación del Poder Judicial de San Luis y como Jefe de Catedra el Lic. Especialista Psicología de la Emergencia, Diego Núñez. Realizo diferentes capacitaciones con la Licenciada Alicia Galfaso catedrática de la UBA y mentora de los equipos PAE (Primeros Auxilios Emocionales) a nivel mundial, con quien está cursando en la actualidad para completar los diferentes estándares de sus equipos. Desde 2017 Instructor de Socorrismo Urbano con técnicas de RCP y uso del DEA, Formador de Brigadas de Emergencias, Monitor de Zonas Cardioseguras, Primero Socorros Pediátricos e Instructor de Primeros Socorros Psicológicos, todos estos desde ASES y con el aval de AIDER.org. Titular de ND Capacitaciones (Capacitaciones para emergencias)",
    },
    {
      title: "Persona 3",
      src: "https://plus.unsplash.com/premium_photo-1705267936133-2235344e0d8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHNwZWFrZXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Persona 4",
      src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Persona 5",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Persona 6",
      src: "https://plus.unsplash.com/premium_photo-1689551671548-79ff30459d2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    },
  ];

  return <FocusCards cards={cards} />;
}
