import React from "react";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { Button } from "../ui/button";
import { HeartHandshake } from "lucide-react";

const LiveVideo = () => {
  const navigate = useNavigate();
  const videoId = "yA3hRvZEW2Y";
  // const videoId = "I02-AQLPm7I";

  const opts = {
    width: "100%",
    height: "500",
    playerVars: {
      autoplay: 1,
      playsinline: 1,
    },
  };

  const handleNavigate = () => {
    navigate("/vivo-2025");
    // espera a que la navegación ocurra y luego scrollea
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="flex justify-center items-center flex-col" id="live">
      <h2 className="text-2xl font-semibold mb-4 text-center mt-20">
        Transmisión en vivo
      </h2>

      <div className="w-full max-w-4xl aspect-video">
        <YouTube videoId={videoId} opts={opts} />
      </div>

      <Button onClick={handleNavigate} className="mt-6">
        <HeartHandshake className="mr-2 h-5 w-5" />
        Reviví los mejores momentos
      </Button>
    </div>
  );
};

export default LiveVideo;
