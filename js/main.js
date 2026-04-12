// Markdown rendering and navigation
function init() {
  if (typeof marked === 'undefined') {
    setTimeout(init, 50);
    return;
  }

  const contentEl = document.getElementById('content');
  const pages = {};

  // Collect inline markdown from script tags
  document.querySelectorAll('script[type="text/markdown"]').forEach(s => {
    pages[s.dataset.page] = s.textContent;
  });

  let currentPage = '';

  function renderPage(page, scrollToFragment) {
    const needsRender = page !== currentPage;
    if (needsRender) {
      currentPage = page;

      const md = pages[page];
      if (!md) {
        contentEl.innerHTML = '<p>Page not found.</p>';
        return;
      }

      contentEl.innerHTML = marked.parse(md);

      // Update active nav link
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === page);
      });

      // Close mobile nav
      const navLinks = document.querySelector('.nav-links');
      const navToggle = document.querySelector('.nav-toggle');
      if (navLinks) navLinks.classList.remove('open');
      if (navToggle) navToggle.textContent = '\u2630';

      // Make markdown links to .md files work as SPA navigation
      contentEl.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (!href || !href.includes('.md')) return;
        const [file, fragment] = href.split('#');
        const pageName = file.replace(/\.md$/, '').replace(/^.*\//, '');
        a.href = fragment ? '#' + pageName + ':' + fragment : '#' + pageName;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          renderPage(pageName, fragment);
        });
      });
    }

    // Scroll handling
    if (scrollToFragment) {
      const scrollTo = () => {
        const target = document.getElementById(scrollToFragment);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      };
      needsRender ? setTimeout(scrollTo, 50) : scrollTo();
    } else if (needsRender) {
      window.scrollTo(0, 0);
    }

    // Update hash without triggering hashchange
    const newHash = page === 'index' && !scrollToFragment ? '' :
      scrollToFragment ? page + ':' + scrollToFragment : page;
    history.replaceState(null, '', '#' + newHash);
  }

  // Nav click handlers
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage(el.dataset.page);
    });
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '\u2715' : '\u2630';
    });
  }

  // Handle hash navigation (supports page and page:fragment)
  function handleHash() {
    const raw = window.location.hash.slice(1) || 'index';
    const colonIdx = raw.indexOf(':');
    if (colonIdx > -1) {
      renderPage(raw.substring(0, colonIdx), raw.substring(colonIdx + 1));
    } else {
      renderPage(raw);
    }
  }
  window.addEventListener('hashchange', handleHash);
  handleHash();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
