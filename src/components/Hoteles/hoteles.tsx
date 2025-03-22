import { Badge } from "@/components/ui/badge";
import { HotelPagination } from "../HotelPagination/HotelPagination";

function Hoteles() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Alojamiento cercano</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Hoteles recomendados
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Trenque Lauquen ofrece una variedad de opciones de alojamiento
                para quienes asistan al congreso. Además, algunos
                establecimientos ofrecen descuentos especiales para los
                participantes del evento, asegurando una estadía placentera y
                accesible.
              </p>
            </div>
          </div>

          <HotelPagination />
        </div>
      </div>
    </div>
  );
}

export { Hoteles };
