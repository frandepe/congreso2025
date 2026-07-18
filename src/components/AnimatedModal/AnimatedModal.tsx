import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Iconos de lucide-react
import {
  BedDouble,
  CalendarDays,
  Hotel,
  Luggage,
  MapPin,
  Users,
} from "lucide-react";
import { ImageZoom } from "../ui/zoomable-image";
// ok x 2
type AnimatedModalDemoProps = {
  triggerLabel?: string;
  triggerClassName?: string;
  centered?: boolean;
};

export function AnimatedModalDemo({
  triggerLabel = "Ver Dormitorios",
  triggerClassName,
  centered = true,
}: AnimatedModalDemoProps) {
  const images = [
    "/assets/dormis-municipio/dormis1.jpeg",
    "/assets/dormis-municipio/dormis2.jpeg",
    "/assets/dormis-municipio/dormis3.jpeg",
    "/assets/dormis-municipio/dormis4.jpeg",
    "/assets/dormis-municipio/dormis5.jpeg",
  ];
  return (
    <div className={centered ? "flex items-center justify-center" : ""}>
      <Modal>
        <ModalTrigger
          className={cn(
            "group/modal-btn inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-900/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400",
            triggerClassName,
          )}
        >
          <Hotel className="h-4 w-4 transition-transform duration-200 group-hover/modal-btn:scale-110" />
          <span>{triggerLabel}</span>
        </ModalTrigger>
        <ModalBody className="max-h-[92vh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-2xl md:max-w-4xl">
          <ModalContent className="p-5 sm:p-7">
            <h4 className="mb-3 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
              Tres días con{" "}
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                alojamiento
              </span>{" "}
            </h4>
            <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              La modalidad con alojamiento está pensada para quienes quieren
              resolver la estadía dentro del mismo predio del congreso, en
              dormis compartidos y con cupos limitados.
            </p>

            <div className="flex items-center justify-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <ImageZoom
                    src={image}
                    alt="dormitorios"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <CalendarDays className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h5 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Fechas de la estadía
                </h5>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  Incluye la estadía desde el jueves o viernes por la tarde
                  hasta el lunes por la mañana.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <MapPin className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h5 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Ubicación
                </h5>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  El hospedaje es en un complejo de dormis ubicado en el mismo
                  lugar donde se desarrolla el congreso.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <BedDouble className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h5 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Habitaciones y baños
                </h5>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  Las habitaciones y los baños son compartidos. Hay dos
                  habitaciones destinadas a mujeres y dos destinadas a hombres.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <Luggage className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h5 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Qué debe llevar cada participante
                </h5>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  Cada participante debe llevar su propia ropa de cama y sus
                  toallas.
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left dark:border-amber-900 dark:bg-amber-950/30">
              <div className="flex gap-3">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" />
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Capacidad disponible
                  </h5>
                  <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                    Cada habitación tiene capacidad para 16 personas. Los cupos
                    con alojamiento son limitados.
                  </p>
                </div>
              </div>
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
