// NAV TOGGLE
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// CANVAS BACKGROUND — matrix-style rain in teal
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let cols, drops;
const chars = '01アイウエオカキクケコ<>/{}[]();'.split('');
const fs = 14;

function init() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  cols  = Math.floor(canvas.width / fs);
  drops = Array(cols).fill(1);
}

function draw() {
  ctx.fillStyle = 'rgba(13,27,42,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00C9B1';
  ctx.font = fs + 'px Space Mono, monospace';
  drops.forEach((y, i) => {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(ch, i * fs, y * fs);
    if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}

init();
window.addEventListener('resize', init);
setInterval(draw, 55);

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { 
    if (e.isIntersecting) { 
      e.target.classList.add('visible'); 
      observer.unobserve(e.target); 
    } 
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));