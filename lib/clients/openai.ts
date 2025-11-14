import OpenAI from 'openai';

/**
 * OpenAI client singleton.
 *
 * Creates and caches a single OpenAI client instance to avoid recreating it on every request.
 * The SDK automatically picks up the OPENAI_API_KEY environment variable when no apiKey is provided.
 *
 * This lazy initialization approach prevents the app from crashing on startup
 * if the API key is missing but OpenAI functionality isn't being used.
 */
let openAIClient: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!openAIClient) {
    openAIClient = new OpenAI({
      timeout: 60000, // 60 second (1 minute) timeout
      maxRetries: 2,
    });
  }
  return openAIClient;
}
