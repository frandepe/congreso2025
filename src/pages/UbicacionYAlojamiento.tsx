import Map from "@/components/Map/Map";
import { Hoteles } from "@/components/Hoteles/hoteles";
import { Transporte } from "@/components/Transporte/Transporte";
import { Button } from "@/components/ui/button";
import { AnimatedModalDemo } from "@/components/AnimatedModal/AnimatedModal";
import { BedDouble, CalendarCheck, CircleHelp, Users } from "lucide-react";

const dormisPreviewImages = [
  {
    src: "/assets/dormis-municipio/dormis3.jpeg",
    alt: "Vista de los dormis municipales",
    className: "sm:col-span-2",
  },
  {
    src: "/assets/dormis-municipio/dormis5.jpeg",
    alt: "Interior de los dormis municipales",
    className: "",
  },
  {
    src: "/assets/dormis-municipio/dormis6.jpeg",
    alt: "Habitacion compartida de los dormis municipales",
    className: "",
  },
];

function DormisMunicipalesCallout() {
  return (
    <section className="px-6 pb-20">
      <div className="container mx-auto">
        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-xl shadow-emerald-900/10 dark:border-emerald-800 dark:bg-neutral-950">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <CircleHelp className="h-4 w-4" />
                  ¿Sabias que...?
                </div>

                <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white md:text-5xl">
                  ¿Sabias que podes participar del congreso con alojamiento
                  incluido?
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  La modalidad con alojamiento resuelve tu estadia dentro del
                  predio, en dormis municipales compartidos y con cupos
                  limitados. Una opcion practica para quienes viajan a Trenque
                  Lauquen y quieren concentrarse en el congreso.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <BedDouble className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Dormis compartidos
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <CalendarCheck className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Estadia incluida
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <Users className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Cupos limitados
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <AnimatedModalDemo
                  centered={false}
                  triggerLabel="Ver informacion sobre alojamiento"
                />
                <Button variant="outline" asChild>
                  <a href="/inscripcion/participantes">Inscribirme</a>
                </Button>
              </div>
            </div>

            <div className="grid content-center gap-2 bg-emerald-950 p-3 sm:grid-cols-2 lg:max-h-[520px]">
              {dormisPreviewImages.map((image) => (
                <div
                  key={image.src}
                  className={`relative h-44 overflow-hidden rounded-xl sm:h-48 lg:h-56 ${image.className}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const UbicacionYAlojamiento = () => {
  return (
    <div className="dark:bg-background">
      <Hoteles />
      <DormisMunicipalesCallout />
      <div className="border-t border-gray-200 dark:border-gray-700 my-12"></div>
      <div className="mb-20 px-6">
        <Transporte />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 my-12"></div>
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
