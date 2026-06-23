<script lang="ts">
	import { onMount } from 'svelte';
	import type { Deck, QuizQuestion } from '$lib/types';
	import { buildQuiz } from '$lib/quiz';
	import { burstConfetti } from '$lib/confetti';

	let {
		deck,
		onFinish,
		onBack
	}: { deck: Deck; onFinish: (percent: number) => void; onBack: () => void } = $props();

	let questions = $state<QuizQuestion[]>([]);
	onMount(() => {
		questions = buildQuiz(deck);
	});

	let qIndex = $state(0);
	let selected = $state<number | null>(null);
	let score = $state(0);
	let done = $state(false);

	const q = $derived(questions[qIndex]);
	const percent = $derived(Math.round((score / questions.length) * 100));

	function choose(i: number) {
		if (selected !== null) return;
		selected = i;
		if (i === q.answer) score += 1;
	}

	function next() {
		if (qIndex < questions.length - 1) {
			qIndex += 1;
			selected = null;
		} else {
			done = true;
			onFinish(percent);
			if (percent >= 50) burstConfetti(percent >= 80 ? 150 : 90);
		}
	}

	function retry() {
		questions = buildQuiz(deck);
		qIndex = 0;
		selected = null;
		score = 0;
		done = false;
	}

	function optionClass(i: number) {
		if (selected === null) return 'bg-paper hover:bg-cream';
		if (i === q.answer) return 'bg-mint';
		if (i === selected) return 'bg-coral text-white';
		return 'bg-paper opacity-50';
	}
</script>

<div class="mx-auto max-w-xl">
	<div class="mb-4 flex items-center justify-between">
		<button onclick={onBack} class="text-sm font-bold text-ink/55 hover:text-ink">← All decks</button>
		{#if !done}<span class="sticker bg-sun">{qIndex + 1} / {questions.length}</span>{/if}
	</div>

	{#if done}
		<div class="nb pop-in bg-paper p-8 text-center">
			<div class="nb-flat mx-auto mb-4 flex h-20 w-20 items-center justify-center bg-sun font-display text-2xl font-extrabold" style="border-radius:999px">{percent}%</div>
			<h2 class="font-display text-3xl font-extrabold">
				{percent >= 80 ? 'Brilliant!' : percent >= 50 ? 'Nice work!' : 'Keep at it!'}
			</h2>
			<p class="mt-2 font-semibold text-ink/60">You got {score} of {questions.length} right.</p>
			<div class="mt-6 flex justify-center gap-3">
				<button onclick={retry} class="nb-btn bg-violet px-6 py-2.5 text-white">Try again</button>
				<button onclick={onBack} class="nb-btn bg-paper px-6 py-2.5">Back to decks</button>
			</div>
		</div>
	{:else if q}
		<div class="nb-flat mb-6 h-4 overflow-hidden bg-paper p-0.5" style="border-radius:999px">
			<div class="h-full bg-violet transition-all" style="width: {((qIndex + 1) / questions.length) * 100}%; border-radius:999px"></div>
		</div>

		<div class="nb bg-paper p-7">
			<span class="sticker bg-coral text-white">What does it mean?</span>
			<h2 class="mt-3 font-display text-3xl font-extrabold">{q.card.term}</h2>

			<div class="mt-6 grid gap-3">
				{#each q.options as option, i (option)}
					<button onclick={() => choose(i)} disabled={selected !== null} class="nb-flat px-4 py-3 text-left font-semibold transition {optionClass(i)}">
						{option}
					</button>
				{/each}
			</div>

			{#if selected !== null}
				<div class="pop-in mt-5 flex items-center justify-between">
					<span class="font-display text-sm font-extrabold {selected === q.answer ? 'text-mint' : 'text-coral'}">
						{selected === q.answer ? 'Correct! ✓' : 'Not quite.'}
					</span>
					<button onclick={next} class="nb-btn bg-ink px-5 py-2 text-sm text-white">
						{qIndex < questions.length - 1 ? 'Next →' : 'See score'}
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<div class="flex h-48 items-center justify-center">
			<div class="h-9 w-9 animate-spin rounded-full border-[3px] border-ink/15 border-t-violet"></div>
		</div>
	{/if}
</div>
