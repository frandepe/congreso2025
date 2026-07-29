import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Clock,
  Globe2,
  GraduationCap,
  HeartPulse,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const whatsappRegistrationUrl =
  "https://wa.me/5492392460227?text=Hola%2C%20quiero%20inscribirme%20al%20Curso%20Oficial%20ERC%20de%20Soporte%20Vital%20B%C3%A1sico%20y%20DEA.";

const heroBadges = [
  "Pre Congreso",
  "Viernes 2 de octubre",
  "Trenque Lauquen",
  "Solo 16 cupos",
  "Titulación Oficial ERC",
  "Validación Internacional",
];

const valueCards = [
  {
    title: "Titulación Oficial ERC",
    description:
      "Certificación emitida bajo estándares del European Resuscitation Council.",
    icon: Award,
  },
  {
    title: "Validación internacional",
    description:
      "Una credencial reconocida para fortalecer tu perfil profesional en emergencias.",
    icon: Globe2,
  },
  {
    title: "100% práctica",
    description:
      "Seis horas de entrenamiento intensivo con escenarios, corrección técnica y evaluación.",
    icon: HeartPulse,
  },
  {
    title: "RCP y DEA integral",
    description:
      "Trabajo sobre adultos, niños y lactantes con foco en intervenciones seguras y efectivas.",
    icon: Stethoscope,
  },
  {
    title: "Solo 16 participantes",
    description:
      "Un formato reducido para asegurar seguimiento cercano y práctica supervisada.",
    icon: Users,
  },
  {
    title: "Docentes internacionales",
    description:
      "Instructores oficiales ERC viajan desde Cataluña exclusivamente para esta actividad.",
    icon: Plane,
  },
];

const instructors = [
  {
    name: "Miguel Ángel Grima Salinas",
    role: "Director e Instructor ERC",
    image: "/assets/speakers/miguel-angel-grima.jpeg",
    highlights: [
      "Gerente y fundador de Grupo PAS.",
      "Especialista en formación sanitaria y espacios cardioprotegidos.",
      "Referente internacional en soporte vital básico y DEA.",
    ],
  },
  {
    name: "Meritxell Ros",
    role: "Instructora ERC de SVB y DEA",
    image: "/assets/speakers/meritxell-ros.jpg",
    highlights: [
      "Técnica en Emergencias Sanitarias.",
      "Bombera voluntaria en Cataluña.",
      "Instructora de Primeros Auxilios y profesora de TES.",
    ],
  },
];

const courseInfo = [
  {
    label: "Fecha",
    value: "Viernes 2 de octubre - 14:00hs",
    icon: CalendarDays,
  },
  { label: "Lugar", value: "Trenque Lauquen, Buenos Aires", icon: MapPin },
  { label: "Duración", value: "6 horas", icon: Clock },
  { label: "Modalidad", value: "100% práctica", icon: HeartPulse },
  { label: "Cupos", value: "16 participantes", icon: Users },
  { label: "Valor", value: "$120.000", icon: Sparkles },
  {
    label: "Requisito",
    value: "Inscripción previa al Congreso Nacional de RCP",
    icon: ShieldCheck,
  },
];

