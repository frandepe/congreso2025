import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Armchair,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MessageCircle,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCatalogsLivings from "@/components/CatalogosLivings/Hero";

const WHATSAPP_URL =
  "https://wa.me/5492392460227?text=Hola,%20quiero%20consultar%20por%20livings%20y%20equipamiento%20para%20mi%20stand.";

const livingLines = [
  {
    name: "Línea Madera",
    price: "$40.000",
    availability: "4",
    capacity: "10 personas",
    images: [
      "/livings/linea-madera1.jpg",
      "/livings/linea-madera2.jpg",
      "/livings/linea-madera3.jpg",
    ],
    items: [
      "2 camastros de madera de 3 cuerpos",
      "4 sillas jesuitas",
      "1 mesa rectangular de madera y hierro",
    ],
    accent: "bg-stone-700",
  },
  {
    name: "Línea Hierro",
    price: "$55.000",
    availability: "3",
    capacity: "7 personas",
    images: [
      "/livings/linea-hierro1.jpg",
      "/livings/linea-hierro2.jpg",
      "/livings/linea-hierro3.jpg",
    ],
    items: [
      "1 sillón de 3 cuerpos de hierro negro con colchoneta y funda blanca",
      "2 sillones de 1 cuerpo de hierro negro con colchoneta y funda blanca",
      "2 sillones individuales de mimbre y hierro negro",
      "1 mesa rectangular de madera y hierro negro",
    ],
    accent: "bg-emerald-800",
  },
  {
    name: "Línea Cubo",
    price: "$57.000",
    availability: "2",
    capacity: "10 personas",
    images: [
      "/livings/linea-cubo1.jpg",
      "/livings/linea-cubo2.jpg",
      "/livings/linea-cubo3.jpg",
    ],
    items: [
      "1 sillón cubo de 4 cuerpos con funda de bull blanca",
      "2 materas de 1 cuerpo con funda de bull blanca",
      "2 puff largos con funda de bull blanca",
      "2 mesas redondas de madera y hierro negro",
    ],
    accent: "bg-amber-800",
  },
  {
    name: "Línea Gervasoni",
    price: "$72.000",
    availability: "2",
    capacity: "8/9 personas",
    images: [
      "/livings/linea-gervasoni1.jpg",
      "/livings/linea-gervasoni2.jpg",
      "/livings/linea-gervasoni3.jpg",
    ],
    items: [
      "1 gervasoni de 2 o 3 cuerpos en paraíso con colchoneta en tussor crudo",
      "2 gervasoni de 1 cuerpo en paraíso con colchoneta en tussor crudo",
      "4 sillas jesuitas de madera",
      "2 mesas redondas de madera",
    ],
    accent: "bg-orange-800",
  },
  {
    name: "Línea Caña",
    price: "$49.000",
    availability: "3",
    capacity: "7/8 personas",
    images: [
      "/livings/linea-cania1.jpg",
      "/livings/linea-cania2.jpg",
      "/livings/linea-cania3.jpg",
    ],
    items: [
      "1 sillón de 3/4 cuerpos de mimbre con colchoneta en tussor crudo",
      "2 sillas Mar del Plata",
      "2 butacas de mimbre",
      "2 mesas redondas de mimbre",
    ],
    accent: "bg-lime-800",
  },
  {
    name: "Línea Barras",
    price: "$42.000",
    availability: "4 barras",
    capacity: null,
    images: [
      "/livings/linea-barras1.jpg",
      "/livings/linea-barras2.jpg",
      "/livings/linea-barras3.jpg",
    ],
    items: [
      "1 barra alta de madera y hierro",
      "4 butacas altas de mimbre estilo Mar del Plata",
    ],
    accent: "bg-slate-700",
  },
  {
    name: "Línea Mesas",
    price: "$20.000 mesa / $2.500 silla",
    availability: "6 mesas / 170 sillas",
    capacity: null,
    images: [
      "/livings/linea-mesas1.jpg",
      "/livings/linea-mesas2.jpg",
      "/livings/linea-mesas3.jpg",
    ],
    items: [
      "1 mesa de campo desnuda de madera",
      "10/12 sillas tijera blancas apilables",
    ],
    accent: "bg-rose-800",
  },
];

