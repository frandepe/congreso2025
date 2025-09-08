"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Iconos de lucide-react
import {
  Hotel,
  BedDouble,
  Users,
  CalendarDays,
  CalendarClock,
} from "lucide-react";
import { ImageZoom } from "../ui/zoomable-image";
// ok x 2
export function AnimatedModalDemo() {
  const images = [
    "/assets/dormis-municipio/dormis1.jpeg",
    "/assets/dormis-municipio/dormis2.jpeg",
    "/assets/dormis-municipio/dormis3.jpeg",
    "/assets/dormis-municipio/dormis4.jpeg",
    "/assets/dormis-municipio/dormis5.jpeg",
  ];
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger>
          <Button
            variant="default"
            className="relative group/modal-btn bg-primary dark:bg-white dark:text-black text-white hover:bg-secondary dark:hover:bg-white/90"
          >
            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
              Dormitorios
            </span>
            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white dark:text-black z-20">
              <Hotel className="h-4 w-4 mr-1" />
              Ver
            </div>
          </Button>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Tres días con{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                alojamiento
              </span>{" "}
            </h4>
            <div className="flex justify-center items-center">
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
            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              <div className="flex items-center justify-center">
                <Hotel className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Experiencia completa del congreso
                </span>
              </div>
              <div className="flex items-center justify-center">
                <BedDouble className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Alojamiento limpio y cómodo
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Users className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Dormitorios compartidos
                </span>
              </div>
              <div className="flex items-center justify-center">
                <CalendarDays className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  4 noches
                </span>
              </div>
              <div className="flex items-center justify-center">
                <CalendarClock className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Disponible desde el día anterior al congreso
                </span>
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <a href="https://forms.gle/TJTWvP7sP33L4gK99" target="_blank">
              <Button
                variant="default"
                className="w-28 bg-black text-white dark:bg-white dark:text-black border border-black"
              >
                Inscribirse
              </Button>
            </a>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
