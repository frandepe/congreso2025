import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Megaphone, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardsPatrocinadoresPagination } from "@/components/CardsPatrocinadoresPagination/CardsPatrocinadoresPagination";
import { PatrocinadoresComponent } from "@/components/SliderPatrocinadores/Patrocinadores";
import SliderPatrocinadores from "@/components/SliderPatrocinadores/SliderPatrocinadores";

const accessCards = [
  {
    title: "Stands para expositores (próximamente)",
    description:
      "Si tu empresa quiere presencia física en el congreso, esta es la opción correcta. Desde acá podés iniciar una nueva solicitud de stand o informar la segunda cuota si ya tenés código de seguimiento.",
    icon: Store,
    accentClassName:
      "border-emerald-200 bg-[linear-gradient(180deg,#f5fff8_0%,#ffffff_100%)]",
    iconClassName: "bg-emerald-600 text-white",
    eyebrow: "Expositores",
    actions: [
      {
        href: "/inscripcion/expositores",
        label: "Primer o único pago",
      },
      {
        href: "/inscripcion/comercial/segunda-cuota",
        label: "Segunda cuota",
      },
    ],
  },
  {
    title: "Publicidad para marcas (próximamente)",
    description:
      "Si buscás difusión de marca sin contratar un stand, entrá acá. Vas a poder elegir web, pantalla o banners, iniciar una nueva solicitud o informar la segunda cuota si ya tenés código de seguimiento.",
    icon: Megaphone,
    accentClassName:
      "border-sky-200 bg-[linear-gradient(180deg,#f3fbff_0%,#ffffff_100%)]",
    iconClassName: "bg-sky-600 text-white",
    eyebrow: "Publicidad",
    actions: [
      {
        href: "/inscripcion/publicidad",
        label: "Primer o único pago",
      },
      {
        href: "/inscripcion/comercial/segunda-cuota",
        label: "Segunda cuota",
      },
    ],
  },
];

export const Patrocinadores = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <section className="relative flex h-[350px] w-full items-center justify-center">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('/assets/banner2.jpg')] bg-cover"
            style={{ backgroundPosition: "center top 30%" }}
          />
          <div className="absolute inset-0 bg-green-500 opacity-30 mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-4xl px-6 text-center text-white"
        >
          <h1 className="text-4xl font-extrabold leading-tight">
            Patrocinadores y Auspiciantes del Congreso Nacional de RCP
          </h1>
          <p className="mt-4 text-lg">
            El Congreso Nacional de RCP es posible gracias al apoyo de empresas
            e instituciones comprometidas con la capacitacion en primeros
            auxilios y emergencias.
          </p>
        </motion.div>
      </section>

      <section className="bg-gray-100 py-16 dark:bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mx-auto max-w-6xl px-6 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Accesos comerciales
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
            Elegí el trámite correcto para tu empresa
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            Desde esta página podés iniciar una solicitud comercial o cargar la
            segunda cuota de un stand o publicidad ya registrados. Cada acceso
            te lleva al formulario correcto para evitar confusiones.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {accessCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className={`rounded-[28px] border p-7 text-left shadow-[0_24px_80px_-48px_rgba(15,23,42,0.2)] ${card.accentClassName}`}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                          {card.eyebrow}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
                          {card.title}
                        </h3>
                      </div>
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.iconClassName}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-stone-700">
                      {card.description}
                    </p>

                    <div className="mt-6 rounded-2xl border border-stone-200 bg-white px-4 py-4">
                      <div className="flex items-start gap-3 text-sm text-stone-700">
                        <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <p>
                          {card.eyebrow === "Expositores"
                            ? "Usá el primer botón si vas a iniciar el stand. Usá el segundo solo si ya tenés una solicitud en 2 cuotas."
                            : "Usá el primer botón si vas a contratar publicidad. Usá el segundo solo si ya tenés una solicitud en 2 cuotas."}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-8">
                      <div className="flex flex-col gap-3">
                        {card.actions.map((action, actionIndex) => (
                          <Button
                            disabled
                            variant={actionIndex === 0 ? "default" : "outline"}
                            className={
                              actionIndex === 0
                                ? "h-12 w-full justify-between rounded-xl bg-stone-950 px-5 text-sm font-medium text-white hover:bg-stone-800"
                                : "h-12 w-full justify-between rounded-xl border-stone-300 bg-white px-5 text-sm font-medium text-stone-800 hover:border-stone-400 hover:bg-stone-50"
                            }
                          >
                            {action.label}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          // <a
                          //   key={action.href}
                          //   href={action.href}
                          //   className="block"
                          // >
                          //   <Button
                          //     variant={
                          //       actionIndex === 0 ? "default" : "outline"
                          //     }
                          //     className={
                          //       actionIndex === 0
                          //         ? "h-12 w-full justify-between rounded-xl bg-stone-950 px-5 text-sm font-medium text-white hover:bg-stone-800"
                          //         : "h-12 w-full justify-between rounded-xl border-stone-300 bg-white px-5 text-sm font-medium text-stone-800 hover:border-stone-400 hover:bg-stone-50"
                          //     }
                          //   >
                          //     {action.label}
                          //     <ArrowRight className="h-4 w-4" />
                          //   </Button>
                          // </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              Distribucion del espacio
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">
              Ubicacion general para marcas y expositores
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              Este esquema ayuda a visualizar la distribucion general del
              congreso y el sector comercial.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-stone-200 bg-stone-50 p-4 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.45)] sm:p-6">
            <img
              src="/assets/mapa-patrocinadores.jpeg"
              alt="Mapa general de patrocinadores y expositores"
              className="w-full rounded-[20px] object-contain"
            />
          </div>
        </div>
      </section> */}

      <section className="bg-white py-16">
        <PatrocinadoresComponent />
        <SliderPatrocinadores />
      </section>

      <section className="pb-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <CardsPatrocinadoresPagination />
        </div>
      </section>
    </div>
  );
};
