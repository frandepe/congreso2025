import { Calendar, MicVocal, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "./badge";
import { useNavigate } from "react-router-dom";

function HeroWithGroupImages() {
  const navigate = useNavigate();
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge className=" px-4 py-2">¡Estamos Listos!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl max-w-lg tracking-tighter text-left font-regular">
                Una oportunidad única para mejorar tu impacto como instructor de
                RCP
              </h1>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                El Primer Congreso Nacional de RCP es mucho más que un evento;
                es una oportunidad para transformar tu enfoque como instructor.
                Con charlas, talleres y simulaciones, este congreso te brindará
                nuevas herramientas para perfeccionar tus enseñanzas y crear un
                mayor impacto en las personas que forman. Si quieres estar a la
                vanguardia de la formación en emergencias, no puedes faltar. ¡Te
                esperamos para aprender, compartir y seguir salvando vidas
                juntos!
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                size="lg"
                className="gap-4"
                variant="outline"
                onClick={() => {
                  navigate("/programa");
                  window.scrollTo(0, 0);
                }}
              >
                Ver programa <Calendar className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                className="gap-4"
                onClick={() => {
                  navigate("/inscripcion");
                  window.scrollTo(0, 0);
                }}
              >
                Inscribirme <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <img
              className="bg-muted rounded-md aspect-square object-cover brightness-75"
              src="/assets/img-verde.png"
            />
            <img
              className="bg-muted rounded-md row-span-2 object-cover h-full brightness-75"
              src="/assets/micro-vertical.png"
              // src="/assets/DescImg-2.jpeg"
            />
            <img
              className="bg-muted rounded-md aspect-square object-cover brightness-75"
              src="/assets/lugar-verde.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroWithGroupImages };
