# Agentic Engineering

A comprehensive reference to autonomous coding agents, agentic organizations, and the emerging patterns of AI-native software engineering.

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

### [Patterns](patterns.md)
Cross-cutting architectural patterns:
- [Harness Engineering](patterns.md#0-harness-engineering) — The overarching discipline: code as context, spec-driven software, encoded engineering taste
- [Isolation Strategies](patterns.md#1-isolation-strategies) — Devboxes vs Docker vs worktrees vs cloud sandboxes
- [Orchestration Models](patterns.md#2-orchestration-models) — Blueprints, patchflows, LangGraph, multi-agent teams
- [Context Management](patterns.md#3-context-management) — MCP, rule files, pre-hydration, hierarchical context
- [Feedback Loops](patterns.md#4-feedback-loops) — Shift-left, iteration caps, auto-fixes
- [Failure Recovery](patterns.md#5-failure-recovery) — Retry, typed recovery, three nested loops, checkpoints
- [Multi-Agent Coordination](patterns.md#6-multi-agent-coordination) — Worktree isolation, intent-aware merging, task decomposition

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
