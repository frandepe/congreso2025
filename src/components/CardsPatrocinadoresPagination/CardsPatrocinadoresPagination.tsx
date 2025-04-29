import { useState } from "react";
import { TextPagination } from "@/components/ui/text-pagination";

const ITEMS_PER_PAGE = 6;

const patrocinadoresData = [
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
  {
    image: "/assets/patrocinadores/nd-capacitaciones.png",
    title: "ND Capacitaciones",
    description:
      "Es una empresa dedicada a la Capacitación en emergencias, con una alta experiencia en el tema de mas de 30 años, brinda diferentes capacitaciones relacionadas al accionar del ciudadano común frente a emergencias. En la empresa podes encontrar las siguientes capacitaciones:  “Socorros urbanos con RCP y DEA”  “Formador de Brigadistas de Emergencias”  “Monitor de Zonas Cardio Seguras”  “Primeros Auxilios para Perros y Gatos”  “Primeros Socorros Psicológicos”",
    url: "https://ndcapacitaciones.xyz",
  },
  {
    image: "/assets/patrocinadores/nexo-tecnologico.png",
    title: "Nexo Tecnológico",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "https://nexotecnologico.com",
  },
];

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
        {items.map((item, index) => {
          const [isExpanded, setIsExpanded] = useState(false);
          const maxLength = 200; // Longitud máxima antes de mostrar "Ver más"
          const truncatedDescription =
            item.description.length > maxLength
              ? item.description.substring(0, maxLength) + "..."
              : item.description;

          return (
            <div key={index} className="flex flex-col gap-2 ">
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
        })}
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
