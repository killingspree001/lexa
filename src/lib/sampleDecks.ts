import type { Card, Deck } from './types';

type Raw = [term: string, definition: string, example: string];

const SAT: Raw[] = [
	['Ephemeral', 'Lasting for a very short time.', 'The beauty of the sunset was ephemeral, gone within minutes.'],
	['Pragmatic', 'Dealing with things sensibly and realistically.', 'She took a pragmatic approach and fixed what she could.'],
	['Candor', 'Honesty and directness in speech.', 'I appreciated his candor about the project’s risks.'],
	['Ubiquitous', 'Present or found everywhere.', 'Smartphones have become ubiquitous in daily life.'],
	['Astute', 'Having sharp judgement; shrewd.', 'An astute investor, she spotted the trend early.'],
	['Reticent', 'Not revealing one’s thoughts readily.', 'He was reticent about his plans for the weekend.'],
	['Tenacious', 'Holding firmly to a purpose; persistent.', 'Her tenacious effort finally paid off.'],
	['Mitigate', 'To make less severe or painful.', 'Planting trees can mitigate the effects of heat.']
];

const BUSINESS: Raw[] = [
	['Leverage', 'To use something to maximum advantage.', 'We can leverage our existing customers to grow.'],
	['Bandwidth', 'The capacity to take on work.', 'I don’t have the bandwidth for another project this week.'],
	['Stakeholder', 'A person with an interest in a project.', 'We surveyed every stakeholder before deciding.'],
	['Streamline', 'To make a process simpler and more efficient.', 'The new tool streamlines our reporting.'],
	['Onboarding', 'The process of integrating a new hire or user.', 'Good onboarding cuts churn in the first month.'],
	['Pipeline', 'A set of opportunities moving toward a goal.', 'Our sales pipeline looks healthy this quarter.'],
	['Actionable', 'Able to be acted on; practical.', 'Give me actionable feedback, not just praise.'],
	['Scalable', 'Able to grow without breaking.', 'We chose a scalable architecture from day one.']
];

const POOL: Raw[] = [
	['Lucid', 'Clear and easy to understand.', 'She gave a lucid explanation of the idea.'],
	['Nuance', 'A subtle difference in meaning.', 'He missed the nuance in her tone.'],
	['Resilient', 'Able to recover quickly from difficulty.', 'A resilient team bounces back from setbacks.'],
	['Eloquent', 'Fluent and persuasive in speech.', 'Her eloquent speech moved the room.'],
	['Meticulous', 'Showing great attention to detail.', 'He is meticulous about his notes.'],
	['Innate', 'Existing from birth; natural.', 'She has an innate sense of rhythm.'],
	['Galvanize', 'To shock or excite into action.', 'The news galvanized the volunteers.'],
	['Prudent', 'Acting with care for the future.', 'It was prudent to save some of the budget.'],
	['Vivid', 'Producing strong, clear images.', 'He has a vivid memory of that day.'],
	['Concise', 'Giving information clearly in few words.', 'Keep the summary concise.'],
	['Diligent', 'Showing careful, persistent effort.', 'A diligent student, she never missed a deadline.'],
	['Profound', 'Very great or deeply felt.', 'The book had a profound effect on me.']
];

function toCards(rows: Raw[], prefix: string): Card[] {
	return rows.map(([term, definition, example], i) => ({
		id: `${prefix}-${i}`,
		term,
		definition,
		example
	}));
}

// Two ready-made decks so a brand-new visitor has something to study.
export function seedDecks(): Deck[] {
	const now = Date.now();
	return [
		{
			id: `seed-sat-${now}`,
			topic: 'SAT power words',
			level: 'advanced',
			source: 'sample',
			createdAt: now,
			cards: toCards(SAT, `seed-sat-${now}`)
		},
		{
			id: `seed-biz-${now}`,
			topic: 'Business English',
			level: 'intermediate',
			source: 'sample',
			createdAt: now - 1000,
			cards: toCards(BUSINESS, `seed-biz-${now}`)
		}
	];
}

// Used by the API route when no Gemini key is configured (or a call fails).
export function fallbackDeck(_topic: string, count: number): Card[] {
	const base = `fb-${Date.now()}`;
	return toCards(POOL, base).slice(0, Math.min(count, POOL.length));
}
