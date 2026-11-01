import { describe, expect, it, vi } from 'vitest';

import { loadBio } from '@/lib/bio';
import { getSystemPrompt } from '@/lib/prompt';

describe('loadBio', () => {
  it('joins markdown files from content/bio in filename order', () => {
    const bio = loadBio();

    expect(bio.startsWith('# Profile')).toBe(true);
    expect(bio.indexOf('# Profile')).toBeLessThan(
      bio.indexOf('# Work Experience Summary'),
    );
    expect(bio.indexOf('# Work Experience Summary')).toBeLessThan(
      bio.indexOf('# Skills'),
    );
    expect(bio).toContain('Unstuck');
    expect(bio).toContain('Romanian — Native');
  });

  it('is included in the system prompt after the instructions', () => {
    const systemPrompt = getSystemPrompt();
    const bioStart = systemPrompt.indexOf('# BIO INFORMATION');
    const profileStart = systemPrompt.indexOf('# Profile');

    expect(bioStart).toBeGreaterThan(0);
    expect(profileStart).toBeGreaterThan(bioStart);
    expect(systemPrompt).not.toContain('# OUTPUT VERBOSITY');
  });

  it('does not read the bio when the prompt module is imported', async () => {
    vi.resetModules();
    const readdirSync = vi.fn(() => {
      throw Object.assign(new Error('missing bio directory'), {
        code: 'ENOENT',
      });
    });
    vi.doMock('node:fs', () => ({
      readdirSync,
      readFileSync: vi.fn(),
    }));

    try {
      const prompt = await import('@/lib/prompt');
      expect(readdirSync).not.toHaveBeenCalled();
      expect(() => prompt.getSystemPrompt()).toThrow(
        'Unable to read bio directory content/bio',
      );
      expect(readdirSync).toHaveBeenCalledOnce();
    } finally {
      vi.doUnmock('node:fs');
      vi.resetModules();
    }
  });

  it('does not cache a failed bio read', async () => {
    vi.resetModules();
    let missing = true;
    vi.doMock('node:fs', () => ({
      readdirSync: () => {
        if (missing) {
          throw Object.assign(new Error('missing bio directory'), {
            code: 'ENOENT',
          });
        }
        return ['01-profile.md'];
      },
      readFileSync: () => '# Profile\n\nRecovered',
    }));

    try {
      const bio = await import('@/lib/bio');
      expect(() => bio.loadBio()).toThrow(
        'Unable to read bio directory content/bio',
      );
      missing = false;
      expect(bio.loadBio()).toContain('Recovered');
    } finally {
      vi.doUnmock('node:fs');
      vi.resetModules();
    }
  });
});
