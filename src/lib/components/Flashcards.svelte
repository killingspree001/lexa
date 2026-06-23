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
	<div class="mb-4 flex items-center justify-between">
		<button onclick={onBack} class="text-sm font-bold text-ink/55 hover:text-ink">← All decks</button>
		<span class="sticker bg-sun">{index + 1} / {total}</span>
	</div>

	<div class="nb-flat mb-6 h-4 overflow-hidden bg-paper p-0.5" style="border-radius:999px">
		<div class="h-full bg-violet transition-all" style="width: {((index + 1) / total) * 100}%; border-radius:999px"></div>
	</div>

	<button type="button" class="flip {flipped ? 'is-flipped' : ''} h-80 w-full" onclick={() => (flipped = !flipped)} aria-label="Flip card">
		<div class="flip__inner">
			<div class="flip__face flip__front nb bg-paper">
				<span class="sticker bg-mint">Term</span>
				<span class="font-display text-4xl font-extrabold sm:text-5xl">{card.term}</span>
				<span class="text-sm font-semibold text-ink/40">Tap to reveal</span>
			</div>
			<div class="flip__face flip__back nb bg-violet text-white">
				<span class="sticker bg-sun text-ink">Meaning</span>
				<span class="text-2xl font-bold leading-snug">{card.definition}</span>
				{#if card.example}
					<span class="text-sm font-medium italic text-white/80">“{card.example}”</span>
				{/if}
			</div>
		</div>
	</button>

	<div class="mt-6 flex items-center justify-center gap-3">
		<button onclick={() => go(-1)} disabled={index === 0} class="nb-btn flex h-11 w-11 items-center justify-center bg-paper text-lg" aria-label="Previous">←</button>
		<button onclick={() => (flipped = !flipped)} class="nb-btn bg-paper px-6 py-2.5 text-sm">Flip</button>
		<button onclick={() => go(1)} disabled={index === total - 1} class="nb-btn flex h-11 w-11 items-center justify-center bg-paper text-lg" aria-label="Next">→</button>
	</div>

	<div class="mt-4 flex justify-center gap-3">
		<button onclick={() => mark(false)} class="nb-btn bg-coral px-5 py-2.5 text-sm text-white">Still learning</button>
		<button onclick={() => mark(true)} class="nb-btn bg-mint px-5 py-2.5 text-sm text-ink">I knew it!</button>
	</div>

	<div class="mt-6 flex items-center justify-between text-sm font-bold text-ink/55">
		<span>{known.length} marked known</span>
		<button onclick={onQuiz} class="text-violet hover:text-violet-700">Quiz this deck →</button>
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
		transition: transform 0.6s cubic-bezier(0.34, 1.4, 0.5, 1);
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
		padding: 2rem;
		text-align: center;
		backface-visibility: hidden;
	}
	.flip__back {
		transform: rotateY(180deg);
	}
</style>
