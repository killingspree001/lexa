<script lang="ts">
	const features = [
		{
			icon: '✦',
			title: 'AI-built decks',
			body: 'Type any topic — SAT words, kitchen Spanish, legal terms — and get a fresh deck in seconds.'
		},
		{
			icon: '⇋',
			title: 'Flip to learn',
			body: 'Clean flashcards with a meaning and a real example sentence on the back.'
		},
		{
			icon: '◎',
			title: 'Quiz & streaks',
			body: 'Test yourself with auto-built quizzes and keep a daily streak going.'
		}
	];

	const steps = [
		['Pick a topic', 'Tell Lexa what you want to learn and how hard it should be.'],
		['Study the cards', 'Flip through, mark what you know, and let the rest resurface.'],
		['Take the quiz', 'Answer, see your score, and watch your streak climb.']
	] as const;
</script>

<div class="min-h-screen">
	<header class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
		<a href="/" class="flex items-center gap-2">
			<span class="flex h-9 w-9 items-center justify-center rounded-xl bg-grass-500 font-display text-lg font-bold text-white">L</span>
			<span class="font-display text-xl font-bold tracking-tight">Lexa</span>
		</a>
		<a
			href="/study"
			class="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:bg-grass-600"
		>
			Open app
		</a>
	</header>

	<section class="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-12 pt-10 lg:grid-cols-2 lg:pt-20">
		<div class="pop-in">
			<span class="inline-flex items-center gap-2 rounded-full bg-grass-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-grass-700">
				<span class="h-1.5 w-1.5 rounded-full bg-grass-500"></span>
				Vocabulary, the fun way
			</span>
			<h1 class="mt-5 font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl">
				Learn words that <span class="text-grass-500">actually stick</span>.
			</h1>
			<p class="mt-5 max-w-md text-lg text-ink/65">
				Lexa turns any topic into a deck of smart flashcards, then quizzes you on
				them and keeps your streak alive. Built for people who like learning a
				little every day.
			</p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<a
					href="/study"
					class="rounded-full bg-grass-500 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-grass-600 hover:shadow-lg"
				>
					Start learning — free
				</a>
				<a
					href="#how"
					class="rounded-full border border-ink/15 px-6 py-3 text-center font-semibold transition hover:bg-ink/5"
				>
					How it works
				</a>
			</div>
		</div>

		<div class="flex justify-center">
			<div class="flip-card h-72 w-full max-w-sm" tabindex="0" role="button" aria-label="Example flashcard, tap to flip">
				<div class="flip-card__inner">
					<div class="flip-card__face flip-card__front">
						<span class="text-xs font-bold uppercase tracking-widest text-grass-600">Tap to flip</span>
						<span class="font-display text-5xl font-bold">Ephemeral</span>
						<span class="text-sm text-ink/40">adjective</span>
					</div>
					<div class="flip-card__face flip-card__back">
						<span class="text-xs font-bold uppercase tracking-widest text-white/70">Meaning</span>
						<span class="text-2xl font-semibold leading-snug">Lasting for a very short time.</span>
						<span class="text-sm text-white/70">“The applause was ephemeral.”</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-6 py-16">
		<div class="stagger grid gap-5 md:grid-cols-3">
			{#each features as f (f.title)}
				<div class="rounded-3xl border border-ink/10 bg-white p-7">
					<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-grass-100 text-xl text-grass-600">
						{f.icon}
					</div>
					<h3 class="font-display text-xl font-bold">{f.title}</h3>
					<p class="mt-2 text-ink/65">{f.body}</p>
				</div>
			{/each}
		</div>
	</section>

	<section id="how" class="mx-auto max-w-6xl px-6 py-16">
		<div class="mx-auto max-w-xl text-center">
			<h2 class="font-display text-3xl font-bold tracking-tight sm:text-4xl">Three steps, every day</h2>
			<p class="mt-3 text-ink/60">A small habit that adds up fast.</p>
		</div>
		<div class="stagger mt-12 grid gap-5 md:grid-cols-3">
			{#each steps as [title, body], i (title)}
				<div class="rounded-3xl border border-ink/10 bg-white p-7">
					<div class="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-coral-500 font-display font-bold text-white">
						{i + 1}
					</div>
					<h3 class="font-display text-lg font-bold">{title}</h3>
					<p class="mt-2 text-ink/65">{body}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-6 py-16">
		<div class="rounded-[2rem] bg-grass-500 px-6 py-14 text-center text-white">
			<h2 class="font-display text-3xl font-bold tracking-tight sm:text-4xl">Ready to learn something today?</h2>
			<p class="mx-auto mt-3 max-w-md text-white/80">No account needed. Start with a sample deck or build your own.</p>
			<a
				href="/study"
				class="mt-8 inline-block rounded-full bg-white px-7 py-3 font-semibold text-grass-700 transition hover:-translate-y-0.5 hover:shadow-lg"
			>
				Open Lexa
			</a>
		</div>
	</section>

	<footer class="mx-auto max-w-6xl px-6 py-10">
		<div class="flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-8 text-sm text-ink/50 sm:flex-row">
			<div class="flex items-center gap-2">
				<span class="flex h-7 w-7 items-center justify-center rounded-lg bg-grass-500 font-display text-sm font-bold text-white">L</span>
				<span class="font-display font-bold text-ink">Lexa</span>
			</div>
			<p>Learn words that stick.</p>
		</div>
	</footer>
</div>

<style>
	.flip-card {
		perspective: 1200px;
		outline: none;
	}
	.flip-card__inner {
		position: relative;
		height: 100%;
		width: 100%;
		transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
		transform-style: preserve-3d;
	}
	.flip-card:hover .flip-card__inner,
	.flip-card:focus-within .flip-card__inner {
		transform: rotateY(180deg);
	}
	.flip-card__face {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		border-radius: 1.5rem;
		padding: 2rem;
		text-align: center;
		backface-visibility: hidden;
		box-shadow: 0 24px 50px -24px rgba(22, 32, 28, 0.35);
	}
	.flip-card__front {
		background: white;
		border: 1px solid rgba(22, 32, 28, 0.08);
	}
	.flip-card__back {
		background: var(--color-grass-600);
		color: white;
		transform: rotateY(180deg);
	}
</style>
