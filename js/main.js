// Markdown rendering, sidebar navigation, and search
function init() {
  if (typeof marked === 'undefined') {
    setTimeout(init, 50);
    return;
  }

  // Generate heading IDs from text and render inline markdown (links, bold, etc.)
  const renderer = new marked.Renderer();
  renderer.heading = function (arg) {
    const depth = arg.depth;
    let innerHTML;
    let plainText;
    if (arg.tokens && this.parser && typeof this.parser.parseInline === 'function') {
      innerHTML = this.parser.parseInline(arg.tokens);
      plainText = innerHTML.replace(/<[^>]+>/g, '');
    } else {
      const raw = typeof arg.text === 'string' ? arg.text : (arg.text && (arg.text.text || arg.text.raw)) || String(arg.text);
      innerHTML = raw;
      plainText = raw;
    }
    const slug = plainText.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return `<h${depth} id="${slug}">${innerHTML}</h${depth}>`;
  };
  marked.setOptions({ renderer });

  const contentEl = document.getElementById('content');
  const pages = {};
  const pageTitles = {
    index: 'Overview',
    approaches: 'Approaches',
    patterns: 'Patterns',
    benchmarks: 'Benchmarks',
    comparison: 'Comparison',
    organizations: 'Organizations',
    inference: 'Inference',
    sandboxes: 'Sandboxes',
    infrastructure: 'Hosting & Execution',
  };

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

      // Update active sidebar link
      document.querySelectorAll('.sidebar-link').forEach(a => {
        a.classList.toggle('active', a.dataset.page === page);
      });

      // Close mobile sidebar after navigating
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.classList.remove('open');

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

    if (scrollToFragment) {
      const scrollTo = () => {
        const target = document.getElementById(scrollToFragment);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      };
      needsRender ? setTimeout(scrollTo, 50) : scrollTo();
    } else if (needsRender) {
      window.scrollTo(0, 0);
    }

    const newHash = page === 'index' && !scrollToFragment ? '' :
      scrollToFragment ? page + ':' + scrollToFragment : page;
    history.replaceState(null, '', '#' + newHash);
  }

  // Page click handlers (sidebar + brand)
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage(el.dataset.page);
    });
  });

  // Sidebar toggle (mobile)
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // Hash navigation
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

  // === Search ===
  // Build a lightweight in-memory index over all pages.
  // Each entry: { page, title, heading, headingSlug, anchor, text }
  const index = buildSearchIndex(pages, pageTitles);

  const searchInput = document.getElementById('search-input');
  const resultsList = document.getElementById('search-results');

  function hideResults() {
    if (!resultsList) return;
    resultsList.hidden = true;
    resultsList.innerHTML = '';
  }

  function render(results, query) {
    if (!resultsList) return;
    resultsList.innerHTML = '';
    if (!results.length) {
      const li = document.createElement('li');
      li.className = 'search-empty';
      li.textContent = `No matches for "${query}"`;
      resultsList.appendChild(li);
    } else {
      results.forEach((r, i) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = r.anchor;
        if (i === 0) a.classList.add('is-active');
        const page = document.createElement('span');
        page.className = 'search-result-page';
        page.textContent = pageTitles[r.page] || r.page;
        const title = document.createElement('span');
        title.textContent = r.heading || r.title;
        const ctx = document.createElement('div');
        ctx.className = 'search-result-context';
        ctx.textContent = r.snippet;
        a.appendChild(page);
        a.appendChild(title);
        a.appendChild(ctx);
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const [hashPage, hashFrag] = r.anchor.slice(1).split(':');
          renderPage(hashPage, hashFrag);
          hideResults();
          if (searchInput) searchInput.value = '';
        });
        li.appendChild(a);
        resultsList.appendChild(li);
      });
    }
    resultsList.hidden = false;
  }

  if (searchInput && resultsList) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim();
      if (!q) { hideResults(); return; }
      const results = searchIndex(index, q, 12);
      render(results, q);
    });
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim()) searchInput.dispatchEvent(new Event('input'));
    });
    // Press "/" anywhere to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.blur();
        hideResults();
      }
    });
    // Hide when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.topbar-search')) hideResults();
    });
  }
}

// === Search index helpers ===
function buildSearchIndex(pages, titles) {
  const entries = [];
  for (const [page, md] of Object.entries(pages)) {
    const sections = splitIntoSections(md);
    sections.forEach(sec => {
      entries.push({
        page,
        title: titles[page] || page,
        heading: sec.heading,
        headingSlug: sec.slug,
        anchor: buildAnchor(page, sec.slug),
        text: sec.text,
      });
    });
  }
  return entries;
}

function splitIntoSections(md) {
  // Split into (heading, body) pairs. Treat the very top as heading "" (page intro).
  const lines = md.split('\n');
  const sections = [];
  let current = { heading: '', slug: '', text: '' };
  for (const line of lines) {
    const m = line.match(/^(#{1,4})\s+(.+?)\s*$/);
    if (m) {
      if (current.text.trim() || current.heading) sections.push(current);
      const heading = m[2].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // strip md link syntax
      const slug = heading.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      current = { heading, slug, text: '' };
    } else {
      current.text += line + ' ';
    }
  }
  if (current.text.trim() || current.heading) sections.push(current);
  return sections;
}

function buildAnchor(page, slug) {
  if (!slug) return page === 'index' ? '#' : '#' + page;
  return '#' + page + ':' + slug;
}

function searchIndex(index, query, limit) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const scored = [];
  for (const entry of index) {
    const title = (entry.title || '').toLowerCase();
    const heading = (entry.heading || '').toLowerCase();
    const text = (entry.text || '').toLowerCase();
    let score = 0;
    let matchedAll = true;
    for (const t of terms) {
      const inTitle = title.includes(t);
      const inHeading = heading.includes(t);
      const inText = text.includes(t);
      if (!inTitle && !inHeading && !inText) { matchedAll = false; break; }
      if (inHeading) score += 10;
      if (inTitle) score += 3;
      if (inText) score += 1;
    }
    if (!matchedAll) continue;
    // Build a snippet around the first term match
    const snippet = makeSnippet(entry.text, terms[0]);
    scored.push({ ...entry, score, snippet });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

function makeSnippet(text, term) {
  if (!text) return '';
  const lower = text.toLowerCase();
  const idx = lower.indexOf(term.toLowerCase());
  const start = Math.max(0, idx - 60);
  const end = Math.min(text.length, (idx >= 0 ? idx : 0) + 140);
  let snippet = text.substring(start, end).trim();
  if (start > 0) snippet = '…' + snippet;
  if (end < text.length) snippet = snippet + '…';
  return snippet.replace(/\s+/g, ' ');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
