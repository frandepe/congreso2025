import { useState, useEffect } from "react";
import { Toast } from "../ui/toast";

export function GA4Notice() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(true);
  }, []);

  return shown ? (
    <Toast
      title="Aviso de privacidad"
      description="Usamos Google Analytics para medir el uso del sitio y mejorar la experiencia. Al navegar, aceptás el uso de cookies y analítica."
      duration={8000} // 8 segundos
    />
  ) : null;
}
