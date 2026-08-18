// ============================================================
// Shared behaviour: floating hearts, active nav, scroll reveals
// ============================================================

(function floatingHearts() {
  const layer = document.getElementById('hearts-layer');
  if (!layer) return;

  const symbols = ['♥', '❥', '♡'];
  const count = window.innerWidth < 720 ? 12 : 20;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const left = Math.random() * 100;
    const size = 0.8 + Math.random() * 1.6;
    const duration = 10 + Math.random() * 14;
    const delay = Math.random() * -20;
    const drift = (Math.random() * 120 - 60) + 'px';

    heart.style.left = left + 'vw';
    heart.style.fontSize = size + 'rem';
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';
    heart.style.setProperty('--drift', drift);

    layer.appendChild(heart);
  }
})();

(function activeNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });
})();

(function scrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => io.observe(item));
})();

// small confetti burst utility, reused on the surprise page
function burstConfetti(originXpct = 50, originYpct = 40, amount = 60) {
  const colors = ['#d9a94e', '#e8607f', '#f5c6d0', '#fff6ec', '#9c3a5c'];
  const layer = document.createElement('div');
  layer.style.position = 'fixed';
  layer.style.inset = '0';
  layer.style.pointerEvents = 'none';
  layer.style.zIndex = '999';
  document.body.appendChild(layer);

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('span');
    const size = 6 + Math.random() * 6;
    piece.style.position = 'absolute';
    piece.style.left = originXpct + '%';
    piece.style.top = originYpct + '%';
    piece.style.width = size + 'px';
    piece.style.height = size * 0.4 + 'px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = '2px';
    piece.style.opacity = '0.95';

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 260;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 80;
    const rot = Math.random() * 720 - 360;

    piece.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`, opacity: 0 },
      ],
      {
        duration: 1400 + Math.random() * 900,
        easing: 'cubic-bezier(.2,.7,.3,1)',
      }
    );
    layer.appendChild(piece);
  }

  setTimeout(() => layer.remove(), 2400);
}
