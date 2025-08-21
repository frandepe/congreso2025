'use client';
import { useState } from "react";
import YouTube from "react-youtube";

interface StoriesCarouselProps {
  videos: { id: string; title: string; thumbnail: string }[];
  onSelect: (id: string) => void;
}

export default function StoriesCarousel({ videos, onSelect }: StoriesCarouselProps) {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setActive(id);
    onSelect(id);
  };

  return (
    <div className="w-full overflow-x-auto py-2 flex gap-4 scroll-smooth custom-scrollbar">
      {videos.map((video) => (
        <div
          key={video.id}
          onClick={() => handleSelect(video.id)}
          onMouseEnter={() => setHovered(video.id)}
          onMouseLeave={() => setHovered(null)}
          className={`
            cursor-pointer rounded-2xl overflow-hidden shadow-lg transition relative flex-shrink-0
            w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]
            ${active === video.id ? "ring-4 ring-secondary" : ""}
          `}
        >
          {hovered === video.id ? (
            <YouTube
              videoId={video.id}
              opts={{
                width: "100%",
                height: "120",
                playerVars: {
                  autoplay: 1,
                  mute: 1,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  loop: 1,
                  playlist: video.id,
                },
              }}
              className="w-full h-[120px] object-cover pointer-events-none"
            />
          ) : (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-[120px] object-cover"
            />
          )}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
            <p className="text-white text-xs font-medium truncate">{video.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
