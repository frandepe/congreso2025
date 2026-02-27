import { Comite } from "@/components/About/Comite";
import { TimelineContent } from "@/components/About/TimelineAnimation";
import { InstitutionalSection } from "@/components/About/Values";
import { VerticalCutReveal } from "@/components/About/VerticalCutReveal";
import { useRef } from "react";

const reviews = [
  {
    id: 1,
    name: "Nicolas De Paulo",
    affiliation: "Presidente",
    quote:
      "Ex bombero y Coordinador de Defensa Civil del Municipio de Trenque Lauquen.",
    // Image from the provided screenshot
    imageSrc: "/assets/speakers/nicolas-de-paulo2.png",
    thumbnailSrc: "/assets/speakers/nicolas-de-paulo2.png",
  },
  {
    id: 2,
    name: "Sergio Felice",
    affiliation: "Comité organizador",
    quote: "Presidente de la Asociación Civil Argentina Reanima",
    // Image from the provided screenshot
    imageSrc: "/assets/speakers/sergio2.jpg",
    thumbnailSrc: "/assets/speakers/sergio2.jpg",
  },
  {
    id: 3,
    name: "Guillermo Carranza",
    affiliation: "Comité organizador",
    quote:
      "Fundador del Centro de Entrenamiento de Especialidades Bomberiles y Primeros Socorros (CEEByPS)",
    // Thumbnail from the provided screenshot
    imageSrc: "/assets/speakers/guille-carranza.png",
    thumbnailSrc: "/assets/speakers/guille-carranza.png",
  },
];

export default function AboutSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };
  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };
  return (
    <section className="py-8 px-4 bg-[#f9f9f9]" ref={heroRef}>
      <div className="container mx-auto">
        <div className="relative">
          {/* Header with social icons */}
          <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
            <div className="flex items-center gap-2  text-xl">
              <span className="text-primary animate-spin">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm font-medium text-gray-600"
              >
                ¿QUIÉNES SOMOS?
              </TimelineContent>
            </div>
            <div className="flex gap-4">
              <TimelineContent
                as="a"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.facebook.com/profile.php?id=61574079247674"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100  rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img
                  src="https://pro-section.ui-layouts.com/facebook.svg"
                  alt="fb"
                  width={24}
                  height={24}
                />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.instagram.com/congresonacionalrcp/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img
                  src="https://pro-section.ui-layouts.com/instagram.svg"
                  alt="insta"
                  width={24}
                  height={24}
                />
              </TimelineContent>

              <TimelineContent
                as="a"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.youtube.com/@CongresoNacionalRCP"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img
                  src="https://pro-section.ui-layouts.com/youtube.svg"
                  alt="youtube"
                  width={24}
                  height={24}
                />
              </TimelineContent>
            </div>
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group"
          >
            <svg
              className="w-full"
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100 40"
            >
              <defs>
                <clipPath
                  id="clip-inverted"
                  clipPathUnits={"objectBoundingBox"}
                >
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width={"100%"}
                height={"100%"}
                xlinkHref="/assets/2025/todos.jpg"
              ></image>
            </svg>
          </TimelineContent>

          {/* Stats */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-secondary font-bold">2do</span>
                <span className="text-gray-600">año con vos</span>
                <span className="text-gray-300">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-secondary font-bold">+10</span>
                <span className="text-gray-600">exposiciones</span>
              </div>
            </TimelineContent>
            <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex lg:text-4xl sm:text-3xl text-2xl items-center gap-2 mb-2"
              >
                <span className="text-secondary font-semibold">Congreso</span>
                <span className="text-gray-600 uppercase">RCP</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 mb-2 sm:text-base text-xs"
              >
                <span className="text-secondary font-bold">Nuestra</span>
                <span className="text-gray-600">historia</span>
                <span className="text-gray-300 lg:hidden block">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-gray-900 mb-8">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 3,
                }}
              >
                ¿Quiénes Somos?
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid md:grid-cols-2 gap-8 text-gray-600"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs space-y-4"
              >
                <p className="leading-relaxed text-justify">
                  El *Congreso Nacional de RCP* es un espacio académico y
                  profesional destinado a *fortalecer la formación,
                  actualización y el desarrollo de instructores en Reanimación
                  Cardiopulmonar (RCP)* en todo el país.
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">
                  Este congreso surge como una iniciativa independiente
                  impulsada por instructores y profesionales comprometidos con
                  la mejora continua de la enseñanza, entendiendo que la calidad
                  de la formación impacta directamente en la respuesta ante
                  emergencias y en la seguridad de la comunidad.
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-primary text-2xl font-bold"
              >
                Congreso Nacional de RCP
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-gray-600 text-sm mb-8"
              >
                Formación responsable para una mejor respuesta ante emergencias.
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs text-gray-600"
              >
                <p className="leading-relaxed text-justify">
                  Nos proponemos generar un ámbito serio, respetuoso y basado en
                  evidencia científica, donde instructores de distintas
                  instituciones, sistemas y disciplinas puedan encontrarse,
                  compartir experiencias y acceder a herramientas actualizadas.
                </p>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
      <div className="my-20">
        <InstitutionalSection />
      </div>
      <div className="w-full">
        <Comite reviews={reviews} />
      </div>
    </section>
  );
}
