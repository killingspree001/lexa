# Lexa

An AI vocabulary and flashcard app. Name any topic — “SAT power words”,
“Spanish for travel”, “startup jargon” — and Lexa generates a deck of
flashcards (term, meaning, example), lets you flip through them, quizzes you
with auto-built multiple-choice questions, and keeps a daily streak.

Built with **SvelteKit (Svelte 5)**, **Tailwind CSS**, and **Google Gemini**
for deck generation. The Gemini key stays on the server; quizzes and progress
run entirely in the browser.

## Features

- AI-generated decks from any topic and difficulty (via a server route)
- Flip-card study mode with example sentences and “known / still learning”
- Auto-built multiple-choice quizzes with instant feedback and a score
- Daily streak, cards studied, quizzes taken and best score (saved locally)
- Works **without a key** out of the box — it ships with sample decks and falls
  back to them if the AI is unavailable

## How the AI stays safe

The Gemini API key is read on the server in `src/routes/api/generate/+server.ts`
via `$env/dynamic/private`, so it is never exposed to the browser. The client
just POSTs a topic and gets back cards.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173. You can use it immediately with the sample decks.

### Add AI generation (optional, free)

1. Get a free Gemini API key (no credit card) at
   [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. Copy `.env.example` to `.env` and paste your key:

   ```
   GEMINI_API_KEY=your_key_here
   ```

3. Restart `npm run dev`. Now the “Build a deck” box generates real decks for
   any topic you type.

## Deploying to Vercel

1. Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
   SvelteKit’s `adapter-auto` detects Vercel automatically.
2. Add `GEMINI_API_KEY` as an environment variable (optional — without it the
   app still runs on sample decks).
3. Deploy.

## Tech

- SvelteKit + Svelte 5 runes
- Tailwind CSS v4
- Google Gemini (`gemini-2.0-flash`) via a server endpoint
- `localStorage` for decks and progress — no database
