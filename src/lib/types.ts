export type Card = {
	id: string;
	term: string;
	definition: string;
	example: string;
};

export type DeckSource = 'ai' | 'sample';

export type Deck = {
	id: string;
	topic: string;
	level: string;
	source: DeckSource;
	createdAt: number;
	cards: Card[];
};

export type Progress = {
	streak: number;
	lastStudied: string | null;
	cardsStudied: number;
	quizzesTaken: number;
	bestScore: number;
};

export type QuizQuestion = {
	card: Card;
	options: string[];
	answer: number;
};
