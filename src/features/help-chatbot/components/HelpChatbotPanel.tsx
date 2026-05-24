import { FormEvent, RefObject } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { HelpChatbotMessage } from "@/features/help-chatbot/help-chatbot.types";
import { HelpChatbotChips } from "./HelpChatbotChips";
import { HelpChatbotMessageList } from "./HelpChatbotMessageList";

type HelpChatbotPanelProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  inputValue: string;
  messages: HelpChatbotMessage[];
  onClose: () => void;
  onInputChange: (value: string) => void;
  onChipSelect: (label: string) => void;
  onSubmit: () => void;
};

export function HelpChatbotPanel({
  inputRef,
  inputValue,
  messages,
  onClose,
  onInputChange,
  onChipSelect,
  onSubmit,
}: HelpChatbotPanelProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="help-chatbot-title"
      aria-describedby="help-chatbot-description"
      className="flex max-h-[min(70vh,560px)] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.45)] dark:border-stone-800 dark:bg-stone-950 sm:w-[380px]"
    >
      <header className="flex items-start justify-between gap-3 border-b border-stone-200 bg-stone-950 px-4 py-4 text-white dark:border-stone-800 dark:bg-stone-900">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-stone-950">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 id="help-chatbot-title" className="text-sm font-semibold">
              Ayuda del congreso
            </h2>
            <p
              id="help-chatbot-description"
              className="mt-0.5 text-xs text-stone-300"
            >
              Respuestas rápidas
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Cerrar ayuda"
          className="h-9 w-9 shrink-0 text-white hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </Button>
      </header>

      <HelpChatbotMessageList messages={messages} />

      <HelpChatbotChips onSelect={onChipSelect} />

      <form
        className="flex items-center gap-2 border-t border-stone-200 px-4 py-3 dark:border-stone-800"
        onSubmit={handleSubmit}
      >
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
          aria-label="Escribir consulta"
          aria-describedby="help-chatbot-description"
          placeholder="Escribí tu consulta..."
          className="h-11 rounded-full border-stone-300 bg-stone-50 px-4 text-sm shadow-none focus-visible:ring-emerald-600 dark:border-stone-700 dark:bg-stone-900"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Enviar pregunta"
          disabled={!inputValue.trim()}
          className="h-11 w-11 shrink-0 rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>
    </section>
  );
}
