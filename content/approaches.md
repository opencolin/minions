# Approaches to Agentic Coding

A deep dive into the major systems and frameworks driving autonomous software engineering — from enterprise-internal platforms to open-source tools.

---

## Stripe Minions

- **Type:** Enterprise / Internal
- **Scale:** 1,300+ PRs merged per week
- **Based on:** Goose fork
- **Blog:** https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents

Stripe's homegrown coding agents are the industry benchmark for unattended, one-shot agentic coding at enterprise scale. Engineers invoke minions from Slack, internal tools, or CLI, and receive a complete pull request with no human-written code.

### Architecture

- **Blueprints** — Hybrid state machines interleaving deterministic nodes (git, linting, push) with agentic subtasks (implementation, CI fixes)
- **Devboxes** — Isolated EC2 environments pre-warmed in ~10 seconds, identical to human dev machines
- **Toolshed MCP** — Centralized MCP server with ~500 tools for internal systems and SaaS platforms
- **Conditional rules** — Cursor-format rule files applied by subdirectory to avoid context bloat
- **Pre-hydration** — Deterministic MCP tool runs on linked URLs before agent loop starts

### Key Properties

- One-shot design — Task in, PR out, no interaction in between
- Max 2 CI rounds — Local lint first, then at most two CI iterations
- Production isolation — Devboxes cut off from production and internet
- Parallel execution — Engineers routinely spin up multiple minions simultaneously
- Same tools as humans — If it's good for humans, it's good for LLMs
- Auto-fixes — Many test failures have autofixes that are applied automatically

### Flow

```
Slack / CLI → Devbox → Pre-hydrate Context → Blueprint Loop → Local Lint → CI (x2 max) → PR
```

---

## AgentField

- **Type:** Open Source (Apache 2.0)
- **Role:** Control Plane + Orchestration Framework
- **GitHub:** https://github.com/Agent-Field/agentfield
- **Blog:** https://agentfield.ai/blog/beyond-vibe-coding

AgentField is both a control plane for managing AI agents as production services and an orchestration framework (SWE-AF) for multi-agent coding workflows. It addresses the infrastructure gap that Stripe solved internally.

### Control Plane

- **Agent registration & routing** — REST APIs, WebSocket connections, execution queues (PostgreSQL-backed)
- **Canary & blue-green deploys** — Per-version health tracking and traffic routing
- **Cryptographic identity** — W3C DIDs per agent with verifiable credentials
- **Memory system** — KV storage + vector search across four scopes
- **SDKs** — Python, Go, TypeScript

### SWE-AF Orchestration

- **Two primitives** — `.ai()` for cheap routing calls, `.harness()` for full coding environments (up to 150 turns)
- **Three failure loops** — Inner (per-issue retries, up to 5), Middle (typed recovery: retry, split, escalate, accept-with-debt), Outer (replanner for cascading failures)
- **Git worktree isolation** — Each issue gets its own branch and working directory
- **Checkpoint-based execution** — Resumes from failure point, never restarts
- **Intent-aware merging** — Merger agent resolves conflicts between parallel branches
- **Typed debt tracking** — Downstream agents work around known gaps

### Results

- Diagrams-as-code Rust CLI: 15 issues, 200+ invocations, $116 total
- Go SDK feature: 10 issues, 80+ invocations, $19 total
- Architecture quality > model capability: scored 95/100 with both Haiku and MiniMax M2.5

---

## OpenHands

- **Type:** Open Source (MIT)
- **Stars:** 71K
- **GitHub:** https://github.com/OpenHands/OpenHands

Formerly OpenDevin, OpenHands is the most mature open-source autonomous software engineer. It clones repos, runs terminal commands, executes tests, debugs errors, and produces PRs — all inside a sandboxed Docker container.

### Architecture

- **Docker sandboxing** — Full OS-level isolation per agent run
- **Planning Mode** — Added in v1.6.0 for structured task decomposition
- **Web GUI + CLI + SDK** — Multiple interfaces for different workflows
- **Kubernetes support** — Scalable deployment for enterprise use

### Key Properties

- 50%+ SWE-bench — Solves over half of real GitHub issues in benchmarks
- GitHub issue trigger — Can be invoked directly from issue comments
- CI feedback — Runs tests and iterates on failures
- $18.8M Series A — Well-funded with active development
- **Gap:** No built-in blueprint/workflow DSL or multi-agent parallelization

---

## Open SWE (LangChain)

- **Type:** Open Source
- **Stars:** 9.5K
- **GitHub:** https://github.com/langchain-ai/open-swe

LangChain's cloud-native async coding agent, explicitly modeled on patterns from companies like Stripe, Ramp, and Coinbase. Uses a multi-agent architecture built on LangGraph.

### Architecture

- **LangGraph orchestration** — Graph-based workflow engine, closest open-source analog to Stripe's blueprints
- **Multi-agent decomposition** — Manager, Planner, Programmer, Reviewer agents
- **Cloud sandbox** — Isolated cloud execution environments
- **Async-first** — Designed for unattended background execution

