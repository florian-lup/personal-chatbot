import { z } from 'zod';

const chatConfigSchema = z.object({
  model: z.literal('gpt-5-mini-2025-08-07'),
});

export const CHAT_CONFIG = chatConfigSchema.parse({
  model: 'gpt-5-mini-2025-08-07' as const,
});
