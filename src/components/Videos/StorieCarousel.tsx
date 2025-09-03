import { useState } from "react";

interface StoriesCarouselProps {
  videos: {
    id: string;
    title: string;
    thumbnail: string;
    avatar: string;
    date: string;
    duration: string;
  }[];
  onSelect: (id: string) => void;
}

export default function StoriesCarousel({ videos, onSelect }: StoriesCarouselProps) {
  const [active, setActive] = useState<string | null>(null);

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
          className={`dark:bg-black cursor-pointer rounded-2xl shadow-md transition relative flex-shrink-0
            w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] bg-white
            ${active === video.id ? "ring-4 ring-secondary" : ""}
          `}
        >
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-[120px] object-cover rounded-t-2xl"
            />
            {/* Duración */}
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
              {video.duration}
            </span>
          </div>

          {/* Info debajo */}
          <div className="flex items-start gap-2 p-2">
            {/* Avatar */}
            <img
              src={video.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />

           {/* Título + Fecha */}
          <div className="flex flex-col flex-1 min-w-0 ">
            {/* Título con tooltip */}
            <div className="relative group">
              <p className="text-sm font-semibold truncate overflow-hidden whitespace-nowrap text-black dark:text-white">
                {video.title}
              </p>
              <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block
                bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                {video.title}
              </span>
            </div>

            {/* Fecha */}
            <p className="text-xs text-gray-500">{video.date}</p>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
