/* ============================================================
   ZULQARNAIN PORTFOLIO — SCRIPT.JS
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
const form = document.getElementById('ctaForm');
const formOptions = document.getElementById('formOptions');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('inp-name').value.trim();
  const email = document.getElementById('inp-email').value.trim();
  const biz = document.getElementById('inp-biz').value.trim();
  const service = document.getElementById('inp-service').value;
  const msg = document.getElementById('inp-msg').value.trim();

  const shake = el => {
    el.style.borderColor = '#ef4444';
    el.style.animation   = 'shake .4s';
    setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 1000);
  };

  if (!name)  { shake(document.getElementById('inp-name'));  return; }
  if (!email) { shake(document.getElementById('inp-email')); return; }

  // Build the message text
  let bodyText = `Hello, I'd like to book a call.\n\nName: ${name}\nEmail: ${email}`;
  if (biz) bodyText += `\nBusiness: ${biz}`;
  if (service) bodyText += `\nService: ${service}`;
  if (msg) bodyText += `\nMessage: ${msg}`;

  const encodedBody = encodeURIComponent(bodyText);

  // Setup the buttons
  document.getElementById('btnWhatsapp').onclick = () => {
    window.open(`https://wa.me/923211363967?text=${encodedBody}`, '_blank');
  };

  document.getElementById('btnGmail').onclick = () => {
    window.location.href = `mailto:zulqarnainrapidmove@gmail.com?subject=New Automation Inquiry from ${encodeURIComponent(name)}&body=${encodedBody}`;
  };

  const btn = document.getElementById('ctaSubmitBtn');
  btn.textContent = 'Processing…';
  btn.disabled    = true;

  setTimeout(() => {
    form.style.cssText = 'opacity:0;transform:translateY(12px);transition:all .4s';
    setTimeout(() => {
      form.classList.add('hidden');
      formOptions.classList.remove('hidden');
      formOptions.style.cssText = 'opacity:0;transform:translateY(16px)';
      requestAnimationFrame(() => {
        formOptions.style.cssText = 'opacity:1;transform:translateY(0);transition:all .5s ease';
      });
    }, 400);
  }, 400);
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

// ── 3D Slider Logic ──────────────────────────────────────────────
const slides = document.querySelectorAll('.skill-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentSlide = 0;

function updateSlider() {
  if (!slides.length) return;
  const totalSlides = slides.length;
  
  slides.forEach((slide, index) => {
    let diff = index - currentSlide;
    // Handle wrap around for infinite feel
    if (diff > totalSlides / 2) diff -= totalSlides;
    if (diff < -totalSlides / 2) diff += totalSlides;
    
    // Set position data attribute
    slide.setAttribute('data-pos', diff);
  });
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

if(slides.length > 0) {
  updateSlider();
  
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  });
  
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlider();
    });
  });
  
  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      if (currentSlide !== index) {
        currentSlide = index;
        updateSlider();
      }
    });
  });
}

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
