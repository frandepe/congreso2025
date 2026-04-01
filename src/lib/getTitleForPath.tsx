export function getTitleForPath(path: string) {
  if (path.startsWith("/admin/submissions/")) {
    return "Detalle Admin - Congreso Nacional RCP 2025";
  }

  if (path === "/inscripcion/participantes") {
    return "Inscripcion Participantes - Congreso Nacional RCP 2025";
  }

  if (path === "/inscripcion-test") {
    return "Inscripcion Participantes - Congreso Nacional RCP 2025";
  }

  if (path === "/inscripcion/segunda-cuota") {
    return "Segunda Cuota - Congreso Nacional RCP 2025";
  }

  switch (path) {
    case "/":
      return "Inicio - Congreso Nacional RCP 2025";
    case "/programa":
      return "Programa - Congreso Nacional RCP 2025";
    case "/ubicacion-y-alojamiento":
      return "Ubicacion y Alojamiento - Congreso Nacional RCP 2025";
    case "/inscripcion":
      return "Inscripcion - Congreso Nacional RCP 2025";
    case "/sobre-nosotros":
      return "Sobre Nosotros - Congreso Nacional RCP 2025";
    case "/patrocinadores":
      return "Patrocinadores - Congreso Nacional RCP 2025";
    case "/preguntas-frecuentes":
      return "Preguntas Frecuentes - Congreso Nacional RCP 2025";
    case "/videos":
      return "Videos - Congreso Nacional RCP 2025";
    case "/vivo-2025":
      return "Vivo 2025 - Congreso Nacional RCP 2025";
    case "/expositores":
      return "Expositores - Congreso Nacional RCP 2025";
    case "/homenaje-sergio-marcos":
      return "Homenaje a Sergio Marcos - Congreso Nacional RCP 2025";
    case "/contacto":
      return "Contacto - Congreso Nacional RCP 2025";
    case "/admin/login":
      return "Login Admin - Congreso Nacional RCP 2025";
    case "/admin":
      return "Panel Admin - Congreso Nacional RCP 2025";
    default:
      return "Congreso Nacional RCP 2025";
  }
}
