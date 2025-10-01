import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function SpeakersTimeline() {
  const data = [
    {
      title: "Miércoles 15 de octubre",
      content: (
        <div className="relative">
          <div className="absolute right-2 top-10 -translate-y-1/2 w-2/3 h-2/3 bg-[url('/assets/logo-congreso2025.png')] bg-contain bg-no-repeat opacity-10 pointer-events-none lg:block hidden"></div>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>9:00 – 9:30 | Apertura y Bienvenida</strong>
            <br />
            Lugar: Sede del Club Deportivo Barrio Alegre calle Almirante Brown
            78 de Trenque Lauquen
            <br />• Breve introducción al congreso y objetivos del evento.
            (Locutor)
            <br />• Bienvenida a cargo del Comité Organizador.
            <br />• Apertura oficial a cargo del Intendente Municipal de Trenque
            Lauquen.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              9:30 – 10:45 | Charla 1: Formaciones Oficiales ERC (European
              Resuscitation Council) en Catalunya. Duración, Temario y Perfil de
              los Alumnos
            </strong>
            <br />• Ponente: Miguel Ángel Grima Salinas
            <br />• Enfoque: Como se desarrollan las formaciones oficiales de
            ERC en España, con un adelanto de las presentaciones que la ERC
            realizara en su próximo congreso en España, donde se realizara el
            lanzamiento oficial de las nuevas Guías de Reanimación del ERC.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>10:45 – 11:00 | Break (15 minutos)</strong>
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              11:00 – 12:15 | Charla 2: Como hacer de las Capacitaciones en RCP
              un emprendimiento exitoso
            </strong>
            <br />
            • Expositora: Marta Iriarte
            <br />
            Enfoque: enseñará cómo transformar las capacitaciones de RCP en un
            negocio rentable, proporcionando estrategias claras para generar
            ingresos constantes y asegurar el éxito a largo plazo en el
            emprendimiento de formación en primeros auxilios
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              12:15 – 13:15 | Receso de media jornada (Espacio libre)
            </strong>
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              13:15 – 14:30 | Charla 3: Mentalidad o enfoque del Instructor de
              RCP para elevar el valor percibido por su trabajo.
            </strong>
            <br />
            {/* • Expositor: Rodrigo Baluk.
            <br />• Enfoque: Cómo establecer tarifas adecuadas, gestionar un
            negocio de capacitación eficazmente y estrategias para atraer más
            clientes.
            <br />• Objetivo: Ayudar a los instructores a profesionalizar sus
            servicios, incrementar su visibilidad y alcanzar una mayor
            clientela. */}
            • Expositores: Patricia Soto y Marta Iriarte.
            <br />• Enfoque: Mentalidad o enfoque del Instructor de RCP para
            elevar el valor percibido por su trabajo.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>14:30 – 14:45 | Break (15 minutos)</strong>
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              14:45 – 16:00 | Charla 4: Cómo Atraer y Conquistar con un
              Marketing Auténtico para Instructores de RCP
            </strong>
            <br />
            • Expositora: Patricia Soto
            <br />• Enfoque: Estrategias para aumentar la participación en
            capacitaciones, generar interés y ampliar el alcance.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>16:00 – 16:15 | Break (15 minutos)</strong>
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              16:15 – 17:30 | Charla 5: Resumen y preguntas abiertas
            </strong>
            <br />• Espacio para preguntas, resumen de las charlas del día y
            comentarios finales.
            <br />• Oportunidad para que los asistentes planteen dudas y
            reflexiones.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>17:30 – 18:00 | Cierre del Día</strong>
            <br />• Reflexión sobre los aprendizajes del día.
            <br />• Agradecimientos finales y detalles de lo que viene el día
            siguiente.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>18:00 | Apertura de actividades a todo público</strong>
            <br />• Charlas abiertas de RCP en las plazas de la ciudad
            (merienda).- Invitamos a Instructores de RCP a compartir la merienda
            con gente de la ciudad en las diferentes plazas y de esta manera
            mostrar las técnicas de la maniobra y concientizar sobre la
            importancia del conocimiento de la misma.
          </p>
        </div>
      ),
    },
    {
      title: "Jueves 16 de octubre",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>9:00 – 9:30 | Apertura y Bienvenida</strong>
            <br />• Breve introducción al día y objetivos del evento.
            <br />• Acto conmemorativo Día Mundial de la RCP.
            <br />• Homenaje en memoria del Instructor Jorge Adrián Prieto.
            <br />• Homenaje a Tomás y Beltrán. A los 14 años, ambos perdieron
            la vida por muerte súbita. Desde entonces, sus padres, Mariano Casoy
            y Jorge Bombau, transformaron el dolor en lucha, impulsando la Ley
            27.159 y su reglamentación.
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              9:30 – 10:45 | Charla 1: Sin barreras para transmitir y capacitar
            </strong>
            <br />
            • Expositor: Guillermo Carranza (Instructor NO VIDENTE).
            <br />• Enfoque: Inclusión de personas discapacitadas en
            capacitaciones de RCP y cómo adaptar los métodos para todos los
            públicos.
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>10:45 – 11:00 | Break (15 minutos)</strong>
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              11:00 – 12:15 | Charla 2: Experiencias de actividades educativas
              de RCP en España. Funcionamiento de la ERC
            </strong>
            {/* <br />
            • Expositor: Borja Diez Sainz
            <br />• Enfoque: Experiencia clínica en emergencias y su aplicación
            en capacitaciones. */}
            <br />
            • Expositor: Francesc Carmona Jimenez
            <br />• Enfoque: Acercar tecnicas y experiencias de actividades de
            la ERC adaptables a nuestros sistemas educativos
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              12:15 – 13:15 | Receso de media jornada (Espacio libre)
            </strong>
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              13:15 – 14:30 | Charla 3: “A pesar de mi RCP, la víctima falleció,
              ¿y ahora?”
            </strong>
            <br />
            • Expositor: Equipo de PAE de Alicia Galfaso y Nicolás De Paulo como
            moderador.
            <br />• Enfoque: Abordaje emocional y profesional frente a
            situaciones difíciles y cómo superar la culpa en el ejercicio del
            RCP
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>14:30 – 14:45 | Break (15 minutos)</strong>
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              14:45 – 16:00 | Charla 4: Debate: Ley 27.159 – ¿Cómo hacer para
              que se cumpla?
            </strong>
            <br />
            • Expositores: Julio Godoy, Sergio Felice y Equipo de “Argentina
            Reanima”
            <br />• Enfoque: Análisis de la ley y estrategias para su
            cumplimiento en el sistema educativo nacional y la formación de
            zonas cardio protegidas en lugares públicos.
            <br />• Objetivo: Analizar como los profesionales y las
            instituciones pueden colaborar para asegurar que la ley se cumpla y
            como mejorar la concientización y la implementación de programas
            educativos sobre RCP.
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>16:00 – 16:15 | Break (15 minutos)</strong>
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              16:15 – 17:30 | Charla 5: Resumen y preguntas abiertas
            </strong>
            <br />• Espacio para preguntas, resumen de las charlas del día y
            comentarios finales.
            <br />• Oportunidad para que los asistentes planteen dudas y
            reflexiones.
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>17:30 – 18:00 | Cierre del Día</strong>
            <br />• Reflexión sobre los aprendizajes del día.
            <br />• Agradecimientos finales y despedida.
          </p>

          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>18:00 | Apertura de actividades a todo público</strong>
            <br />• Charlas abiertas de RCP en las plazas de la ciudad
            (merienda).
            <br />
            Invitamos a instructores de RCP a compartir la merienda con gente de
            la ciudad en las diferentes plazas y de esta manera mostrar las
            técnicas de la maniobra y concientizar sobre la importancia del
            conocimiento de la misma.
          </p>
        </div>
      ),
    },
    {
      title: "Viernes 17 de octubre",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>9:00 – 9:30 | Apertura y Bienvenida</strong>
            <br />
            • Breve introducción al día y objetivos del evento.
            <br />• Repaso rápido de lo que se verá durante el día.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            {/* <strong>
              9:30 – 10:45 | Charla 1: Herramientas Tecnológicas para mejorar la
              enseñanza de RCP
            </strong>
            <br />• Expositor: Juan Sebastian Fabi
            <br />• Expertos en innovación y educación en RCP
            <br />• Enfoque: Herramientas tecnológicas, pro y contra Simuladores
            avanzados, realidad aumentada y aplicaciones interactivas
            Estrategias para hacer capacitaciones más atractivas y efectivas.
            <br />• Objetivo: Modernizar las capacitaciones y optimizar la
            formación de instructores */}
            <strong>
              9:30 – 10:45 | Charla 1: ¿Es posible tener un distrito
              cardioprotegido?
            </strong>
            <br />• Expositor: Nicolas De Paulo
            <br />• Enfoque: El camino en el cual se une el estado y lo privado
            para un bien en común
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>10:45 – 11:00 | Break (15 minutos)</strong>
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              11:00 – 12:15 | Charla 2: RCP por Teléfono: Primera respuesta en
              zonas rurales
            </strong>
            <br />• Expositores: Profesionales del 107, SAME y 911
            especializados en la atención telefónica.
            <br />• Enfoque: Métodos para guiar a personas sin conocimientos,
            cuando llaman a emergencias para que realicen las técnicas de RCP
            guiados por el operador del teléfono.
            <br />• Objetivo: Capacitación para incluir en las capacitaciones de
            RCP a distancia.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              12:15 – 13:15 | Receso de media jornada (Espacio libre)
            </strong>
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              13:15 – 14:30 | Charla 3: “Volví a la vida gracias a la RCP”
            </strong>
            <br />• Expositor: Invitado especial, una persona que fue reanimada
            con RCP y sobrevivió.
            <br />• Enfoque:
            <br />
            - Relato en primera persona sobre la experiencia de haber sido
            reanimado.
            <br />
            - Testimonio del rescatador (si es posible).
            <br />
            - Impacto en la vida después del evento.
            <br />• Objetivo: Motivar e inspirar a los asistentes sobre la
            importancia de aprender y enseñar RCP.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>14:30 – 14:45 | Break (15 minutos)</strong>
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              14:45 – 16:00 | Charla 4: Capacitación masiva: RCP para toda la
              comunidad
            </strong>
            <br />• Ubicación: Plaza principal de Trenque Lauquen.
            <br />• Descripción: Sesión abierta a todo el público para enseñar
            RCP en masa, con la participación activa de los asistentes.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>16:00 – 16:15 | Break (15 minutos)</strong>
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>
              16:15 – 17:30 | Cierre del Congreso y Entrega de Certificados
            </strong>
            <br />• Palabras finales de agradecimiento.
            <br />• Entrega de certificados de participación.
            <br />• Reflexión sobre los aprendizajes y la importancia de seguir
            capacitando.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            <strong>17:30 – 18:00 | Fin del Congreso</strong>
            <br />• Despedida y agradecimientos finales a asistentes,
            expositores y patrocinadores.
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
