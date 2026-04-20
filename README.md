# Agentic Engineering

A comprehensive reference to autonomous coding agents, agentic organizations, and the emerging patterns of AI-native software engineering. Covers 15+ agent systems (Stripe Minions, Claude Managed Agents, Vercel Open Agents, OpenAI Symphony, OpenHands, AgentField, Devin, and more), 180+ infrastructure vendors, and the architectural patterns driving the category.

The repository hosts **two independent sites** that render the same underlying content:

1. **Reference front end** — Plain HTML/CSS/JS at the repo root with a left sidebar nav and client-side search. Deploys to Vercel.
2. **Documentation portal** — [Astro Starlight](https://starlight.astro.build) site in `/docs`. Deploys to any static host (Cloudflare Pages, Vercel, Netlify).

They can ship together or separately. Pick the one that fits your needs.

---

## Reference front end (root)

Plain HTML/CSS/JS, no build framework. Markdown content lives in `content/*.md` and is inlined into `index.html` at build time. The UI ships with:

- Left sidebar navigation (Get Started / Landscape / Infrastructure / Project groups)
- Top-bar search across all pages (press `/` to focus)
- SPA-style client-side routing with deep-link support (`#page`, `#page:section`)

### Structure

```
.
├── index.html          # Generated — don't edit directly
├── build.sh            # Inlines content/*.md into index.html
├── content/            # Edit markdown here
│   ├── index.md
│   ├── approaches.md
│   ├── patterns.md
│   ├── comparison.md
│   ├── organizations.md
│   ├── inference.md
│   ├── sandboxes.md
│   └── infrastructure.md
├── css/style.css
└── js/main.js
```

### Develop

```bash
npm run build                  # Rebuild index.html after editing content/
python3 -m http.server 3000    # Or any static server
```

### Deploy

Connected to Vercel. Pushes to `main` trigger automatic deploys.

```bash
vercel deploy --prod
```

Live: https://agentic-engineering.vercel.app (project alias — the legacy `minions-alpha.vercel.app` URL continues to resolve)

---

## Documentation portal (`docs/`)

Astro Starlight MDX-based docs with full-text Pagefind search, left sidebar, dark mode, and edit-on-GitHub links.

### Structure

```
docs/
├── astro.config.mjs            # Astro + Starlight config (nav, theme, logo)
├── package.json                # Astro/Starlight deps
├── tsconfig.json
├── public/
│   └── favicon.svg
└── src/
    ├── assets/
    │   ├── light.svg
    │   └── dark.svg
    ├── content.config.ts       # Starlight collections
    ├── styles/theme.css        # Color/layout overrides
    └── content/
        └── docs/
            ├── index.mdx
            ├── approaches.mdx
            ├── patterns.mdx
            ├── comparison.mdx
            ├── organizations.mdx
            ├── inference.mdx
            ├── sandboxes.mdx
            └── infrastructure.mdx
```

### Develop

Needs Node 22 or later (tested on v22.22.2).

```bash
cd docs
npm install
npm run dev          # Local preview on localhost:4321
npm run build        # Static site in docs/dist
npm run preview      # Preview the built site
```

### Deploy

Any static host works:

- **Cloudflare Pages** — connect the repo, set build command to `cd docs && npm install && npm run build`, output dir to `docs/dist`
- **Vercel** — create a second project, root dir `docs/`, framework Astro
- **Netlify** — similar to Vercel, base dir `docs/`, publish dir `docs/dist`

---

## Editing content

If you want both sites updated, edit the markdown in `content/` and mirror the change in the matching `docs/src/content/docs/*.mdx` file (or vice versa). The content is intentionally duplicated so each site can evolve with its own formatting conventions — `content/*.md` uses plain markdown, `docs/*.mdx` uses Starlight components (`<Card>`, `<CardGrid>`, `<LinkCard>`, asides like `:::note`) for richer presentation.

Future work: a shared content source with per-target transformations.

## License

MIT
