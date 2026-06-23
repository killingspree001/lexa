<script lang="ts">
	import type { Deck } from '$lib/types';

	let { onCreated }: { onCreated: (deck: Deck) => void } = $props();

	let topic = $state('');
	let level = $state('intermediate');
	let count = $state(8);
	let loading = $state(false);
	let error = $state<string | null>(null);

	const examples = ['SAT power words', 'Spanish for travel', 'Cooking terms', 'Startup jargon'];

	async function generate() {
		const t = topic.trim();
		if (!t || loading) return;
		loading = true;
		error = null;
		try {
			const res = await fetch('/api/generate', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ topic: t, level, count })
			});
			const data = await res.json();
			if (!data?.cards?.length) throw new Error('empty');

			onCreated({
				id: `d-${Date.now()}`,
				topic: t,
				level,
				source: data.source ?? 'ai',
				createdAt: Date.now(),
				cards: data.cards
			});
			topic = '';
		} catch {
			error = 'Could not build that deck. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="nb bg-paper p-6">
	<div class="flex items-center gap-2">
		<h2 class="font-display text-xl font-extrabold">Build a deck</h2>
		<span class="sticker bg-sun">AI</span>
	</div>
	<p class="mt-1 font-medium text-ink/60">Name a topic and Lexa writes the cards.</p>

	<div class="mt-5 flex flex-col gap-3 sm:flex-row">
		<input
			bind:value={topic}
			onkeydown={(e) => e.key === 'Enter' && generate()}
			placeholder="e.g. Italian for restaurants"
			class="nb-input min-w-0 flex-1 px-4 py-3 font-medium outline-none"
		/>
		<select bind:value={level} class="nb-input px-3 py-3 font-semibold outline-none">
			<option value="beginner">Beginner</option>
			<option value="intermediate">Intermediate</option>
			<option value="advanced">Advanced</option>
		</select>
		<button onclick={generate} disabled={loading || !topic.trim()} class="nb-btn bg-violet px-6 py-3 text-white">
			{loading ? 'Building…' : 'Generate'}
		</button>
	</div>

	<div class="mt-4 flex flex-wrap items-center gap-2">
		<span class="text-xs font-bold text-ink/40">Try:</span>
		{#each examples as ex (ex)}
			<button onclick={() => (topic = ex)} class="sticker bg-cream transition hover:bg-sun">{ex}</button>
		{/each}
	</div>

	{#if error}
		<p class="nb-flat mt-4 bg-coral px-4 py-2.5 text-sm font-bold text-white">{error}</p>
	{/if}
</div>
