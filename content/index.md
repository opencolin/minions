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
- [Mastra](approaches.md#mastra) — TypeScript framework for building custom agent systems
- [OpenClaw](approaches.md#openclaw) — 355K stars, self-hosted assistant with messaging integration
- [Rivet Sandbox Agent](approaches.md#rivet-sandbox-agent) — Universal API for running agents in sandboxes

### [Patterns](patterns.md)
Cross-cutting architectural patterns:
- [Isolation Strategies](patterns.md#1-isolation-strategies) — Devboxes vs Docker vs worktrees vs cloud sandboxes
- [Orchestration Models](patterns.md#2-orchestration-models) — Blueprints, patchflows, LangGraph, multi-agent teams
- [Context Management](patterns.md#3-context-management) — MCP, rule files, pre-hydration, hierarchical context
- [Feedback Loops](patterns.md#4-feedback-loops) — Shift-left, iteration caps, auto-fixes
- [Failure Recovery](patterns.md#5-failure-recovery) — Retry, typed recovery, three nested loops, checkpoints
- [Multi-Agent Coordination](patterns.md#6-multi-agent-coordination) — Worktree isolation, intent-aware merging, task decomposition

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

### [Infrastructure](infrastructure.md)
Inference solutions, serverless hosting, and choosing your stack:
- [Inference Solutions](infrastructure.md#inference-solutions) — API providers, inference platforms, routing gateways, self-hosted
- [Serverless Hosting](infrastructure.md#serverless-hosting--agent-compute) — Agent sandboxes, serverless compute, container orchestration
- [Choosing Your Stack](infrastructure.md#choosing-your-stack) — Starter, growth, and enterprise stack recommendations
