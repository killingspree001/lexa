import type { Deck, QuizQuestion } from './types';

export function shuffle<T>(input: T[]): T[] {
	const arr = [...input];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

// Build a multiple-choice quiz straight from a deck — no AI needed. Each
// question shows a term and four definitions (the right one plus distractors
// pulled from the rest of the deck).
export function buildQuiz(deck: Deck, count = 8): QuizQuestion[] {
	const picked = shuffle(deck.cards).slice(0, Math.min(count, deck.cards.length));

	return picked.map((card) => {
		const distractors = shuffle(deck.cards.filter((c) => c.id !== card.id))
			.slice(0, 3)
			.map((c) => c.definition);
		const options = shuffle([card.definition, ...distractors]);
		return { card, options, answer: options.indexOf(card.definition) };
	});
}
