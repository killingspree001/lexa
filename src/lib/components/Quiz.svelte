<script lang="ts">
	import { onMount } from 'svelte';
	import type { Deck, QuizQuestion } from '$lib/types';
	import { buildQuiz } from '$lib/quiz';

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
		if (selected === null) return 'border-ink/15 hover:border-grass-400 hover:bg-grass-50';
		if (i === q.answer) return 'border-grass-500 bg-grass-50 text-grass-700';
		if (i === selected) return 'border-coral-500 bg-coral-50 text-coral-600';
		return 'border-ink/10 opacity-55';
	}
</script>

<div class="mx-auto max-w-xl">
	<div class="mb-5 flex items-center justify-between">
		<button onclick={onBack} class="text-sm font-semibold text-ink/50 hover:text-ink">← All decks</button>
		{#if !done}<span class="text-sm text-ink/50">{qIndex + 1} / {questions.length}</span>{/if}
	</div>

	{#if done}
		<div class="pop-in rounded-3xl border border-ink/10 bg-white p-8 text-center">
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-grass-100 font-display text-2xl font-bold text-grass-600">
				{percent}%
			</div>
			<h2 class="font-display text-2xl font-bold">
				{percent >= 80 ? 'Brilliant!' : percent >= 50 ? 'Nice work!' : 'Keep at it!'}
			</h2>
			<p class="mt-2 text-ink/60">You got {score} of {questions.length} right.</p>
			<div class="mt-6 flex justify-center gap-3">
				<button onclick={retry} class="rounded-full bg-grass-500 px-6 py-2.5 font-semibold text-white transition hover:bg-grass-600">
					Try again
				</button>
				<button onclick={onBack} class="rounded-full border border-ink/15 px-6 py-2.5 font-semibold hover:bg-ink/5">
					Back to decks
				</button>
			</div>
		</div>
	{:else if q}
		<div class="mb-6 h-1.5 overflow-hidden rounded-full bg-ink/10">
			<div class="h-full rounded-full bg-grass-500 transition-all" style="width: {((qIndex + 1) / questions.length) * 100}%"></div>
		</div>

		<div class="rounded-3xl border border-ink/10 bg-white p-7">
			<p class="text-xs font-bold uppercase tracking-widest text-grass-600">What does it mean?</p>
			<h2 class="mt-2 font-display text-3xl font-bold">{q.card.term}</h2>

			<div class="mt-6 grid gap-3">
				{#each q.options as option, i (option)}
					<button
						onclick={() => choose(i)}
						disabled={selected !== null}
						class="rounded-2xl border-2 px-4 py-3 text-left font-medium transition {optionClass(i)}"
					>
						{option}
					</button>
				{/each}
			</div>

			{#if selected !== null}
				<div class="pop-in mt-5 flex items-center justify-between">
					<span class="text-sm {selected === q.answer ? 'text-grass-600' : 'text-coral-600'} font-semibold">
						{selected === q.answer ? 'Correct!' : 'Not quite.'}
					</span>
					<button onclick={next} class="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:bg-grass-600">
						{qIndex < questions.length - 1 ? 'Next' : 'See score'}
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<div class="flex h-48 items-center justify-center">
			<div class="h-8 w-8 animate-spin rounded-full border-2 border-grass-100 border-t-grass-500"></div>
		</div>
	{/if}
</div>
