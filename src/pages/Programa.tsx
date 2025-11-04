import { AnimatedTooltipPreview } from "@/components/AnimatedTooltipPreview/AnimatedTooltipPreview";
import ComingSoonOverlay from "@/components/ComingSoonOverlay/ComingSoonOverlay";
import { SpeakersTimeline } from "@/components/SpeakersTimeline/SpeakersTimeline";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Programa = () => {
  const navigate = useNavigate();
  return (
    <div className="dark:bg-background">
      <ComingSoonOverlay />
      <SpeakersTimeline />
      <div className="flex justify-center">
        <div className="flex flex-col items-center max-w-max">
          <h2 className="mb-4 text-lg font-bold">Conoce a los expositores</h2>
          <AnimatedTooltipPreview />
          <Button
            className="gap-4"
            onClick={() => navigate("/expositores#top")}
            aria-label="Ver todos los expositores"
          >
            Ver todos <MoveRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
