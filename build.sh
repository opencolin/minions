#!/bin/bash
# Build index.html by inlining markdown content
cd "$(dirname "$0")"

cat > index.html << 'HTMLHEAD'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agentic Engineering - A Comprehensive Reference</title>
  <meta name="description" content="A comprehensive guide to autonomous coding agents, agentic organizations, and the emerging patterns of AI-native software engineering.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <a href="#main" class="skip-to-content">Skip to content</a>
  <header class="topbar">
    <button class="sidebar-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="sidebar">&#9776;</button>
    <a href="#" class="topbar-brand" data-page="index"><span>&gt;_</span> Agentic Engineering</a>
    <div class="topbar-search">
      <label class="search-field">
        <span class="search-icon" aria-hidden="true">&#128269;</span>
        <input type="search" id="search-input" placeholder="Search..." autocomplete="off" spellcheck="false" role="combobox" aria-controls="search-results" aria-expanded="false" aria-autocomplete="list" aria-label="Search the reference" />
        <kbd class="search-kbd">/</kbd>
      </label>
      <ul id="search-results" class="search-results" role="listbox" hidden></ul>
    </div>
  </header>

  <div class="layout">
    <aside id="sidebar" class="sidebar" aria-label="Navigation">
      <div class="sidebar-inner">
        <nav class="sidebar-nav" aria-label="Primary">
          <div class="sidebar-group">
            <div class="sidebar-group-title">Get Started</div>
            <a href="#" class="sidebar-link" data-page="index">Overview</a>
            <a href="#" class="sidebar-link" data-page="table-of-contents">Table of Contents</a>
          </div>
          <div class="sidebar-group">
            <div class="sidebar-group-title">Foundations</div>
            <a href="#" class="sidebar-link" data-page="approaches">Approaches</a>
            <a href="#" class="sidebar-link" data-page="patterns">Patterns</a>
            <a href="#" class="sidebar-link" data-page="harness-engineering">Harness Engineering</a>
            <a href="#" class="sidebar-link" data-page="benchmarks">Benchmarks</a>
          </div>
          <div class="sidebar-group">
            <div class="sidebar-group-title">People &amp; Orgs</div>
            <a href="#" class="sidebar-link" data-page="schools">Schools</a>
            <a href="#" class="sidebar-link" data-page="who-is-who">Who's Who</a>
            <a href="#" class="sidebar-link" data-page="organizations">Organizations</a>
          </div>
          <div class="sidebar-group">
            <div class="sidebar-group-title">Infrastructure</div>
            <a href="#" class="sidebar-link" data-page="inference">Inference</a>
            <a href="#" class="sidebar-link" data-page="sandboxes">Sandboxes</a>
            <a href="#" class="sidebar-link" data-page="infrastructure">Hosting</a>
          </div>
          <div class="sidebar-group">
            <div class="sidebar-group-title">Interfaces</div>
            <a href="#" class="sidebar-link" data-page="generative-ui">Generative UI</a>
          </div>
          <div class="sidebar-group">
            <div class="sidebar-group-title">Community</div>
            <a href="events/" class="sidebar-link sidebar-link-external">Events &#8599;</a>
            <a href="https://github.com/opencolin/agentic-engineering" class="sidebar-link sidebar-link-external" target="_blank" rel="noopener">GitHub &#8599;</a>
          </div>
        </nav>
      </div>
    </aside>

    <main id="main" class="content" tabindex="-1">
      <article id="content" class="markdown-body">
        <p class="loading">Loading...</p>
      </article>
      <footer class="content-footer">
        <p>Agentic Engineering Reference &mdash; Content stored as plain markdown for easy reading by humans and agents alike.</p>
      </footer>
    </main>

    <aside class="toc-rail" id="toc-rail" aria-label="On this page" hidden>
      <div class="toc-rail-title">On this page</div>
      <ul id="toc-rail-list"></ul>
    </aside>
  </div>

HTMLHEAD

# Inline each markdown file as a script tag
for page in index table-of-contents approaches patterns harness-engineering schools benchmarks organizations who-is-who inference sandboxes infrastructure generative-ui; do
  echo "  <script type=\"text/markdown\" data-page=\"${page}\">" >> index.html
  # Escape </script> in content just in case
  sed 's|</script>|<\\/script>|g' "content/${page}.md" >> index.html
  echo "  </script>" >> index.html
done

cat >> index.html << 'HTMLFOOT'

  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
HTMLFOOT

echo "Built index.html with inlined markdown"
