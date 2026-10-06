import certificaciones2026Data from "@/shared/utils/certificaciones2026.json";
import type {
  CertificateParticipant,
  CertificateSearchMethod,
} from "./certificates.types";

type RawParticipant = Partial<CertificateParticipant>;

export const normalizeDni = (value: string) => value.replace(/\D/g, "");

export const normalizeFullName = (value: string) =>
  value
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("es")
    .replaceAll("ñ", "\uE000")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("\uE000", "ñ");

const toParticipant = (participant: RawParticipant): CertificateParticipant => ({
  nombre: typeof participant.nombre === "string" ? participant.nombre.trim() : "",
  apellido:
    typeof participant.apellido === "string" ? participant.apellido.trim() : "",
  dni: typeof participant.dni === "string" ? participant.dni.trim() : null,
});

export const certificateParticipants = (
  certificaciones2026Data as RawParticipant[]
).map(toParticipant);

export function findCertificateParticipants(
  query: string,
  method: CertificateSearchMethod,
) {
  if (method === "dni") {
    const normalizedQuery = normalizeDni(query);

    if (!normalizedQuery) return [];

    return certificateParticipants.filter(
      (participant) =>
        participant.dni !== null &&
        normalizeDni(participant.dni) === normalizedQuery,
    );
  }

  const normalizedQuery = normalizeFullName(query);

  if (!normalizedQuery || !normalizedQuery.includes(" ")) return [];

  return certificateParticipants.filter((participant) =>
    [
      `${participant.nombre} ${participant.apellido}`,
      `${participant.apellido} ${participant.nombre}`,
    ].some((fullName) => normalizeFullName(fullName) === normalizedQuery),
  );
}
