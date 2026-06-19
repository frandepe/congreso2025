import { useIsMobile } from "@/lib/useIsMobile";
import { ArrowRight, Video, X } from "lucide-react";
import { Link } from "react-router-dom";

const DESKTOP_TEXT =
  "Ya están disponibles las primeras entrevistas precongreso con algunos de los disertantes invitados. Miralas acá.";

const MOBILE_TEXT = "Mirá las primeras entrevistas precongreso.";

interface PrecongressInfoBarProps {
  onDismiss: () => void;
}

export function PrecongressInfoBar({ onDismiss }: PrecongressInfoBarProps) {
  const isMobile = useIsMobile();

  return (
    <div className="fixed left-0 top-0 z-50 h-12 w-full bg-secondary text-white shadow-md md:h-11 dark:bg-orange dark:text-white">
      <Link
        to="/videos-precongreso"
        className="group flex h-full w-full cursor-pointer items-center justify-center px-12 text-sm font-semibold transition-colors duration-200 hover:bg-redOrange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-base dark:hover:bg-redOrange"
        aria-label="Ver entrevistas precongreso"
      >
        <span className="flex w-full max-w-6xl items-center justify-center gap-2 text-center leading-tight">
          <Video className="size-4 shrink-0 md:size-5" />
          <span>{isMobile ? MOBILE_TEXT : DESKTOP_TEXT}</span>
          <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 md:size-5" />
        </span>
      </Link>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Cerrar barra informativa"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
