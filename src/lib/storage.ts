import { browser } from '$app/environment';
import type { Deck, Progress } from './types';

const DECKS_KEY = 'lexa.decks.v1';
const PROGRESS_KEY = 'lexa.progress.v1';
const SEEDED_KEY = 'lexa.seeded.v1';

export const emptyProgress: Progress = {
	streak: 0,
	lastStudied: null,
	cardsStudied: 0,
	quizzesTaken: 0,
	bestScore: 0
};

export function loadDecks(): Deck[] {
	if (!browser) return [];
	try {
		return JSON.parse(localStorage.getItem(DECKS_KEY) ?? '[]');
	} catch {
		return [];
	}
}

export function saveDecks(decks: Deck[]) {
	if (browser) localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
}

export function loadProgress(): Progress {
	if (!browser) return { ...emptyProgress };
	try {
		return { ...emptyProgress, ...JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}') };
	} catch {
		return { ...emptyProgress };
	}
}

export function saveProgress(progress: Progress) {
	if (browser) localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function hasSeeded(): boolean {
	return browser ? localStorage.getItem(SEEDED_KEY) === '1' : true;
}

export function markSeeded() {
	if (browser) localStorage.setItem(SEEDED_KEY, '1');
}

export function todayKey(): string {
	return new Date().toISOString().slice(0, 10);
}

// Returns the streak after recording a study session today.
export function bumpStreak(progress: Progress): Progress {
	const today = todayKey();
	if (progress.lastStudied === today) return progress;

	const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
	const streak = progress.lastStudied === yesterday ? progress.streak + 1 : 1;
	return { ...progress, streak, lastStudied: today };
}
