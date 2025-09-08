import StoriesCarousel from "@/components/Videos/StorieCarousel";
import { Radio } from "lucide-react";
import { useState } from "react";
import YouTube from "react-youtube";

const videos = [
  {
    id: "3i1a090V7PY",
    title: "Miguel Angel Grimas Salinas - Presentación",
    thumbnail: "https://img.youtube.com/vi/3i1a090V7PY/mqdefault.jpg",
    avatar: "assets/speakers/cara/miguel-angel-grima-cara.jpg",
    date: "02 Septiembre 2025",
    duration: "11:02",
  },
  {
    id: "6fZ6LnpgJXU",
    title: "Radio 37. Gral Pico",
    thumbnail: "https://img.youtube.com/vi/6fZ6LnpgJXU/mqdefault.jpg",
    avatar: "assets/speakers/cara/nicolas-de-paulo.jpg",
    date: "18 Agosto 2025",
    duration: "8:06",
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
                autoplay: 0,
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
          <div className="flex items-center gap-2 mt-4">
            <h2>Videos en vivo</h2>
            <div className="flex-1 border-t border-gray-400"></div>
          </div>
          <StoriesCarousel videos={videos} onSelect={setSelectedVideo} />
        </div>

      </div>
    </div>


  );
}
