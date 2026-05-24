import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { HelpChatbotMessage } from "@/features/help-chatbot/help-chatbot.types";

type HelpChatbotMessageListProps = {
  messages: HelpChatbotMessage[];
};

export function HelpChatbotMessageList({
  messages,
}: HelpChatbotMessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  return (
    <div
      className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
      role="log"
      aria-label="Conversación de ayuda"
      aria-live="polite"
      aria-relevant="additions"
    >
      {messages.map((message) => {
        const isUserMessage = message.role === "user";

        return (
          <article
            key={message.id}
            aria-label={isUserMessage ? "Mensaje del usuario" : "Respuesta de ayuda"}
            className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
          >
            <div
              className={
                isUserMessage
                  ? "max-w-[86%] rounded-2xl rounded-tr-md bg-emerald-600 px-4 py-3 text-sm leading-6 text-white"
                  : "max-w-[86%] rounded-2xl rounded-tl-md bg-stone-100 px-4 py-3 text-sm leading-6 text-stone-700 dark:bg-stone-900 dark:text-stone-200"
              }
            >
              <p>{message.text}</p>

              {message.links?.length ? (
                <div className="mt-3 flex flex-col gap-2">
                  {message.links.map((link) => (
                    <HelpChatbotMessageLink
                      key={`${message.id}-${link.href}-${link.label}`}
                      href={link.href}
                      label={link.label}
                      external={link.external}
                      isUserMessage={isUserMessage}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
      <div ref={endRef} aria-hidden="true" />
    </div>
  );
}

type HelpChatbotMessageLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  isUserMessage: boolean;
};

function HelpChatbotMessageLink({
  href,
  label,
  external,
  isUserMessage,
}: HelpChatbotMessageLinkProps) {
  const className = isUserMessage
    ? "text-sm font-semibold underline underline-offset-4"
    : "inline-flex w-fit rounded-md border border-emerald-200 bg-white px-3 py-1.5 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:border-emerald-900 dark:bg-stone-950 dark:text-emerald-300";
  const shouldOpenNewTab = Boolean(external && href.startsWith("http"));

  if (!external && href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={shouldOpenNewTab ? "_blank" : undefined}
      rel={shouldOpenNewTab ? "noreferrer" : undefined}
      className={className}
    >
      {label}
    </a>
  );
}
