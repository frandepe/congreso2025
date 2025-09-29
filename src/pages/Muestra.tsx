import SliderPatrocinadores from "@/components/SliderPatrocinadores/SliderPatrocinadores";
import React from "react";
import { motion } from "framer-motion";

export const Muestra = () => {
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Fondo con logo en marca de agua */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 h-3/4 bg-[url('/assets/logo-congreso2025.png')] bg-contain bg-center bg-no-repeat opacity-10 pointer-events-none" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SliderPatrocinadores />
        </motion.div>
      </div>
    </div>
  );
};
