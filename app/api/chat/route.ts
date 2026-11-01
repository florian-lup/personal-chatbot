import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { chat } from '@/lib/services/chat';
import type { ChatMessage, ChatApiError } from '@/types';

const SERVICE_UNAVAILABLE_MESSAGE = 'Service temporarily unavailable.';
const SAFE_ERROR_TOKEN = /^[A-Za-z0-9_-]{1,64}$/;

type ChatErrorLog = {
  name: string;
  status?: number;
  code?: string;
};

function toChatErrorLog(err: unknown): ChatErrorLog {
  if (!(err instanceof Error)) {
    return { name: 'UnknownError' };
  }

  const name = SAFE_ERROR_TOKEN.test(err.name) ? err.name : 'Error';
  const log: ChatErrorLog = { name };

  if (
    'status' in err &&
    typeof err.status === 'number' &&
    Number.isInteger(err.status) &&
    err.status >= 100 &&
    err.status <= 599
  ) {
    log.status = err.status;
  }

  if (
    'code' in err &&
    typeof err.code === 'string' &&
    SAFE_ERROR_TOKEN.test(err.code)
  ) {
    log.code = err.code;
  }

  return log;
}

export async function POST(req: NextRequest) {
  const messageSchema = z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1),
  });
  const bodySchema = z.object({
    messages: z.array(messageSchema).min(1, 'No messages provided'),
  });

  let json: unknown;
  try {
    json = await req.json();
  } catch (err: unknown) {
    console.error('Failed to parse request body', err);
    const error: ChatApiError = { error: 'Invalid JSON payload' };
    return NextResponse.json(error, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    const error: ChatApiError = { error: parsed.error.message };
    return NextResponse.json(error, { status: 400 });
  }

  const { messages } = parsed.data as { messages: ChatMessage[] };

  try {
    const reply = await chat(messages);
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error('Chat request failed', toChatErrorLog(err));
    const resp: ChatApiError = { error: SERVICE_UNAVAILABLE_MESSAGE };
    return NextResponse.json(resp, { status: 500 });
  }
}

export const revalidate = 0; // no ISR
export const dynamic = 'force-dynamic';
