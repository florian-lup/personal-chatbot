export const OUTFITS_GALLERY_TOKEN = '[[gallery:outfits]]';

const WRAPPED_GALLERY_TOKENS = [
  `\`\`\`${OUTFITS_GALLERY_TOKEN}\`\`\``,
  `\`${OUTFITS_GALLERY_TOKEN}\``,
  OUTFITS_GALLERY_TOKEN,
];

const SHOW_PATTERN =
  /\b(show|see|seeing|look|pics?|photos?|pictures?|gallery)\b/i;
const OUTFIT_PATTERN =
  /\b(outfits?|fits|clothes|clothing|menswear|wardrobe|how (?:i|you) dress|what (?:i|you) wear)\b/i;

export function userAskedForOutfits(message: string): boolean {
  return SHOW_PATTERN.test(message) && OUTFIT_PATTERN.test(message);
}

export function messageShowsOutfits(content: string): boolean {
  return content.includes(OUTFITS_GALLERY_TOKEN);
}

export function stripOutfitGalleryToken(content: string): string {
  const withoutToken = WRAPPED_GALLERY_TOKENS.reduce(
    (text, token) => text.split(token).join(''),
    content,
  );

  return collapseGalleryWhitespace(withoutToken);
}

function collapseGalleryWhitespace(content: string): string {
  const lines = content.split('\n').map(line => collapseSpaces(line).trimEnd());
  const collapsed: string[] = [];

  for (const line of lines) {
    const previous = collapsed.at(-1);
    const blank = line.trim().length === 0;

    if (blank && (previous === undefined || previous.length === 0)) {
      continue;
    }

    collapsed.push(blank ? '' : line);
  }

  return collapsed.join('\n').trim();
}

function collapseSpaces(line: string): string {
  let result = '';
  let previousSpace = false;

  for (const character of line) {
    const space = character === ' ' || character === '\t';

    if (space) {
      if (!previousSpace) {
        result += ' ';
      }
      previousSpace = true;
      continue;
    }

    previousSpace = false;
    result += character;
  }

  return result;
}

export function parseDisplayedMessage(content: string): {
  text: string;
  showOutfits: boolean;
} {
  return {
    text: stripOutfitGalleryToken(content),
    showOutfits: messageShowsOutfits(content),
  };
}

export function withOutfitGallery(
  messages: readonly { role: string; content: string }[],
  reply: string,
): string {
  const userMessage = [...messages]
    .reverse()
    .find(message => message.role === 'user');

  if (
    userMessage === undefined ||
    !userAskedForOutfits(userMessage.content) ||
    messageShowsOutfits(reply)
  ) {
    return reply;
  }

  const trimmed = reply.trim();

  if (trimmed.length === 0) {
    return OUTFITS_GALLERY_TOKEN;
  }

  return `${trimmed}\n\n${OUTFITS_GALLERY_TOKEN}`;
}