### Key Properties

- Automatic PR creation — End-to-end from issue to pull request
- Self-review — Reviewer agent checks code before PR creation
- Enterprise patterns — Designed to capture patterns from production agentic systems
- **Gap:** Newer project, less battle-tested than OpenHands

---

## OhMyOpenAgent

- **Type:** Open Source
- **Stars:** 50.6K
- **GitHub:** https://github.com/code-yeongyu/oh-my-openagent

A multi-agent orchestration harness with named specialist agents, hash-anchored edits for reliability, and automatic multi-model routing. Focuses on solving the practical failure modes that generic agent frameworks overlook.

### Architecture

- **Named agents** — Sisyphus (orchestrator), Hephaestus (deep worker), Prometheus (strategic planner), Oracle (debugger), Librarian (docs)
- **Hash-anchored edits (Hashline)** — Each line carries a content hash for verification before applying changes (improved success from 6.7% to 68.3%)
- **Multi-model routing** — Auto-routes tasks to appropriate models (visual, reasoning, quick fix, ultrabrain)
- **LSP + AST-Grep** — IDE-precision refactoring and AST-aware code search

### Key Properties

- `ultrawork` command — Single-word activation triggering full agent team
- Ralph Loop — Self-referential iteration until task completion
- Todo Enforcer — Pulls agents back from idle states
- Comment validation — Prevents AI-generated prose in code
- `/init-deep` — Auto-generates hierarchical AGENTS.md files across projects
- Built-in MCPs — Exa search, Context7 docs, Grep.app

---

## OpenCode

- **Type:** Open Source
- **Stars:** 142K
- **GitHub:** https://github.com/anomalyco/opencode

The most-starred open-source coding agent, featuring a TUI, client/server architecture, and a GitHub agent mode for unattended repository automation via GitHub Actions.

### Architecture

- **Client/server model** — Separates UI from execution for flexibility
- **GitHub agent mode** — Triggered by GitHub events, runs in Actions
- **Provider-agnostic** — Claude, OpenAI, Google, local models
- **TUI interface** — Rich terminal UI for interactive use

### Key Properties

- Massive adoption — 142K stars, largest coding agent community
- Event-driven — GitHub agent mode mirrors Minions' event-driven model
- Extensible — Plugin architecture for custom tools
- **Gap:** Primarily interactive; GitHub agent mode is newer

---

## SWE-agent

- **Type:** Open Source (MIT)
- **Stars:** 19K
- **Origin:** Princeton / Stanford
- **GitHub:** https://github.com/SWE-agent/SWE-agent

Pioneered the "GitHub issue in, pull request out" paradigm. Published at NeurIPS 2024. Also produced mini-swe-agent, a 100-line agent scoring 74%+ on SWE-bench.

### Architecture

- **Docker isolation** — Sandboxed execution environment per run
- **Issue-to-PR pipeline** — Takes a GitHub issue URL and produces a fix
- **Custom agent interface** — Optimized shell commands for LLM interaction

### Key Properties

- Research-grade — NeurIPS 2024 publication with rigorous evaluation
- mini-swe-agent — 100-line minimal version scoring 74%+ on benchmarks
- **Gap:** No workflow orchestration, limited CI integration, single-agent only

---

## Composio Agent Orchestrator

- **Type:** Open Source
- **Stars:** 6.2K
- **GitHub:** https://github.com/ComposioHQ/agent-orchestrator

The best open-source match for Stripe's multi-agent parallelization pattern. Decomposes tasks, spawns parallel agents, and autonomously handles CI fixes and merge conflicts.

### Architecture

- **Task decomposition** — Plans and breaks work into parallel subtasks
- **Parallel agent spawning** — Multiple agents working simultaneously
- **CI feedback loop** — Automatically handles test failures
- **Merge conflict resolution** — Handles conflicts from parallel work

### Key Properties

- Best parallelization — Closest match to "spin up many minions"
- Code review — Automated review before PR creation
- **Gap:** Orchestration layer, not a complete standalone agent

---

## Patchwork

- **Type:** Open Source
- **Stars:** 1.5K
- **GitHub:** https://github.com/patched-codes/patchwork

Framework for patching code repos using LLMs. Its "patchflows" — reusable workflows combining atomic actions with LLM prompts — are the closest open-source analog to Stripe's blueprint pattern.

### Architecture

- **Patchflows** — Deterministic steps (create PR, commit, lint) + LLM prompts, similar to blueprints
- **Built-in flows** — AutoFix, PRReview, GenerateDocstring
- **CI/CD integration** — Runs in pipelines natively

### Key Properties

- Blueprint analog — Closest match to Stripe's hybrid orchestration
- Composable — Mix and match atomic actions
- **Gap:** Smaller community, no sandbox isolation, less sophisticated agent loops

---

## Goose

