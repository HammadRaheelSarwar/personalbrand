/* ============================================================
   ZULKARNAIN PORTFOLIO — SCRIPT.JS
   ============================================================ */

// ── Navbar scroll ─────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 40);
}, { passive: true });

// ── Mobile burger ─────────────────────────────────────────────
const burger    = document.getElementById('burger');
const navLinks  = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!nav.contains(e.target)) navLinks.classList.remove('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll ─────────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
function updateNav() {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) cur = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}
window.addEventListener('scroll', updateNav, { passive: true });

// ── Scroll reveal ─────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Contact form ──────────────────────────────────────────────
const form    = document.getElementById('ctaForm');
const formOK  = document.getElementById('formOK');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('inp-name').value.trim();
  const email = document.getElementById('inp-email').value.trim();

  const shake = el => {
    el.style.borderColor = '#ef4444';
    el.style.animation   = 'shake .4s';
    setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 1000);
  };

  if (!name)  { shake(document.getElementById('inp-name'));  return; }
  if (!email) { shake(document.getElementById('inp-email')); return; }

  const btn = document.getElementById('ctaSubmitBtn');
  btn.textContent = 'Sending…';
  btn.disabled    = true;

  setTimeout(() => {
    form.style.cssText = 'opacity:0;transform:translateY(12px);transition:all .4s';
    setTimeout(() => {
      form.classList.add('hidden');
      formOK.classList.remove('hidden');
      formOK.style.cssText = 'opacity:0;transform:translateY(16px)';
      requestAnimationFrame(() => {
        formOK.style.cssText = 'opacity:1;transform:translateY(0);transition:all .5s ease';
      });
    }, 400);
  }, 800);
});

// ── Skill pill hover ripple ───────────────────────────────────
document.querySelectorAll('.skill-pills span').forEach(pill => {
  pill.addEventListener('mouseenter', () => {
    pill.style.transform = 'scale(1.06)';
  });
  pill.addEventListener('mouseleave', () => {
    pill.style.transform = '';
  });
});

// ── Smooth chip entrance delay ────────────────────────────────
document.querySelectorAll('.chip').forEach((chip, i) => {
  chip.style.transitionDelay = `${i * 0.06}s`;
  chip.style.opacity = '0';
  chip.style.transform = 'translateY(10px)';
  chip.style.transition = 'opacity .5s ease, transform .5s ease';
});

const chipObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.chip').forEach(c => {
        c.style.opacity   = '1';
        c.style.transform = 'translateY(0)';
      });
    }
  });
}, { threshold: 0.3 });

const heroChips = document.querySelector('.hero-chips');
if (heroChips) chipObs.observe(heroChips);

// ── CSS keyframe for shake (injected) ────────────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%,60%{transform:translateX(-6px)}
    40%,80%{transform:translateX(6px)}
  }
`;
document.head.appendChild(style);
