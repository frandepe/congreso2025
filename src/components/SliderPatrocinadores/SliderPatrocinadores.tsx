import {
  Marquee,
  MarqueeItem,
  MarqueeFade,
  MarqueeContent,
} from "@/components/ui/marquee";

const SliderPatrocinadores = () => {
  return (
    <Marquee>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
      <MarqueeContent>
        {new Array(10).fill(null).map((_, index) => (
          <MarqueeItem key={index} className="w-32 h-32">
            <img
              src={`https://placehold.co/128x128?random=${index}`}
              alt={`Image ${index}`}
              className="rounded-full overflow-hidden"
            />
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  );
};

export default SliderPatrocinadores;
