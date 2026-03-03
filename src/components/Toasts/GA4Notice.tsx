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
      description="🍪 Usamos cookies. Queremos mejorar esta página para vos. Solo medimos cuántas visitas tenemos y qué secciones son más populares."
      duration={8000} // 8 segundos
    />
  ) : null;
}
