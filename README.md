# Personal Chatbot

AI chatbot that provides contextually accurate responses using bio information
embedded directly in the system prompt. Built with Next.js and OpenAI.

## Features

- 🎨 **Modern UI**: Clean, responsive chat interface with React, Tailwind &
  Shadcn
- 📄 **Embedded Bio Content**: Bio information is embedded directly in the system prompt
- 🤖 **Contextual Chat**: AI responses powered by bio content and OpenAI

## Live Example

Check out a live example at
[https://www.florianlup.com](https://www.florianlup.com)

## Tech Stack

- **Next.js 15** + **React 19** + **TypeScript**
- **Tailwind CSS 4** + **Radix UI** + **shadcn/ui**
- **OpenAI API** (chat completion)

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

3. **Customize bio content**

   Edit `lib/prompt.ts` and update the bio information in the `SYSTEM_PROMPT` constant.

4. **Run development server**

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
├── lib/prompt.ts          # System prompt with embedded bio content
├── tests/                # Comprehensive test suite
└── lib/                  # Utilities and configs
├── hooks/                # Custom hooks
```

## Scripts

- `pnpm dev --turbopack` - Development server
- `pnpm build` - Production build
- `pnpm test` - Run Playwright tests
