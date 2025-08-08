import { useEffect } from "react";
import { SpeakersCards } from "@/components/SpeakersCards/SpeakersCards";

export const Expositores = () => {
  useEffect(() => {
    const el = document.getElementById("top");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div id="top" className="px-6 dark:bg-background">
      <SpeakersCards />
    </div>
  );
};
