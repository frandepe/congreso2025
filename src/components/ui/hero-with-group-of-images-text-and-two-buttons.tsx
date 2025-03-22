import { MicVocal, MoveRight } from "lucide-react";
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
              <Badge variant="outline">¡Estamos Listos!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                Esto es el comienzo de algo!
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Aca iria un texto de introduccion o lo que se les ocurra. Avoid
                further complications by ditching outdated, tedious trade
                methods. Our goal is to streamline SMB trade, making it easier .
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                size="lg"
                className="gap-4"
                variant="outline"
                onClick={() => navigate("/expositores")}
              >
                Ver expositores <MicVocal className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                className="gap-4"
                onClick={() => navigate("/inscripcion")}
              >
                Inscribirme <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <img
              className="bg-muted rounded-md aspect-square object-cover brightness-75"
              src="/assets/DescImg-1.jpeg"
            />
            <img
              className="bg-muted rounded-md row-span-2 object-cover h-full brightness-75"
              src="/assets/DescImg-2.jpeg"
            />
            <img
              className="bg-muted rounded-md aspect-square object-cover brightness-75"
              src="/assets/DescImg-3.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroWithGroupImages };
