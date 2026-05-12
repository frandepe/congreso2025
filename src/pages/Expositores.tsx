import { useEffect } from "react";
import { SpeakersCards } from "@/components/SpeakersCards/SpeakersCards";
import { useLocation } from "react-router-dom";
// import ComingSoonOverlay from "@/components/ComingSoonOverlay/ComingSoonOverlay";

export const Expositores = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.state]);

  return (
    <div id="top" className="px-6 dark:bg-background">
      <SpeakersCards />
    </div>
  );
};
