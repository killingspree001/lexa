<script lang="ts">
	import type { Deck } from '$lib/types';

	let {
		deck,
		onStudy,
		onQuiz,
		onBack
	}: { deck: Deck; onStudy: () => void; onQuiz: () => void; onBack: () => void } = $props();

	let index = $state(0);
	let flipped = $state(false);
	let known = $state<string[]>([]);

	const total = $derived(deck.cards.length);
	const card = $derived(deck.cards[index]);

	function go(dir: number) {
		const next = index + dir;
		if (next < 0 || next >= total) return;
		flipped = false;
		index = next;
	}

	function mark(isKnown: boolean) {
		if (isKnown && !known.includes(card.id)) known = [...known, card.id];
		onStudy();
		if (index < total - 1) go(1);
		else flipped = false;
	}
</script>

<div class="mx-auto max-w-xl">
	<div class="mb-5 flex items-center justify-between">
		<button onclick={onBack} class="text-sm font-semibold text-ink/50 hover:text-ink">← All decks</button>
		<span class="text-sm text-ink/50">{index + 1} / {total}</span>
	</div>

	<div class="mb-6 h-1.5 overflow-hidden rounded-full bg-ink/10">
		<div class="h-full rounded-full bg-grass-500 transition-all" style="width: {((index + 1) / total) * 100}%"></div>
	</div>

	<button
		type="button"
		class="flip {flipped ? 'is-flipped' : ''} h-80 w-full"
		onclick={() => (flipped = !flipped)}
		aria-label="Flip card"
	>
		<div class="flip__inner">
			<div class="flip__face flip__front">
				<span class="text-xs font-bold uppercase tracking-widest text-grass-600">Term</span>
				<span class="font-display text-4xl font-bold sm:text-5xl">{card.term}</span>
				<span class="text-sm text-ink/40">Tap to reveal</span>
			</div>
			<div class="flip__face flip__back">
				<span class="text-xs font-bold uppercase tracking-widest text-white/70">Meaning</span>
				<span class="text-2xl font-semibold leading-snug">{card.definition}</span>
				{#if card.example}
					<span class="text-sm italic text-white/75">“{card.example}”</span>
				{/if}
			</div>
		</div>
	</button>

	<div class="mt-6 flex items-center justify-center gap-3">
		<button
			onclick={() => go(-1)}
			disabled={index === 0}
			class="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-lg disabled:opacity-30"
			aria-label="Previous card">←</button
		>
		<button
			onclick={() => (flipped = !flipped)}
			class="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold hover:bg-ink/5"
		>
			Flip
		</button>
		<button
			onclick={() => go(1)}
			disabled={index === total - 1}
			class="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-lg disabled:opacity-30"
			aria-label="Next card">→</button
		>
	</div>

	<div class="mt-4 flex justify-center gap-3">
		<button
			onclick={() => mark(false)}
			class="rounded-full bg-coral-100 px-5 py-2.5 text-sm font-semibold text-coral-600 transition hover:bg-coral-300/40"
			style="background: color-mix(in srgb, var(--color-coral-500) 12%, white)"
		>
			Still learning
		</button>
		<button
			onclick={() => mark(true)}
			class="rounded-full bg-grass-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-grass-600"
		>
			I knew it
		</button>
	</div>

	<div class="mt-6 flex items-center justify-between text-sm text-ink/50">
		<span>{known.length} marked known</span>
		<button onclick={onQuiz} class="font-semibold text-grass-600 hover:text-grass-700">Quiz this deck →</button>
	</div>
</div>

<style>
	.flip {
		perspective: 1200px;
		display: block;
	}
	.flip__inner {
		position: relative;
		height: 100%;
		width: 100%;
		transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		transform-style: preserve-3d;
	}
	.flip.is-flipped .flip__inner {
		transform: rotateY(180deg);
	}
	.flip__face {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.9rem;
		border-radius: 1.5rem;
		padding: 2rem;
		text-align: center;
		backface-visibility: hidden;
		box-shadow: 0 24px 50px -28px rgba(22, 32, 28, 0.4);
	}
	.flip__front {
		background: white;
		border: 1px solid rgba(22, 32, 28, 0.08);
	}
	.flip__back {
		background: var(--color-grass-600);
		color: white;
		transform: rotateY(180deg);
	}
</style>
