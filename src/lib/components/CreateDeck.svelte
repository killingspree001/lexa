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

<div class="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
	<h2 class="font-display text-xl font-bold">Build a deck</h2>
	<p class="mt-1 text-sm text-ink/55">Name a topic and Lexa writes the cards.</p>

	<div class="mt-5 flex flex-col gap-3 sm:flex-row">
		<input
			bind:value={topic}
			onkeydown={(e) => e.key === 'Enter' && generate()}
			placeholder="e.g. Italian for restaurants"
			class="min-w-0 flex-1 rounded-xl border border-ink/15 px-4 py-3 outline-none transition focus:border-grass-400 focus:ring-2 focus:ring-grass-100"
		/>
		<select
			bind:value={level}
			class="rounded-xl border border-ink/15 bg-white px-3 py-3 outline-none focus:border-grass-400"
		>
			<option value="beginner">Beginner</option>
			<option value="intermediate">Intermediate</option>
			<option value="advanced">Advanced</option>
		</select>
		<button
			onclick={generate}
			disabled={loading || !topic.trim()}
			class="rounded-xl bg-grass-500 px-6 py-3 font-semibold text-white transition hover:bg-grass-600 disabled:opacity-50"
		>
			{loading ? 'Building…' : 'Generate'}
		</button>
	</div>

	<div class="mt-4 flex flex-wrap items-center gap-2">
		<span class="text-xs text-ink/40">Try:</span>
		{#each examples as ex (ex)}
			<button
				onclick={() => (topic = ex)}
				class="rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink/60 transition hover:bg-grass-100 hover:text-grass-700"
			>
				{ex}
			</button>
		{/each}
	</div>

	{#if error}
		<p class="mt-4 rounded-xl bg-coral-50 px-4 py-2.5 text-sm text-coral-600" style="background: color-mix(in srgb, var(--color-coral-500) 10%, white)">
			{error}
		</p>
	{/if}
</div>
