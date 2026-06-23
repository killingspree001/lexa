import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { fallbackDeck } from '$lib/sampleDecks';
import type { Card } from '$lib/types';

const MODEL = 'gemini-2.0-flash';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => ({}));
	const topic = String(body.topic ?? '').trim().slice(0, 80) || 'useful everyday vocabulary';
	const level = String(body.level ?? 'intermediate').slice(0, 30);
	const count = Math.min(Math.max(Number(body.count) || 8, 4), 12);

	const key = env.GEMINI_API_KEY;
	if (!key) {
		return json({ source: 'sample', cards: fallbackDeck(topic, count) });
	}

	const prompt = `Create ${count} vocabulary flashcards for the topic "${topic}" at a ${level} level.
Return ONLY a JSON array. Each element must be an object:
{"term": string, "definition": string (one concise sentence), "example": string (a natural sentence that uses the term)}.
Avoid duplicates. Keep terms relevant to the topic.`;

	try {
		const res = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
			{
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					contents: [{ parts: [{ text: prompt }] }],
					generationConfig: { temperature: 0.7, responseMimeType: 'application/json' }
				})
			}
		);

		if (!res.ok) throw new Error(`gemini ${res.status}`);

		const data = await res.json();
		const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
		const parsed = JSON.parse(text);

		const cards: Card[] = (Array.isArray(parsed) ? parsed : [])
			.map((c, i: number) => ({
				id: `ai-${Date.now()}-${i}`,
				term: String(c?.term ?? '').trim(),
				definition: String(c?.definition ?? '').trim(),
				example: String(c?.example ?? '').trim()
			}))
			.filter((c) => c.term && c.definition);

		if (cards.length === 0) throw new Error('no cards');
		return json({ source: 'ai', cards });
	} catch {
		return json({
			source: 'sample',
			cards: fallbackDeck(topic, count),
			note: 'The AI service was unavailable, so here is a sample deck.'
		});
	}
};
