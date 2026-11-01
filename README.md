# Personal Chatbot

AI chatbot that provides contextually accurate responses using my bio
information. Built with Next.js and OpenAI.

## Features

- 🎨 **Modern UI**: Clean, mobile-first, responsive chat interface
- 🧪 **Unit Tests**: Automated testing with Vitest
- 🔒 **Robust Security**: Rigorous Content Security Policy (CSP), core HTTP
  security headers, server-side input validation (Zod), and runtime environment
  variable protection ensure XSS, clickjacking, misconfiguration, and other
  common web attacks are mitigated by default.

## Live Example

Check out a live example at
[https://www.florianlup.com](https://www.florianlup.com)

## Tech Stack

- **Next.js 15** + **React 19** + **TypeScript**
- **Tailwind CSS 4** + **Radix UI** + **shadcn/ui**
- **OpenAI** (Responses API)

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- OpenAI API key

### Installation

1. **Clone and install**

   ```bash
   git clone https://github.com/florian-lup/rag-chatbot
   cd rag-chatbot
   pnpm install
   ```

2. **Environment variables**

   Create `.env`:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_SITE_URL=your_site_url_here
   ```

3. **Run development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
rag-chatbot/
├── app/                  # Next.js App Router
│   ├── api/chat/         # Chat API endpoint
│   └── page.tsx          # Main chat page
├── components/           # React components
│   ├── chat/             # Chat-specific components
│   └── ui/               # Reusable UI components
├── content/bio/           # Markdown bio files, loaded into the system prompt
├── lib/bio.ts             # Reads content/bio at runtime
├── lib/prompt.ts          # System prompt instructions
├── tests/                # Comprehensive test suite
└── lib/                  # Utilities and configs
├── hooks/                # Custom hooks
```

## Scripts

- `pnpm dev --turbopack` - Development server
- `pnpm build` - Production build
- `pnpm test` - Run unit tests
