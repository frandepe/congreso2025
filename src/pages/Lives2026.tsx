import StoriesCarousel from "@/components/Videos/StorieCarousel";
import { Radio } from "lucide-react";
import { useState } from "react";
import YouTube from "react-youtube";

const videos = [
  {
    id: "eO2WF3SZj9I",
    title: "Meritxell Ros",
    thumbnail: "https://img.youtube.com/vi/eO2WF3SZj9I/mqdefault.jpg",
    avatar: "assets/speakers/cara/meritxell-ros.jpg",
    date: "15 de Junio de 2026",
    duration: "17:13",
  },
  {
    id: "LzOpmJkbuco",
    title: "Miguel Ángel Grima Salinas",
    thumbnail: "https://img.youtube.com/vi/LzOpmJkbuco/mqdefault.jpg",
    avatar: "assets/speakers/cara/miguel-angel-grima-cara.jpg",
    date: "16 de Junio de 2026",
    duration: "17:55",
  },
];

export default function Lives2026() {
  const [selectedVideo, setSelectedVideo] = useState<string>(videos[0].id);

  return (
    <div>
      <div className="pt-6 flex flex-col xl:flex-row items-center justify-center dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
          <h2 className="flex items-center gap-3 text-xl md:text-4xl lg:text-5xl font-bold mb-6 text-black dark:text-white">
            <Radio className="text-red-500" size={40} />
            Charlas precongreso 2026
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-md leading-relaxed">
            Mirá las entrevistas exclusivas con los disertantes invitados del
            Congreso Nacional de RCP 2026.
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
              <h2>Videos precongreso</h2>
              <div className="flex-1 border-t border-gray-400"></div>
            </div>
            <StoriesCarousel videos={videos} onSelect={setSelectedVideo} />
          </div>
        </div>
      </div>
    </div>
  );
}
