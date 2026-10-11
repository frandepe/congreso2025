import certificaciones2026Data from "@/shared/utils/certificaciones2026.json";
import type {
  CertificateRecord,
  CertificateSearchMethod,
} from "./certificates.types";

type RawCertificateRecord = Partial<CertificateRecord>;

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

const toCertificateRecord = (record: RawCertificateRecord): CertificateRecord => ({
  nombre: typeof record.nombre === "string" ? record.nombre.trim() : "",
  apellido:
    typeof record.apellido === "string" ? record.apellido.trim() : "",
  dni: typeof record.dni === "string" ? record.dni.trim() : null,
  tipo: record.tipo === "disertante" ? "disertante" : "participante",
});

export const certificateRecords = (
  certificaciones2026Data as RawCertificateRecord[]
)
  .map(toCertificateRecord)
  .reduce<CertificateRecord[]>((records, record) => {
    const fullName = normalizeFullName(`${record.nombre} ${record.apellido}`);
    const matchingIndex = records.findIndex((existing) => {
      if (existing.tipo === record.tipo) return false;

      if (existing.dni && record.dni) {
        return normalizeDni(existing.dni) === normalizeDni(record.dni);
      }

      return (
        fullName !== "" &&
        normalizeFullName(`${existing.nombre} ${existing.apellido}`) === fullName
      );
    });

    if (matchingIndex === -1) return [...records, record];

    const existing = records[matchingIndex];
    const preferred = record.tipo === "disertante" ? record : existing;
    const retainedDni = record.dni ?? existing.dni;

    return records.map((current, index) =>
      index === matchingIndex ? { ...preferred, dni: retainedDni } : current,
    );
  }, []);

export function findCertificateRecords(
  query: string,
  method: CertificateSearchMethod,
) {
  if (method === "dni") {
    const normalizedQuery = normalizeDni(query);

    if (!normalizedQuery) return [];

    return certificateRecords.filter(
      (record) =>
        record.dni !== null &&
        normalizeDni(record.dni) === normalizedQuery,
    );
  }

  const normalizedQuery = normalizeFullName(query);

  if (!normalizedQuery || !normalizedQuery.includes(" ")) return [];

  return certificateRecords.filter((record) =>
    [
      `${record.nombre} ${record.apellido}`,
      `${record.apellido} ${record.nombre}`,
    ].some((fullName) => normalizeFullName(fullName) === normalizedQuery),
  );
}
