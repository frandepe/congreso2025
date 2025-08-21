import StoriesCarousel from "@/components/Videos/StorieCarousel";
import { Radio } from "lucide-react";
import { useState } from "react";
import YouTube from "react-youtube";

const videos = [
  {
    id: "6fZ6LnpgJXU",
    title: "Radio 37",
    thumbnail: "https://img.youtube.com/vi/6fZ6LnpgJXU/mqdefault.jpg",
  },
  {
    id: "QqPQu4mZiHI",
    title: "Entrevista",
    thumbnail: "https://img.youtube.com/vi/QqPQu4mZiHI/mqdefault.jpg",
  },
  {
    id: "E8d06HYk2a4",
    title: "TV Ley RCP",
    thumbnail: "https://img.youtube.com/vi/E8d06HYk2a4/mqdefault.jpg",
  },
  {
    id: "kO2GFMmLhX4",
    title: "Cómo hacer maniobras de RCP",
    thumbnail: "https://img.youtube.com/vi/kO2GFMmLhX4/mqdefault.jpg",
  },
  {
    id: "O1AOt_s1NzM",
    title: "Cruz Roja",
    thumbnail: "https://img.youtube.com/vi/O1AOt_s1NzM/mqdefault.jpg",
  },
];

export default function StoriesParent() {
  const [selectedVideo, setSelectedVideo] = useState<string>(videos[0].id);

  return (
    <div className="pt-6 flex flex-col xl:flex-row items-center justify-center dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <h2 className="flex items-center gap-3 text-xl md:text-4xl lg:text-5xl font-bold mb-6 text-black dark:text-white">
          <Radio className="text-secondary" size={40} />
          En Vivo: Charlas y Entrevistas
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-md leading-relaxed">
          Disfrutá de charlas y entrevistas en tiempo real con especialistas, instructores y referentes del primer Congreso Nacional de Reanimación Cardiopulmonar. Mantenete actualizado y aprendé de los expertos desde cualquier lugar.
        </p>
      </div>

      <div className="flex flex-col items-center w-full px-4 mt-10 md:mt-0">
        {/* Video grande */}
        <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-lg">
          <YouTube
            videoId={selectedVideo}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
              },
            }}
            className="w-full h-full"
          />
        </div>

        {/* Carrusel de cards */}
        <div className="w-full max-w-4xl">
          <StoriesCarousel videos={videos} onSelect={setSelectedVideo} />
        </div>
      </div>
    </div>
  );
}
