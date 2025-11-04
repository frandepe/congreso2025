import { motion } from "framer-motion";

export default function SectionOverlay() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center backdrop-blur-md bg-black/50 rounded-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center text-white px-4"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Estamos preparando este contenido
        </h2>
        <p className="text-base md:text-lg text-gray-200">
          para el próximo congreso.
          <br />
          <span className="font-medium text-secondary">¡Estate atento!</span>
        </p>
      </motion.div>
    </div>
  );
}