const sectionMotion = {
  initial: { opacity: 0, transform: "translateY(18px)" },
  whileInView: { opacity: 1, transform: "translateY(0)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
};

export function CursoOficialErc() {
  return (
    <div className="overflow-hidden bg-white text-slate-950 dark:bg-background dark:text-white">
      <section className="relative min-h-[calc(100vh-148px)] bg-white px-5 py-10 sm:px-8 lg:px-10 dark:bg-background">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-orange/15 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            animate={{ opacity: 1, transform: "translateY(0)" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-2 text-sm font-semibold text-darkGreen dark:text-white">
              <GraduationCap className="size-4 text-orange" />
              Certificación internacional en el Pre Congreso
            </div>

            <h1 className="text-4xl font-black leading-[1.02] tracking-normal text-darkGreen sm:text-5xl lg:text-7xl dark:text-white">
              Curso Oficial ERC
              <span className="mt-2 block text-orange">
                Soporte Vital Básico y DEA
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-200">
              Una formación internacional dictada por instructores oficiales del
              European Resuscitation Council (ERC), que llegan desde Cataluña,
              España exclusivamente para el Congreso Nacional de RCP.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-darkGreen/10 bg-slate-50 px-3.5 py-2 text-sm font-bold text-darkGreen shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-md bg-darkGreen px-7 text-base shadow-lg shadow-darkGreen/20 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
              >
                <a
                  href={whatsappRegistrationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Quiero inscribirme
                </a>
              </Button>
              <div className="rounded-md border border-orange/30 bg-orange/10 px-4 py-3 text-sm font-semibold leading-6 text-darkGreen dark:text-white">
                Para realizar este curso es obligatorio estar previamente
                inscripto en el Congreso Nacional de RCP.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, transform: "translateY(22px) scale(0.98)" }}
            animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="relative min-h-[500px]"
          >
            <div className="absolute left-2 top-4 h-72 w-56 overflow-hidden rounded-md shadow-2xl sm:h-96 sm:w-72">
              <img
                src="/assets/speakers/miguel-angel-grima.jpeg"
                alt="Miguel Ángel Grima Salinas, instructor oficial ERC"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-6 right-0 h-80 w-60 overflow-hidden rounded-md shadow-2xl sm:h-[420px] sm:w-80">
              <img
                src="/assets/speakers/meritxell-ros.jpg"
                alt="Meritxell Ros, instructora oficial ERC"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 max-w-xs rounded-md border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">
                Cupos ultra limitados
              </p>
              <p className="mt-2 text-4xl font-black text-darkGreen dark:text-white">
                16
              </p>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Participantes para una experiencia de práctica intensiva,
                cercana y evaluada por instructores oficiales.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        {...sectionMotion}
        className="border-y border-slate-200 bg-slate-50 px-5 py-20 sm:px-8 lg:px-10 dark:border-white/10 dark:bg-white/5"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">
              Por qué este curso
            </p>
            <h2 className="mt-3 text-3xl font-black text-darkGreen sm:text-5xl dark:text-white">
              Una oportunidad poco frecuente de certificar con estándares ERC en
              Argentina.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {valueCards.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-md border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-orange/50 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/50"
              >
                <Icon className="size-8 text-orange" />
                <h3 className="mt-5 text-xl font-black text-darkGreen dark:text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        {...sectionMotion}
        className="bg-white px-5 py-20 sm:px-8 lg:px-10 dark:bg-background"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">
                Docentes
              </p>
              <h2 className="mt-3 text-3xl font-black text-darkGreen sm:text-5xl dark:text-white">
                Instructores oficiales que llegan desde Cataluña.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
              Un pantallazo rápido de quienes dictan la capacitación, con foco
              en su experiencia en soporte vital, DEA y formación sanitaria.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {instructors.map((instructor) => (
              <article
                key={instructor.name}
                className="grid overflow-hidden rounded-md border border-slate-200 bg-slate-50 shadow-sm md:grid-cols-[0.82fr_1fr] dark:border-white/10 dark:bg-white/5"
              >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="h-80 w-full object-cover md:h-full"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">
                    {instructor.role}
                  </p>
                  <h3 className="mt-3 text-2xl font-black text-darkGreen dark:text-white">
                    {instructor.name}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {instructor.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200"
                      >
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-lightGreen" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        {...sectionMotion}
        className="bg-darkGreen px-5 py-20 text-white sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">
              Requisito obligatorio
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Para participar del curso ERC, primero tenés que estar inscripto
              en el Congreso.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/75">
              El Curso Oficial ERC forma parte de las actividades del Pre
              Congreso. La inscripción al Congreso Nacional de RCP es condición
              necesaria para poder reservar uno de los 16 cupos disponibles.
            </p>
            <Button
              asChild
              variant="secondary"
              className="mt-7 rounded-md px-6 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
            >
              <Link to="/inscripcion/participantes">
                Inscribirme al Congreso
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-white/10 p-5">
              <ShieldCheck className="size-8 text-orange" />
              <h3 className="mt-5 text-lg font-black">Paso 1</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Completá tu inscripción como participante del Congreso Nacional
                de RCP.
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/10 p-5">
              <Users className="size-8 text-orange" />
              <h3 className="mt-5 text-lg font-black">Paso 2</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Consultá por WhatsApp la disponibilidad del cupo para el Curso
                Oficial ERC.
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/10 p-5">
              <Award className="size-8 text-orange" />
              <h3 className="mt-5 text-lg font-black">Paso 3</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Confirmá tu lugar en una actividad oficial con cupos muy
                limitados.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        {...sectionMotion}
        className="bg-white px-5 py-20 sm:px-8 lg:px-10 dark:bg-background"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">
              Información del curso
            </p>
            <h2 className="mt-3 text-3xl font-black text-darkGreen sm:text-5xl dark:text-white">
              Todo lo esencial, claro antes de inscribirte.
            </h2>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="grid gap-3 sm:grid-cols-2">
              {courseInfo.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-md bg-white p-4 dark:bg-slate-950/60"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-orange">
                    <Icon className="size-4" />
                    {label}
                  </div>
                  <p className="mt-2 text-base font-black text-darkGreen dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        {...sectionMotion}
        className="px-5 pb-24 sm:px-8 lg:px-10 dark:bg-background"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-md bg-[linear-gradient(135deg,#1D3B1F_0%,#1D3B1F_52%,#F7941D_52%,#F7941D_100%)] p-1">
          <div className="rounded-md bg-white p-7 sm:p-10 lg:p-14 dark:bg-slate-950">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">
                  Últimos lugares
                </p>
                <h2 className="mt-3 max-w-3xl text-3xl font-black text-darkGreen sm:text-5xl dark:text-white">
                  Certificación oficial ERC sin salir del país.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-200">
                  Los instructores viajan desde Cataluña, España exclusivamente
                  para esta actividad del Pre Congreso. Hay solo 16 lugares y es
                  obligatorio estar inscripto previamente en el Congreso
                  Nacional de RCP.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-12 rounded-md px-7 text-base shadow-lg shadow-orange/20 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
              >
                <a
                  href={whatsappRegistrationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Quiero inscribirme
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
