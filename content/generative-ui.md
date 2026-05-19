# Generative UI

Generative UI (GenUI) is UI that an AI system assembles or changes at runtime based on the user's intent, context, or task — rather than relying only on fixed screens authored in advance.

The key shift: from *"AI returns text inside a static app"* to *"AI helps decide the interface itself."* Google describes it as the model generating not just content but an entire user experience. Nielsen Norman Group frames it as real-time UI generation customized to the user's needs and context.

For builders, the safest mental model is: **keep the app's information architecture and constraints deterministic, but let the model select or compose bounded UI primitives inside that system.** Treat generative UI less like *"the model invents the whole frontend"* and more like *"the model orchestrates a library of trusted interactions."*

---

## Why it matters for agentic engineering

Coding agents and product agents share a problem: a chat box is a terrible interface for most tasks. The moment an agent produces a list, a chart, a form, a workspace, a diff, or a plan, that output wants to be UI — not prose.

Generative UI is the layer that turns agent intent into screens. It's the front-end counterpart to the [harness](harness-engineering.md): the harness makes the agent reliable; generative UI makes the result legible.

Three forces are pulling teams toward generative UI right now:

1. **Agents do work that doesn't fit prose.** Code reviews, financial dashboards, plan editing, scheduling, multi-step approvals — all of these collapse into noise if rendered as Markdown.
2. **Static IA can't keep up with task variance.** A "generic app shell" loses to a "task-shaped interface" once the task space gets large enough.
3. **Protocols are converging.** Until late 2026 every agent team rolled its own private UI protocol. Now Google's [A2UI](#a2ui-agent-to-user-interface), AG-UI, MCP-UI, and Open-JSON-UI are competing on the same surface area — declarative, schema-validated, transport-agnostic.

---

## The three primary patterns

Google Cloud's GenUI taxonomy is the cleanest framing. Every implementation in production today fits one of these three buckets.

| Pattern | What the agent returns | Developer control | Flexibility | Use cases |
|---|---|---|---|---|
| **Static / Tool-driven** | Tool call → predefined component | High | Low–medium | Branded product UI; recurring patterns; anything user-facing |
| **Declarative (A2UI-style)** | JSONL schema describing intent | Medium | Medium–high | Cross-platform agent UIs, design-system-bound layouts, multi-client rendering |
| **Open-ended** | Raw HTML/CSS/JS or full React | Low | Maximum | One-shot artifacts, exploratory prompts, throwaway widgets |

### 1. Static / Tool-driven

The model invokes a typed tool. The tool returns (or maps to) a developer-authored component. The component library is fixed; the model decides *when* and with *what data*.

