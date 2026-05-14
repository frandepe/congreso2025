import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function SpeakersTimeline() {
  const itemClass =
    "text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8";

  const data = [
    {
      title: "Viernes 02 de octubre — Pre Congreso",
      content: (
        <div className="relative">
          <div className="absolute right-2 top-10 -translate-y-1/2 w-2/3 h-2/3 bg-[url('/assets/logo-congreso2026.png')] bg-contain bg-no-repeat opacity-10 pointer-events-none lg:block hidden"></div>

          <p className={itemClass}>
            <strong>Actividades comunitarias | Nivel Inicial</strong>
            <br />
            Show y charla abierta a la comunidad en plaza.
            <br />
            Protagonizados por Compañía de Títeres “TITIRIFEOS” y “RCP con tus
            manos”.
          </p>

          <p className={itemClass}>
            <strong>
              08:30 – 09:30 | Show infantil: RCP para Nivel Inicial
            </strong>
          </p>

          <p className={itemClass}>
            <strong>
              10:00 – 11:00 | Show infantil: RCP para Nivel Inicial
            </strong>
          </p>

          <p className={itemClass}>
            <strong>
              13:30 – 14:30 | Show infantil: RCP para Nivel Inicial
            </strong>
          </p>

          <p className={itemClass}>
            <strong>
              15:00 – 16:00 | Show infantil: RCP para Nivel Inicial
            </strong>
          </p>

          <p className={itemClass}>
            <strong>
              17:30 – 21:00 | Atención a personas con discapacidad y TEA en
              emergencias
            </strong>
            <br />
            Disertantes: Grupo Inemer — Esteban Verón y Julieta Passarelli.
          </p>

          <div className="border-l-4 border-neutral-400 pl-4 mb-8">
            <p className={itemClass}>
              <strong>Capacitación especial con certificación ERC</strong>
              <br />
              Cupo exclusivo para 16 instructores.
              <br />
              Horario a confirmar.
            </p>
          </div>
        </div>
      ),
    },

    {
      title: "Sábado 03 de octubre — Primera jornada",
      content: (
        <div>
          <p className={itemClass}>
            <strong>08:00 – 08:30 | Acreditaciones</strong>
          </p>

          <p className={itemClass}>
            <strong>08:30 – 09:00 | Apertura oficial y bienvenida</strong>
          </p>

          <p className={itemClass}>
            <strong>09:00 – 10:30 | Guías 2025 – Enfoque desde la ERC</strong>
            <br />
            Disertante: Miguel Ángel Grimas Salinas (España).
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>10:30 – 11:30 | Aspectos legales en la RCP</strong>
            <br />
            Disertante: Dr. Guillermo Sandrone.
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>11:30 – 11:45 | Coffee break</strong>
          </p>

          <p className={itemClass}>
            <strong>
              11:45 – 12:45 | RCP en mujeres: igualdad en la emergencia.
            </strong>
            <br />
            Un aporte para seguir eliminando desigualdades, especialmente en el
            acceso a la RCP.
            <br />
            Disertante: Velasco Emiliano – UNISAL.
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>
              12:45 – 13:45 | Cómo diseñar un show infantil con temática de RCP
            </strong>
            <br />
            Disertante: Manuel y Compañía de Títeres TITIRIFEOS.
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>13:45 – 15:15 | Almuerzo y visita a stands</strong>
          </p>

          <p className={itemClass}>
            <strong>
              15:15 – 16:15 | Muerte súbita en el deporte. Cardioasistencia en
              eventos deportivos.
            </strong>
            <br />
            Disertante: Javier González.
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>
              16:15 – 17:15 | Cómo convertir tus capacitaciones en un
              emprendimiento exitoso
            </strong>
            <br />
            Disertante: Marta Iriarte.
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>17:15 – 17:30 | Coffee break</strong>
          </p>

          <p className={itemClass}>
            <strong>
              17:30 – 18:30 | Planificación y organización de zonas
              cardioprotegidas
            </strong>
            <br />
            Disertantes: Martín Labarrieta y Julio Godoy.
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>18:30 - 20:00 | Networking y visita a stands</strong>
          </p>

          <p className={itemClass}>
            <strong>20:00 | Cierre de la jornada</strong>
          </p>
        </div>
      ),
    },

    {
      title: "Domingo 04 de octubre — Segunda jornada",
      content: (
        <div>
          <p className={itemClass}>
            <strong>
              08:30 – 09:00 | Apertura de puertas y acreditaciones
            </strong>
          </p>

          <p className={itemClass}>
            <strong>09:00 – 09:30 | Apertura de la jornada</strong>
          </p>

          <p className={itemClass}>
            <strong>09:30 – 10:00 | Espacio de homenajes</strong>
          </p>

          <p className={itemClass}>
            <strong>
              10:00 - 11:30 | Capacitaciones con la referencia de la ERC
            </strong>
            <br />
            Disertante: Meritxell Ros (España)
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>
              11:30 – 13:00 | Adaptación de cursos de RCP para personas con
              discapacidad
            </strong>
            <br />
            Disertante: Grupo Inemer — Esteban Verón.
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>13:00 – 14:30 | Almuerzo y visita a stands</strong>
          </p>

          <p className={itemClass}>
            <strong>14:30 – 15:30 | Testimonio en primera persona</strong>
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>
              15:30 – 16:30 | Psicología en emergencias aplicada a la RCP
            </strong>
            <br />
            Disertantes: Equipo PAE (equipos formados por la Lic. Alicia
            Galfaso).
            <br />
            Moderador: Nicolás De Paulo.
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>16:30 – 16:45 | Coffee break</strong>
          </p>

          <p className={itemClass}>
            <strong>16:45 – 17:15 | Networking</strong>
          </p>

          <p className={itemClass}>
            <strong>17:15 – 17:30 | Entrega de certificados</strong>
          </p>

          <p className={itemClass}>
            <strong>17:30 | Acto de cierre</strong>
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <Timeline data={data} />
    </div>
  );
}
