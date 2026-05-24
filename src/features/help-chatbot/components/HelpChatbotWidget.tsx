import { useCallback, useEffect, useRef, useState } from "react";
import {
  getHelpChatbotFallbackSuggestions,
  matchHelpChatbotIntent,
} from "@/features/help-chatbot/help-chatbot.utils";
import type {
  HelpChatbotIntent,
  HelpChatbotMessage,
} from "@/features/help-chatbot/help-chatbot.types";
import { HelpChatbotLauncher } from "./HelpChatbotLauncher";
import { HelpChatbotPanel } from "./HelpChatbotPanel";

const initialMessages: HelpChatbotMessage[] = [
  {
    id: "assistant-welcome",
    role: "assistant",
    text: "Hola. ¿Tenés una consulta? Puedo orientarte sobre inscripción, pagos, alojamiento y más.",
  },
];

const fallbackText =
  "No encontré esa consulta. Puedo ayudarte con inscripción, precios, alojamiento, segunda cuota, programa, expositores, stands, publicidad o contacto.";

export function HelpChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] =
    useState<HelpChatbotMessage[]>(initialMessages);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const messageIdRef = useRef(0);

  const closeWidget = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => {
      launcherRef.current?.focus();
    }, 0);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWidget();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeWidget, isOpen]);

  const getNextMessageId = (role: HelpChatbotMessage["role"]) => {
    messageIdRef.current += 1;

    return `${role}-${messageIdRef.current}`;
  };

  const getFallbackMessage = (
    suggestions: HelpChatbotIntent[],
  ): HelpChatbotMessage => {
    const fallbackSuggestions = suggestions.length
      ? suggestions
      : getHelpChatbotFallbackSuggestions();

    return {
      id: getNextMessageId("assistant"),
      role: "assistant",
      text: fallbackText,
      links: fallbackSuggestions.flatMap((intent) => intent.links ?? []),
    };
  };

  const sendUserQuery = (query: string) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    const match = matchHelpChatbotIntent(trimmedQuery);
    const userMessage: HelpChatbotMessage = {
      id: getNextMessageId("user"),
      role: "user",
      text: trimmedQuery,
    };
    const assistantMessage: HelpChatbotMessage = match.intent
      ? {
          id: getNextMessageId("assistant"),
          role: "assistant",
          text: match.intent.response,
          links: match.intent.links,
        }
      : getFallbackMessage(match.suggestions);

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleChipSelect = (label: string) => {
    sendUserQuery(label);
  };

  const handleSubmit = () => {
    sendUserQuery(inputValue);
  };

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-3"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        right: "max(1rem, env(safe-area-inset-right))",
      }}
    >
      {isOpen ? (
        <HelpChatbotPanel
          inputRef={inputRef}
          inputValue={inputValue}
          messages={messages}
          onClose={closeWidget}
          onInputChange={setInputValue}
          onChipSelect={handleChipSelect}
          onSubmit={handleSubmit}
        />
      ) : null}

      {!isOpen ? (
        <HelpChatbotLauncher ref={launcherRef} onOpen={() => setIsOpen(true)} />
      ) : null}
    </div>
  );
}