This is what the [Vercel AI SDK](#vercel-ai-sdk) popularized with `streamUI`, and what [CopilotKit](#copilotkit) calls "Controlled" generative UI.

Implementation cost is low. The agent stays unaware of presentation — it just calls `showFlightResults(query)` and the component does the rest. Brand consistency, accessibility, and analytics are all preserved because every component is authored once.

The ceiling: the model can only show what you pre-built.

### 2. Declarative (A2UI / Open-JSON-UI / MCP-UI)

The model emits a structured description of UI — typically JSON or JSONL — and the client renders it using its own native widgets. The agent "speaks UI" without ever touching DOM or executing code.

This is the pattern Google's [A2UI](#a2ui-agent-to-user-interface) and OpenAI's [Open-JSON-UI](#open-json-ui) standardize. The agent output is *safe like data, but expressive like code* — the same agent can drive a React app, a Flutter app, an iOS app, or a CLI by changing only the renderer.

Implementation cost is medium: you maintain a renderer that maps schema to your design system. The win is that one agent now serves many surfaces, and the schema can evolve faster than the renderers.

### 3. Open-ended

The model generates raw code — HTML/CSS, JSX, or a full app. The frontend renders it directly, usually inside a sandboxed iframe.

Max flexibility, real risks: XSS, design-system drift, accessibility regressions, inconsistent behavior across runs. Even with sandboxing the cognitive cost is high — users can't form a stable mental model when the interface changes every prompt.

Best fit: one-off artifacts where reuse doesn't matter. *"Show me how electrons work."* *"Give me a weird bar chart of my last 10 queries."* You never wrote that component, and you'll never see it again. Anthropic's Claude artifacts and ChatGPT canvas live here. So does v0.

**Rule of thumb (from [CopilotKit](#copilotkit)):** for anything branded, recurring, or user-facing as part of your product, use Static or Declarative. Reserve Open-ended for novelty and exploration.

---

## Specifications and protocols

Late 2026 marked a wave of open protocols landing in this space. Most are complementary, not competing.

### A2UI (Agent-to-User Interface)

Google's open declarative protocol, launched as public preview in October 2026, [v0.9 in December 2026](https://www.copilotkit.ai/blog/a2ui-whats-new-in-google-generative-ui-spec). JSONL-based, streaming, platform-agnostic.

The agent emits a stream of declarative component descriptions. The client renders them using its native component library — Lit, Angular, Flutter, React (via [CopilotKit](#copilotkit)). Because A2UI ships data not code, it crosses trust boundaries safely. Remote subagents in an [A2A](#a2a-agent-to-agent-orchestration) topology can each contribute UI without the client trusting any of them with arbitrary code execution.

Status: public preview, v0.9 as of late 2026. Reference renderers exist for Lit, Angular, Flutter. React/CopilotKit integration is the most mature client. Source: [github.com/google/a2ui](https://github.com/google/a2ui).

Key v0.9 changes — agents no longer need structured-output mode; the schema lives in the system prompt, which means A2UI now works on any model that follows instructions well, not just ones with constrained-generation support.

### AG-UI

The streaming **transport** layer for agent ↔ frontend communication. AG-UI is to A2UI what HTTP is to HTML — A2UI describes *what* the UI is, AG-UI carries it.

AG-UI events cover `TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START/END`, `STATE_DELTA`, `STATE_SNAPSHOT`, `USER_INTERACTION`, and the `CUSTOM` event A2UI rides on top of. The protocol is framework-agnostic; CopilotKit is the most prominent client implementation.

Any agent already speaking AG-UI can drive A2UI v0.9 with no agent-side code changes. That's the headline interop story.

### MCP-UI

Microsoft + Shopify's iframe-based extension to [MCP](approaches.md#skills-plugins-marketplaces). Where MCP defines how an agent calls a tool, MCP-UI defines how the tool can return a sandboxed UI fragment alongside its data.

Iframe-based means open-ended (HTML/CSS/JS) — but inside the sandbox. The trust model is different from A2UI: MCP-UI lets you ship arbitrary code, A2UI doesn't.

### Open-JSON-UI

OpenAI's open standardization of its internal declarative GenUI schema. Same family as A2UI — declarative JSON, client renders natively. Less broadly adopted than A2UI as of late 2026 but it's the spec ChatGPT's tool-bound UI components run on.

### Cross-spec summary

| Spec | Origin | Transport | Schema | Trust boundary |
|---|---|---|---|---|
| **A2UI** | Google | AG-UI (or any) | JSONL declarative | Safe-by-default — no code crosses |
| **Open-JSON-UI** | OpenAI | OpenAI Responses API | JSON declarative | Safe-by-default |
| **MCP-UI** | Microsoft + Shopify | MCP transport | HTML in iframe | Sandboxed iframe |
| **AG-UI** | CopilotKit + community | SSE / WebSocket | Carries any of the above | Transport-level |

---

## Frameworks

### CopilotKit

The clearest production framework for generative UI today, and the one to learn first.

CopilotKit is a React-first runtime for agent UIs. It implements AG-UI natively, ships A2UI v0.9 support as a design partner on the spec, and provides hooks (`useAgent`, `useCoAgent`) that bind agent state, tool calls, and UI components into one reactive surface.

Why it's the reference example:

- **Spec design partner.** Google credits CopilotKit on A2UI v0.9; CopilotKit shipped same-day support and the `A2UI Composer` tooling. New starter: `npx copilotkit@latest create my-app --framework a2ui`.
- **Covers all three patterns.** CopilotKit calls them *Controlled* (static), *Declarative* (A2UI), and *Open-ended* (generative React). One framework, three knobs, same hook surface.
- **Backend-agnostic.** Documented integrations for LangChain, Mastra, Pydantic, ADK, Strands, AG2, Microsoft Agent Framework, and any agent speaking AG-UI. The frontend doesn't care how the agent is built.
- **Human-in-the-loop primitives.** Approvals, interruptions, shared state — these are first-class events in AG-UI, which means CopilotKit components get them for free.
- **AG-UI Dojo.** A live sample-app catalog covering streaming chat, frontend tools, backend tools, generative UI, shared state, HITL. The fastest way to see what's possible.

The architectural punchline: CopilotKit treats the chat surface and the application surface as one reactive shared-state system. The agent doesn't *send* the UI — agent state changes, and the UI re-renders. This is what [Lee Robinson](who-is-who.md#lee-robinson) and the Vercel AI SDK team were getting at with `streamUI`, generalized to any backend and any transport.

### Vercel AI SDK

Vercel's `streamUI` (AI SDK 3.0+) is the canonical *Static / tool-driven* implementation in React. The model invokes a typed tool, the tool returns a React Server Component, the RSC streams to the client.

It popularized generative UI as a developer-accessible pattern. RSC-based architecture meant the components shipped as authored — design system intact, accessibility intact, no DOM-level prompt injection risks.

Vercel paused active development of AI SDK RSC in 2026 in favor of the broader AI SDK UI primitives. But the ergonomics it established — *the model picks the component, you authored it* — became the default mental model the rest of the ecosystem built on.

### Mastra + CopilotKit

Mastra is a TypeScript agent framework with first-class CopilotKit integration. The combination shows up frequently in production: Mastra owns orchestration, memory, tools; CopilotKit owns the frontend reactive layer. `useAgent` in the UI, `Agent` in the backend, AG-UI between.

### Anthropic Artifacts + ChatGPT Canvas

Both are *Open-ended* implementations from the model labs. Useful as references for what the open-ended pattern looks like at scale — but neither is a framework you adopt. They define UX patterns more than they define infrastructure.

### Geldata, ColpilotKit Composer, A2UI Composer

A growing set of GenUI authoring tools — visual editors that let you define declarative schemas, preview renders, and export bindings. Early but the direction is clear: most teams won't hand-author A2UI; they'll generate it from a composer.

---

## Code examples

### Static / tool-driven (Vercel AI SDK)

The agent calls a typed tool; the tool returns a React component. The model never sees DOM.

```tsx
// app/actions.tsx
import { streamUI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function submit(message: string) {
  const result = await streamUI({
    model: openai('gpt-4o'),
    prompt: message,
    text: ({ content }) => <p>{content}</p>,
    tools: {
      showFlight: {
        description: 'Render a flight result card',
        parameters: z.object({
          airline: z.string(),
          price: z.number(),
          departure: z.string(),
        }),
        generate: async ({ airline, price, departure }) => {
          return <FlightCard airline={airline} price={price} departure={departure} />;
        },
      },
    },
  });
  return result.value;
}
```

The agent emits a `showFlight` tool call. Your authored `<FlightCard>` renders. Brand, accessibility, design-system tokens — all intact.

### Declarative (A2UI v0.9 via CopilotKit)

The agent emits JSONL describing a UI. The client renders using its native React component library.

```typescript
// Agent side — emits A2UI JSONL on stdout
const aSchemaResponse = {
  "kind": "a2ui.surface",
  "version": "0.9",
  "root": {
    "type": "Stack",
    "direction": "vertical",
    "spacing": "md",
    "children": [
      { "type": "Heading", "level": 2, "text": "Expense breakdown" },
      {
        "type": "PieChart",
        "data": [
          { "label": "Food", "value": 400 },
          { "label": "Transport", "value": 200 },
          { "label": "Housing", "value": 800 }
        ]
      },
      {
        "type": "Button",
        "variant": "primary",
        "text": "Categorize transactions",
        "onPress": { "type": "agent.invoke", "tool": "categorize" }
      }
    ]
  }
};
```

```tsx
// Frontend (CopilotKit) — A2UI renderer maps to your components
import { CopilotKit, A2UIRenderer } from '@copilotkit/react-core/v2';

function App() {
  return (
    <CopilotKit framework="a2ui" runtimeUrl="/api/copilotkit">
      <A2UIRenderer
        components={{
          Stack: MyStack,
          Heading: MyHeading,
          PieChart: MyPieChart,
          Button: MyButton,
        }}
      />
    </CopilotKit>
  );
}
```

The agent has zero React knowledge. The frontend has zero agent knowledge. Both speak A2UI.

### Open-ended (artifact-style)

```typescript
// Agent emits raw HTML; client sandbox-renders inside an iframe
const artifact = {
  "kind": "open.artifact",
  "mime": "text/html",
  "body": "<canvas id='c'></canvas><script>const c=document.getElementById('c')…</script>"
};
```

Use case: a one-off creative artifact. Not a strategy for product UI.

---

## Trade-offs: consistency vs. flexibility

The central tension is between *interface consistency* (good for learnability, predictability, shared workflows) and *task fit* (good for getting one thing done well).

| Concern | Static | Declarative | Open-ended |
|---|---|---|---|
| Brand consistency | ✅ Always on-brand | ✅ Renderer enforces | ⚠️ Drifts every prompt |
| Accessibility (WCAG) | ✅ Authored once | ✅ If renderer is accessible | ❌ Per-render gamble |
| Learnability | ✅ Stable patterns | ✅ Stable patterns | ❌ Always novel |
| Security (XSS, injection) | ✅ No untrusted code | ✅ Data, not code | ⚠️ Sandbox required |
| Task fit / novelty | ⚠️ Capped by component library | ✅ Schema can express new layouts | ✅ Anything |
| Multi-platform | ⚠️ Per-platform authoring | ✅ One schema, many renderers | ❌ Web-only effectively |
| Implementation cost | Low | Medium | Low (high ops cost) |
| Best for | Branded product UI | Cross-platform agent UI | Throwaway artifacts |

The Nielsen Norman tradeoff is real: maximally flexible UI is maximally illegible. The mainstream design pattern in enterprise applications is converging on *Declarative inside a bounded design system* — agent-driven layouts, but composed from components the design team owns.

---

## Decision framework

A simple flowchart that mirrors how CopilotKit recommends choosing:

```
Is this UI part of your product (branded, recurring, user-facing)?
├── No → Open-ended (artifact, scratch widget)
└── Yes
    └── Does the same agent need to render on multiple platforms (web + mobile + …)?
        ├── No → Static / tool-driven (Vercel AI SDK pattern, easiest path)
        └── Yes → Declarative (A2UI / Open-JSON-UI, one schema many renderers)
```

A second axis: *who owns the components?*

- If your design team owns a fixed library and the agent should never invent components → **Static.**
- If your design team owns a primitive set but the agent should compose new layouts from them → **Declarative.**
- If the goal is creative exploration, not product surfaces → **Open-ended.**

---

## Where Generative UI fits in the bigger picture

Generative UI sits at the intersection of three strands of agentic engineering this reference covers:

- **[Patterns § Context Management](patterns.md#3-context-management)** — A2UI/AG-UI state events are how an agent's working memory becomes visible to the user. The frontend isn't just a display; it's the most legible window into what the agent thinks it's doing.
- **[Harness Engineering § Feedback](harness-engineering.md#feedback-the-fifth-subsystem)** — generative UI is the highest-bandwidth feedback channel available. A chart of test pass-rates beats a paragraph of prose. The harness gets better when its outputs are renderable.
- **[Approaches § Skills, Plugins & Marketplaces](approaches.md#skills-plugins-marketplaces)** — the same ecosystem dynamics that produced MCP for tools are producing A2UI/MCP-UI for interfaces. Skills + MCP + A2UI = composable agent-with-UI as a distributable artifact.

A reasonable prediction: by end of 2027, *"my agent has a UI"* will be table stakes the way *"my agent has tools"* was table stakes in 2025. The frameworks that win will be the ones that make the chat-vs-app boundary disappear.

---

## A2UI adoption snapshot (late 2026)

| Dimension | Status |
|---|---|
| Spec maturity | v0.9 public preview (Dec 2026); breaking changes likely before 1.0 |
| Reference renderers | Lit (Google), Angular (Google), Flutter (Google), React via [CopilotKit](#copilotkit) |
| Production adopters | CopilotKit (design partner), early Google internal products, Mastra integration |
| Toolchain | A2UI Composer (visual authoring), Dojo sample app, AG-UI Dojo |
| Industries leaning in | Enterprise SaaS (dashboards, approvals), developer tools, multi-platform consumer apps |
| Industries still on static | Highly regulated UX (finance compliance dashboards, healthcare records) where audit-friendly fixed screens matter more than task fit |

Widgets common in early adoption: forms, charts (pie, bar, line), data tables, approval/review cards, calculators, comparison views. Things rare in early adoption: navigation primitives (sidebars, command palettes — too cross-cutting), pure marketing surfaces, anything that needs subpixel design control.

---

## Further reading

- [Introducing A2UI: An open project for agent-driven interfaces](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/) — Google's launch post.
- [A2UI v0.9: What's New](https://www.copilotkit.ai/blog/a2ui-whats-new-in-google-generative-ui-spec) — CopilotKit's design-partner notes on v0.9 changes.
- [Generative UI Spectrum: How Agents Now Ship Their Own Interfaces](https://www.copilotkit.ai/blog/generative-ui-explained-how-agents-now-ship-their-own-interfaces) — the Controlled / Declarative / Open-ended framing.
- [What is Generative UI?](https://cloud.google.com/discover/generative-ui) — Google Cloud's overview and three-pattern taxonomy.
- [google/A2UI](https://github.com/google/a2ui) — spec, renderers, examples.
- [AG-UI: Generative UI Specs](https://docs.ag-ui.com/concepts/generative-ui-specs) — the transport-level view.
- [CopilotKit AG-UI Dojo](https://docs.copilotkit.ai/learn/ag-ui-protocol) — live samples across all three patterns.
- [Introducing AI SDK 3.0 with Generative UI support](https://vercel.com/blog/ai-sdk-3-generative-ui) — Vercel's foundational essay.
- [Nielsen Norman Group: Generative UI](https://www.nngroup.com/articles/generative-ui/) — the UX-research perspective on consistency tradeoffs.

---

### See also

- [Approaches](approaches.md) — concrete agent systems
- [Harness Engineering](harness-engineering.md) — what makes agents reliable enough to drive UI
- [Patterns § Feedback Loops](patterns.md#4-feedback-loops) — generative UI is the highest-bandwidth feedback channel
- [Schools](schools.md) — *Trust as Process* (Ng) is the school most aligned with declarative GenUI
- [Who's Who § Lee Robinson](who-is-who.md#lee-robinson) — popularized Vercel's `streamUI` pattern
