import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ToastProps {
  title: string;
  description: string;
  duration?: number; // milisegundos
  cookieName?: string; // nombre de la cookie para "no volver a mostrar"
}

export function Toast({
  title,
  description,
  duration = 8000,
  cookieName = "toastDismissed",
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // revisamos si la cookie ya existe
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${cookieName}=`));
    if (!cookie) setVisible(true); // mostrar solo si no existe la cookie

    // auto-dismiss si se define duración
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration, cookieName]);

  const handleDismiss = () => setVisible(false);

  const handleDontShowAgain = () => {
    document.cookie = `${cookieName}=true; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 año
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 z-50 left-2 transform -translate-x-1/2 max-w-sm w-[90%] bg-gray-800 text-white p-4 rounded-lg shadow-lg"
      >
        {/* Botón de cerrar */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white hover:text-gray-300"
        >
          <X size={18} />
        </button>

        <strong className="block mb-1">{title}</strong>
        <p className="text-sm mb-2">{description}</p>

        <button
          onClick={handleDontShowAgain}
          className="text-xs underline hover:text-gray-300"
        >
          No volver a mostrar
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
