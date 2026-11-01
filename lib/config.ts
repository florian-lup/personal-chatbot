import { z } from 'zod';

const chatConfigSchema = z.object({
  model: z.literal('gpt-6-luna'),
});

export const CHAT_CONFIG = chatConfigSchema.parse({
  model: 'gpt-6-luna' as const,
});
