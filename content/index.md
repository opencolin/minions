# Agentic Engineering

A comprehensive reference to autonomous coding agents, agentic organizations, and the emerging patterns of AI-native software engineering.

---

## Chapters

| # | Chapter | What's in it |
|---|---------|--------------|
| 1 | [Approaches](approaches.md) | Deep dives on 25+ coding-agent systems — Stripe Minions, Claude Managed Agents, Vercel Open Agents, OpenAI Symphony, OpenHands, Hermes Agent, GStack, GBrain, AgentHub, the Steinberger ecosystem, and the 25-CLI harness comparison |
| 2 | [Patterns](patterns.md) | Cross-cutting architectural patterns — harness engineering, isolation strategies, orchestration models, context management, feedback loops, failure recovery, multi-agent coordination |
| 3 | [Harness Engineering](harness-engineering.md) | The deep-dive page on what makes agents reliable — five-subsystem model, repo-as-system-of-record, WIP=1, three-layer verification, sprint contracts, clean-state exits |
| 4 | [Schools](schools.md) | Where does trust live? The three philosophical schools (Polosukhin / Chase / Ng) and the four operational schools (Stripe / Tan / Walking Labs / Steinberger) |
| 5 | [Benchmarks](benchmarks.md) | SWE-bench, SWE-bench Verified / Pro / Multimodal / Multilingual, Terminal Bench 2.0; how to read the leaderboards and what they actually mean |
| 6 | [Comparison](comparison.md) | Side-by-side feature matrix and capability rankings across the major systems |
| 7 | [Organizations](organizations.md) | How companies organize around agents — Stripe model, open-source model, agent-first development, infrastructure tiers |
| 8 | [Who's Who](who-is-who.md) | Twenty named profiles of the people shaping the field — researchers, operators, chroniclers — with the single thing of theirs to read or watch first |
| 9 | [Inference](inference.md) | LLM inference solutions: direct API providers, platforms (Nebius, Together, Fireworks, Groq), routing gateways, self-hosted inference |
| 10 | [Sandboxes](sandboxes.md) | The execution-environment layer — purpose-built agent sandboxes, Contree deep dive, CDEs, isolation tiers, integration patterns |
| 11 | [Hosting & Execution](infrastructure.md) | 150+ infrastructure vendors across 9 categories — turnkey platforms, agent-optimized hosting, orchestration, Cloud Mac, GPU clouds, VPS for agents, memory, observability, MCP, identity/auth |

If you're new to the field, the suggested reading order is Chapter 1 → Chapter 3 → Chapter 4 → then any others by interest. Chapter 8 (Who's Who) doubles as a "what to read next" map keyed to specific authors.

---

## What is Agentic Engineering?

Agentic engineering is the practice of using autonomous AI agents to write, test, and ship production code with minimal human intervention. Unlike interactive AI assistants (copilots), agentic systems take a task description and produce a complete pull request — running tests, fixing linter errors, and iterating on CI failures along the way.

The shift from "human writes code with AI help" to "AI writes code with human review" is fundamentally changing how engineering organizations operate, enabling parallelization of work that was previously bottlenecked on developer attention.

## Core Concepts

- **One-Shot Execution** — Agents take a task and produce a PR end-to-end, with no human interaction in between. Engineers spin up many agents in parallel.
- **Sandbox Isolation** — Each agent runs in an isolated environment — devboxes, Docker containers, or git worktrees — safely separated from production.
- **Feedback Loops** — Agents iterate against linters, tests, and CI pipelines. Local checks catch issues fast; CI provides the final validation gate.
- **Context via MCP** — Model Context Protocol provides agents with docs, tickets, code intelligence, and internal tools through a standard interface.
- **Orchestration** — Blueprints, patchflows, and workflow graphs interleave deterministic steps with agentic creativity for reliable execution.
- **Failure Recovery** — Structured retry, split, escalate, and accept-with-debt strategies handle the inevitable failures in autonomous systems.

## The Agentic Engineering Flow

Most autonomous coding agents follow a similar high-level pipeline:

```
Task Input → Context Gathering → Planning → Implementation → Local Testing → CI Validation → Pull Request
```

The key differentiators between approaches lie in **how they handle failure** at each stage, **how they manage context** within the LLM's window, and **how they isolate** parallel agent runs.

## Sections

