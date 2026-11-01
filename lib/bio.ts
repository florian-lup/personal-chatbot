import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const BIO_DIRECTORY = path.join(process.cwd(), 'content', 'bio');

let cachedBio: string | null = null;

/**
 * Reads every markdown file in content/bio, in filename order, and joins them
 * into the biography block appended to the system prompt.
 *
 * Drop a new .md file in that folder to extend what the chatbot knows.
 * Prefix names with numbers (01-profile.md) to control order.
 * A successful read is cached for the lifetime of the server instance.
 * A failed read is not cached, so a later request can succeed once the files
 * are available.
 */
export function loadBio(): string {
  if (cachedBio !== null) {
    return cachedBio;
  }

  const files = readBioFiles();

  if (files.length === 0) {
    throw new Error('No bio markdown files found in content/bio');
  }

  cachedBio = files.map(file => readBioFile(file)).join('\n\n');

  return cachedBio;
}

function readBioFiles(): string[] {
  try {
    return readdirSync(BIO_DIRECTORY)
      .filter(file => file.endsWith('.md'))
      .sort((left, right) => left.localeCompare(right));
  } catch (error) {
    throw bioReadError('Unable to read bio directory content/bio', error);
  }
}

function readBioFile(file: string): string {
  try {
    return readFileSync(path.join(BIO_DIRECTORY, file), 'utf8').trim();
  } catch (error) {
    throw bioReadError(`Unable to read bio file ${file}`, error);
  }
}

function bioReadError(message: string, error: unknown): Error {
  const wrapped = new Error(message, { cause: error });

  if (isErrno(error)) {
    wrapped.name = 'BioReadError';
    Object.assign(wrapped, { code: error.code });
  }

  return wrapped;
}

function isErrno(error: unknown): error is NodeJS.ErrnoException {
  return (
    error instanceof Error && 'code' in error && typeof error.code === 'string'
  );
}
