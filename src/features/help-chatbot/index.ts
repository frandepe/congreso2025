export {
  HELP_CHATBOT_CONFIDENCE_THRESHOLD,
  helpChatbotFallbackIntentIds,
  helpChatbotIntents,
} from "./help-chatbot.data";
export {
  getHelpChatbotFallbackSuggestions,
  getHelpChatbotIntentScore,
  matchHelpChatbotIntent,
  normalizeHelpChatbotText,
} from "./help-chatbot.utils";
export { HelpChatbotWidget } from "./components/HelpChatbotWidget";
export type {
  HelpChatbotIntent,
  HelpChatbotLink,
  HelpChatbotMatch,
  HelpChatbotMessage,
} from "./help-chatbot.types";
