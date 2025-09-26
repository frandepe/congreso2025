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
      title: "Marta Iriarte",
      src: "/assets/speakers/marta-iriarte2.jpg",
      description:
        "Con estudios realizados en la Universidad Nacional de Mar del Plata, es CEO en Marta Iriarte Consultoría Laboral, Terapista Ocupacional, desde el año 2014 consultora en Recursos Humanos, Profesora de Relaciones Publicas y atención al cliente, Marqueting de servicios, Profesora en cursos de emprendedorismo y gestión en redes, Comunity Manager, Desarrollo en Marketing Digital, Mentora de Emprendedores y Orientadora en Planes de Negocios. Lo que aportara en este Congreso, son sus nociones como Docente sobre Habilidades para Emprender. Ayudar a que, cada uno de los Participantes, pueda pensar como Emprendedor para mejorar sus empresas de capacitaciones en RCP.",
    },
    // {
    //   title: "Juan Sebastian Fabi",
    //   src: "/assets/speakers/juan-sebastian-fabi.jpeg",
    //   subtitle: "Socio cofundador de Nexo Tecnológico",
    //   description:
    //     "Es Ingeniero Electrónico con más de 24 años de experiencia en la industria de la electromedicina. Ha ocupado roles en servicio técnico, fabricación, I+D y control de calidad. Fue responsable del desarrollo de un desfibrilador bifásico para E&M Electromedicina – STS SA, premiado con el Sello de Buen Diseño Argentino. Desde 2012, ha enfocado su carrera en el diseño de equipos para la enseñanza de RCP, creando simuladores que abordan las necesidades específicas de los instructores, incluyendo el desarrollo del primer prototipo de AED Trainer con retroalimentación en 2018.\n\nEn el próximo congreso, Juan Sebastián Fabi compartirá su visión sobre cómo la tecnología puede revolucionar la enseñanza en RCP, presentando herramientas como simuladores avanzados, realidad aumentada y aplicaciones interactivas que modernizan y optimizan la formación de instructores.",
    // },
    {
      title: "Patricia Soto",
      src: "/assets/speakers/patricia-soto.jpeg",
      subtitle: "Fundadora y CEO de Nexo Tecnológico",
      description:
        "Socia Fundadora y CEO de Nexo Tecnológico, empresa argentina especializada en el desarrollo de soluciones innovadoras para la capacitación en RCP y primeros auxilios. Con más de 20 años de experiencia en ventas, marketing y liderazgo empresarial, ha guiado la expansión internacional de la empresa y ha sido clave en la implementación de estrategias de marketing auténtico que acompañan a los instructores en el crecimiento de sus capacitaciones. Patricia también es una firme defensora de la concientización social sobre la importancia del conocimiento en primeros auxilios, combinando su experiencia en comunicación estratégica y herramientas digitales para generar impacto real. \n\nEn el próximo congreso, Patricia compartirá herramientas y estrategias de marketing auténtico para instructores, ayudándolos a aumentar la participación, generar interés y ampliar el alcance de sus formaciones.",
    },
    // {
    //   title: "Rodrigo Baluk",
    //   src: "/assets/speakers/rodrigo-baluk.jpeg",
    //   subtitle: "Licenciado en Administración (UBA) y MBA (IAE)",
    //   description:
    //     "Es Licenciado en Administración (UBA) y MBA (IAE), con más de 15 años de experiencia liderando iniciativas de inclusión financiera en bancos y organizaciones sociales. Ha ocupado roles ejecutivos en empresas de consumo masivo y servicios financieros en Argentina y LATAM. Fue Presidente de RADIM y cofundador de la Red Sudamericana de Instituciones de Microfinanzas. Combina herramientas financieras y conocimiento del consumidor para impulsar estrategias sostenibles. Es socio fundador de NITRO+, empresa dedicada a a financiar a los pequeños comercios de proximidad para acelerar sus crecimientos (www.nitropay.ar) \n\nEn el próximo congreso, Rodrigo Baluk compartirá su visión sobre cómo potenciar negocios en entornos económicos complejos, destacando la importancia de la planificación financiera, la correcta gestión de costos y precios y la adaptación estratégica a entornos siempre cambiantes y cada vez mas desafiantes.",
    // },
    {
      title: "Miguel Ángel Grima",
      src: "/assets/speakers/miguel-angel-grima.jpeg",
      subtitle: "Emprendedor en el ámbito de las emergencias",
      description: (
        <>
          Emprendedor en el ámbito de las emergencias, Miguel Ángel Grima fundó{" "}
          <em>PAS. Formación Sanitaria y DEA S.L.</em> en 2011. Actualmente
          dirige <em>GRUPO PAS</em>, un holding que integra varias marcas y
          empresas especializadas en la protección cardiovascular y la respuesta
          ante urgencias.
          <br />
          <br />
          Entre sus actividades destacan:
          <br />
          • Formación sanitaria acreditada por el European Resuscitation Council
          (ERC).
          <br />
          • Distribución y mantenimiento de desfibriladores (DEA).
          <br />
          • Diseño e implementación de Espacios Cardioprotegidos en toda España,
          especialmente en Cataluña.
          <br />
          <br />
          Durante más de una década, ha formado a miles de profesionales y
          ciudadanos, e instalado equipos de soporte vital en sectores clave
          como educación, industria, administración pública y ocio. Así, ha
          contribuido a que la cadena de supervivencia sea una realidad tangible
          en cada comunidad que atienden.
          <br />
          <br />
          <strong>Misión:</strong> Crear entornos seguros donde cada persona
          cuente con los recursos y el conocimiento necesarios para responder
          eficazmente ante una emergencia cardíaca.
          <br />
          <br />
          <strong>Compromiso:</strong> Porque cada latido cuenta, convierte la
          prevención en acción.
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
      title: "Guillermo Carranza",
      src: "/assets/speakers/guille-carranza.png",
      subtitle: "Emprendedor en el ámbito de las emergencias",
      description:
        "*Guillermo Carranza* es un joven de 30 años, nacido en *Las Higueras, Córdoba, Argentina, cuya historia es sinónimo de superación, pasión y compromiso. A pesar de vivir con ceguera, Guillermo ha demostrado que las verdaderas capacidades no dependen de la visión, sino de la **determinación, la inteligencia y el propósito*.\n\n Es *fundador del Centro de Entrenamiento de Especialidades Bomberiles y Primeros Socorros (CEEByPS)*, un proyecto que refleja su firme compromiso con la formación en emergencias, el trabajo colaborativo y el impacto social positivo.\n\n Con *más de 10 años de experiencia* en el campo, Guillermo es *diplomado en Gestión Integral del Riesgo, y se desempeña como **consultor en seguridad*, fusionando su formación técnica con una mirada estratégica, humana y accesible. \n\nAdemás, es *instructor en múltiples disciplinas vinculadas a la seguridad y las emergencias prehospitalarias, participando activamente en programas reconocidos como **ACES, AIDER y Stop The Bleed*, entre otros. A lo largo de los años, ha formado a numerosas personas en contextos diversos, combinando conocimientos técnicos con un enfoque claro, práctico y comprometido. Su experiencia lo respalda tanto en entornos formales como en capacitaciones de campo, donde la preparación puede marcar \n\n Su pasión por la *tecnología y la informática, sumada a una fuerte vocación por el servicio, lo ha llevado también a desarrollarse como **investigador privado*, aportando soluciones en contextos complejos que requieren ética, análisis riguroso y confidencialidad.\n\n Proyección:\n\n Actualmente continúa ampliando sus conocimientos y compartiéndolos con quienes buscan marcar la diferencia en el mundo de las emergencias y la seguridad.",
    },
    // {
    //   title: "Borja Díez Sainz",
    //   src: "/assets/speakers/Borja-Diez-Sainz.jpeg",
    //   subtitle:
    //     "Médico especialista en Medicina Intensiva (UCI) en el Hospital Universitario Quirónsalud Madrid.",
    //   description: (
    //     <>
    //       Se licenció en Medicina y Cirugía por la Universidad de Salamanca y
    //       completó su especialización en el Hospital Universitario 12 de Octubre
    //       de Madrid. Además, es fundador y director médico de Proyecto
    //       Reanimación, una iniciativa dedicada a formar a la sociedad en
    //       técnicas de Reanimación Cardiopulmonar (RCP) con el objetivo de
    //       reducir las muertes súbitas por paro cardíaco. <br />
    //       <br />
    //       <Button className="mb-4">
    //         <a
    //           href="https://www.proyectoreanimacion.com"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           www.proyectoreanimacion.com
    //         </a>
    //       </Button>
    //       <br />
    //       Ha colaborado también en la formación de voluntarios de la Soberana
    //       Orden de Malta en técnicas de RCP y primeros auxilios, demostrando su
    //       compromiso con la educación y la mejora de la respuesta ante
    //       emergencias médicas en la comunidad.
    //     </>
    //   ),
    // },
    {
      title: "Francesc Carmona Jimenez",
      src: "/assets/speakers/francesc.jpg",
      subtitle: "Médico en el Sistema d'Emergències Mèdiques",
      description:
        "Máster en Ciencias. Profesor Asociado en la Universidad de Vic - Universidad Central de Cataluña. Médico. Coordinador clínico y operativo en el Sistema de Emergencias Médicas de Barcelona (España). Chair de Educación para el soporte vital avanzado del ERC y miembro del Extended Board",
    },
    {
      title: "Red PAE",
      src: "/assets/speakers/red-pae.jpg",
      subtitle:
        "Red de ayuda humanitaria en emergencias y desastres, que asiste a víctimas y profesionales en cuidado emocional.",
      description:
        "Creada por la Licenciada Alicia Galfaso, se ha ramificado por Argentina y el Mundo, creando los equipos de  PRIMEROS AUXILIOS EMOCIONALES. Desde hace un tiempo la Lic. Galfaso y su equipo, colaboran con la Asociación Argentina Reanima para sumar en los protocolos de emergencias ante muertes súbitas las herramientas que brinda la Red y preparar a los socorristas actuantes en el antes, el durante y el después de una intervención. Parte de uno de estos equipos, brindara en este congreso una charla sobre esta temática La Licenciada Alicia Galfaso cuenta dentro de su cv, con la siguiente formación: Psicóloga egresada de la Universidad de Buenos Aires Especialista en Psicooncología Especialista en Psicología de la Emergencia y en Psicotraumatología Directora de Postgrado de “Curso Superior Primeros Auxilios Emocionales en Urgencias, Emergencias y Desastres”. Fac. de Medicina. UBA Docente de la Catedra de Medicina Legal de la Fac. de Medicina UBA Docente de la Universidad de Málaga. España Coordinadora Gral. de la RED PAE. Red de Ayuda Humanitaria en Cuidado Emocional en Urgencias, Emergencias y Desastres. Directora de la Revista digital española “Cuadernos de Crisis y Emergencias” Trainer Internacional de equipos de Primera Respuesta en Emergencias y Desastres. 1°Oficial (CAO) Bomberos Voluntarios de La Boca. Argentina",
    },
    {
      title: "Argentina Reanima",
      src: "/assets/speakers/argentina-reanima.jpg",
      subtitle:
        "Argentina Reanima es una organización civil sin fines de lucro",
      description:
        "Formada por profesionales de diversas disciplinas, como médicos, enfermeros, bomberos y agentes de protección civil de todo el país. Nacimos en enero de 2021 con un propósito urgente: impulsar la reglamentación de la Ley 27.159 de Muerte Súbita, estancada desde 2015.\n\n A través de acciones públicas y gratuitas en plazas, escuelas y comunidades, logramos visibilizar esta necesidad y, en 2022, consiguieron que la ley fuera finalmente reglamentada. Hoy, con más de 9.000 personas capacitadas y filiales en múltiples provincias, siguen activos para que la ley se cumpla.\n\n Premio INADEA “Por la Vida” - 2023.\n Su lema: Solo bajamos los brazos para hacer RCP.\n\n En el próximo Congreso Nacional de RCP, el equipo de Argentina Reanima brindará una charla clave sobre cómo lograr que la Ley 27.159 se cumpla efectivamente. Compartirán su análisis de la normativa y estrategias para implementarla en escuelas y municipios. Con una mirada práctica basada en la experiencia territorial, propondrán herramientas concretas para transformar la concientización en políticas activas de prevención de la muerte súbita en todo el país. En este congreso Sergio Felice y Julio Godoy integrantes de esta asociación, disertaran sobre los fundamentos y la importancia de la ley de muerte súbita 27.159",
    },
    {
      title: "911",
      src: "/assets/speakers/911.jpg",
      subtitle: "Superintendencia de comunicaciones",
      description:
        "La Superintendencia de comunicaciones, regula el funcionamiento de las centrales de emergencias denominadas “911”. Las llamadas que ingresan a la Central 911, son atendidas por los Operadores y derivadas a los Centros de Despacho correspondientes, que son los encargados de asignar los recursos materiales para prestar el auxilio o ayuda solicitada. Estos operadores también se capacitan para teledirigir acciones en lo referente a maniobras de Primeros auxilios para ciudadanos que no tienen conocimientos de las mismas. En este congreso, un operador del servicio 911 de la ciudad de Trenque Lauquen brindara sus conocimientos de como dirigir a un ciudadano en la atención de maniobras de RCP.",
    },
  ];

  return <FocusCards cards={cards} />;
}
