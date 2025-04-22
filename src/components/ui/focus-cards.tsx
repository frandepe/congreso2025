"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";

type Card = {
  title: string;
  description?: string;
  subtitle?: string;
  src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  return (
    <>
      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full mt-6">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}`}
            key={index}
            className="rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full cursor-pointer group"
            onClick={() => setActiveCard(card)}
          >
            <motion.img
              src={card.src}
              alt={card.title}
              className="object-cover absolute inset-0 w-full h-full"
              layoutId={`image-${card.title}`}
            />
            <motion.div
              className="absolute inset-0 bg-black/30 flex items-end py-8 px-4"
              layoutId={`title-wrapper-${card.title}`}
            >
              <motion.h2
                className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200"
                layoutId={`title-${card.title}`}
              >
                {card.title}
              </motion.h2>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeCard && (
          <>
            {/* Fondo oscuro con blur (cierre al clickear) */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCard(null)} // Click fuera cierra
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // evita que el click interno cierre el modal
            >
              <motion.div
                className="relative bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-xl flex flex-col md:flex-row max-w-5xl w-full max-h-[90vh]"
                layoutId={`card-${activeCard.title}`}
              >
                {/* Imagen */}
                <motion.img
                  src={activeCard.src}
                  alt={activeCard.title}
                  className="w-full md:w-1/2 object-cover h-60 md:h-auto"
                  layoutId={`image-${activeCard.title}`}
                />

                {/* Texto con animación */}
                <motion.div
                  className="p-6 md:w-1/2 flex flex-col justify-center overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                >
                  <motion.h2
                    className="text-2xl font-bold mb-4"
                    layoutId={`title-${activeCard.title}`}
                  >
                    {activeCard.title}
                  </motion.h2>

                  {/* Subtítulo */}
                  {activeCard.subtitle && (
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                      {activeCard.subtitle}
                    </p>
                  )}

                  {/* Descripción con scroll si es muy larga */}
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line h-52">
                    {activeCard.description || ""}
                  </p>
                </motion.div>

                {/* Botón cerrar */}
                <button
                  onClick={() => setActiveCard(null)}
                  className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full z-50"
                >
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
