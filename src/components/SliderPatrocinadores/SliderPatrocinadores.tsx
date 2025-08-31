import {
  Marquee,
  MarqueeItem,
  MarqueeFade,
  MarqueeContent,
} from "@/components/ui/marquee";

const patrocinadores = [
  { id: 1, img: "/assets/patrocinadores/patro-dc.png", title: "Patro" },
  { id: 2, img: "/assets/patrocinadores/patro-tl.png", title: "Patro" },
  { id: 3, img: "/assets/patrocinadores/nd-capacitaciones.png", title: "Patro" },
  { id: 4, img: "/assets/patrocinadores/nexo-tecnologico.png", title: "Patro" },
  { id: 5, img: "/assets/patrocinadores/lecsy.png", title: "Patro" },
  { id: 6, img: "/assets/patrocinadores/argentinareanima.png", title: "Patro" },
  { id: 7, img: "/assets/patrocinadores/driplan.png", title: "Patro" },
  { id: 8, img: "/assets/patrocinadores/aces.png", title: "Patro" },
];

const SliderPatrocinadores = () => {
  return (
    <Marquee>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
      <MarqueeContent>
        {patrocinadores.map((p, index) => (
          <MarqueeItem
            key={p.id}
            className="w-32 h-32 flex items-center justify-center gap-4 mx-4"
          >
            <img
              src={p.img}
              alt={p.title}
              className="overflow-hidden"
            />
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  );
};

export default SliderPatrocinadores;
