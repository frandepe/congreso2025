import {
  HELP_CHATBOT_CONFIDENCE_THRESHOLD,
  helpChatbotFallbackIntentIds,
  helpChatbotIntents,
} from "./help-chatbot.data";
import type { HelpChatbotIntent, HelpChatbotMatch } from "./help-chatbot.types";

const DIACRITIC_PATTERN = /[\u0300-\u036f]/g;
const WORD_BOUNDARY_PATTERN = /[^a-z0-9]+/g;

export function normalizeHelpChatbotText(value: string) {
  return value
    .normalize("NFD")
    .replace(DIACRITIC_PATTERN, "")
    .toLowerCase()
    .replace(WORD_BOUNDARY_PATTERN, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function getKeywordScore(normalizedQuery: string, keyword: string) {
  const normalizedKeyword = normalizeHelpChatbotText(keyword);

  if (!normalizedKeyword) {
    return 0;
  }

  if (normalizedQuery === normalizedKeyword) {
    return normalizedKeyword.includes(" ") ? 6 : 4;
  }

  if (normalizedKeyword.includes(" ")) {
    return normalizedQuery.includes(normalizedKeyword) ? 5 : 0;
  }

  const queryTerms = normalizedQuery.split(" ");

  return queryTerms.includes(normalizedKeyword) ? 3 : 0;
}

function hasCommercialSecondInstallmentContext(normalizedQuery: string) {
  return (
    (normalizedQuery.includes("segunda cuota") ||
      normalizedQuery.includes("cuota 2")) &&
    (normalizedQuery.includes("stand") ||
      normalizedQuery.includes("publicidad") ||
      normalizedQuery.includes("comercial"))
  );
}

export function getHelpChatbotIntentScore(
  query: string,
  intent: HelpChatbotIntent,
) {
  const normalizedQuery = normalizeHelpChatbotText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const positiveScore = intent.keywords.reduce(
    (score, keyword) => score + getKeywordScore(normalizedQuery, keyword),
    0,
  );
  const negativeScore =
    intent.negativeKeywords?.reduce(
      (score, keyword) => score + getKeywordScore(normalizedQuery, keyword),
      0,
    ) ?? 0;
  const contextBoost =
    intent.id === "commercial_second_installment" &&
    hasCommercialSecondInstallmentContext(normalizedQuery)
      ? 8
      : 0;

  return Math.max(0, positiveScore + contextBoost - negativeScore);
}

export function getHelpChatbotFallbackSuggestions() {
  return helpChatbotFallbackIntentIds
    .map((intentId) =>
      helpChatbotIntents.find((intent) => intent.id === intentId),
    )
    .filter((intent): intent is HelpChatbotIntent => Boolean(intent));
}

export function matchHelpChatbotIntent(query: string): HelpChatbotMatch {
  const rankedMatches = helpChatbotIntents
    .map((intent) => ({
      intent,
      score: getHelpChatbotIntentScore(query, intent),
    }))
    .sort((first, second) => second.score - first.score);

  const bestMatch = rankedMatches[0];
  const suggestions = rankedMatches
    .filter((match) => match.score > 0)
    .slice(0, 4)
    .map((match) => match.intent);

  if (!bestMatch || bestMatch.score < HELP_CHATBOT_CONFIDENCE_THRESHOLD) {
    return {
      intent: null,
      score: bestMatch?.score ?? 0,
      suggestions: suggestions.length
        ? suggestions
        : getHelpChatbotFallbackSuggestions(),
    };
  }

  return {
    intent: bestMatch.intent,
    score: bestMatch.score,
    suggestions,
  };
}
