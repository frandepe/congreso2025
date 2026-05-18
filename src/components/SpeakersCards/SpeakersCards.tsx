import { FocusCards } from "@/components/ui/focus-cards";
import { Button } from "../ui/button";

export function SpeakersCards() {
  const cards = [
    {
      title: "Nicolás De Paulo (moderador)",
      src: "/assets/speakers/nicolas-de-paulo2.png",
      subtitle:
        "Coordinador de Defensa Civil del Municipio de Trenque Lauquen.",
      description:
        "Ex Bombero Voluntario en cuartel de la ciudad de Pellegrini, con ingreso Septiembre de 1980, siendo parte del grupo fundacional del mismo, con las capacitaciones recibidas de la Federación de Asociaciones de Bomberos Voluntarios de la Provincia de Bs As.  Se desempeñó  como: Bombero, Oficial, Segundo Jefe de C.A. y Jefe del C.A. en esa institución, en lo referente a la Federación, ocupo los cargos de Inspector Zonal (Región Oeste de la F.A.B.V.P.B.A.) Y de Director de Capacitación de la F.A.B.V.P.B.A. Región Oeste con 33 cuarteles a cargo de la capacitación.  Promovió desde ese lugar, en la década del 90, junto a un grupo de Bomberos de la Región Oeste, en el congreso de la federación que se realiza cada dos años, que la materia “PSICOLOGIA EN EMERGENCIAS” fuese parte del curso de ingreso a los cuarteles de la Provincia, prevaleciendo la salud psíquica del bombero por sobre todas las cosas. Realizo y aprobó  el “Diplomado Internacional Universitario en Psicología de la Emergencia, Autocuidados y Soporte Preventivo para diferentes Victimas y Personal Interviniente en Crisis, Emergencias, Desastres y Catástrofes” Dictado por la Universidad Católica de Cuyo Sede San Luis Capital, El Instituto de Capacitación e Investigación del Poder Judicial de San Luis y como Jefe de Catedra el Lic. Especialista Psicología de la Emergencia, Diego Núñez. Realizo diferentes capacitaciones con la Licenciada Alicia Galfaso catedrática de la UBA y mentora de los equipos PAE (Primeros Auxilios Emocionales) a nivel mundial, con quien está cursando en la actualidad para completar los diferentes estándares de sus equipos. Desde 2017 Instructor de Socorrismo Urbano con técnicas de RCP y uso del DEA, Formador de Brigadas de Emergencias, Monitor de Zonas Cardioseguras, Primero Socorros Pediátricos e Instructor de Primeros Socorros Psicológicos, todos estos desde ASES y con el aval de AIDER.org. Titular de ND Capacitaciones (Capacitaciones para emergencias).\n\n En el próximo congreso oficiará de moderador.",
    },

    {
      title: "Miguel Ángel Grima Salinas",
      src: "/assets/speakers/miguel-angel-grima.jpeg",
      subtitle: "Emprendedor en el ámbito de las emergencias",
      description: (
        <>
          Un día, mientras trabajo de técnico en mi ambulancia, veo la necesidad
          de mejorar la formación y la calidad de los productos sanitarios para
          profesionales y de ahí, en 2011, nace PAS. Formación Sanitaria y DEA
          S.L, que ahora se encuentra dentro de GRUPO PAS, donde actualmente
          lidero el desarrollo de soluciones de formación, herramientas y
          protección en salud a través de nuestras 5 áreas: <br />
          • PAS Formación Sanitaria y DEA: venta de material sanitario y
          formación sanitaria a particulares. <br />
          • CARDIOPAS: gestión de espacios cardioprotegidos (desfibriladores y
          formación sanitaria). Associació CARDIOPAS: Asociación sin ánimo de
          lucro desde la que ofrecemos formación a colectivos vulnerables, otras
          Asociaciones, etc. <br />• AZ Emergencias: desarrollo y fabricación de
          productos de emergencias. <br />
          • NINONINO: marca de ropa creada por y para familias con personal de
          emergencias.
          <br />
          <br />
          Ocupo el cargo de Director e Instructor del European Resuscitation
          Council para cursos de Soporte Vital Básico y DEA, e instructor en
          Stop The Bleed y entornos NRBQ.
          <br />
          <br />
          Además, formo parte Sant Boi Empresarial donde ejerzo el cargo de
          presidente y, también, soy miembro de la Ejecutiva de Pimec Baix
          Llobregat/l'Hospitalet, impulsando la colaboración empresarial en la
          región.
          <br />
          <br />
          <Button className="mb-4">
            <a
              href="https://www.dropbox.com/scl/fi/o4lr7zbej4lxux7v65sne/GRUPO-PAS-2025.pdf?rlkey=dsi57h43r1d7s355kq845thow&e=1&st=moovtd62&dl=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Grupo PAS 2025
            </a>
          </Button>
        </>
      ),
    },
    {
      title: "Meritxell Ros",
      src: "/assets/speakers/meritxell-ros.jpg",
      subtitle: "Técnico de Emergencias Sanitarias.",
      description: (
        <>
          Ambulancia de Soporte Vital Básico en Catalunya desde 2006. Bombero
          voluntario desde 2006. Ha sido sotscap de su parque (subjefa).
          <br />
          Instructora de Soporte Vital Básico y DEA ERC. Instructora de Primeros
          Auxilios.
          <br />
          Profesora del Grado Medio de Técnico de Emergencias Sanitarias.
        </>
      ),
    },
    {
      title: "Esteban Verón",
      src: "/assets/speakers/esteban-veron.jpg",
      subtitle: "Capacitador en emergencias inclusivas",
      description: (
        <>
          Paramédico, rescatista, bombero, Instructor Internacional NFPA 1020 y
          CEO, director y fundador de INEMER; con más de 25 años de trayectoria
          en atención prehospitalaria, gestión de emergencias, rescate y
          formación operativa. Es además instructor y embajador de Stop the
          Bleed (USA), especializado en control de hemorragias y respuesta
          inmediata ante situaciones críticas. Cuenta con formación en gestión
          de riesgos y desastres, psicología de la emergencia, primeros auxilios
          emocionales, emergencias en el ámbito minero y pedagogía docente
          aplicada a la formación operativa. A lo largo de su trayectoria ha
          desarrollado programas de capacitación, protocolos adaptados y
          dispositivos de intervención destinados a equipos de salud, fuerzas de
          seguridad, bomberos, rescatistas, operadores de emergencia e
          instituciones educativas. Como creador de INEMER, lidera el desarrollo
          técnico y estratégico de programas de fortalecimiento institucional y
          emergencias inclusivas, siendo referente en Argentina en la
          incorporación de protocolos adaptados para personas con discapacidad y
          neurodivergencias dentro de los sistemas de respuesta, evacuación y
          atención prehospitalaria.
        </>
      ),
    },
    {
      title: "Julieta Passarelli",
      src: "/assets/speakers/julieta-passarelli.jpg",
      subtitle:
        "Arquitecta - Consultora en gobernanza sostenible e inteligencia territorial",
      description: (
        <>
          Arquitecta urbanista, docente instructora, investigadora y consultora
          en gobernanza sostenible, inteligencia territorial y gestión del
          riesgo con enfoque inclusivo, con más de 20 años de experiencia en
          planificación estratégica y articulación institucional. Dentro de
          INEMER aporta la dimensión territorial y sistémica de la gestión del
          riesgo, incorporando criterios de accesibilidad a escala
          arquitectónica, urbana, periurbana y territorial, junto con enfoques
          de inclusión operativa, optimización de tiempos de respuesta,
          planificación colaborativa y articulación interinstitucional aplicados
          al diseño de programas, protocolos y dispositivos de respuesta ante
          emergencias y catástrofes. Se desempeña como asesora en sostenibilidad
          en el Prorrectorado de Desarrollo Territorial de la Universidad
          Nacional de Córdoba (UNC) y como consultora en innovación pública e
          inteligencia territorial para la Legislatura de la Provincia de
          Córdoba, participando en procesos de planificación colaborativa,
          gobernanza territorial y fortalecimiento institucional. Además,
          asesora a diversas organizaciones vinculadas al desarrollo
          territorial, la sostenibilidad, la innovación pública y la resiliencia
          comunitaria, promoviendo modelos de articulación colaborativa entre
          actores públicos, privados, académicos y sociales.
        </>
      ),
    },
    {
      title: "Marta Iriarte",
      src: "/assets/speakers/marta-iriarte2.jpg",
      description:
        "Con estudios realizados en la Universidad Nacional de Mar del Plata, es CEO en Marta Iriarte Consultoría Laboral, Terapista Ocupacional, desde el año 2014 consultora en Recursos Humanos, Profesora de Relaciones Publicas y atención al cliente, Marqueting de servicios, Profesora en cursos de emprendedorismo y gestión en redes, Comunity Manager, Desarrollo en Marketing Digital, Mentora de Emprendedores y Orientadora en Planes de Negocios. Lo que aportara en este Congreso, son sus nociones como Docente sobre Habilidades para Emprender. Ayudar a que, cada uno de los Participantes, pueda pensar como Emprendedor para mejorar sus empresas de capacitaciones en RCP.",
    },
    {
      title: "Dr. Guillermo Sandrone",
      src: "/assets/speakers/guillermo-sandrone.jpg",
      subtitle: "Abogado",
      description: (
        <>
          Guillermo Sandrone es abogado diplomado por la Universidad Nacional de
          Córdoba y posee una Maestría en Derecho Penal de la Universidad
          Torcuato Di Tella. Desarrolló su trayectoria profesional en distintos
          sectores de la administración de justicia penal y en el Ministerio
          Público Fiscal, integrando experiencia en análisis jurídico, actuación
          institucional y abordaje de problemáticas vinculadas al ámbito penal.
          Actualmente ejerce la profesión de manera independiente. En el campo
          educativo se desempeñó como docente y asistente en instituciones de
          educación superior, incluyendo su labor como profesor universitario en
          el Instituto Superior de Seguridad Pública, así como en espacios de
          educación no formal. Tiene a su cargo la cátedra de Perspectiva
          Jurídica de los Primeros Auxilios en la UNISAL. Participó además en
          proyectos de investigación y colaboró en publicaciones jurídicas,
          integrando perspectivas académicas y prácticas sobre derecho penal,
          formación y responsabilidad institucional.
        </>
      ),
    },
    {
      title: "Martín Labarrieta",
      src: "/assets/speakers/martin-labarrieta.jpg",
      subtitle: "Lic. Tecnología Médica - Abogado",
      description: (
        <>
          Forma parte de LEX Servicios Hospitalarios, una empresa ubicada en el
          centro de la Provincia de Buenos Aires y en constante crecimiento.
          <br />
          <br />
          Desde LEX Servicios Hospitalarios desarrolla soluciones especializadas
          para instituciones de salud, ofreciendo:
          <br />
          <br />
          • Ensayos de seguridad eléctrica y desempeño para equipamiento médico
          bajo norma IRAM 62353.
          <br />
          • Programas de mantenimiento específicos para desfibriladores.
          <br />
          • Certificación de equipamiento médico utilizado en establecimientos
          de salud.
          <br />
          • Asesoramiento legal para instituciones sanitarias.
          <br />• Desarrollo de proyectos integrales para instituciones de
          salud.
        </>
      ),
    },

    {
      title: "Velasco Emiliano - UNISAL",
      src: "/assets/speakers/emiliano-velasco.jpg",
      subtitle: "Docente y coordinador académico",
      description: (
        <>
          Especializado en formación de instructores en Primeros Auxilios, RCP y
          DEA, con más de 20 años de experiencia en capacitación, diseño
          pedagógico y conducción de programas de formación vinculados a la
          respuesta ante emergencias.
          <br />
          Desarrolla su actividad en el ámbito de la educación superior y la
          formación institucional, con especial dedicación a la preparación de
          instructores capaces de replicar estándares de enseñanza basados en
          evidencia científica y criterios pedagógicos actualizados. <br />
          Actualmente coordina propuestas académicas y programas de formación de
          instructores en el marco del Programa PAAS (Programa de Primeros
          Auxilios para Animadores Salesianos), tanto en espacios internos de
          formación institucional como en la Diplomatura Universitaria en
          Instrucción de Primeros Auxilios, RCP y DEA de la Universidad
          Salesiana, articulando enfoques educativos, simulación práctica y
          estrategias de intervención comunitaria.
          <br /> Su trabajo se centra en la profesionalización de la enseñanza
          de los primeros auxilios, la formación de multiplicadores y la
          construcción de modelos pedagógicos aplicados a contextos reales de
          emergencia
        </>
      ),
    },
    {
      title: "Carolina Gómez",
      src: "/assets/speakers/carolina-gomez.jpg",
      subtitle: "Médica docente en UNISAL",
      description: (
        <>
          Carolina Gómez es médica egresada de la Universidad de Buenos Aires e
          Instructora de Primeros Auxilios, RCP y DEA formada en la Universidad
          Salesiana. Actualmente se desempeña en el ámbito de la docencia en
          Primeros Auxilios en la UNISAL, así como en la coordinación y gestión
          de cursos de formación en el Programa PAAS (Institución Salesiana).
          <br />
          Cuenta con experiencia de trabajo en espacios educativos no formales,
          especialmente en el acompañamiento de infancias y adolescencias,
          integrando perspectivas de cuidado, prevención y educación
          comunitaria. Desde hace más de diez años participa en la atención y
          gestión de puestos sanitarios durante la Peregrinación Juvenil a
          Luján, desarrollando tareas vinculadas a la asistencia, coordinación y
          respuesta ante emergencias en eventos masivos.
        </>
      ),
    },

    {
      title: "Julio Godoy",
      src: "/assets/speakers/julio-godoy.jpg",
      subtitle: "Lic. En Enfermería",
      description: (
        <>
          Miembro de la Secretaria Red Nacional de RCP y Prevención de la Muerte
          Súbita Federación Argentina de Cardiología.
          <br />
          • Instructor RCP y DEA FAC / UNL
          <br />
          • Instructor Cardoasistencia UBA
          <br />
          • Instructor Internacional ACES-AIDER
          <br />
          • Instructor bajo Normas IRAM Nivel 1<br />
          • Docente Nivel Superior y Universitario en Enfermería del Trabajo y
          Emergencias Extrahospitalarias.
          <br />
          Miembro honorario ACAR
          <br />
          Lic. En Enfermería M.P. 21312
        </>
      ),
    },

    {
      title: "Javier Gonzalez",
      src: "/assets/speakers/javier-gonzalez.jpg",
      subtitle: "Superintendencia de comunicaciones",
      description: (
        <>
          Técnico en emergencias médicas de la UNLP
          <br />
          Técnico en emergencias médicas de la Sociedad de emergencias y
          medicina de urgencia de la República Argentina
          <br />
          Instructor de PHTLS de NAEMT Instructor en RCP Avanzado UNLP RCP
          BASICO Fundación Udec La Plata
          <br />
          Laboralmente desempeño cómo Director del equipo Runner Cardioprotegido
          ( equipo de cardioasistencia en eventos deportivos)
          <br />
          Jefe departamento técnico científico institucional del Ministerio de
          seguridad pcia BS As escuela Juan Vucetich - Bioseguridad y primeros
          auxilios.
        </>
      ),
    },
    {
      title: "Manuel y Compañia de Titeres",
      src: "/assets/speakers/titirifeos.jpg",
      subtitle: "TITIRIFEOS",
      description: (
        <>
          Presentamos “Pequeñas Manos, Grandes Acciones”, una propuesta
          educativa que nace de la unión entre Los Titirifeos, con más de 17
          años de trayectoria en espectáculos educativos, y RCP Con tus manos,
          dedicado desde hace años a la enseñanza de primeros auxilios y RCP.
          <br />
          <br />A través de títeres, música en vivo, humor y participación
          activa, acercamos a niños, familias y comunidades contenidos clave
          sobre prevención de accidentes domésticos, emergencias médicas,
          obstrucción de vías aéreas y reanimación cardiopulmonar. La propuesta
          tiene una duración aproximada de 50 minutos y finaliza con una
          práctica guiada, buscando que aprender a ayudar sea una experiencia
          cercana, divertida y realmente significativa.
        </>
      ),
    },
    {
      title: "Red PAE",
      src: "/assets/speakers/red-pae.jpg",
      subtitle:
        "Red de ayuda humanitaria en emergencias y desastres, que asiste a víctimas y profesionales en cuidado emocional.",
      description:
        "Creada por la Licenciada Alicia Galfaso, se ha ramificado por Argentina y el Mundo, creando los equipos de  PRIMEROS AUXILIOS EMOCIONALES. Desde hace un tiempo la Lic. Galfaso y su equipo, colaboran con la Asociación Argentina Reanima para sumar en los protocolos de emergencias ante muertes súbitas las herramientas que brinda la Red y preparar a los socorristas actuantes en el antes, el durante y el después de una intervención. Parte de uno de estos equipos, brindara en este congreso una charla sobre esta temática La Licenciada Alicia Galfaso cuenta dentro de su cv, con la siguiente formación: Psicóloga egresada de la Universidad de Buenos Aires Especialista en Psicooncología Especialista en Psicología de la Emergencia y en Psicotraumatología Directora de Postgrado de “Curso Superior Primeros Auxilios Emocionales en Urgencias, Emergencias y Desastres”. Fac. de Medicina. UBA Docente de la Catedra de Medicina Legal de la Fac. de Medicina UBA Docente de la Universidad de Málaga. España Coordinadora Gral. de la RED PAE. Red de Ayuda Humanitaria en Cuidado Emocional en Urgencias, Emergencias y Desastres. Directora de la Revista digital española “Cuadernos de Crisis y Emergencias” Trainer Internacional de equipos de Primera Respuesta en Emergencias y Desastres. 1°Oficial (CAO) Bomberos Voluntarios de La Boca. Argentina",
    },
  ];

  return <FocusCards cards={cards} />;
}