### [Approaches](approaches.md)
Deep dives into each major system and framework:
- [Stripe Minions](approaches.md#stripe-minions) — 1,300+ PRs/week, blueprints, devboxes, Toolshed MCP
- [AgentField](approaches.md#agentfield) — Open-source control plane with three nested failure loops
- [OpenHands](approaches.md#openhands) — 71K stars, most mature open-source autonomous engineer
- [Open SWE](approaches.md#open-swe-langchain) — LangChain's multi-agent async coding agent
- [OhMyOpenAgent](approaches.md#ohmyopenagent) — 50.6K stars, named specialist agents, hash-anchored edits
- [OpenCode](approaches.md#opencode) — 142K stars, provider-agnostic with GitHub agent mode
- [SWE-agent](approaches.md#swe-agent) — Princeton/Stanford, pioneered issue-to-PR paradigm
- [Composio](approaches.md#composio-agent-orchestrator) — Best multi-agent parallelization
- [Patchwork](approaches.md#patchwork) — Patchflows, closest to Stripe's blueprint pattern
- [Goose](approaches.md#goose) — MCP-native, the ancestor Stripe forked for Minions
- [Claude Managed Agents](approaches.md#claude-managed-agents) — Anthropic's vertically integrated harness + sandbox + tools, $0.08/agent-hour, Notion/Rakuten/Asana as early adopters
- [Vercel Open Agents](approaches.md#vercel-open-agents) — 3.7K stars, MIT-licensed reference template, "agent outside the sandbox" architecture, durable workflows + Vercel Sandbox + GitHub App
- [OpenAI Symphony](approaches.md#openai-symphony) — 15K+ stars, 6-layer orchestration, work management over agent supervision
- [Mastra](approaches.md#mastra) — TypeScript framework for building custom agent systems
- [OpenClaw](approaches.md#openclaw) — 355K stars, self-hosted assistant with messaging integration
- [Rivet Sandbox Agent](approaches.md#rivet-sandbox-agent) — Universal API for running agents in sandboxes
- [DeerFlow](approaches.md#deerflow) — ByteDance's open-source long-horizon SuperAgent harness, LangGraph-based, 32K+ stars
- [GStack](approaches.md#gstack) — Garry Tan's 23-skill Claude Code setup, MIT, 82.7K stars; CEO / Designer / Eng Manager / QA personas, paired with Conductor for 10–15 parallel sprints
- [GBrain](approaches.md#gbrain) — Garry Tan's persistent-memory companion to GStack, MIT, 11.1K stars; self-wiring typed knowledge graph + 29 skills + Postgres-native "Minions" job queue; *"the engine is GStack; GBrain is the mod"*
- [Superpowers](approaches.md#superpowers) — Jesse Vincent's agentic skills framework + software-development methodology, 93K+ stars; design-then-implement gates, TDD enforcement
- [Everything Claude Code](approaches.md#everything-claude-code) — Affaan M.'s security-auditing harness pack, ~171K stars; scans CLAUDE.md / settings.json / MCP configs / hooks / agents with red-team/blue-team/auditor pipeline
- [Hermes Agent](approaches.md#hermes-agent) — Nous Research's self-improving personal agent, MIT, 95K+ stars; autonomous skill curation on a 7-day cycle, three-layer memory, 6 terminal backends
- [AgentHub](approaches.md#agenthub) — Electron harness-engineering control plane (Skills + Hooks + FileWatcher + 7-gate pipeline) on top of Claude Code CLI, 46-agent org chart
- [The Steinberger School](approaches.md#the-steinberger-school) — Peter Steinberger's AI Software Factory pattern: ~100 Codex agents + Crabbox / Clawpatch / ClawSweeper running OpenClaw on a $1.3M/month budget with ~3 engineers
- [Crabbox](approaches.md#crabbox) — Ephemeral test-box control plane with diff sync, multi-provider runners, Windows + Linux, native OpenClaw plugin
- [Clawpatch](approaches.md#clawpatch) — Automated code review via semantic feature slicing + explicit fix loop
- [ClawSweeper](approaches.md#clawsweeper) — Conservative issue/PR triage bot — six narrow close cases, never touches maintainer items

### [Patterns](patterns.md)
Cross-cutting architectural patterns:
- [Harness Engineering](patterns.md#harness-engineering) — The overarching discipline: code as context, spec-driven software, encoded engineering taste
- [Isolation Strategies](patterns.md#1-isolation-strategies) — Devboxes vs Docker vs worktrees vs cloud sandboxes
- [Orchestration Models](patterns.md#2-orchestration-models) — Blueprints, patchflows, LangGraph, multi-agent teams
- [Context Management](patterns.md#3-context-management) — MCP, rule files, pre-hydration, hierarchical context
- [Feedback Loops](patterns.md#4-feedback-loops) — Shift-left, iteration caps, auto-fixes
- [Failure Recovery](patterns.md#5-failure-recovery) — Retry, typed recovery, three nested loops, checkpoints
- [Multi-Agent Coordination](patterns.md#6-multi-agent-coordination) — Worktree isolation, intent-aware merging, task decomposition

### [Harness Engineering](harness-engineering.md)
Deep dive on the practice that makes agents reliable — synthesizes OpenAI's *Harness Engineering*, Anthropic's *Effective Harnesses for Long-Running Agents* / *Harness Design for Long-Running Application Development*, and the Walking Labs course:
- [Why Harness Beats Model Upgrade](harness-engineering.md#why-harness-beats-model-upgrade) — Anthropic's bare-vs-three-agent experiment, OpenAI's million-line build
- [The Five-Subsystem Model](harness-engineering.md#the-five-subsystem-model) — Instructions, Tools, Environment, State, Feedback; isometric model control
- [Foundations](harness-engineering.md#foundations) — Repo as system of record, progressive disclosure, initialization as a phase, cross-session continuity, context anxiety
- [Scope and Verification](harness-engineering.md#scope-and-verification) — WIP=1, feature lists as primitives, three-layer termination check, worker-vs-checker separation
- [Observability Inside the Harness](harness-engineering.md#observability-inside-the-harness) — Sprint contracts, evaluator rubrics, OpenTelemetry
- [The Session Lifecycle and Clean State](harness-engineering.md#the-session-lifecycle-and-clean-state) — Five clean-state dimensions, dual-mode cleanup, harness simplification
- [Reference Stack](harness-engineering.md#the-reference-stack) — The minimal five-file pack and the tooling that implements each subsystem
- [Failure-Mode Catalogue](harness-engineering.md#failure-mode-catalogue) — Symptom → subsystem → fix table for the diagnostic loop

### [Benchmarks](benchmarks.md)
How agentic coding systems are measured:
- [SWE-bench](benchmarks.md#swe-bench) — Real GitHub issues from 12 Python repos; the standard coding-agent leaderboard
- [SWE-bench Verified](benchmarks.md#variants) — 500 human-filtered instances, the metric production agents publish
- [Terminal Bench](benchmarks.md#terminal-bench) — Stanford × Laude, 89 tasks spanning software eng, security, sysadmin, data science, ML
- [Choosing a benchmark](benchmarks.md#choosing-a-benchmark) — Matching benchmark to what you care about

### [Comparison](comparison.md)
Side-by-side feature matrix and capability rankings:
- [Feature Matrix](comparison.md#feature-matrix) — All approaches compared across 8 dimensions
- [Capability Breakdown](comparison.md#capability-breakdown) — Best tools for each use case
- [Composability](comparison.md#composability) — How to combine tools to build a full system

### [Organizations](organizations.md)
How companies organize around agents:
- [The Stripe Model](organizations.md#the-stripe-model) — How Stripe built an agentic engineering org
- [The Open-Source Model](organizations.md#the-open-source-startup-model) — Composable alternatives for startups
- [Organizational Patterns](organizations.md#organizational-patterns) — Agent as team member, agent swarm, agent-assisted on-call
- [Infrastructure You Need](organizations.md#the-infrastructure-you-need) — Must-have, should-have, nice-to-have

### [Sandboxes](sandboxes.md)
Dedicated deep-dive on sandbox infrastructure — the single most important layer for autonomous agents:
- [Why Sandboxes Matter](sandboxes.md#why-sandboxes-matter-for-agents) — Safe execution, reproducibility, state, observability
- [Sandbox Market Structure](sandboxes.md#the-sandbox-market-structure) — Four-layer model: primitives, agent-sandbox platforms, embedded-in-agent-products, and model-provider managed agents (Claude Managed Agents)
- [Core Use Cases](sandboxes.md#core-use-cases) — 10 use cases including tree-of-thought, SWE-bench eval, best-of-N sampling, training data generation, reproducibility
- [Isolation Tiers](sandboxes.md#isolation-tiers--the-security-ladder) — Process → container → gVisor → microVM → VM → bare metal
- [Purpose-Built Agent Sandboxes](sandboxes.md#purpose-built-agent-sandboxes) — 14 vendors with isolation, persistence, cold start, GPU data
- [Contree Deep Dive](sandboxes.md#contree--the-git-native-sandbox) — Git-native sandboxing, 7,000+ SWE-bench environments, where it wins vs E2B
- [Cloud Dev Environments](sandboxes.md#cloud-development-environments-cdes) — Persistent dev envs (Codespaces, Gitpod, Coder, Vercel Sandbox)
- [Agent Patterns](sandboxes.md#agent-patterns-enabled-by-modern-sandboxes) — Checkpoint-explore-commit, golden pool, destructive safety, sandbox-as-context
- [Integration Examples](sandboxes.md#integration-examples) — MCP, Python SDK, custom harness patterns

### [Inference](inference.md)
LLM inference solutions for agent workloads:
- [Direct API Providers](inference.md#direct-api-providers) — Anthropic, OpenAI, Google, xAI, DeepSeek
- [Inference Platforms](inference.md#inference-platforms) — Together, Fireworks, Groq, Cerebras, Nebius
- [Nebius AI Cloud](inference.md#nebius-ai-cloud--standout-platform) — Standout platform for agentic engineering at scale
- [Routing & Gateway](inference.md#routing--gateway-solutions) — LiteLLM, OpenRouter, Portkey, Kalibr
- [Self-Hosted Inference](inference.md#self-hosted-inference) — vLLM, SGLang, Ollama, TGI, llama.cpp
- [Inference Strategy](inference.md#inference-strategy-for-agents) — Tiered model routing and cost optimization

### [Hosting & Execution](infrastructure.md)
Where agents actually run — 150+ vendors across 9 major categories:
- [Hosting Decision Framework](infrastructure.md#the-hosting-decision-framework) — Turnkey, Agent-Optimized, Sandbox, Serverless, Cloud Mac, Self-Hosted
- [Code Execution Sandboxes](infrastructure.md#code-execution-sandboxes) — 14 purpose-built sandboxes including [Contree](infrastructure.md#contree--git-native-sandbox-for-agents) (Git-like branching from Nebius), E2B, Sprites.dev, Modal + 10 CDEs (GitHub Codespaces, Gitpod, Coder, Vercel Sandbox) + 7 OSS isolation primitives
- [Turnkey Managed Platforms](infrastructure.md#turnkey-managed-platforms) — OpenClaw-native + enterprise hubs (Copilot Studio, Agentspace, Bedrock) + no-code builders + autonomous coding agents (Devin, Factory, Cursor) + visual IDEs
- [Agent-Optimized Hosting](infrastructure.md#agent-optimized-hosting) — ClawHost, Claw Cloud, Zo Computer
- [Agent Orchestration](infrastructure.md#agent-orchestration) — Durable execution (Temporal, Inngest, Trigger.dev, Restate, DBOS, + 9 more) + cloud workflows + agent frameworks (LangGraph, CrewAI, AutoGen, Mastra) + data/ML orchestrators
- [Cloud Mac Hosting](infrastructure.md#cloud-mac-hosting) — 13 dedicated Mac hosts + 7 Mac CI runners (Xcode Cloud, GitHub Actions, CircleCI, Bitrise)
- [Self-Hosted Infrastructure](infrastructure.md#self-hosted-infrastructure) — Specialized GPU clouds (CoreWeave, Lambda, RunPod, Vast.ai, + 10 more) + general clouds (AWS, GCP, Azure, OCI, + 15 more) + [VPS for Agents](infrastructure.md#vps-for-agents) (IONOS, Hostinger, DigitalOcean, OVHcloud, Lightsail, Contabo, Hetzner) + bare metal
- [Agent Memory & Context](infrastructure.md#agent-memory--context-infrastructure) — Purpose-built memory (Mem0, Letta, Zep) + 18 vector DBs + graph DBs for GraphRAG
- [Agent Observability & Evaluation](infrastructure.md#agent-observability--evaluation) — Tracing (LangSmith, Langfuse, Arize, AgentOps, + 11 more) + eval (Braintrust, Patronus, Ragas, DeepEval) + guardrails
- [Choosing Your Stack](infrastructure.md#choosing-your-stack) — Starter, growth, scale, and enterprise recommendations
