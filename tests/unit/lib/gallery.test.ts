import { describe, expect, it } from 'vitest';

import {
  OUTFITS_GALLERY_TOKEN,
  parseDisplayedMessage,
  stripOutfitGalleryToken,
  userAskedForOutfits,
  withOutfitGallery,
} from '@/lib/gallery';

describe('outfit gallery', () => {
  it('detects a request to see outfits', () => {
    expect(userAskedForOutfits('Can I see some of your outfits?')).toBe(true);
    expect(userAskedForOutfits('Show me your clothes')).toBe(true);
    expect(userAskedForOutfits("What's your work experience?")).toBe(false);
    expect(userAskedForOutfits('Show me your coding projects')).toBe(false);
  });

  it('removes the gallery token before the message is rendered', () => {
    const parsed = parseDisplayedMessage(
      `A couple of looks.\n\n${OUTFITS_GALLERY_TOKEN}`,
    );

    expect(parsed.showOutfits).toBe(true);
    expect(parsed.text).toBe('A couple of looks.');
    expect(parsed.text).not.toContain(OUTFITS_GALLERY_TOKEN);
  });

  it('strips a token the model wrapped in backticks', () => {
    expect(stripOutfitGalleryToken('Here.\n\n`[[gallery:outfits]]`')).toBe(
      'Here.',
    );
  });

  it('leaves an ordinary reply unchanged', () => {
    const parsed = parseDisplayedMessage('I live in London.');

    expect(parsed.showOutfits).toBe(false);
    expect(parsed.text).toBe('I live in London.');
  });

  it('appends the token when an outfit request forgot it', () => {
    const reply = withOutfitGallery(
      [{ role: 'user', content: 'Show me some outfits' }],
      'Here are a few looks.',
    );

    expect(reply).toBe(`Here are a few looks.\n\n${OUTFITS_GALLERY_TOKEN}`);
  });

  it('does not append a second token', () => {
    const reply = withOutfitGallery(
      [{ role: 'user', content: 'Show me some outfits' }],
      `Looks.\n\n${OUTFITS_GALLERY_TOKEN}`,
    );

    expect(reply.match(/gallery:outfits/g)).toHaveLength(1);
  });

  it('does not append the token for other questions', () => {
    const reply = withOutfitGallery(
      [{ role: 'user', content: 'What are your strongest skills?' }],
      'TypeScript and product work.',
    );

    expect(reply).toBe('TypeScript and product work.');
  });
});
