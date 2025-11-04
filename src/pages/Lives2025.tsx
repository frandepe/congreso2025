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
    id: "KHMjuGrFHr0",
    title: "Miguel Angel Grimas Salinas",
    thumbnail: "https://img.youtube.com/vi/KHMjuGrFHr0/mqdefault.jpg",
    avatar: "assets/speakers/miguel-angel-grima.jpeg",
    date: "15 Octubre 2025",
    duration: "1:03:12",
  },
  {
    id: "cH06e2pu_Yk",
    title: "Julio Godoy de Argentina Reanima",
    thumbnail: "https://img.youtube.com/vi/cH06e2pu_Yk/mqdefault.jpg",
    avatar: "assets/patrocinadores/argentinareanima.png",
    date: "15 Octubre 2025",
    duration: "1:15:16",
  },
  {
    id: "iuOko0KxtP8",
    title: "Francesc Carmona Jiménez",
    thumbnail: "https://img.youtube.com/vi/iuOko0KxtP8/mqdefault.jpg",
    avatar: "assets/speakers/francesc.jpg",
    date: "16 Octubre 2025",
    duration: "1:18:31",
  },
  {
    id: "A3fRVCmh0nE",
    title: "Red PAE",
    thumbnail: "https://img.youtube.com/vi/A3fRVCmh0nE/mqdefault.jpg",
    avatar: "assets/speakers/red-pae.jpg",
    date: "16 Octubre 2025",
    duration: "1:03:47",
  },
  {
    id: "h9zHCGdS-lc",
    title: "Sergio Felice y Argentina Reanima",
    thumbnail: "https://img.youtube.com/vi/h9zHCGdS-lc/mqdefault.jpg",
    avatar: "assets/speakers/sergio.jpg",
    date: "17 Octubre 2025",
    duration: "1:00:51",
  },
  {
    id: "032KvRugJ9I",
    title: "Guillermo Carranza",
    thumbnail: "https://img.youtube.com/vi/032KvRugJ9I/mqdefault.jpg",
    avatar: "assets/speakers/guille-carranza.png",
    date: "17 Octubre 2025",
    duration: "1:22:29",
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
            En Vivo. Congreso 2025
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-md leading-relaxed">
            Reviví las charlas y entrevistas del Congreso Nacional de RCP 2025,
            la mayoría grabadas en vivo. Algunos momentos fueron exclusivos para
            quienes participaron presencialmente.
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
