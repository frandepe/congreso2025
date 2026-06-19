const BASE_TITLE = "Congreso Nacional RCP 2026";

export function getTitleForPath(path: string) {
  if (path.startsWith("/admin/submissions/")) {
    return `Detalle Admin - ${BASE_TITLE}`;
  }

  if (path.startsWith("/admin/commercial/submissions/")) {
    return `Detalle Admin Comercial - ${BASE_TITLE}`;
  }

  if (path === "/inscripcion/participantes") {
    return `Inscripcion Participantes - ${BASE_TITLE}`;
  }

  if (path === "/inscripcion-test") {
    return `Inscripcion Participantes - ${BASE_TITLE}`;
  }

  if (path === "/inscripcion/segunda-cuota") {
    return `Segunda Cuota - ${BASE_TITLE}`;
  }

  if (path === "/inscripcion/expositores") {
    return `Expositores - ${BASE_TITLE}`;
  }

  if (path === "/inscripcion/expositores/segunda-cuota") {
    return `Segunda Cuota Expositores - ${BASE_TITLE}`;
  }

  if (path === "/inscripcion/publicidad") {
    return `Publicidad - ${BASE_TITLE}`;
  }

  if (path === "/catalogos-livings") {
    return `Catalogos Livings - ${BASE_TITLE}`;
  }

  switch (path) {
    case "/":
      return `Inicio - ${BASE_TITLE}`;

    case "/programa":
      return `Programa - ${BASE_TITLE}`;

    case "/ubicacion-y-alojamiento":
      return `Ubicacion y Alojamiento - ${BASE_TITLE}`;

    case "/inscripcion":
      return `Inscripcion - ${BASE_TITLE}`;

    case "/sobre-nosotros":
      return `Sobre Nosotros - ${BASE_TITLE}`;

    case "/patrocinadores":
      return `Patrocinadores - ${BASE_TITLE}`;

    case "/preguntas-frecuentes":
      return `Preguntas Frecuentes - ${BASE_TITLE}`;

    case "/videos":
      return `Videos - ${BASE_TITLE}`;

    case "/videos-precongreso":
      return `Videos Precongreso - ${BASE_TITLE}`;

    case "/vivo-2026":
      return `Vivo 2026 - ${BASE_TITLE}`;

    case "/expositores":
      return `Expositores - ${BASE_TITLE}`;

    case "/catalogos-livings":
      return `Catalogos Livings - ${BASE_TITLE}`;

    case "/homenaje-sergio-marcos":
      return `Homenaje a Sergio Marcos - ${BASE_TITLE}`;

    case "/contacto":
      return `Contacto - ${BASE_TITLE}`;

    case "/admin/login":
      return `Login Admin - ${BASE_TITLE}`;

    case "/admin":
      return `Panel Admin - ${BASE_TITLE}`;

    case "/admin/commercial":
      return `Panel Comercial - ${BASE_TITLE}`;

    default:
      return BASE_TITLE;
  }
}
