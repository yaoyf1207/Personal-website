// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal-up');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 150;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { passive: true });

// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
  document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== Rotating Words in Hero =====
const words = document.querySelectorAll('.rw-word');
let currentWord = 0;

setInterval(() => {
  const prev = currentWord;
  currentWord = (currentWord + 1) % words.length;
  words[prev].classList.remove('active');
  words[prev].classList.add('exit');
  setTimeout(() => words[prev].classList.remove('exit'), 500);
  words[currentWord].classList.add('active');
}, 2800);

// ===== Smooth Parallax for Floating Tags =====
const floatingTags = document.querySelectorAll('.ftag');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      floatingTags.forEach((tag, i) => {
        const speed = 0.03 + i * 0.01;
        tag.style.transform = `translateY(${-scrollY * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ===== Magnetic Button Effect =====
document.querySelectorAll('.btn, .contact-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== Card Tilt Effect =====
document.querySelectorAll('.proj-card, .world-card, .about-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
});

// ===== Timeline Scroll Progress =====
const timelineLine = document.querySelector('.timeline-line');
if (timelineLine) {
  const timeline = document.querySelector('.timeline');
  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const timelineTop = rect.top;
    const timelineHeight = rect.height;

    if (timelineTop < windowHeight && rect.bottom > 0) {
      const progress = Math.min(1, Math.max(0,
        (windowHeight - timelineTop) / (timelineHeight + windowHeight)
      ));
      timelineLine.style.background = `linear-gradient(to bottom,
        var(--peach) 0%,
        var(--coral) ${progress * 100}%,
        rgba(255,176,136,0.2) ${progress * 100}%,
        transparent 100%)`;
    }
  }, { passive: true });
}

// ===== Emoji Wiggle on World Cards =====
document.querySelectorAll('.world-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const emoji = card.querySelector('.wc-emoji');
    emoji.animate([
      { transform: 'scale(1.2) rotate(0deg)' },
      { transform: 'scale(1.3) rotate(-10deg)' },
      { transform: 'scale(1.2) rotate(10deg)' },
      { transform: 'scale(1.2) rotate(-5deg)' },
      { transform: 'scale(1.2) rotate(0deg)' }
    ], { duration: 500, easing: 'ease-in-out' });
  });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Staggered Reveal for Grid Items =====
const gridObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.reveal-up:not(.visible)');
      items.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, i * 80);
      });
      gridObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.world-grid, .projects-grid, .timeline').forEach(grid => {
  gridObserver.observe(grid);
});

// ===== Easter Egg: Konami Code =====
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      document.body.style.transition = 'filter 0.5s';
      document.body.style.filter = 'hue-rotate(180deg)';
      setTimeout(() => {
        document.body.style.filter = '';
      }, 3000);
    }
  } else {
    konamiIndex = 0;
  }
});

// ===== Typing effect for hero badge =====
const badge = document.querySelector('.hero-badge');
if (badge) {
  const originalText = badge.textContent.trim();
  // subtle pulse animation
  setInterval(() => {
    const dot = badge.querySelector('.badge-dot');
    if (dot) {
      dot.style.background = dot.style.background === 'var(--coral)' ? 'var(--sage)' : 'var(--coral)';
    }
  }, 4000);
}
