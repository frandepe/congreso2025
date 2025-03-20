import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  {
    texto: "Comentarios del hotel numero 1",
    imagen:
      "https://q-xx.bstatic.com/xdata/images/hotel/840x460/245337587.jpg?k=9529ee951e78c976b34ec1315f773c3638ff4813c26856f6faa30711af12bee1&o=",
  },
  {
    texto: "Comentarios del hotel numero 2",
    imagen:
      "https://q-xx.bstatic.com/xdata/images/hotel/840x460/245337587.jpg?k=9529ee951e78c976b34ec1315f773c3638ff4813c26856f6faa30711af12bee1&o=",
  },
  {
    texto: "Comentarios del hotel numero 3",
    imagen:
      "https://q-xx.bstatic.com/xdata/images/hotel/840x460/245337587.jpg?k=9529ee951e78c976b34ec1315f773c3638ff4813c26856f6faa30711af12bee1&o=",
  },
  {
    texto: "Comentarios del hotel numero 4",
    imagen:
      "https://q-xx.bstatic.com/xdata/images/hotel/840x460/245337587.jpg?k=9529ee951e78c976b34ec1315f773c3638ff4813c26856f6faa30711af12bee1&o=",
  },
  {
    texto: "Comentarios del hotel numero 5",
    imagen:
      "https://q-xx.bstatic.com/xdata/images/hotel/840x460/245337587.jpg?k=9529ee951e78c976b34ec1315f773c3638ff4813c26856f6faa30711af12bee1&o=",
  },
];

function Feature() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-end items-end  gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Alojamiento cercano</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                Hoteles recomendados
              </h2>
              <p className="text-lg  max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground  text-left">
                {/* alargame un poco más el texto, haciendo referencia al alojamiento de la gente que viene a trenque lauquen a ver el congreso */}
                Trenque Lauquen ofrece una variedad de opciones de alojamiento
                para quienes asistan al congreso. Además, algunos
                establecimientos ofrecen descuentos especiales para los
                participantes del evento, asegurando una estadía placentera y
                accesible.
              </p>
            </div>
          </div>
          <div className="w-full max-w-full px-6">
            <Carousel>
              <CarouselContent>
                {images.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="relative flex rounded-md aspect-video bg-muted items-center justify-center overflow-hidden">
                      {/* Imagen de fondo */}
                      <img
                        src={item.imagen}
                        alt={item.texto}
                        className="w-full h-full object-cover"
                      />
                      {/* Superposición oscura */}
                      <div className="absolute inset-0 bg-black/50"></div>
                      {/* Texto centrado */}
                      <span className="absolute text-white text-lg font-semibold">
                        {item.texto}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
