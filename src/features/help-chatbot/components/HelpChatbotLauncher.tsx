import { forwardRef } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type HelpChatbotLauncherProps = {
  onOpen: () => void;
};

export const HelpChatbotLauncher = forwardRef<
  HTMLButtonElement,
  HelpChatbotLauncherProps
>(function HelpChatbotLauncher({ onOpen }, ref) {
  return (
    <Button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label="Abrir ayuda del congreso"
      className="h-14 w-14 rounded-full bg-secondary text-white shadow-[0_18px_45px_-18px_rgba(15,23,42,0.45)] hover:bg-secondary/90 focus-visible:ring-primary/40"
      size="icon"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </Button>
  );
});
