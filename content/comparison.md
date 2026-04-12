# Comparison Table

Side-by-side feature comparison of all major agentic coding approaches.

---

## Feature Matrix

| Project | Stars | Unattended PR | Orchestration | Sandbox | MCP | CI Feedback | Multi-Agent | License |
|---------|-------|--------------|---------------|---------|-----|-------------|-------------|---------|
| **Stripe Minions** | N/A | Yes | Blueprints | EC2 Devboxes | Yes (~500 tools) | Yes (2 rounds) | Parallel runs | Proprietary |
| **AgentField** | 1.4K | Yes | SWE-AF levels | Git Worktrees | Agent mesh | Yes (gated) | Yes (orchestrated) | Apache 2.0 |
| **OpenHands** | 71K | Yes | Planning Mode | Docker | No | Yes | No | MIT |
| **Open SWE** | 9.5K | Yes | LangGraph | Cloud sandbox | No | Yes | Yes (4 agents) | Open Source |
| **OhMyOpenAgent** | 50.6K | Partial | Named agents | No | Yes (built-in) | Partial | Yes (team) | Open Source |
| **OpenCode** | 142K | Partial (GH mode) | No | No | No | No | No | Open Source |
| **SWE-agent** | 19K | Yes | No | Docker | No | Partial | No | MIT |
| **Composio** | 6.2K | Yes | Task decomp | Configurable | No | Yes | Yes (parallel) | Open Source |
| **Patchwork** | 1.5K | Yes | Patchflows | No | No | Yes (CI/CD) | No | Open Source |
| **Goose** | 41K | No (interactive) | No | No | Yes (70+ tools) | No | No | Apache 2.0 |
| **Mastra** | 22.9K | Framework | Workflows | Configurable | Yes (MCP) | Via workflows | Via workflows | Apache 2.0 |
| **OpenClaw** | 355K | Via skills | No | Via NemoClaw | No | No | Yes (sessions) | Open Source |
| **Rivet Sandbox** | 1.3K | Infrastructure | No | Yes (multi-runtime) | No | No | API-level | Open Source |

---

## Capability Breakdown

### Best for Unattended PR Production
1. **Stripe Minions** — Gold standard, 1,300+ PRs/week in production
2. **OpenHands** — Most mature open-source option, 50%+ SWE-bench
3. **Open SWE** — Best multi-agent architecture for PR production

### Best for Orchestration / Workflow
1. **Stripe Minions** — Blueprints (hybrid deterministic + agentic)
2. **Patchwork** — Patchflows (closest open-source blueprint analog)
3. **Open SWE** — LangGraph (graph-based multi-agent)

### Best for Sandbox Isolation
1. **Stripe Minions** — EC2 devboxes, pre-warmed in 10s
2. **Rivet Sandbox Agent** — Universal API for any agent in any sandbox
3. **OpenHands** — Docker-based, Kubernetes-ready

### Best for Multi-Agent Parallelization
1. **Composio Orchestrator** — Purpose-built for parallel agent coordination
2. **AgentField** — Full orchestration with failure recovery
3. **OhMyOpenAgent** — Named specialist team with model routing

### Best for Context Management
1. **Stripe Minions** — Toolshed MCP (~500 tools), conditional rules, pre-hydration
2. **OhMyOpenAgent** — Hierarchical AGENTS.md, built-in MCPs, multi-model routing
3. **Goose** — MCP-native with 70+ extensions

### Best for Failure Recovery
1. **AgentField** — Three nested loops, typed recovery, checkpoint-based
2. **Stripe Minions** — Pragmatic 2-round CI cap with auto-fixes
3. **OhMyOpenAgent** — Ralph Loop for persistent iteration

---

## Composability

No single open-source project replicates the full Stripe Minions architecture. To build an equivalent, you would likely combine:

| Layer | Option A | Option B |
|-------|----------|----------|
| **Core Agent** | OpenHands | Open SWE |
| **Sandbox** | Rivet Sandbox Agent | E2B / Docker |
| **Orchestration** | Patchwork patchflows | LangGraph |
| **Parallelization** | Composio Orchestrator | AgentField |
| **Context** | MCP servers | OhMyOpenAgent MCPs |
| **Control Plane** | AgentField | Custom |
