import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { POST } from '@/app/api/chat/route';
import { chat } from '@/lib/services/chat';

// Mock the chat function
vi.mock('@/lib/services/chat', () => ({
  chat: vi.fn(),
}));

// Constants
const CHAT_API_URL = 'http://localhost:3000/api/chat';

describe('POST /api/chat', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should return a successful response with valid messages', async () => {
    const mockReply = 'This is a test response';
    vi.mocked(chat).mockResolvedValueOnce(mockReply);

    const validMessages = [
      { role: 'user' as const, content: 'Hello, how are you?' },
    ];

    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: validMessages }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(200);
    expect(data).toEqual({ reply: mockReply });
    expect(chat).toHaveBeenCalledWith(validMessages);
    expect(chat).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple messages in conversation', async () => {
    const mockReply = 'I can help you with that';
    vi.mocked(chat).mockResolvedValueOnce(mockReply);

    const conversation = [
      { role: 'system' as const, content: 'You are a helpful assistant.' },
      { role: 'user' as const, content: 'What is TypeScript?' },
      {
        role: 'assistant' as const,
        content: 'TypeScript is a typed superset of JavaScript.',
      },
      { role: 'user' as const, content: 'Can you give me an example?' },
    ];

    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: conversation }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(200);
    expect(data).toEqual({ reply: mockReply });
    expect(chat).toHaveBeenCalledWith(conversation);
  });

  it('should return 400 for invalid JSON', async () => {
    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json {',
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Invalid JSON payload' });
    expect(chat).not.toHaveBeenCalled();
  });

  it('should return 400 for missing messages array', async () => {
    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(400);
    expect(data.error).toContain('Required');
    expect(chat).not.toHaveBeenCalled();
  });

  it('should return 400 for empty messages array', async () => {
    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [] }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(400);
    expect(data.error).toContain('No messages provided');
    expect(chat).not.toHaveBeenCalled();
  });

  it('should return 400 for invalid message role', async () => {
    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'invalid-role', content: 'Hello' }],
      }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
    expect(chat).not.toHaveBeenCalled();
  });

  it('should return 400 for empty message content', async () => {
    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: '' }],
      }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
    expect(chat).not.toHaveBeenCalled();
  });

  it('should return 400 for missing message content', async () => {
    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user' }],
      }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
    expect(chat).not.toHaveBeenCalled();
  });

  it('should return 500 when chat function throws an error', async () => {
    const errorMessage =
      '429 You have no credits remaining. Add credits to continue using the API at https://platform.openai.com/settings/organization/billing/.';
    vi.mocked(chat).mockRejectedValueOnce(new Error(errorMessage));

    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
      }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Service temporarily unavailable.' });
    expect(chat).toHaveBeenCalledTimes(1);
  });

  it('should return 500 with default message when chat throws error without message', async () => {
    vi.mocked(chat).mockRejectedValueOnce(new Error());

    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
      }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Service temporarily unavailable.' });
    expect(chat).toHaveBeenCalledTimes(1);
  });

  it('logs only a sanitized summary when chat fails', async () => {
    const secret = 'sk-test-secret-key-should-not-leak';
    const failure = new Error(
      `upstream failed Authorization: Bearer ${secret}`,
    );
    failure.stack = `Error: ${secret}\n    at secret/internal.ts:1:1`;
    Object.assign(failure, {
      status: 401,
      code: 'invalid_api_key',
      headers: { authorization: `Bearer ${secret}` },
      error: { message: secret },
    });
    vi.mocked(chat).mockRejectedValueOnce(failure);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const request = new NextRequest(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }],
        }),
      });

      const response = await POST(request);
      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };
      const logged = errorSpy.mock.calls
        .flat()
        .map(part => (typeof part === 'string' ? part : JSON.stringify(part)))
        .join(' ');

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Service temporarily unavailable.' });
      expect(logged).not.toContain(secret);
      expect(logged).not.toContain('secret/internal.ts');
      expect(logged).not.toContain('Authorization');
      expect(errorSpy).toHaveBeenCalledWith('Chat request failed', {
        name: 'Error',
        status: 401,
        code: 'invalid_api_key',
      });
    } finally {
      errorSpy.mockRestore();
    }
  });

  it('should handle non-Error objects thrown by chat function', async () => {
    vi.mocked(chat).mockRejectedValueOnce('String error');

    const request = new NextRequest(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
      }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { reply?: string; error?: string };

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Service temporarily unavailable.' });
  });
});