type LivingLine = (typeof livingLines)[number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function LivingCarousel({ line }: { line: LivingLine }) {
  const [current, setCurrent] = useState(0);
  const total = line.images.length;
  const currentImage = line.images[current];

  const goPrev = () => {
    setCurrent((value) => (value === 0 ? total - 1 : value - 1));
  };

  const goNext = () => {
    setCurrent((value) => (value === total - 1 ? 0 : value + 1));
  };

  return (
    <div className="relative h-[250px] w-[250px] max-w-full overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900">
      <div className="flex h-full w-full items-center justify-center bg-stone-50 p-3 dark:bg-stone-950">
        <img
          src={currentImage}
          alt={`${line.name} imagen ${current + 1}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-2 sm:p-3">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            aria-label={`Imagen anterior de ${line.name}`}
            onClick={goPrev}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-stone-300 bg-white/95 text-stone-700 shadow-sm transition hover:border-stone-400 hover:bg-white dark:border-stone-700 dark:bg-stone-900/95 dark:text-stone-800 dark:hover:bg-stone-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label={`Imagen siguiente de ${line.name}`}
            onClick={goNext}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-stone-300 bg-white/95 text-stone-700 shadow-sm transition hover:border-stone-400 hover:bg-white dark:border-stone-700 dark:bg-stone-900/95 dark:text-stone-800 dark:hover:bg-stone-800"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProcessItem({
  icon: Icon,
  children,
}: {
  icon: typeof Clock3;
  children: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm leading-7 text-stone-700 dark:text-stone-300">
        {children}
      </p>
    </div>
  );
}

export function CatalogosLivingsPage() {
  return (
    <main className="bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <HeroCatalogsLivings />

      <section className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800 dark:text-emerald-300">
            Información útil
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            ¿Cómo alquilar?
          </h2>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          <ProcessItem icon={Clock3}>
            El precio es válido por 1 día de alquiler. Los horarios de entrega y
            retiro se coordinan previamente.
          </ProcessItem>
          <ProcessItem icon={MessageCircle}>
            La reserva se realiza con un adelanto del 50%. El saldo debe
            cancelarse 15 días antes de la fecha del evento.
          </ProcessItem>
          <ProcessItem icon={Truck}>
            El flete no está incluido en el presupuesto. Depende de la cantidad
            de mobiliario y la distancia del lugar.
          </ProcessItem>
          <ProcessItem icon={Armchair}>
            Los livings se entregan listos para usar. La distribución dentro del
            stand queda a cargo del expositor.
          </ProcessItem>
        </div>
      </section>

      <section
        id="catalogo"
        className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 md:px-8 lg:px-12 lg:py-20"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800 dark:text-emerald-300">
              Opciones disponibles
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50 sm:text-4xl">
              Catálogo de livings
            </h2>
          </div>

          <Button
            asChild
            size="lg"
            className="w-full bg-stone-900 text-white hover:bg-stone-800 sm:w-auto dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Consultar disponibilidad
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-10 grid gap-6">
          {livingLines.map((line, index) => {
            const stats = [
              line.capacity
                ? { label: "Capacidad", value: line.capacity }
                : null,
              { label: "Disponibilidad", value: line.availability },
              { label: "Precio", value: line.price },
            ].filter(
              (stat): stat is { label: string; value: string } => stat !== null,
            );

            return (
              <motion.article
                key={line.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.03 }}
                className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6 lg:p-8"
              >
                <div className="grid gap-6 md:gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start lg:gap-10">
                  <div>
                    <LivingCarousel line={line} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50 sm:text-3xl">
                      {line.name}
                    </h3>

                    <ul className="mt-5 space-y-3 text-base leading-7 text-stone-700 dark:text-stone-300">
                      {line.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            className={`mt-2.5 h-2 w-2 shrink-0 rounded-full ${line.accent}`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl bg-stone-50 p-4 dark:bg-stone-800 dark:ring-1 dark:ring-stone-700"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-300">
                            {stat.label}
                          </p>
                          <p className="mt-2 text-base font-semibold text-stone-900 dark:text-white">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full border-stone-300 bg-white text-stone-800 sm:w-auto dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
                      >
                        <a
                          href={`${WHATSAPP_URL}%20Consulta:%20${encodeURIComponent(
                            line.name,
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Consultar esta opción
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-4 pb-20 sm:px-6 md:px-8 lg:px-12 lg:pb-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-3xl bg-emerald-900 p-8 text-center text-white shadow-sm dark:bg-emerald-950 md:p-12"
        >
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            ¿Querés sumar equipamiento a tu stand?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/75">
            Escribinos por WhatsApp para consultar disponibilidad, flete y
            coordinación de entrega.
          </p>

          <Button
            asChild
            variant="secondary"
            size="lg"
            className="mt-8 w-full bg-emerald-700 text-white hover:bg-emerald-600 sm:w-auto dark:bg-emerald-700 dark:text-white dark:hover:bg-emerald-600"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Consultar por WhatsApp
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
