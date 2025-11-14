import { z } from 'zod';

import { getOpenAI } from '@/lib/clients/openai';
import { CHAT_CONFIG } from '@/lib/config';
import { SYSTEM_PROMPT } from '@/lib/prompt';
import type { ChatMessage } from '@/types';

const openAIChoiceSchema = z.object({
  message: z.object({
    role: z.literal('assistant').optional(),
    content: z.string().nullable(),
  }),
});

const openAIResponseSchema = z.object({
  choices: z
    .array(openAIChoiceSchema)
    .min(1, 'OpenAI response must have at least one choice'),
});

export async function chat(messages: ChatMessage[]): Promise<string> {
  if (messages.length === 0) {
    throw new Error('No messages provided');
  }

  const openai = getOpenAI();

  const messagesForOpenAI = [
    { role: 'system', content: SYSTEM_PROMPT } as const,
    ...messages,
  ] satisfies Parameters<typeof openai.chat.completions.create>[0]['messages'];

  const response = await openai.chat.completions.create(
    {
      model: CHAT_CONFIG.model,
      messages: messagesForOpenAI,
    },
    {
      timeout: 60000, // 60 second (1 minute) timeout
    },
  );

  // Validate OpenAI response structure
  const validatedResponse = openAIResponseSchema.parse(response);
  const firstChoice = validatedResponse.choices[0];
  if (!firstChoice) {
    throw new Error('OpenAI returned no choices');
  }

  const assistantReply = firstChoice.message.content ?? '';
  return assistantReply;
}
