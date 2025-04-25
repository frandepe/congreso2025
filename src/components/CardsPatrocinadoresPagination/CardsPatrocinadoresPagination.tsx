import { useState } from "react";
import { TextPagination } from "@/components/ui/text-pagination";

const ITEMS_PER_PAGE = 6;

const patrocinadoresData = [
  {
    image: "/assets/patrocinadores/patro-tl.png",
    title: "Trenque Lauquen",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis reprehenderit, cupiditate dolorum impedit soluta quae expedita iusto nulla ea consequuntur facilis provident, aliquam et modi iste mollitia laudantium eligendi.",
    url: "https://www.trenquelauquen.gov.ar/",
  },
  {
    image: "/assets/patrocinadores/patro-dc.png",
    title: "Defensa Civil",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis reprehenderit, cupiditate dolorum impedit soluta quae expedita iusto nulla ea consequuntur facilis provident, aliquam et modi iste mollitia laudantium eligendi.",
    url: "https://www.trenquelauquen.gov.ar/tramites-y-servicios/defensa-civil/",
  },
  {
    image: "/assets/patrocinadores/nd-capacitaciones.png",
    title: "ND Capacitaciones",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
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
        {items.map((item, index) => (
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
                {item.description}
              </p>
            )}
          </div>
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
