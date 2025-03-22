import { useState } from "react";
import { TextPagination } from "@/components/ui/text-pagination";

const ITEMS_PER_PAGE = 6;

const hotelData = [
  {
    image: "/assets/hoteles/Hotel-HOWARD-JOHNSON.jpg",
    title: "Hotel Howard Johnson",
    tel: "(02392) 452250",
    location: "Ruta 33, km321",
    url: "https://www.hjtrenquelauquen.com.ar/",
  },
  {
    image: "/assets/hoteles/Sorrento-Hotel-Boutique.jpg",
    title: "Sorrento Hotel Boutique",
    tel: "(02392) 430005 y 424500",
    location: "Gobernador Irigoyen 346",
    url: "http://www.sorrentohoteltl.com.ar/",
  },
  {
    image: "/assets/hoteles/hotel-sol-y-luna.jpg",
    title: "Hotel Sol y Luna",
    tel: "(02392) 460355",
    location: "Ruta 5 – Km 448,5",
    url: "www.facebook.com/Solylunatl",
  },
  {
    image: "/assets/hoteles/hotel-simon.jpg",
    title: "Hotel Simon",
    location: "Villegas 587",
    tel: "2392 – 625779",
    url: "www.hotelsimon.com.ar",
  },
  {
    image: "/assets/hoteles/hotel-winak.jpg",
    title: "Hotel Wiñak",
    tel: "2392-411100",
    location: "Ruta n°5 446.",
    url: "https://www.facebook.com/profile.php?id=61550055091020",
  },
  {
    image: "/assets/hoteles/mi-refujio.jpg",
    title: "Cabañas Mi refugio",
    location: "Santiago Rubio 248",
    tel: "(2392) 493596",
    url: "https://www.facebook.com/p/Caba%C3%B1as-Mi-Refugio-100054260030170/",
  },
  {
    image: "/assets/hoteles/el-forestal.jpg",
    title: "Cabaña El Forestal",
    tel: "2392 531989",
    location: "Zorzal 3309",
  },
  {
    image: "/assets/hoteles/los-espejos.jpg",
    title: "Cabañas Los Espejos",
    tel: "(2392) 675706 / (11) 3624 0532",
    location: "Alejandro Gomez 3685",
  },
  {
    image: "/assets/hoteles/el-refujio.jpg",
    title: "Cabañas El refugio",
    tel: "2392 - 519351",
    location: "Ruta 5 Km 448,3",
  },
  {
    image: "/assets/hoteles/boxer.jpg",
    title: "Cabaña Las Boxer",
    tel: "(02392) 484301",
    location: "Regimiento 3 de Caballeria 3150 (y Ruta 5)",
    url: "www.cabañaslasboxer.com.ar",
  },
  {
    image: "/assets/hoteles/moras.jpg",
    title: "Cabaña Las Moras",
    tel: "(02392) 444506",
    location: "Ruta 5 Km 446,5",
  },
  {
    image: "/assets/hoteles/paye.jpg",
    title: "Cabaña El Payé",
    tel: "(02392) 15631206",
    location: "Ruta Nacional Nº5 Km 445",
    url: "www.cabañaselpaye.com.ar",
  },
  {
    image: "/assets/hoteles/descanso.jpg",
    title: "Cabañas el descanso",
    tel: "02392 15400895",
    location: "Ruta Nac. Nº 5 km 446,5 a 100 mts",
    url: "https://www.facebook.com/Caba%C3%B1as-El-Descanso-189197557924729/",
  },
  {
    image: "/assets/hoteles/Indiada.jpg",
    title: "Cabañas La Indiada",
    tel: "2392 - 544742",
    location: "Belgrano 2394",
    url: "https://www.instagram.com/cabanas_laindiadatl/",
  },
  {
    image: "/assets/hoteles/betanzos.jpg",
    title: "Cabañas Las Rias de Betanzos",
    tel: "2392 - 611169",
    location: "RN5 KM 450",
    url: "https://www.instagram.com/lasriasdebetanzos/",
  },
  {
    image: "/assets/hoteles/las-ramonas.jpg",
    title: "Cabañas Las Ramonas",
    tel: "2392 402024",
    location: "Belgrano 3211",
  },
  {
    image: "/assets/hoteles/Quinta-Aiken.jpg",
    title: "Quinta Aiken",
    tel: "2392 -315614 / 2392-535205",
    location: "Avda García Salinas 1044",
  },
  {
    image: "/assets/hoteles/la-quinta.jpg",
    title: "Cabañas La Quinta",
    tel: "2392 - 493570",
    location: "Ruta 5 km 447",
  },
];

function HotelPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(hotelData.length / ITEMS_PER_PAGE);

  const items = hotelData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <TextPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <a href={item.url} target="_blank" rel="noreferrer">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-md aspect-video mb-2"
              />
            </a>
            <h3 className="text-xl tracking-tight">{item.title}</h3>
            {item.location && (
              <p className="text-muted-foreground text-base">
                Ubicación: {item.location}
              </p>
            )}
            {item.tel && (
              <p className="text-muted-foreground text-base">Tel: {item.tel}</p>
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

export { HotelPagination };
