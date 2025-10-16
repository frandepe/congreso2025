import {
  CircularGallery,
  GalleryItem,
} from "@/components/Carousels/Carousel2025";
import StoriesCarousel from "@/components/Videos/StorieCarousel";
import { Radio } from "lucide-react";
import { useState } from "react";
import YouTube from "react-youtube";

const galleryData: GalleryItem[] = [
  {
    common: "",
    binomial: "",
    photo: {
      url: "/assets/2025/carousel1.jpg",
      text: "",
      pos: "47% 35%",
      by: "",
    },
  },
  {
    common: "",
    binomial: "",
    photo: {
      url: "/assets/2025/carousel2.jpg",
      text: "",
      pos: "75% 65%",
      by: "",
    },
  },
  {
    common: "",
    binomial: "",
    photo: {
      url: "/assets/2025/carousel3.jpg",
      text: "",
      pos: "53% 43%",
      by: "",
    },
  },
  {
    common: "",
    binomial: "",
    photo: {
      url: "/assets/2025/carousel4.jpg",
      text: "",
      pos: "65% 65%",
      by: "",
    },
  },
  {
    common: "",
    binomial: "",
    photo: {
      url: "/assets/2025/carousel5.jpg",
      text: "",
      pos: "50% 25%",
      by: "",
    },
  },
  {
    common: "",
    binomial: "",
    photo: {
      url: "/assets/2025/carousel6.jpg",
      text: "",
      pos: "47%",
      by: "",
    },
  },
  {
    common: "",
    binomial: "",
    photo: {
      url: "/assets/2025/carousel7.jpg",
      text: "",
      pos: "65% 35%",
      by: "",
    },
  },
  {
    common: "",
    binomial: "",
    photo: {
      url: "/assets/2025/carousel1.jpg",
      text: "",
      by: "",
    },
  },
  {
    common: "",
    binomial: "",
    photo: {
      url: "/assets/2025/carousel2.jpg",
      text: "",
      pos: "35%",
      by: "",
    },
  },
  {
    common: "",
    binomial: "",
    photo: {
      url: "/assets/2025/carousel3.jpg",
      text: "",
      by: "",
    },
  },
];

const videos = [
  {
    id: "I02-AQLPm7I",
    title: "Miguel Angel Grimas Salinas",
    thumbnail: "https://img.youtube.com/vi/I02-AQLPm7I/mqdefault.jpg",
    avatar: "assets/logo-congreso2025.png",
    date: "15 Octubre 2025",
    duration: "1:14:09",
  },
  {
    id: "pvYJhY4qQY0",
    title: "Argentina Reanima",
    thumbnail: "https://img.youtube.com/vi/pvYJhY4qQY0/mqdefault.jpg",
    avatar: "assets/logo-congreso2025.png",
    date: "15 Octubre 2025",
    duration: "1:15:16",
  },
  {
    id: "yA3hRvZEW2Y",
    title: "Homenajes",
    thumbnail: "https://img.youtube.com/vi/yA3hRvZEW2Y/mqdefault.jpg",
    avatar: "assets/logo-congreso2025.png",
    date: "16 Octubre 2025",
    duration: "1:40:16",
  },
];

export default function Lives2025() {
  const [selectedVideo, setSelectedVideo] = useState<string>(videos[0].id);

  return (
    <div>
      <div className="pt-6 flex flex-col xl:flex-row items-center justify-center dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
          <h2 className="flex items-center gap-3 text-xl md:text-4xl lg:text-5xl font-bold mb-6 text-black dark:text-white">
            <Radio className="text-red-500" size={40} />
            En Vivo: Congreso 2025
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-md leading-relaxed">
            Sigue las charlas y entrevistas en tiempo real con instructores y
            referentes del Congreso Nacional de RCP 2025. ¡No te pierdas ningún
            detalle de este evento único!
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

        {/* This inner container sticks to the top while scrolling */}
      </div>
      <div
        className="w-full bg-background text-foreground"
        style={{ height: "500vh" }}
      >
        {/* This inner container sticks to the top while scrolling */}
        <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full h-full">
            <CircularGallery items={galleryData} />
          </div>
        </div>
      </div>
    </div>
  );
}
