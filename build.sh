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
  <nav>
    <div class="container">
      <a href="#" class="nav-brand" data-page="index"><span>&gt;_</span> Agentic Engineering</a>
      <ul class="nav-links">
        <li><a href="#" data-page="index">Home</a></li>
        <li><a href="#" data-page="approaches">Approaches</a></li>
        <li><a href="#" data-page="patterns">Patterns</a></li>
        <li><a href="#" data-page="comparison">Compare</a></li>
        <li><a href="#" data-page="organizations">Organizations</a></li>
        <li><a href="#" data-page="infrastructure">Infrastructure</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle menu">&#9776;</button>
    </div>
  </nav>

  <main>
    <div class="container">
      <article id="content" class="markdown-body">
        <p class="loading">Loading...</p>
      </article>
    </div>
  </main>

  <footer>
    <div class="container">
      <p>Agentic Engineering Reference — Content stored as plain markdown for easy reading by humans and agents alike.</p>
    </div>
  </footer>

HTMLHEAD

# Inline each markdown file as a script tag
for page in index approaches patterns comparison organizations infrastructure; do
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
