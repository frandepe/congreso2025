import type { CertificateRecord } from "../certificates.types";
import "../certificates.css";

type CertificateProps = {
  participant: CertificateRecord;
};

export function Certificate({ participant }: CertificateProps) {
  const fullName = [participant.nombre, participant.apellido]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className="certificate-sheet"
      aria-label={`Certificado de ${fullName}`}
    >
      <div className="certificate-frame">
        <span className="certificate-corner certificate-corner-top" />
        <span className="certificate-corner certificate-corner-bottom" />

        <header className="certificate-header">
          <img
            src="/assets/logo-congreso2026.png"
            alt="Segundo Congreso Nacional de RCP, Trenque Lauquen 2026"
            className="certificate-logo"
          />
          <div className="certificate-event-data">
            <p>3 y 4 de octubre de 2026</p>
            <p>Trenque Lauquen, Buenos Aires</p>
          </div>
        </header>
        <div className="certificate-content">
          <p className="certificate-kicker">Constancia de participación</p>
          <h2>CERTIFICADO</h2>
          <p className="certificate-intro">Se certifica que</p>
          <p className="certificate-name">{fullName || "Participante"}</p>
          <div className="certificate-name-line" />
          <p className="certificate-copy">
            {participant.tipo === "disertante"
              ? "disertó en "
              : "participó del "}
            <strong>Segundo Congreso Nacional de RCP</strong>,
            realizado los días 3 y 4 de octubre de 2026 en Trenque Lauquen,
            Buenos Aires.
          </p>
        </div>

        <div
          className="certificate-signatures"
          aria-label="Firmas institucionales"
        >
          <div className="certificate-signature-slot">
            <img
              src="/assets/firmas/guillermo_carranza_firma_transparente.png"
              alt="Firma de Guillermo Carranza"
            />
          </div>
          <div className="certificate-signature-slot">
            <img
              src="/assets/firmas/nicolas_de_paulo_firma_transparente.png"
              alt="Firma de Nicolas de Paulo"
            />
          </div>
          <div className="certificate-signature-slot">
            <img
              src="/assets/firmas/sergio_felice_firma_transparente.png"
              alt="Firma de Sergio Felice"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
