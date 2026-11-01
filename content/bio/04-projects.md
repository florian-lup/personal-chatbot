## Projects & Key Contributions 2024 - Present

### Unstuck

Client: https://github.com/florian-lup/unstuck-client

Backend: https://github.com/florian-lup/unstuck-backend

Website: https://www.unstuck.gg

Demo: https://youtu.be/lmMq48mGAZE

Developed a cross-platform Electron desktop application providing AI-powered gaming assistance with real-time voice and text chat capabilities.

- Electron desktop overlay application with React, TypeScript, and TailwindCSS
- Low-latency voice chat using WebRTC and OpenAI Realtime API
- JWT authentication with JWKS validation, RSA signature verification, and permission-based authorization
- Auth0 authentication with OAuth 2.0 Device Flow and secure token management in system keychain
- Stripe payment processing with webhook handling for subscription tier management
- PostgreSQL database schema with SQLAlchemy ORM featuring async operations, Alembic migrations, and optimized indexes
- OpenAI, Perplexity AI, and Tavily APIs for enhanced conversational AI and web search capabilities
- RESTful API with FastAPI supporting text chat and voice chat endpoints

Tech Stack: Electron, React, TypeScript, TailwindCSS, Python, FastAPI, PostgreSQL, SQLAlchemy, Alembic, Auth0, Stripe, OpenAI API, Perplexity AI, Tavily

### Timeline

Client: https://github.com/florian-lup/timeline

Backend: https://github.com/florian-lup/timeline-reporter

Timeline automates the entire journalism workflow from discovery to distribution. The system identifies breaking stories, eliminates duplicates, prioritizes based on impact, conducts research, writes professional articles, and generates audio podcasts.

- Implemented news discovery across multiple topics using Perplexity API.
- Designed a deduplication system using OpenAI embeddings and Pinecone.
- Automated realistic, high-quality AI audio generation for podcasts with TTS.
- Built a high-performance, virtualized timeline feed with React Virtuoso.

Tech Stack: TypeScript, Python, Next.js 15, React, Tailwind, Shadcn, Node.js, OpenAI, Perplexity, Pinecone, Cloudflare R2, MongoDB, Railway, Vercel.

### RAG Customer Support Chatbot

GitHub: https://github.com/florian-lup/rag-chatbot

Live Demo: https://rag-chatbot-support.vercel.app

Developed an AI-powered customer support chatbot leveraging Retrieval-Augmented Generation (RAG) to provide intelligent, context-aware responses by combining semantic search with large language models.

- Implemented RAG pipeline with OpenAI embeddings (text-embedding-3-small) and GPT-5-mini for semantic document retrieval and answer generation
- Integrated Pinecone vector database for efficient similarity search across indexed documentation
- Developed intelligent document chunking algorithm with configurable size limits (300-1500 chars) and contextual overlap for optimal retrieval accuracy
- Created automated web scraping system using Playwright to extract and index documentation from external sources
- Built modern responsive UI with React 19, TailwindCSS 4, and shadcn/ui component library featuring dark mode support

Tech Stack: Next.js, React, TypeScript, TailwindCSS, OpenAI API, Pinecone, Playwright, shadcn/ui.

### Voice Agent

GitHub: https://github.com/florian-lup/voice-agent

Live Demo: https://voice-agent-ochre-seven.vercel.app

A conversational AI voice agent application using ElevenLabs.

- Built Next.js 15 web application with real-time voice chat using ElevenLabs Conversational AI API and WebSocket connections
- Responsive UI with React Server Components, Radix UI primitives, and Tailwind CSS featuring streaming text display and auto-scrolling message interface
- Performance optimizations with pre-warming, DNS prefetching, and connection caching reducing cold start latency by implementing API route pre-warming and Edge Runtime
- Voice activity detection with real-time input volume monitoring and visual feedback using waveform visualization

Tech Stack: Next.js, React, TypeScript, ElevenLabs API, WebSocket, Tailwind CSS, Radix UI, Edge Runtime