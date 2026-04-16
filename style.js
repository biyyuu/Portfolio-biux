document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const splashDelay = 700;

  setTimeout(() => {
    body.classList.add('loaded');
  }, splashDelay);

  const revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((el) => observer.observe(el));
  }

  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
  });

  const overlay = document.querySelector('.exp-overlay');
  const modal = document.querySelector('.exp-modal');
  const modalImage = document.querySelector('.exp-image');
  const modalTitle = document.querySelector('.exp-modal-title');
  const modalDesc = document.querySelector('.exp-modal-desc');
  const closeBtn = document.querySelector('.exp-close');

  if (overlay && modal && modalImage) {
    document.querySelectorAll('.exp-card .btn-ghost').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.exp-card');
        if (!card) return;

        const img = card.getAttribute('data-image') || '';
        modalImage.src = img;
        modalImage.alt = card.querySelector('h3')?.textContent || 'Experience detail';
        modalTitle.textContent = card.querySelector('h3')?.textContent || '';
        modalDesc.textContent = card.querySelector('p:nth-of-type(2)')?.textContent || '';

        overlay.classList.add('active');
      });
    });

    const closeOverlay = () => overlay.classList.remove('active');

    closeBtn?.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeOverlay();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeOverlay();
    });
  }

  const scrollTopBtn = document.querySelector('.scroll-top');
  const footer = document.querySelector('.site-footer');

  if (scrollTopBtn && footer) {
    const updateScrollTopVisibility = () => {
      const footerRect = footer.getBoundingClientRect();
      const isFooterVisible = footerRect.top < window.innerHeight * 0.85;
      const distanceToBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      const isNearBottom = distanceToBottom < 200 && window.scrollY > 400;

      if (isFooterVisible || isNearBottom) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    };

    const onScroll = () => requestAnimationFrame(updateScrollTopVisibility);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateScrollTopVisibility();

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const navToggle = document.querySelector('.nav-toggle');
  const siteHeader = document.querySelector('.site-header');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteHeader && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteHeader.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (siteHeader.classList.contains('nav-open')) {
          siteHeader.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const handleHeaderScroll = () => {
    if (window.innerWidth > 980 || !siteHeader) return;
    const shouldHide = window.scrollY > 120 && !siteHeader.classList.contains('nav-open');
    siteHeader.classList.toggle('is-scrolled', shouldHide);
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  window.addEventListener('resize', handleHeaderScroll);
  handleHeaderScroll();
});
