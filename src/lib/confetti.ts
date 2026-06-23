// Dependency-free confetti burst — spawns a few dozen falling pieces and
// cleans them up afterwards.
export function burstConfetti(amount = 90) {
	if (typeof document === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const colors = ['#6c4cf1', '#ffd23f', '#ff5c4d', '#2bd4a4', '#141414'];
	const root = document.createElement('div');
	root.style.cssText =
		'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden';
	document.body.appendChild(root);

	for (let i = 0; i < amount; i++) {
		const piece = document.createElement('div');
		const size = 8 + Math.random() * 9;
		const left = Math.random() * 100;
		const color = colors[Math.floor(Math.random() * colors.length)];
		const duration = 1600 + Math.random() * 1600;
		const delay = Math.random() * 250;
		const rotate = Math.random() * 360;
		const radius = Math.random() > 0.5 ? '999px' : '2px';
		piece.style.cssText = `position:absolute;top:-24px;left:${left}vw;width:${size}px;height:${
			size * 0.62
		}px;background:${color};border:1.5px solid #141414;border-radius:${radius};transform:rotate(${rotate}deg);animation:confetti-fall ${duration}ms ease-in ${delay}ms forwards`;
		root.appendChild(piece);
	}

	setTimeout(() => root.remove(), 3600);
}
