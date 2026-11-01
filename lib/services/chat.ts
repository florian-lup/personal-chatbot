import { z } from 'zod';

import { getOpenAI } from '@/lib/clients/openai';
import { CHAT_CONFIG } from '@/lib/config';
import { getSystemPrompt } from '@/lib/prompt';
import type { ChatMessage } from '@/types';

const openAIResponseSchema = z.object({
  output_text: z.string().nullable(),
});

export async function chat(messages: ChatMessage[]): Promise<string> {
  if (messages.length === 0) {
    throw new Error('No messages provided');
  }

  const openai = getOpenAI();

  // Filter out system messages since we use instructions for system prompt
  const messagesForOpenAI = messages.filter(
    msg => msg.role !== 'system',
  ) as Array<{ role: 'user' | 'assistant'; content: string }>;

  const response = await openai.responses.create(
    {
      model: CHAT_CONFIG.model,
      instructions: getSystemPrompt(),
      input: messagesForOpenAI,
      reasoning: { effort: 'medium' },
      text: { verbosity: 'medium' },
    },
    {
      timeout: 60000, // 60 second (1 minute) timeout
    },
  );

  // Validate OpenAI response structure
  const validatedResponse = openAIResponseSchema.parse(response);
  const assistantReply = validatedResponse.output_text ?? '';
  return assistantReply;
}
