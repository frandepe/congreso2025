import inscriptosData from "@/shared/utils/inscriptos.json";
import inscriptosLocalesData from "@/shared/utils/inscriptosLocales.json";
import type { CertificateParticipant } from "./certificates.types";

type RawParticipant = Partial<CertificateParticipant>;

export const normalizeDni = (value: string) => value.replace(/[.\s-]/g, "");

export const normalizeEmail = (value: string) => value.trim().toLowerCase();

const toParticipant = (participant: RawParticipant): CertificateParticipant => ({
  nombre: typeof participant.nombre === "string" ? participant.nombre.trim() : "",
  apellido:
    typeof participant.apellido === "string" ? participant.apellido.trim() : "",
  email: typeof participant.email === "string" ? participant.email.trim() : "",
  dni: typeof participant.dni === "string" ? participant.dni.trim() : "",
});

const participantKey = (participant: CertificateParticipant) =>
  [
    normalizeDni(participant.dni),
    normalizeEmail(participant.email),
    participant.apellido.toLocaleLowerCase("es"),
    participant.nombre.toLocaleLowerCase("es"),
  ].join("|");

const allParticipants = [
  ...(inscriptosData as RawParticipant[]),
  ...(inscriptosLocalesData as RawParticipant[]),
].map(toParticipant);

export const certificateParticipants = Array.from(
  new Map(
    allParticipants.map((participant) => [participantKey(participant), participant]),
  ).values(),
);

export function findCertificateParticipants(query: string) {
  const normalizedDni = normalizeDni(query);
  const normalizedEmail = normalizeEmail(query);

  if (!normalizedDni || !normalizedEmail) {
    return [];
  }

  return certificateParticipants.filter((participant) => {
    const participantDni = normalizeDni(participant.dni);
    const participantEmail = normalizeEmail(participant.email);

    return (
      (participantDni !== "" && participantDni === normalizedDni) ||
      (participantEmail !== "" && participantEmail === normalizedEmail)
    );
  });
}

