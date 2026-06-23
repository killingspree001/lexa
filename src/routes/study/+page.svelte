<script lang="ts">
	import { onMount } from 'svelte';
	import type { Deck, Progress } from '$lib/types';
	import {
		loadDecks,
		saveDecks,
		loadProgress,
		saveProgress,
		hasSeeded,
		markSeeded,
		bumpStreak,
		emptyProgress
	} from '$lib/storage';
	import { seedDecks } from '$lib/sampleDecks';
	import CreateDeck from '$lib/components/CreateDeck.svelte';
	import Flashcards from '$lib/components/Flashcards.svelte';
	import Quiz from '$lib/components/Quiz.svelte';

	let decks = $state<Deck[]>([]);
	let progress = $state<Progress>({ ...emptyProgress });
	let view = $state<'home' | 'study' | 'quiz'>('home');
	let activeId = $state<string | null>(null);
	let ready = $state(false);

	const activeDeck = $derived(decks.find((d) => d.id === activeId) ?? null);

	onMount(() => {
		let loaded = loadDecks();
		if (!hasSeeded() && loaded.length === 0) {
			loaded = seedDecks();
			markSeeded();
		}
		decks = loaded;
		progress = loadProgress();
		ready = true;
	});

	$effect(() => {
		if (ready) saveDecks(decks);
	});
	$effect(() => {
		if (ready) saveProgress(progress);
	});

	function addDeck(deck: Deck) {
		decks = [deck, ...decks];
		activeId = deck.id;
		view = 'study';
	}
	function open(id: string, mode: 'study' | 'quiz') {
		activeId = id;
		view = mode;
	}
	function home() {
		view = 'home';
		activeId = null;
	}
	function removeDeck(id: string) {
		if (confirm('Delete this deck?')) decks = decks.filter((d) => d.id !== id);
	}
	function recordStudy() {
		progress = bumpStreak({ ...progress, cardsStudied: progress.cardsStudied + 1 });
	}
	function recordQuiz(percent: number) {
		progress = bumpStreak({
			...progress,
			quizzesTaken: progress.quizzesTaken + 1,
			bestScore: Math.max(progress.bestScore, percent)
		});
	}

	const stats = $derived([
		{ label: 'Day streak', value: `${progress.streak}`, icon: '🔥' },
		{ label: 'Cards studied', value: `${progress.cardsStudied}`, icon: '✦' },
		{ label: 'Quizzes', value: `${progress.quizzesTaken}`, icon: '◎' },
		{ label: 'Best score', value: progress.bestScore ? `${progress.bestScore}%` : '—', icon: '★' }
	]);
</script>

<div class="min-h-screen">
	<header class="sticky top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur">
		<div class="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
			<a href="/" class="flex items-center gap-2">
				<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-grass-500 font-display text-base font-bold text-white">L</span>
				<span class="font-display text-lg font-bold">Lexa</span>
			</a>
			{#if view !== 'home'}
				<button onclick={home} class="text-sm font-semibold text-ink/55 hover:text-ink">Done</button>
			{:else}
				<a href="/" class="text-sm font-semibold text-ink/55 hover:text-ink">Home</a>
			{/if}
		</div>
	</header>

	<main class="mx-auto max-w-5xl px-5 py-8">
		{#if !ready}
			<div class="flex h-64 items-center justify-center">
				<div class="h-8 w-8 animate-spin rounded-full border-2 border-grass-100 border-t-grass-500"></div>
			</div>
		{:else if view === 'study' && activeDeck}
			<Flashcards deck={activeDeck} onStudy={recordStudy} onQuiz={() => open(activeDeck.id, 'quiz')} onBack={home} />
		{:else if view === 'quiz' && activeDeck}
			<Quiz deck={activeDeck} onFinish={recordQuiz} onBack={home} />
		{:else}
			<div class="grid gap-3 sm:grid-cols-4">
				{#each stats as s (s.label)}
					<div class="rounded-2xl border border-ink/10 bg-white p-4">
						<div class="text-2xl">{s.icon}</div>
						<div class="mt-1 font-display text-2xl font-bold">{s.value}</div>
						<div class="text-xs text-ink/50">{s.label}</div>
					</div>
				{/each}
			</div>

			<div class="mt-6">
				<CreateDeck onCreated={addDeck} />
			</div>

			<h2 class="mb-4 mt-10 font-display text-xl font-bold">Your decks</h2>
			{#if decks.length === 0}
				<p class="rounded-2xl border border-dashed border-ink/20 py-12 text-center text-ink/50">
					No decks yet — build one above to get started.
				</p>
			{:else}
				<div class="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each decks as deck (deck.id)}
						<div class="flex flex-col rounded-2xl border border-ink/10 bg-white p-5">
							<div class="flex items-start justify-between gap-2">
								<h3 class="font-display text-lg font-bold leading-tight">{deck.topic}</h3>
								<button onclick={() => removeDeck(deck.id)} class="text-xs font-semibold text-ink/30 hover:text-coral-600">✕</button>
							</div>
							<div class="mt-2 flex items-center gap-2 text-xs">
								<span class="rounded-full bg-paper px-2 py-0.5 capitalize text-ink/55">{deck.level}</span>
								<span class="text-ink/45">{deck.cards.length} cards</span>
								{#if deck.source === 'ai'}
									<span class="rounded-full bg-grass-100 px-2 py-0.5 font-semibold text-grass-700">AI</span>
								{/if}
							</div>
							<div class="mt-5 flex gap-2">
								<button onclick={() => open(deck.id, 'study')} class="flex-1 rounded-full bg-grass-500 py-2 text-sm font-semibold text-white transition hover:bg-grass-600">
									Study
								</button>
								<button onclick={() => open(deck.id, 'quiz')} class="flex-1 rounded-full border border-ink/15 py-2 text-sm font-semibold transition hover:bg-ink/5">
									Quiz
								</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</main>
</div>
