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
              08:30 - 09:30 | Show infantil: RCP para Nivel Inicial
            </strong>
          </p>

          <p className={itemClass}>
            <strong>
              10:30 - 11:30 | Show infantil: RCP para Nivel Inicial
            </strong>
          </p>

          <p className={itemClass}>
            <strong>
              13:30 - 14:30 | Show infantil: RCP para Nivel Inicial
            </strong>
          </p>

          <p className={itemClass}>
            <strong>
              15:30 - 16:30 | Show infantil: RCP para Nivel Inicial
            </strong>
          </p>

          <p className={itemClass}>
            <strong>
              17:30 - 21:00 | Atención a personas con discapacidad y TEA en
              emergencias
            </strong>
            <br />
            Disertantes: Grupo Inemer — Esteban Verón y Julieta Passarelli.
            <br />
            Emergencias Inclusivas - Abordaje Operativo y Sistémico <br />
            La intervención en emergencias que involucran personas con
            discapacidad. <br /> A partir de un enfoque técnico, operativo y
            sistémico, la disertación trabajará sobre la adaptación de
            protocolos prehospitalarios, evacuación, manejo de crisis y
            accesibilidad operativa, incorporando además una mirada integral
            sobre las barreras institucionales, espaciales y territoriales que
            condicionan la respuesta ante emergencias. <br />
            La actividad combina experiencia de campo, análisis de casos reales
            y herramientas aplicables a contextos operativos concretos.
          </p>

          <div className="border-l-4 border-neutral-400 pl-4 mb-8">
            <p className={itemClass}>
              <strong>Capacitación especial con certificación ERC</strong>
              <br />
              Cupo exclusivo para 16 instructores.
              <br />
              Horario: 14:00hs.
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
            <strong>08:00 - 08:30 | Acreditaciones</strong>
          </p>

          <p className={itemClass}>
            <strong>08:30 - 09:00 | Apertura oficial y bienvenida</strong>
          </p>

          <p className={itemClass}>
            <strong>09:00 - 10:30 | Guías 2025 - Detrás de un curso ERC</strong>
            <br />
            Disertantes: Miguel Ángel Grima y Meritxell Ros (España)
            <br />
            El papel del Director y del Instructor en la calidad docente Miguel
            Ángel Grima y Meritxell Ros (España) Taller dinámico orientado a
            instructores de RCP y Soporte Vital, centrado en el funcionamiento
            real de una formación ERC desde dentro. A través de experiencias
            reales y casos prácticos, se abordará el papel del Director e
            Instructor ERC, la preparación de cursos, la gestión del aula y la
            evaluación de alumnos.
          </p>

          <p className={itemClass}>
            <strong>10:30 - 11:30 | Aspectos legales en la RCP</strong>
            <br />
            Disertante: Dr. Guillermo Sandrone.
            <br />
            Aspectos legales de la RCP
            <br />
            Ley 27.159 Tu protección y responsabilidad al intervenir como
            instructor. El respaldo de una matrícula de habilitación. Deber de
            enseñar el estándar actualizado de ERC/AHA. El límite entre
            Instructor y Rescatista. Documentación y consentimiento en la
            capacitación. Responsabilidad docente
          </p>

          <p className={itemClass}>
            <strong>11:30 - 11:45 | Coffee break</strong>
          </p>

          <p className={itemClass}>
            <strong>
              11:45 - 12:45 | RCP en mujeres: igualdad en la emergencia.
            </strong>
            <br />
            Un aporte para seguir eliminando desigualdades, especialmente en el
            acceso a la RCP.
            <br />
            Disertante: Velasco Emiliano y Carolina Gómez - UNISAL.
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>
              12:45 - 13:45 | Cómo diseñar un show infantil con temática de RCP
            </strong>
            <br />
            Disertantes: Manuel de RCP con tus manos y Compañía de titeres
            TITIRIFEOS
            <br />
            Cómo dar capacitaciones de una manera no convencional. Acercar
            contenidos sobre prevención de accidentes domésticos y de RCP a
            través de un formato participativo, donde los títeres, la música en
            vivo y el humor funcionan como un puente para lograr aprendizajes
            significativos de una manera cercana, clara y profundamente humana.
          </p>

          <p className={itemClass}>
            <strong>13:45 - 15:15 | Almuerzo y visita a stands</strong>
          </p>

          <p className={itemClass}>
            <strong>
              15:15 - 16:15 | Muerte súbita en el deporte. Cardioasistencia en
              eventos deportivos.
            </strong>
            <br />
            Disertante: Javier González.
            <br />
            * Presentación del equipo Runner Cardioprotegido
            <br />
            * Muerte súbita en el deporte - Espectativa vs realidad
            <br />* Cardioasistencia en eventos deportivos ( necesidad,
            importancia, capacitación , ley 27.159)
          </p>

          <p className={itemClass}>
            <strong>
              16:15 - 17:15 | Cómo convertir tus capacitaciones en un
              emprendimiento exitoso
            </strong>
            <br />
            Disertante: Marta Iriarte.
            <br />
            Cómo pasar de dar cursos sueltos a tener un proyecto que se sostenga
            en el tiempo. Como identificar tu nicho, definir valor diferencial
            frente a otros centros de capacitación. Hacer hincapié que en RCP el
            diferencial no está solo en el precio, si no en la experiencia, el
            seguimiento post-curso y el respaldo de la certificación. Análisis
            de los distintos públicos. Cómo armar una propuesta comercial.
            Realismo sobre los obstáculos y cosas a mejorar para ser un
            emprendedor exitoso.
          </p>

          <p className={itemClass}>
            <strong>17:15 - 17:30 | Coffee break</strong>
          </p>

          <p className={itemClass}>
            <strong>
              17:30 - 18:30 | Planificación y organización de zonas
              cardioprotegidas
            </strong>
            <br />
            Disertantes: Martín Labarrieta y Julio Godoy.
            <br />
            La disertación propone redefinir el rol del instructor en RCP y uso
            del DEA dentro del modelo de Zonas Cardioseguras, trascendiendo la
            función tradicional de capacitador para posicionarlo como un actor
            clave en la implementación, verificación y sostenimiento de sistemas
            de cardioprotección en territorio. <br />
            Objetivo de la disertación: Fortalecer el rol del instructor como
            actor técnico y estratégico dentro de las Zonas Cardioseguras,
            brindándole herramientas para intervenir no solo en la capacitación,
            sino también en la evaluación, control y mejora de los sistemas de
            respuesta ante emergencias cardíacas.
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
              08:30 - 09:00 | Apertura de puertas y acreditaciones
            </strong>
          </p>

          <p className={itemClass}>
            <strong>09:00 - 09:30 | Apertura de la jornada</strong>
          </p>

          <p className={itemClass}>
            <strong>09:30 - 10:00 | Espacio de homenajes</strong>
          </p>

          <p className={itemClass}>
            <strong>
              10:00 - 11:30 | Instructor de RCP: Taller práctico de
              perfeccionamiento docente
            </strong>
            <br />
            Disertantes: Miguel Ángel Grima y Meritxell Ros (España)
            <br />
            Taller eminentemente práctico enfocado en mejorar la calidad docente
            de las formaciones de RCP. Se trabajarán aspectos como la
            organización del espacio, colocación de alumnos y material,
            comunicación docente, dinámicas prácticas y recursos aplicables
            desde el día siguiente en cualquier curso.
          </p>

          <p className={itemClass}>
            <strong>
              11:30 - 13:00 | Adaptación de cursos de RCP para personas con
              discapacidad
            </strong>
            <br />
            Disertantes: Grupo Inemer — Esteban Verón y Julieta Passarelli.
            <br />
            Protocolos de Emergencia en Personas con Discapacidad: Adaptación
            Operativa, Toma de Decisiones y Sistemas de Respuesta. <br />
            Criterios de intervención prehospitalaria en situaciones que
            involucren personas con discapacidad, abordando la brecha existente
            entre los protocolos técnicos y su aplicación real en territorio.{" "}
            <br /> Se trabajará sobre evaluación de escena, toma de decisiones
            bajo presión, adaptación operativa de protocolos y articulación del
            sistema de respuesta, integrando además un rol play práctico
            orientado al instructorado inclusivo.
          </p>

          <p className={itemClass}>
            <strong>13:00 - 14:30 | Almuerzo y visita a stands</strong>
          </p>

          <p className={itemClass}>
            <strong>14:30 - 15:30 | Testimonio en primera persona</strong>
            <br />
            Exposición + preguntas.
          </p>

          <p className={itemClass}>
            <strong>
              15:30 - 16:30 | Psicología en emergencias aplicada a la RCP
            </strong>
            <br />
            Disertantes: Equipo PAE (equipos formados por la Lic. Alicia
            Galfaso).
            <br />
            Moderador: Nicolás De Paulo.
            <br />
            En esta charla del equipo PAE le brindaran información y
            herramientas a los instructores para que sus alumnos se protejan
            ante la situación de una Reanimación Cardiopulmonar (RCP) fallida,
            que actúa como un detonante crítico y de alto impacto en el
            desarrollo y agravamiento del Trastorno por Estrés Postraumático
            (TEPT), afectando tanto a profesionales de la salud y rescatistas
            como a testigos particulares. La muerte del paciente tras un
            esfuerzo físico y emocional extremo quiebra las expectativas de
            salvación, generando consecuencias psicológicas profundas.
          </p>

          <p className={itemClass}>
            <strong>16:30 - 16:45 | Coffee break</strong>
          </p>

          <p className={itemClass}>
            <strong>16:45 - 17:15 | Networking</strong>
          </p>

          <p className={itemClass}>
            <strong>17:15 - 17:30 | Entrega de certificados</strong>
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
