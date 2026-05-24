export type HelpChatbotLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type HelpChatbotIntent = {
  id: string;
  title: string;
  chips?: string[];
  keywords: string[];
  negativeKeywords?: string[];
  response: string;
  links?: HelpChatbotLink[];
  relatedIntentIds?: string[];
};

export type HelpChatbotMatch = {
  intent: HelpChatbotIntent | null;
  score: number;
  suggestions: HelpChatbotIntent[];
};

export type HelpChatbotMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  links?: HelpChatbotLink[];
};
