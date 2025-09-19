import { useState } from "react";
import { TextPagination } from "@/components/ui/text-pagination";

const ITEMS_PER_PAGE = 6;

interface Patrocinador {
  image: string;
  title: string;
  description: string;
  url: string;
}

const patrocinadoresData = [
  {
    image: "/assets/patrocinadores/nd-capacitaciones.png",
    title: "ND Capacitaciones",
    description:
      "Es una empresa dedicada a la Capacitación en emergencias, con una alta experiencia en el tema de mas de 30 años, brinda diferentes capacitaciones relacionadas al accionar del ciudadano común frente a emergencias. En la empresa podes encontrar las siguientes capacitaciones:  “Socorros urbanos con RCP y DEA”  “Formador de Brigadistas de Emergencias”  “Monitor de Zonas Cardio Seguras”  “Primeros Auxilios para Perros y Gatos”  “Primeros Socorros Psicológicos”",
    url: "https://ndcapacitaciones.com.ar",
  },
  {
    image: "/assets/patrocinadores/driplan.png",
    title: "Driplan",
    description: `Se especializa en la provisión de equipamiento médico de alta complejidad, con un enfoque particular en soluciones cardiológicas de excelencia. Nuestra función como empresa es acompañar a instituciones públicas y privadas en la incorporación de tecnología confiable, eficiente y de última generación, que contribuya a elevar los estándares de seguridad y atención médica.
    A través de nuestros desfibriladores de vanguardia, ofrecemos equipos diseñados para garantizar máxima precisión, autonomía y facilidad de uso en situaciones críticas, permitiendo una respuesta inmediata y efectiva frente a emergencias cardiovasculares. De este modo, contribuimos de manera directa a la prevención, el cuidado de la salud y la protección de la vida en cada entorno donde estamos presentes.`,
    url: "https://www.driplan.com/",
  },
  {
    image: "/assets/patrocinadores/lecsy.png",
    title: "LECSY",
    description: `LECSY (Learning Certificate System) es una plataforma de capacitación a distancia que brinda a los equipos las herramientas que el mundo actual necesita. Ofrece un innovador sistema de enseñanza y certificación, integrando materiales de estudio, simuladores, aporte docente, experiencia del usuario y registros para retroalimentación y calificación. Misión: colaborar, facilitar, respaldar y potenciar a centros y personas usuarias para lograr un aprendizaje efectivo, duradero y aplicable, registrando y certificando cada paso del proceso. Visión: aumentar la seguridad, mejorar la sobrevida y reducir la morbilidad de las personas asistidas por personal entrenado con LECSY, potenciando el aprendizaje, las emociones, las competencias y el análisis reflexivo.`,
    url: "https://www.lecsy.com.ar/",
  },
  {
    image: "/assets/patrocinadores/nexo-tecnologico.png",
    title: "Nexo Tecnológico",
    description:
      "Somos una empresa argentina que diseña y fabrica simuladores para capacitaciones en RCP y primeros auxilios, con tecnología de vanguardia que permite a instructores y profesionales de la salud brindar entrenamientos con mayor realismo. Creemos que cuando una persona se siente segura, puede salvar una vida.",
    url: "https://nexotecnologico.com",
  },
  {
    image: "/assets/patrocinadores/argentinareanima.png",
    title: "Argentina reanima",
    description:
      "Capacitamos a personas en técnicas de reanimación cardiopulmonar (RCP), uso de desfibriladores externos automáticos (DEA) y Maniobra de Heimlich, promoviendo además el cumplimiento de la Ley 27.159. Fomentamos una comunidad comprometida, solidaria y preparada para actuar de manera rápida y eficaz ante situaciones críticas como la muerte súbita, fortaleciendo el rol de cada persona como primer respondiente en la cadena de respuesta",
    url: "https://argentinareanima.org.ar",
  },
  {
    image: "/assets/patrocinadores/aces.png",
    title: "Aces",
    description:
      "La Asociación para la Capacitación en Emergencias y Socorros (ACES) es una organización académica sin fines de lucro fundada en el año 2000 con sus casas matrices en Argentina y Canadá. Se dedica a la enseñanza médica, entrenamiento en emergencias, seguridad y rescate. También se dedica a difundir programas de prevención para especialistas y personal de la salud. Desde su constitución la institución trabaja en forma continua para alcanzar los mayores estándares en excelencia educativa. ACES es miembro de la red internacional de entrenamiento AIDER, cuenta con más de cinco mil instructores certificados en América Latina, Brasil, Canadá, España, Estados Unidos, Portugal y Tailandia. La institución ofrece y enseña más de treinta cursos diferentes provenientes de instituciones científicas y médicas ampliamente reconocidas. Todas las formaciones son internacionalmente certificadas por la Asociación Internacional ACES, por la red AIDER Canadá y/o por American ECHO, todas ellas instituciones internacionales de primer nivel. Las capacitaciones brindadas, siguen las últimas recomendaciones de ILCOR, el consejo Europeo de Resucitación, la AAP (American Academy of Pediatrics) y la OPS (Organización Panamericana de la Salud), y están en constante actualización para estar siempre al día con los protocolos más recientes.",
    url: "https://www.acesint.org/web/es/",
  },
  {
    image: "/assets/patrocinadores/logo-fmd.png",
    title: "Desarrollo Web FD",
    description:
      "Ayudo a empresas y emprendedores a mejorar sus procesos mediante el desarrollo de soluciones web y móviles",
    url: "https://frandepe.vercel.app/",
  },
  {
    image: "/assets/patrocinadores/cafe-bar.png",
    title: "Bares & Fondas",
    description:
      "Resto-Bar Nuestro Lugar, tu lugar para comer rico, escuchar linda música y disfrutar de buenos momentos. Te esperamos en 9 de Julio 16, Trenque Lauquen.",
    url: "https://www.facebook.com/baresyfondas",
  },
  {
    image: "/assets/patrocinadores/patro-tl.png",
    title: "Trenque Lauquen",
    description:
      "La Municipalidad de Trenque Lauquen es la organizadora y principal auspiciante de este Primer Congreso Nacional de Instructores de RCP. Poniendo a disposición instalaciones, personal y logística. El Municipio trabaja para poder cumplir con su ordenanza N° 4560/16 que lo destaca como Municipio Cardio Protegido, equipando con Desfibriladores los espacios públicos, realizando el mapeo y seguimiento de los mismos en todo el distrito ya sean públicos o privados. Esto sumado a brindar,  a quienes cuenten con el equipamiento, la capacitación en RCP y el uso del DEA  a todo el personal interviniente, para que de esta manera, se pueda trabajar en prevención y estar preparados para bajar el índice de mortalidad por muerte súbita en todo el distrito.",
    url: "https://www.trenquelauquen.gov.ar/",
  },
  {
    image: "/assets/patrocinadores/patro-dc.png",
    title: "Defensa Civil",
    description:
      "El Área de Defensa Civil del Municipio de Trenque Lauquen en conjunto con la Secretaria de Abordaje Territorial, es parte de la organización de este Congreso y es el encargado de realizar las capacitaciones en RCP y uso del DEA en cada uno de los Edificios que cuentan con el equipamiento, ya sean públicos o privados, brindando así la llegada de capacitación a todo el distrito trabajando en prevención con la población, con el fin de hacer a Trenque Lauquen un Distrito Cardio Protegido.-",
    url: "https://www.trenquelauquen.gov.ar/tramites-y-servicios/defensa-civil/",
  },
];

function PatrocinadorCard({ item }: { item: Patrocinador }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;
  const truncatedDescription =
    item.description.length > maxLength
      ? item.description.substring(0, maxLength) + "..."
      : item.description;

  return (
    <div className="flex flex-col gap-2">
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="flex justify-center items-center h-[200px] border rounded-lg"
      >
        <img
          src={item.image}
          alt={item.title}
          width={150}
          height={150}
          className="rounded-md object-contain mb-2"
        />
      </a>
      <h3 className="text-xl tracking-tight">{item.title}</h3>
      {item.description && (
        <p className="text-muted-foreground text-base">
          {isExpanded ? item.description : truncatedDescription}
        </p>
      )}
      {item.description.length > maxLength && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 mt-2"
        >
          {isExpanded ? "Leer menos" : "Leer más..."}
        </button>
      )}
    </div>
  );
}

function CardsPatrocinadoresPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(patrocinadoresData.length / ITEMS_PER_PAGE);

  const items = patrocinadoresData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container px-6">
      <TextPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <PatrocinadorCard key={index} item={item} />
        ))}
      </div>

      <TextPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export { CardsPatrocinadoresPagination };
