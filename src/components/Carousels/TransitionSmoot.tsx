import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TransitionSmoot() {
  const images = [
    {
      full: "/assets/sergio/2.jpeg",
      thumb: "/assets/sergio/2.jpeg",
      alt: "Sergio Marcos con Sergio Felice, el intendente de Trenque Lauquen y tres personas más; sosteniendo una bandera de Argentina Reanima en el congreso de RCP 2025",
    },
    {
      full: "/assets/sergio/3.jpeg",
      thumb: "/assets/sergio/3.jpeg",
      alt: "Sergio, instructor de RCP con pechera blanca de Argentina Reanima, demostrando maniobra de desobstrucción de vías aéreas en un muñeco de bebé durante un curso de primeros auxilios.",
    },
    {
      full: "/assets/sergio/1.jpg",
      thumb: "/assets/sergio/1.jpg",
      alt: "Sergio Marcos con un microfono en la mano dando una charla",
    },
  ];
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const goTo = (index: number) => setCurrent(index);

  return (
    <div className="max-w-3xl mx-auto p-2">
      {/* Imagen principal */}
      <div className="overflow-hidden rounded-lg  mb-4 relative md:h-[50vh] flex items-center justify-center ">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current].full}
            alt={images[current].alt}
            className="max-h-full w-auto object-contain rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-primary w-10 h-10 flex items-center justify-center text-white rounded-full shadow-md transition-colors"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-primary w-10 h-10 flex items-center justify-center text-white rounded-full shadow-md transition-colors"
        >
          →
        </button>
      </div>

      {/* Miniaturas */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1 px-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`shrink-0 border-2 rounded-md overflow-hidden transition-all ${
                index === current
                  ? "border-primary"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={image.thumb}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-12 object-contain bg-gray-100 dark:bg-black/60"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransitionSmoot;
