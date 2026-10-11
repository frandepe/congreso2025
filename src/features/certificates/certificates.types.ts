export type CertificateRecord = {
  nombre: string;
  apellido: string;
  dni: string | null;
  tipo: "participante" | "disertante";
};

export type CertificateSearchMethod = "dni" | "fullName";
