# Table of Contents

A full sitemap of this reference. Use this page when you know roughly what you want but don't remember which chapter it lives in.

For a chapter-level summary, see the [Overview](index.md). For a one-week onboarding path, see [Who's Who § Reading order](who-is-who.md#reading-order-if-youre-new).

---

## 1. [Approaches](approaches.md)

Per-system deep dives across 25+ agentic engineering products.

### Agent systems

- [Stripe Minions](approaches.md#stripe-minions)
- [AgentField](approaches.md#agentfield)
- [OpenHands](approaches.md#openhands)
- [Open SWE](approaches.md#open-swe-langchain)
- [OhMyOpenAgent](approaches.md#ohmyopenagent)
- [OpenCode](approaches.md#opencode)
- [SWE-agent](approaches.md#swe-agent)
- [Composio Agent Orchestrator](approaches.md#composio-agent-orchestrator)
- [Patchwork](approaches.md#patchwork)
- [Goose](approaches.md#goose)
- [Mastra](approaches.md#mastra)
- [OpenClaw](approaches.md#openclaw) + [The OpenClaw Ecosystem](approaches.md#the-openclaw-ecosystem) + [The Steinberger School](approaches.md#the-steinberger-school)
- [Hermes Agent](approaches.md#hermes-agent) — deep dive
- [Claude Managed Agents](approaches.md#claude-managed-agents)
- [Vercel Open Agents](approaches.md#vercel-open-agents)
- [OpenAI Symphony](approaches.md#openai-symphony)
- [Rivet Sandbox Agent](approaches.md#rivet-sandbox-agent)
- [DeerFlow](approaches.md#deerflow)
- [GStack](approaches.md#gstack)
- [GBrain](approaches.md#gbrain)
- [Superpowers](approaches.md#superpowers)
- [Everything Claude Code](approaches.md#everything-claude-code)
- [AgentHub](approaches.md#agenthub)
- [Crabbox](approaches.md#crabbox)
- [Clawpatch](approaches.md#clawpatch)
- [ClawSweeper](approaches.md#clawsweeper)

### Cross-cutting sections inside Approaches

- [Skills, Plugins & Marketplaces](approaches.md#skills-plugins--marketplaces)
- [Browser-Use & Computer-Use Frameworks](approaches.md#browser-use--computer-use-frameworks)
- [Terminal coding CLIs](approaches.md#terminal-coding-clis) — the 28-CLI comparison table

---

## 2. [Patterns](patterns.md)

Cross-cutting architectural patterns.

- [Harness Engineering](patterns.md#harness-engineering) — the umbrella discipline (see also the [Harness Engineering deep dive](harness-engineering.md))
- [1. Isolation Strategies](patterns.md#1-isolation-strategies)
- [2. Orchestration Models](patterns.md#2-orchestration-models)
- [3. Context Management](patterns.md#3-context-management)
- [4. Feedback Loops](patterns.md#4-feedback-loops)
- [5. Failure Recovery](patterns.md#5-failure-recovery)
- [6. Multi-Agent Coordination](patterns.md#6-multi-agent-coordination)

---

## 3. [Harness Engineering](harness-engineering.md)

The deep dive on what makes agents reliable.

- [Why Harness Beats Model Upgrade](harness-engineering.md#why-harness-beats-model-upgrade)
- [The Five-Subsystem Model](harness-engineering.md#the-five-subsystem-model)
- [Foundations](harness-engineering.md#foundations) — repo-as-system-of-record · progressive disclosure · initialization · continuity
- [Scope and Verification](harness-engineering.md#scope-and-verification) — WIP=1 · feature lists · three-layer termination · worker-vs-checker
- [Observability Inside the Harness](harness-engineering.md#observability-inside-the-harness) — sprint contracts · evaluator rubrics · OpenTelemetry
- [The Session Lifecycle and Clean State](harness-engineering.md#the-session-lifecycle-and-clean-state)
- [The Reference Stack](harness-engineering.md#the-reference-stack)
- [Failure-Mode Catalogue](harness-engineering.md#failure-mode-catalogue)
- [Decision Framework](harness-engineering.md#decision-framework)

---

## 4. [Schools](schools.md)

Where does trust live? Three philosophical schools + four operational schools.

- [The Central Question](schools.md#the-central-question-where-does-trust-live)
- Philosophical schools:
  - [Trust as Cryptography — Polosukhin](schools.md#trust-as-cryptography--polosukhin)
  - [Trust as Observability — Chase](schools.md#trust-as-observability--chase)
  - [Trust as Process — Ng](schools.md#trust-as-process--ng)
- [Side-by-Side Comparison](schools.md#side-by-side-comparison)
- Operational schools:
  - [The Stripe School](schools.md#the-stripe-school)
  - [The Tan School](schools.md#the-tan-school)
  - [The Walking Labs / Mastery School](schools.md#the-walking-labs--mastery-school)
  - [The Steinberger School](schools.md#the-steinberger-school)
- [Cross-Map: Operational × Philosophical](schools.md#cross-map-operational--philosophical)
- [What the Next 24 Months Look Like](schools.md#what-the-next-24-months-look-like)

---

## 5. [Benchmarks](benchmarks.md)

How agentic coding is evaluated.

- [SWE-bench](benchmarks.md#swe-bench) and [variants](benchmarks.md#variants) — Verified, Lite, Multimodal, Multilingual, Pro
- [Terminal Bench](benchmarks.md#terminal-bench)
- [Choosing a benchmark](benchmarks.md#choosing-a-benchmark)
- [Benchmark-adjacent reading](benchmarks.md#benchmark-adjacent-reading)

---

## 6. [Comparison](comparison.md)

Side-by-side capability rankings.

- [Feature Matrix](comparison.md#feature-matrix)
- [Capability Breakdown](comparison.md#capability-breakdown)
- [Composability](comparison.md#composability)

---

## 7. [Organizations](organizations.md)

How companies organize around agents.

- [The Stripe Model](organizations.md#the-stripe-model)
- [The Open-Source / Startup Model](organizations.md#the-open-source--startup-model)
- [Organizational Patterns](organizations.md#organizational-patterns)
- [The Infrastructure You Need](organizations.md#the-infrastructure-you-need)
- [The Future](organizations.md#the-future)

---

## 8. [Who's Who](who-is-who.md)

20 named profiles of the people shaping the field.

- 🧠 Researchers / educators: [Karpathy](who-is-who.md#andrej-karpathy) · [Weng](who-is-who.md#lilian-weng) · [Yao](who-is-who.md#shunyu-yao) · [Brown](who-is-who.md#noam-brown) · [Yang](who-is-who.md#john-yang) · [Kiela](who-is-who.md#douwe-kiela) · [Teknium](who-is-who.md#teknium-karan-malhotra) · [Polosukhin](who-is-who.md#illia-polosukhin)
- 🔨 Operators / founders: [Steinberger](who-is-who.md#peter-steinberger-steipete) · [Tan](who-is-who.md#garry-tan) · [Cherny](who-is-who.md#boris-cherny) · [Chase](who-is-who.md#harrison-chase) · [Vincent](who-is-who.md#jesse-vincent-obra) · [Robinson](who-is-who.md#lee-robinson) · [Liu (Beyang)](who-is-who.md#beyang-liu) · [Liu (Jerry)](who-is-who.md#jerry-liu)
- ✍️ Chroniclers / synthesizers: [Willison](who-is-who.md#simon-willison) · [Osmani](who-is-who.md#addy-osmani) · [Mollick](who-is-who.md#ethan-mollick) · [swyx + Fanelli](who-is-who.md#swyx-shawn-wang--alessio-fanelli)
- [Appendix](who-is-who.md#appendix-people-projects-and-writers-we-considered-but-didnt-profile) — 12 more candidates
- [Reading order if you're new](who-is-who.md#reading-order-if-youre-new) — one-week onboarding path

---

## 9. [Inference](inference.md)

LLM inference solutions.

- [Direct API Providers](inference.md#direct-api-providers)
- [Inference Platforms](inference.md#inference-platforms)
- [Nebius AI Cloud](inference.md#nebius-ai-cloud--standout-platform) — deep dive
- [Routing & Gateway Solutions](inference.md#routing--gateway-solutions)
- [Self-Hosted Inference](inference.md#self-hosted-inference)
- [Inference Strategy for Agents](inference.md#inference-strategy-for-agents)
- [Decision Framework](inference.md#decision-framework)

---

## 10. [Sandboxes](sandboxes.md)

The execution-environment layer.

- [Why Sandboxes Matter for Agents](sandboxes.md#why-sandboxes-matter-for-agents)
- [The Sandbox Market Structure](sandboxes.md#the-sandbox-market-structure) — four-layer model
- [Core Use Cases](sandboxes.md#core-use-cases)
- [Isolation Tiers](sandboxes.md#isolation-tiers--the-security-ladder)
- [Purpose-Built Agent Sandboxes](sandboxes.md#purpose-built-agent-sandboxes) — full vendor table
- [Contree — The Git-Native Sandbox](sandboxes.md#contree--the-git-native-sandbox) — deep dive
- [Cloud Development Environments (CDEs)](sandboxes.md#cloud-development-environments-cdes)
- [Open-Source Isolation Primitives](sandboxes.md#open-source-isolation-primitives)
- [Agent Patterns Enabled by Modern Sandboxes](sandboxes.md#agent-patterns-enabled-by-modern-sandboxes)
- [Decision Framework](sandboxes.md#decision-framework)
- [Integration Examples](sandboxes.md#integration-examples)

---

## 11. [Hosting & Execution Infrastructure](infrastructure.md)

150+ vendors across 9 major categories.

- [Agent Hosting & Execution Platforms](infrastructure.md#agent-hosting--execution-platforms) — the six-tier decision framework
- [Code Execution Sandboxes](infrastructure.md#code-execution-sandboxes) — quick-ref table
- [Turnkey Managed Platforms](infrastructure.md#turnkey-managed-platforms) — OpenClaw-native, enterprise hubs, no-code builders, [Autonomous Coding Agents](infrastructure.md#autonomous-coding-agents), visual IDEs
- [Agent-Optimized Hosting](infrastructure.md#agent-optimized-hosting)
- [Agent Orchestration](infrastructure.md#agent-orchestration) — durable execution, cloud workflows, [agent-specific frameworks](infrastructure.md#agent-specific-orchestration-frameworks), data/ML orchestrators
- [Cloud Mac Hosting](infrastructure.md#cloud-mac-hosting)
- [Self-Hosted Infrastructure](infrastructure.md#self-hosted-infrastructure) — GPU clouds, general clouds, [VPS for agents](infrastructure.md#vps-for-agents)
- [Agent Memory & Context Infrastructure](infrastructure.md#agent-memory--context-infrastructure) — [purpose-built memory](infrastructure.md#purpose-built-agent-memory), vector DBs, graph DBs
- [Agent Observability & Evaluation](infrastructure.md#agent-observability--evaluation) — [tracing](infrastructure.md#llm--agent-tracing--observability), [evaluation](infrastructure.md#evaluation--testing), [guardrails](infrastructure.md#guardrails--safety)
- [MCP Servers, Registries & Gateways](infrastructure.md#mcp-servers-registries--gateways)
- [Agent Identity, Auth & Secrets](infrastructure.md#agent-identity-auth--secrets)
- [Choosing Your Stack](infrastructure.md#choosing-your-stack) — starter / growth / scale / enterprise
- [Decision Framework](infrastructure.md#decision-framework)

---

## Cross-page indexes

- **Schools framing**: introduced in [Approaches § The Steinberger School](approaches.md#the-steinberger-school), formalized in [Schools](schools.md), referenced from [Who's Who](who-is-who.md) profiles
- **Vendor cross-reference**: many vendors appear in both [Sandboxes](sandboxes.md) and [Hosting & Execution](infrastructure.md) — the Sandboxes page is the deep dive, Hosting & Execution is the quick reference
- **Reading order for newcomers**: [Who's Who § Reading order](who-is-who.md#reading-order-if-youre-new)
