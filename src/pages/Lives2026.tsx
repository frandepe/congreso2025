import StoriesCarousel from "@/components/Videos/StorieCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, CalendarDays, Radio, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
          <div className="mt-8 rounded-md border border-orange/30 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-orange">
              <Award className="size-4" />
              Curso Oficial ERC
            </div>
            <h3 className="mt-3 text-2xl font-black leading-tight text-darkGreen dark:text-white">
              Soporte Vital Básico y DEA
            </h3>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-darkGreen dark:text-white">
              <span className="inline-flex items-center gap-1 rounded-full bg-orange/10 px-3 py-1.5">
                <CalendarDays className="size-3.5 text-orange" />
                Viernes 2 de octubre
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange/10 px-3 py-1.5">
                <Users className="size-3.5 text-orange" />
                Solo 16 cupos
              </span>
            </div>
            <Button
              asChild
              variant="secondary"
              className="mt-5 gap-2 rounded-md transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
            >
              <Link to="/curso-oficial-erc">
                Ver curso <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center w-full px-4 mt-10 md:mt-0">
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
