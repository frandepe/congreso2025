import { FocusCards } from "@/components/ui/focus-cards";

export function SpeakersCards() {
  const cards = [
    {
      title: "Nicolás De Paulo",
      src: "/assets/speakers/nicolas-de-paulo2.png",
      subtitle:
        "Coordinador de Defensa Civil del Municipio de Trenque Lauquen.",
      description:
        "Ex Bombero Voluntario en cuartel de la ciudad de Pellegrini, con ingreso Septiembre de 1980, siendo parte del grupo fundacional del mismo, con las capacitaciones recibidas de la Federación de Asociaciones de Bomberos Voluntarios de la Provincia de Bs As.  Se desempeñó  como: Bombero, Oficial, Segundo Jefe de C.A. y Jefe del C.A. en esa institución, en lo referente a la Federación, ocupo los cargos de Inspector Zonal (Región Oeste de la F.A.B.V.P.B.A.) Y de Director de Capacitación de la F.A.B.V.P.B.A. Región Oeste con 33 cuarteles a cargo de la capacitación.  Promovió desde ese lugar, en la década del 90, junto a un grupo de Bomberos de la Región Oeste, en el congreso de la federación que se realiza cada dos años, que la materia “PSICOLOGIA EN EMERGENCIAS” fuese parte del curso de ingreso a los cuarteles de la Provincia, prevaleciendo la salud psíquica del bombero por sobre todas las cosas. Realizo y aprobó  el “Diplomado Internacional Universitario en Psicología de la Emergencia, Autocuidados y Soporte Preventivo para diferentes Victimas y Personal Interviniente en Crisis, Emergencias, Desastres y Catástrofes” Dictado por la Universidad Católica de Cuyo Sede San Luis Capital, El Instituto de Capacitación e Investigación del Poder Judicial de San Luis y como Jefe de Catedra el Lic. Especialista Psicología de la Emergencia, Diego Núñez. Realizo diferentes capacitaciones con la Licenciada Alicia Galfaso catedrática de la UBA y mentora de los equipos PAE (Primeros Auxilios Emocionales) a nivel mundial, con quien está cursando en la actualidad para completar los diferentes estándares de sus equipos. Desde 2017 Instructor de Socorrismo Urbano con técnicas de RCP y uso del DEA, Formador de Brigadas de Emergencias, Monitor de Zonas Cardioseguras, Primero Socorros Pediátricos e Instructor de Primeros Socorros Psicológicos, todos estos desde ASES y con el aval de AIDER.org. Titular de ND Capacitaciones (Capacitaciones para emergencias)",
    },
    {
      title: "Marta Iriarte",
      src: "/assets/speakers/marta-iriarte2.jpg",
    },
    {
      title: "Juan Sebastian Fabi",
      src: "/assets/speakers/juan-sebastian-fabi.jpeg",
      subtitle: "Socio cofundador de Nexo Tecnológico",
      description:
        "Es Ingeniero Electrónico con más de 24 años de experiencia en la industria de la electromedicina. Ha ocupado roles en servicio técnico, fabricación, I+D y control de calidad. Fue responsable del desarrollo de un desfibrilador bifásico para E&M Electromedicina – STS SA, premiado con el Sello de Buen Diseño Argentino. Desde 2012, ha enfocado su carrera en el diseño de equipos para la enseñanza de RCP, creando simuladores que abordan las necesidades específicas de los instructores, incluyendo el desarrollo del primer prototipo de AED Trainer con retroalimentación en 2018.En el próximo congreso, Juan Sebastián Fabi compartirá su visión sobre cómo la tecnología puede revolucionar la enseñanza en RCP, presentando herramientas como simuladores avanzados, realidad aumentada y aplicaciones interactivas que modernizan y optimizan la formación de instructores.",
    },
    {
      title: "Patricia Soto",
      src: "/assets/speakers/patricia-soto.jpeg",
      subtitle: "Fundadora y CEO de Nexo Tecnológico",
      description:
        "Soia Fundadora y CEO de Nexo Tecnológico, empresa argentina especializada en el desarrollo de soluciones innovadoras para la capacitación en RCP y primeros auxilios. Con más de 20 años de experiencia en ventas, marketing y liderazgo empresarial, ha guiado la expansión internacional de la empresa y ha sido clave en la implementación de estrategias de marketing auténtico que acompañan a los instructores en el crecimiento de sus capacitaciones. Patricia también es una firme defensora de la concientización social sobre la importancia del conocimiento en primeros auxilios, combinando su experiencia en comunicación estratégica y herramientas digitales para generar impacto real. En el próximo congreso, Patricia compartirá herramientas y estrategias de marketing auténtico para instructores, ayudándolos a aumentar la participación, generar interés y ampliar el alcance de sus formaciones.",
    },
    {
      title: "Rodrigo Baluk",
      src: "/assets/speakers/rodrigo-baluk.jpeg",
      subtitle: "Licenciado en Administración (UBA) y MBA (IAE)",
      description:
        "Es Licenciado en Administración (UBA) y MBA (IAE), con más de 15 años de experiencia liderando iniciativas de inclusión financiera en bancos y organizaciones sociales. Ha ocupado roles ejecutivos en empresas de consumo masivo y servicios financieros en Argentina y LATAM. Fue Presidente de RADIM y cofundador de la Red Sudamericana de Instituciones de Microfinanzas. Combina herramientas financieras y conocimiento del consumidor para impulsar estrategias sostenibles. Es socio fundador de NITRO+, empresa dedicada a a financiar a los pequeños comercios de proximidad para acelerar sus crecimientos (www.nitropay.ar)                                                                                                         En el próximo congreso, Rodrigo Baluk compartirá su visión sobre cómo potenciar negocios en entornos económicos complejos, destacando la importancia de la planificación financiera, la correcta gestión de costos y precios y la adaptación estratégica a entornos siempre cambiantes y cada vez mas desafiantes.",
    },
    {
      title: "Miguel Angel Grima",
      src: "/assets/speakers/miguel-angel-grima.jpeg",
      subtitle: "Emprendedor en el ámbito de las emergencias",
      description:
        "Miguel Ángel Grima fundó PAS. Formación Sanitaria y DEA S.L. en 2011. Hoy dirige GRUPO PAS, holding que integra varias marcas y empresas especializadas en la protección cardiovascular y la respuesta ante urgencias.",
    },
    {
      title: "Guillermo Carranza",
      src: "/assets/speakers/.jpeg",
      subtitle: "Emprendedor en el ámbito de las emergencias",
      description:
        "*Guillermo Carranza* es un joven de 30 años, nacido en *Las Higueras, Córdoba, Argentina, cuya historia es sinónimo de superación, pasión y compromiso. A pesar de vivir con ceguera, Guillermo ha demostrado que las verdaderas capacidades no dependen de la visión, sino de la **determinación, la inteligencia y el propósito*. Es *fundador del Centro de Entrenamiento de Especialidades Bomberiles y Primeros Socorros (CEEByPS)*, un proyecto que refleja su firme compromiso con la formación en emergencias, el trabajo colaborativo y el impacto social positivo. Con *más de 10 años de experiencia* en el campo, Guillermo es *diplomado en Gestión Integral del Riesgo, y se desempeña como **consultor en seguridad*, fusionando su formación técnica con una mirada estratégica, humana y accesible. Además, es *instructor en múltiples disciplinas vinculadas a la seguridad y las emergencias prehospitalarias, participando activamente en programas reconocidos como **ACES, AIDER y Stop The Bleed*, entre otros. A lo largo de los años, ha formado a numerosas personas en contextos diversos, combinando conocimientos técnicos con un enfoque claro, práctico y comprometido. Su experiencia lo respalda tanto en entornos formales como en capacitaciones de campo, donde la preparación puede marcar la diferencia. Su pasión por la *tecnología y la informática, sumada a una fuerte vocación por el servicio, lo ha llevado también a desarrollarse como **investigador privado*, aportando soluciones en contextos complejos que requieren ética, análisis riguroso y confidencialidad. Proyección: Actualmente continúa ampliando sus conocimientos y compartiéndolos con quienes buscan marcar la diferencia en el mundo de las emergencias y la seguridad.",
    },
  ];

  return <FocusCards cards={cards} />;
}
