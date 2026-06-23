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
		{ label: 'Day streak', value: `${progress.streak}`, icon: '🔥', tint: 'bg-sun text-ink' },
		{ label: 'Cards studied', value: `${progress.cardsStudied}`, icon: '✦', tint: 'bg-mint text-ink' },
		{ label: 'Quizzes', value: `${progress.quizzesTaken}`, icon: '◎', tint: 'bg-coral text-white' },
		{ label: 'Best score', value: progress.bestScore ? `${progress.bestScore}%` : '—', icon: '★', tint: 'bg-violet text-white' }
	]);
</script>

<div class="min-h-screen">
	<header class="sticky top-0 z-20 border-b-2 border-ink bg-cream/90 backdrop-blur">
		<div class="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
			<a href="/" class="flex items-center gap-2">
				<span class="nb-flat flex h-8 w-8 items-center justify-center bg-violet font-display text-base font-extrabold text-white" style="border-radius:0.55rem">L</span>
				<span class="font-display text-lg font-extrabold">Lexa</span>
			</a>
			{#if view !== 'home'}
				<button onclick={home} class="nb-btn bg-paper px-4 py-1.5 text-sm">Done</button>
			{:else}
				<a href="/" class="text-sm font-bold text-ink/55 hover:text-ink">Home</a>
			{/if}
		</div>
	</header>

	<main class="mx-auto max-w-5xl px-5 py-8">
		{#if !ready}
			<div class="flex h-64 items-center justify-center">
				<div class="h-9 w-9 animate-spin rounded-full border-[3px] border-ink/15 border-t-violet"></div>
			</div>
		{:else if view === 'study' && activeDeck}
			<Flashcards deck={activeDeck} onStudy={recordStudy} onQuiz={() => open(activeDeck.id, 'quiz')} onBack={home} />
		{:else if view === 'quiz' && activeDeck}
			<Quiz deck={activeDeck} onFinish={recordQuiz} onBack={home} />
		{:else}
			<div class="stagger grid gap-4 sm:grid-cols-4">
				{#each stats as s, i (s.label)}
					<div class="nb p-4 {s.tint} {i % 2 === 0 ? 'tilt-l' : 'tilt-r'}">
						<div class="text-2xl">{s.icon}</div>
						<div class="mt-1 font-display text-3xl font-extrabold">{s.value}</div>
						<div class="text-xs font-bold opacity-70">{s.label}</div>
					</div>
				{/each}
			</div>

			<div class="mt-7">
				<CreateDeck onCreated={addDeck} />
			</div>

			<div class="mb-4 mt-10 flex items-center gap-3">
				<h2 class="font-display text-xl font-extrabold">Your decks</h2>
				<span class="sticker bg-sun">{decks.length}</span>
			</div>

			{#if decks.length === 0}
				<p class="nb-flat bg-paper/40 py-12 text-center font-semibold text-ink/55" style="border-style:dashed">
					No decks yet — build one above to get started.
				</p>
			{:else}
				<div class="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{#each decks as deck (deck.id)}
						<div class="nb bg-paper flex flex-col p-5">
							<div class="flex items-start justify-between gap-2">
								<h3 class="font-display text-lg font-extrabold leading-tight">{deck.topic}</h3>
								<button onclick={() => removeDeck(deck.id)} aria-label="Delete deck" class="nb-btn flex h-7 w-7 items-center justify-center bg-coral text-sm text-white" style="box-shadow:2px 2px 0 0 var(--color-ink)">✕</button>
							</div>
							<div class="mt-2 flex flex-wrap items-center gap-2">
								<span class="sticker bg-mint capitalize">{deck.level}</span>
								<span class="text-xs font-bold text-ink/50">{deck.cards.length} cards</span>
								{#if deck.source === 'ai'}
									<span class="sticker bg-violet text-white">AI</span>
								{/if}
							</div>
							<div class="mt-5 flex gap-2">
								<button onclick={() => open(deck.id, 'study')} class="nb-btn flex-1 bg-violet py-2 text-sm text-white">Study</button>
								<button onclick={() => open(deck.id, 'quiz')} class="nb-btn flex-1 bg-paper py-2 text-sm">Quiz</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</main>
</div>
