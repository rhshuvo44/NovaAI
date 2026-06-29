import { apiPost } from "./helpers";
import type { GenerateContentInput, RecommendedDocument } from "@/types/ai";

export const aiService = {
  generateContent: (input: GenerateContentInput): Promise<{ content: string }> =>
    apiPost<{ content: string }>("/ai/content-generator", input),

  optimizePrompt: (prompt: string): Promise<{ optimizedPrompt: string }> =>
    apiPost<{ optimizedPrompt: string }>("/ai/prompt-optimizer", { prompt }),

  summarize: (text: string, maxSentences?: number): Promise<{ summary: string }> =>
    apiPost<{ summary: string }>("/ai/summarizer", { text, maxSentences }),

  generateTags: (content: string): Promise<{ tags: string[] }> =>
    apiPost<{ tags: string[] }>("/ai/tags-generator", { content }),

  getRecommendations: (limit?: number): Promise<{ recommendations: RecommendedDocument[] }> =>
    apiPost<{ recommendations: RecommendedDocument[] }>("/ai/recommendations", { limit }),
};
