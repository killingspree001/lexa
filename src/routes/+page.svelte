<script lang="ts">
	const features = [
		{ icon: '✦', tint: 'bg-sun', title: 'AI-built decks', body: 'Type any topic and get a fresh deck of cards in seconds.' },
		{ icon: '⇋', tint: 'bg-mint', title: 'Flip to learn', body: 'A meaning and a real example sentence on the back of every card.' },
		{ icon: '◎', tint: 'bg-coral', title: 'Quiz & streaks', body: 'Auto-built quizzes, confetti on a win, and a streak to keep alive.' }
	];

	const steps = [
		['Pick a topic', 'Tell Lexa what to teach you and how hard to make it.'],
		['Flip the cards', 'Study at your pace and mark what you already know.'],
		['Beat the quiz', 'Answer, score, and watch your streak climb.']
	] as const;
</script>

<div class="min-h-screen">
	<header class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
		<a href="/" class="flex items-center gap-2">
			<span class="nb-flat flex h-9 w-9 items-center justify-center bg-violet font-display text-lg font-extrabold text-white" style="border-radius:0.7rem">L</span>
			<span class="font-display text-xl font-extrabold tracking-tight">Lexa</span>
		</a>
		<a href="/study" class="nb-btn bg-ink px-5 py-2 text-sm text-white">Open app →</a>
	</header>

	<section class="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-12 pt-10 lg:grid-cols-2 lg:pt-16">
		<div class="pop-in">
			<span class="sticker tilt-l bg-sun">★ Vocabulary, the fun way</span>
			<h1 class="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
				Learn words<br />that <span class="text-violet">actually</span> <span class="text-coral">stick</span>.
			</h1>
			<p class="mt-5 max-w-md text-lg font-medium text-ink/70">
				Lexa turns any topic into a deck of smart flashcards, quizzes you on them,
				and throws confetti when you nail it. Little and often, the fun way.
			</p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<a href="/study" class="nb-btn bg-violet px-7 py-3.5 text-center text-white">Start learning — free</a>
				<a href="#how" class="nb-btn bg-paper px-7 py-3.5 text-center">How it works</a>
			</div>
		</div>

		<div class="flex justify-center">
			<div class="flip-card float-bob h-72 w-full max-w-sm" tabindex="0" role="button" aria-label="Example flashcard, hover to flip">
				<div class="flip-card__inner">
					<div class="flip-card__face flip-card__front nb bg-paper">
						<span class="sticker bg-mint">Tap to flip</span>
						<span class="font-display text-4xl font-extrabold sm:text-5xl">Ephemeral</span>
						<span class="text-sm font-semibold text-ink/40">adjective</span>
					</div>
					<div class="flip-card__face flip-card__back nb bg-violet text-white">
						<span class="sticker bg-sun text-ink">Meaning</span>
						<span class="text-2xl font-bold leading-snug">Lasting for a very short time.</span>
						<span class="text-sm font-medium text-white/80">“The applause was ephemeral.”</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-6 py-14">
		<div class="stagger grid gap-6 md:grid-cols-3">
			{#each features as f, i (f.title)}
				<div class="nb bg-paper p-7 {i % 2 === 0 ? 'tilt-l' : 'tilt-r'}">
					<div class="nb-flat mb-4 flex h-12 w-12 items-center justify-center {f.tint} text-xl" style="border-radius:0.7rem">{f.icon}</div>
					<h3 class="font-display text-xl font-bold">{f.title}</h3>
					<p class="mt-2 font-medium text-ink/70">{f.body}</p>
				</div>
			{/each}
		</div>
	</section>

	<section id="how" class="mx-auto max-w-6xl px-6 py-14">
		<div class="mx-auto max-w-xl text-center">
			<span class="sticker tilt-r bg-coral text-white">How it works</span>
			<h2 class="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Three steps, every day</h2>
		</div>
		<div class="stagger mt-12 grid gap-6 md:grid-cols-3">
			{#each steps as [title, body], i (title)}
				<div class="nb bg-paper p-7">
					<div class="nb-flat mb-4 flex h-11 w-11 items-center justify-center bg-violet font-display text-lg font-extrabold text-white" style="border-radius:999px">{i + 1}</div>
					<h3 class="font-display text-lg font-bold">{title}</h3>
					<p class="mt-2 font-medium text-ink/70">{body}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-6 py-14">
		<div class="nb bg-violet px-6 py-14 text-center text-white">
			<h2 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to learn something today?</h2>
			<p class="mx-auto mt-3 max-w-md font-medium text-white/85">No account needed. Start with a sample deck or build your own.</p>
			<a href="/study" class="nb-btn mt-8 inline-block bg-sun px-8 py-3.5 text-ink">Open Lexa</a>
		</div>
	</section>

	<footer class="mx-auto max-w-6xl px-6 py-10">
		<div class="flex flex-col items-center justify-between gap-3 border-t-2 border-ink/15 pt-8 text-sm font-semibold text-ink/55 sm:flex-row">
			<div class="flex items-center gap-2">
				<span class="nb-flat flex h-7 w-7 items-center justify-center bg-violet font-display text-sm font-extrabold text-white" style="border-radius:0.5rem">L</span>
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
		transition: transform 0.7s cubic-bezier(0.34, 1.4, 0.5, 1);
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
		gap: 0.9rem;
		padding: 2rem;
		text-align: center;
		backface-visibility: hidden;
	}
	.flip-card__back {
		transform: rotateY(180deg);
	}
</style>
