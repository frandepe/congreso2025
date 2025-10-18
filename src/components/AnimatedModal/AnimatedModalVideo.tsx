import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Radio, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AnimatedModalVideo() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/vivo-2025");
    // espera a que la navegación ocurra y luego scrollea
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };
  return (
    <>
      {/* Trigger */}
      {/* <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="text-primary"
      >
        Ver presentación
      </Button> */}

      <Button
        onClick={handleNavigate}
        variant="outline"
        className="text-gray-700"
      >
        <Radio className="mr-1" size={14} />
        Volver a ver
      </Button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} // click afuera cierra
            />

            {/* Modal content */}
            <motion.div
              className="fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="relative bg-black rounded-lg shadow-lg max-w-full max-h-full pointer-events-auto">
                {/* Botón de cerrar */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-2 right-2 z-50 text-white bg-black/40 p-1 rounded-full hover:bg-black/60 transition"
                >
                  <X size={20} />
                </button>

                {/* Video */}
                <video
                  src="/assets/presentacion.mp4"
                  controls
                  autoPlay
                  className="block w-auto max-w-[90vw] max-h-[80vh] rounded-lg"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
