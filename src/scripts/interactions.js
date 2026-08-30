// Fades/slides `.reveal` elements in once they scroll into view.
const io = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				io.unobserve(entry.target);
			}
		}
	},
	{ threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Gives the sticky header a background/shadow once the page is scrolled.
const header = document.querySelector('.site-header');
if (header) {
	const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });
}
