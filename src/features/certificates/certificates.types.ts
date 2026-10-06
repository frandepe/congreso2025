export type CertificateParticipant = {
  nombre: string;
  apellido: string;
  dni: string | null;
};

export type CertificateSearchMethod = "dni" | "fullName";
