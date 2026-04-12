# Architectural Patterns in Agentic Engineering

Cross-cutting patterns that appear across the different approaches to autonomous coding agents. Understanding these patterns helps you evaluate tools and design your own agentic systems.

---

## 1. Isolation Strategies

How agents are sandboxed from production and from each other.

| Strategy | Used By | Pros | Cons |
|----------|---------|------|------|
| **EC2 Devboxes** | Stripe Minions | Full OS isolation, identical to human env, pre-warmed in ~10s | Expensive, AWS-specific |
| **Docker Containers** | OpenHands, SWE-agent | Lightweight, reproducible, widely supported | Less isolation than VMs, image management |
| **Git Worktrees** | AgentField | Zero overhead, native git, parallel branches | No process isolation, shared filesystem |
| **Cloud Sandboxes** | Open SWE, Rivet | Scalable, provider-agnostic | Latency, cost, network dependency |
| **Local Execution** | Goose, Aider, OpenCode | Fast, no setup cost | No isolation, risk to local state |

### Key Insight

Stripe chose EC2 devboxes because git worktrees "wouldn't scale at Stripe." But for most teams, worktrees or Docker provide sufficient isolation at far lower cost. The right choice depends on codebase size, security requirements, and parallelization needs.

---

## 2. Orchestration Models

How agent execution is structured — the balance between deterministic steps and LLM creativity.

### Blueprints (Stripe Minions)

Hybrid state machines with two node types:
- **Deterministic nodes** — Run linters, push code, manage git (always execute the same way)
- **Agentic nodes** — Implement features, fix CI failures (LLM decides how)

This ensures required steps always happen while giving the LLM freedom where it matters.

### Patchflows (Patchwork)

Reusable workflow templates combining atomic actions with LLM prompts:
```
AutoFix: detect_issue → prompt_llm → apply_patch → run_lint → commit → create_pr
```

### LangGraph (Open SWE)

Graph-based orchestration where nodes are agents with defined inputs/outputs:
```
Manager → Planner → Programmer → Reviewer → PR
```

### Multi-Agent Teams (OhMyOpenAgent)

Named specialist agents with distinct roles:
```
Sisyphus (orchestrator) → Hephaestus (deep worker) + Prometheus (planner) + Oracle (debugger)
```

### Free-Form Agent Loop (OpenHands, SWE-agent)

Single agent loop with tools and no predefined workflow. The LLM decides what to do at each step.

### Key Insight

More structured orchestration (blueprints, patchflows) trades flexibility for reliability. Free-form loops are more adaptable but harder to debug and less predictable. The trend is toward hybrid approaches.

---

## 3. Context Management

How agents acquire the knowledge they need to work on a codebase.

### MCP (Model Context Protocol)

Standardized protocol for providing LLMs with tools and context. Used by Stripe (Toolshed, ~500 tools), Goose (70+ extensions), and increasingly the whole ecosystem.

**Key pattern: Curated subsets** — Stripe doesn't give minions all 500 tools. Each run gets a curated subset to prevent tool explosion in the context window.

### Rule Files

Agent-readable instruction files (like `.cursorrules`, `AGENTS.md`, `CLAUDE.md`) that provide codebase-specific guidance.

**Key pattern: Conditional rules** — Almost all of Stripe's agent rules are applied based on subdirectory, not globally. This prevents context bloat from irrelevant instructions.

### Pre-Hydration

Running deterministic context-gathering before the agent loop starts:
- Parse URLs from the task description
- Fetch linked tickets, docs, PRs
- Run code intelligence queries
- Build initial context package

**Key pattern:** Stripe runs relevant MCP tools over likely-looking links before a minion run even starts.

### Hierarchical Context (OhMyOpenAgent)

Auto-generated `AGENTS.md` files at each directory level, providing agents with context that's scoped to their current working area rather than the entire repo.

---

## 4. Feedback Loops

How agents learn from failures and iterate toward success.

### The Shift-Left Principle

Catch failures as early and cheaply as possible:

```
Local Lint (~1s) → Local Tests (~5s) → CI Tests (~minutes) → Human Review
```

Stripe's approach: local executable with heuristic-selected lints runs on each git push in under 5 seconds. Any lint that would fail in CI should be enforced locally.

### Iteration Caps

Most systems cap the number of retry cycles to avoid burning tokens on diminishing returns:

| System | Local Retries | CI Rounds | Total Cap |
|--------|--------------|-----------|-----------|
| Stripe Minions | Unlimited local lint | 2 max | ~3 iterations |
| AgentField | 5 per issue | Gate-controlled | Escalates to replanner |
| OpenHands | Tool-based | Iterates until pass | No hard cap |
| OhMyOpenAgent | Ralph Loop | N/A | Until completion |

### Auto-Fixes

Stripe's CI tests often include auto-fixes for common failures. When a test fails, the fix is automatically applied before the agent even tries to fix it manually. This dramatically reduces wasted LLM cycles.

---

## 5. Failure Recovery

What happens when things go wrong — the strategies beyond simple retry.

### Simple Retry (Most agents)

Run the same task again, possibly with the error message as additional context.

### Typed Recovery (AgentField)

Structured recovery actions based on failure type:
- **Retry modified** — Same task, different approach
- **Retry with different approach** — Explicitly change strategy
- **Split issue** — Break the failing task into smaller subtasks
- **Accept with debt** — Mark as known gap, let downstream agents work around it
- **Escalate** — Send to human or higher-level agent

### Three Nested Loops (AgentField)

```
Inner Loop: Per-issue retries (up to 5 iterations)
    ↓ failure
Middle Loop: Issue advisor selects recovery action
    ↓ cascading failures
Outer Loop: Replanner restructures remaining work
```

### Checkpoint-Based Recovery

AgentField saves state at every level boundary. A build failing at invocation 140 resumes from that point rather than restarting from scratch.

### Key Insight

The sophistication of failure handling is often the biggest differentiator between toy agents and production systems. Stripe's 2-CI-round cap is deceptively simple but reflects a pragmatic insight: there are diminishing marginal returns for an LLM to run many rounds of a full CI loop.

---

## 6. Multi-Agent Coordination

How parallel agents avoid stepping on each other.

### Git Worktree Isolation (AgentField)

Each issue operates in its own git worktree with its own branch. No lock contention between parallel agents.

### Intent-Aware Merging (AgentField)

When multiple issues modify the same files, a merger agent performs conflict resolution that understands the intent of each change, not just the text diff.

### Task Decomposition (Composio)

A planner agent breaks work into independent subtasks, distributes them to worker agents, then merges results.

### Devbox Isolation (Stripe)

Each minion gets its own full development environment. No shared filesystem, no merge conflicts during execution. Conflicts are handled at PR time by human reviewers.

### Key Insight

Stripe chose to avoid merge conflicts entirely by isolating at the VM level and letting humans handle PR-level conflicts. AgentField chose to embrace parallelism and build automated merge resolution. The right choice depends on how independent your tasks are.
