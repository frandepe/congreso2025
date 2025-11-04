import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function ComingSoonOverlay() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-md bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center text-white px-6"
      >
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">
          Estamos preparando este contenido
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          para el próximo congreso. <br />
          <span className="font-medium text-secondary">¡Estate atento!</span>
        </p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Volver
        </Button>
      </motion.div>
    </div>
  );
}
