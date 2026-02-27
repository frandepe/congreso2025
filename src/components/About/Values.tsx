import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstitutionalItem {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  imageUrl: string;
}

const sections: InstitutionalItem[] = [
  {
    title: "Nuestra Misión",
    subtitle: "Formación profesional y calidad educativa",
    imageUrl: "/assets/mision.png",
    content: (
      <div className="space-y-4">
        <p>
          Promover la{" "}
          <strong>
            formación continua y el fortalecimiento profesional de los
            instructores de RCP
          </strong>
          , brindando:
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Actualización conforme a recomendaciones científicas vigentes</li>
          <li>Herramientas pedagógicas aplicadas a la enseñanza</li>
          <li>Espacios de intercambio de experiencias reales</li>
          <li>Instancias de formación técnica y educativa</li>
        </ul>

        <p>
          Nuestro enfoque está centrado en la{" "}
          <strong>
            calidad de la enseñanza, la responsabilidad profesional y la
            preparación adecuada para la respuesta ante emergencias
          </strong>
          .
        </p>
      </div>
    ),
  },

  {
    title: "Nuestra Visión",
    subtitle: "Construcción de comunidad y referencia nacional",
    imageUrl: "/assets/vision.jpg",
    content: (
      <div className="space-y-4">
        <p>
          Construir un{" "}
          <strong>
            espacio de referencia nacional para instructores de RCP
          </strong>
          , fomentando una comunidad basada en el respeto, el conocimiento y la
          mejora continua.
        </p>

        <p>
          Aspiramos a contribuir al desarrollo de{" "}
          <strong>
            instructores cada vez más preparados, conscientes de su rol y
            comprometidos con la formación responsable de la comunidad
          </strong>
          .
        </p>
      </div>
    ),
  },

  {
    title: "Nuestros Valores",
    subtitle: "Principios que guían nuestra práctica",
    imageUrl: "/assets/valores.jpg",
    content: (
      <div className="space-y-3">
        <p>
          <strong>Responsabilidad profesional</strong>
          <br />
          Entendiendo la importancia del rol del instructor en la formación de
          la comunidad.
        </p>

        <p>
          <strong>Rigor científico</strong>
          <br />
          Basado en recomendaciones actualizadas y prácticas validadas.
        </p>

        <p>
          <strong>Respeto</strong>
          <br />
          Hacia los instructores, los estudiantes y el contexto de la
          emergencia.
        </p>

        <p>
          <strong>Formación continua</strong>
          <br />
          Como pilar fundamental del crecimiento profesional.
        </p>

        <p>
          <strong>Compromiso social</strong>
          <br />
          Con la educación como herramienta de preparación comunitaria.
        </p>
      </div>
    ),
  },

  {
    title: "Nuestro Propósito",
    subtitle: "Espacio de encuentro y crecimiento",
    imageUrl: "/assets/proposito.jpg",
    content: (
      <div className="space-y-4 text-center">
        <p>
          Este congreso representa un punto de encuentro para quienes comparten
          la responsabilidad de enseñar.
        </p>

        <div className="font-medium space-y-1">
          <p>Es un espacio de formación.</p>
          <p>De actualización.</p>
          <p>De construcción colectiva.</p>
          <p>Y de fortalecimiento profesional.</p>
        </div>
      </div>
    ),
  },
];

export function InstitutionalSection({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((i) => (i + 1) % sections.length);

  const handlePrevious = () =>
    setCurrentIndex((i) => (i - 1 + sections.length) % sections.length);

  const current = sections[currentIndex];

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      <div className="flex flex-col md:flex-row md:items-center">
        {/* Image */}
        <div className="w-full md:w-[470px] md:h-[470px] aspect-square md:aspect-auto rounded-3xl overflow-hidden bg-gray-200 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.imageUrl}
              src={current.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Content */}
        <div
          className="
          bg-white dark:bg-card
          rounded-3xl shadow-2xl
          p-6 sm:p-8
          mt-6 md:mt-0
          md:ml-[-80px]
          z-10
          max-w-xl
        "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                {current.title}
              </h2>

              <p className="text-sm text-muted-foreground mb-4 sm:mb-6">
                {current.subtitle}
              </p>

              <div className="text-sm sm:text-base leading-relaxed">
                {current.content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
        <button
          onClick={handlePrevious}
          className="p-2 sm:p-3 rounded-full border text-black"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="flex gap-2">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full",
                i === currentIndex ? "bg-black" : "bg-gray-300",
              )}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 sm:p-3 rounded-full border text-black"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}