- **Type:** Open Source (Apache 2.0)
- **Stars:** 41K
- **GitHub:** https://github.com/block/goose (also https://github.com/aaif-goose/goose)

The general-purpose AI agent framework from Block that Stripe forked in late 2024 to build Minions. Now maintained by the Agentic AI Foundation (AAIF) under the Linux Foundation.

### Architecture

- **Rust core** — Native desktop, CLI, and API interfaces
- **MCP-native** — 70+ tool extensions via Model Context Protocol
- **15+ LLM providers** — Anthropic, OpenAI, Google, Ollama, and more
- **General purpose** — Code, research, writing, automation, data analysis

### Key Properties

- Minions ancestor — Stripe's Minions were literally built from a Goose fork
- Linux Foundation — Transitioned from Block to AAIF for community governance
- **Gap:** Interactive, not unattended. No sandbox isolation, CI loops, or blueprint orchestration

---

## Mastra

- **Type:** Open Source (Apache 2.0 + Enterprise)
- **Stars:** 22.9K
- **GitHub:** https://github.com/mastra-ai/mastra
- **Origin:** YC W25, from the team behind Gatsby

A TypeScript framework for building AI-powered applications and autonomous agents. Mastra provides the building blocks for production agent systems — model routing, workflow orchestration, memory, and MCP support — in a developer-friendly package.

### Architecture

- **Model routing** — Unified interface to 40+ LLM providers (OpenAI, Anthropic, Gemini, etc.)
- **Workflow engine** — Graph-based orchestration with `.then()`, `.branch()`, `.parallel()` API
- **Agent system** — Autonomous agents that reason through goals and select tools
- **Human-in-the-loop** — Pause agents for user approval with persistent state across suspension
- **Memory** — Conversation history, working memory, and semantic memory for coherent behavior

### Key Properties

- TypeScript-native — 99.3% TypeScript, integrates with React, Next.js, Node.js
- MCP servers — Author and consume MCP tools via standard interfaces
- Evaluations — Built-in eval framework for measuring agent quality
- Production-ready — Observability, error handling, state persistence
- **Role in agentic engineering:** Mastra is a framework for building custom agent systems, not a pre-built coding agent. Teams would use it to build their own Minions-like system in TypeScript, with the workflow engine serving a similar role to Stripe's blueprints.

---

## OpenClaw

- **Type:** Open Source
- **Stars:** 355K (fastest-growing open-source project on GitHub)
- **GitHub:** https://github.com/openclaw/openclaw
- **Origin:** Created by Peter Steinberger (Austria), originally named Clawdbot (Nov 2025)

A self-hosted personal AI assistant platform that connects LLMs to real software via messaging platforms. Not a coding agent per se, but a general-purpose agent framework that can execute coding tasks among many other capabilities.

### Architecture

- **Local-first Gateway** — WebSocket-based control plane running locally, coordinating all connections
- **Multi-channel** — WhatsApp, Telegram, Slack, Discord, Signal, Teams, Matrix, and 15+ more messaging platforms
- **Skills platform** — Bundled, managed, and workspace-level skills for extensibility
- **Agent-to-agent coordination** — Session tools for multi-agent communication
- **Device nodes** — macOS, iOS, Android companion apps with system access
- **Browser control** — Dedicated Chrome instance for web automation

### Key Properties

- Self-hosted — Runs entirely on your infrastructure, privacy-first
- Messaging-native — Use your existing chat platforms as the interface (like Stripe uses Slack)
- Voice capabilities — Wake words, continuous voice mode, ElevenLabs integration
- A2UI (Agent-to-UI) — Live Canvas for agent-driven visual workspaces
- NemoClaw — Nvidia-built security add-on with OpenShell sandboxing (released March 2026)
- **Role in agentic engineering:** OpenClaw's messaging-platform integration mirrors how Stripe engineers invoke minions from Slack. Its self-hosted nature and multi-agent coordination make it a potential foundation for building an agentic engineering workflow, though it requires more custom configuration than purpose-built coding agents. The skills platform and agent-to-agent tools could power a Minions-like system where coding tasks are dispatched through familiar messaging channels.

---

## Rivet Sandbox Agent

- **Type:** Open Source
- **Stars:** 1.3K
- **GitHub:** https://github.com/rivet-dev/sandbox-agent

Universal HTTP API to run any coding agent (Claude Code, Codex, OpenCode, Amp) in isolated sandboxes. The infrastructure layer for building a Minions-like system.

### Architecture

- **Universal agent API** — Single HTTP interface for any coding agent
- **Multi-runtime** — E2B, Daytona, Modal, Docker support
- **Session management** — Persistent sessions with event streaming
- **Audit logging** — Full audit trail for compliance

### Key Properties

- Devbox equivalent — Best open-source match for Stripe's sandbox infrastructure
- Composable — Combine with any agent and orchestrator
- **Gap:** Infrastructure layer only, not a complete autonomous agent
