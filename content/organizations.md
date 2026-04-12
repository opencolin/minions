# Agentic Organizations

How companies and teams organize around autonomous coding agents. The shift from "developers who use AI tools" to "organizations designed for human-agent collaboration."

---

## The Stripe Model

Stripe represents the most mature example of an agentic engineering organization.

### How It Works

- Engineers use minions as a normal part of their workflow, invoking them from Slack threads
- Multiple minions run in parallel, especially useful during on-call rotations
- Internal platforms (docs, feature flags, ticketing) all integrate with minions
- CI systems auto-create tickets suggesting minion fixes for flaky tests
- Human role shifts from "writing code" to "reviewing agent-produced PRs"

### Key Organizational Principles

1. **Same tools for humans and agents** — Developer productivity investments benefit both. If tooling is good for humans, it's good for LLMs too.
2. **Shift feedback left** — Any lint that would fail in CI should be enforced in IDE or on push. Fast feedback benefits agents even more than humans.
3. **Conditional rules, not global rules** — Scoping agent instructions by subdirectory prevents context bloat and makes rules maintainable.
4. **Pre-hydrate context** — Don't make agents discover context through exploration. Gather it deterministically before the agent loop.
5. **Cap CI iterations** — Diminishing returns on LLM CI loops. Often one, at most two rounds.

### Scale

- 1,300+ PRs merged per week with no human-written code
- Hundreds of millions of lines of code
- Primarily Ruby (not Rails) with Sorbet typing
- Handles >$1 trillion/year in payment volume

---

## The Open-Source / Startup Model

For teams without Stripe's resources, the open-source ecosystem provides composable alternatives.

### Typical Setup

1. **Agent selection** — Choose a core agent (OpenHands, Claude Code, OpenCode) based on model preference and deployment model
2. **Sandbox infrastructure** — Docker, E2B, or Rivet for isolation
3. **Trigger integration** — GitHub Actions, Slack bots, or CLI for invocation
4. **Rule files** — CLAUDE.md, AGENTS.md, or .cursorrules for codebase context
5. **CI integration** — Connect agent output to existing CI/CD pipeline

### Key Differences from Enterprise

| Aspect | Enterprise (Stripe) | Open Source / Startup |
|--------|--------------------|-----------------------|
| Isolation | Dedicated EC2 devboxes | Docker / worktrees / cloud sandboxes |
| Context | Centralized MCP server (Toolshed) | Distributed rule files + ad-hoc MCP |
| Scale | 1,300+ PRs/week | Dozens to hundreds of agent runs |
| Integration | Deep internal platform integration | GitHub Actions / Slack bots |
| Orchestration | Custom blueprints | LangGraph / patchflows / free-form |
| Investment | Dedicated platform team | Part of existing DevEx effort |

---

## Organizational Patterns

### Pattern 1: Agent as Team Member

Agents are treated like junior developers. They receive tasks, produce PRs, and their work is reviewed by humans.

- **Best for:** Well-defined tasks (bug fixes, migrations, dependency updates)
- **Human role:** Task creation, code review, architectural decisions
- **Used by:** Stripe, teams using OpenHands or SWE-agent

### Pattern 2: Agent Swarm

Multiple agents work in parallel on decomposed subtasks, with automated coordination.

- **Best for:** Large refactors, multi-file changes, migration campaigns
- **Human role:** High-level planning, final review, conflict resolution
- **Used by:** Teams using Composio, AgentField, or OhMyOpenAgent

### Pattern 3: Agent-Assisted On-Call

Agents handle routine on-call tasks (flaky tests, simple bug fixes, config changes) while humans focus on complex incidents.

- **Best for:** Reducing on-call toil, handling alert-driven work
- **Human role:** Triage, complex debugging, incident response
- **Used by:** Stripe (explicitly mentioned as a key use case)

### Pattern 4: Agent-First Development

The default path for new code is agent-generated. Humans design systems and review output.

- **Best for:** Greenfield features with clear specifications
- **Human role:** Architecture, specification, review
- **Emerging at:** Companies with high agent PR merge rates

---

## The Infrastructure You Need

Regardless of which approach you take, certain infrastructure investments unlock agentic engineering:

### Must Have

- **Fast CI** — Agents iterate against tests. Slow CI means expensive, slow agent runs.
- **Good test coverage** — Agents need feedback signals. No tests = no feedback loop.
- **Linting with auto-fix** — Catches formatting/style issues without burning LLM tokens.
- **Clear coding standards** — Rule files and documentation that agents can consume.

### Should Have

- **Sandbox/isolation** — Prevents agents from affecting production or each other.
- **MCP tools** — Standardized context access for docs, tickets, code intelligence.
- **CI auto-fixes** — Automatically apply known fixes before sending failures back to agents.

### Nice to Have

- **Pre-warmed environments** — Reduces agent startup time from minutes to seconds.
- **Conditional rule files** — Scoped instructions prevent context window waste.
- **Agent observability** — Dashboards showing agent decisions, actions, and outcomes.
- **Cost tracking** — Token and compute costs per agent run for optimization.

---

## The Future

The industry is converging on a model where:

1. **Agents handle the implementation** — From task description to passing PR
2. **Humans handle the judgment** — Architecture, priorities, review, and edge cases
3. **Infrastructure bridges the gap** — Isolation, feedback loops, and context management make agent-produced code reliable enough to merge

The key insight from both Stripe and the open-source community: **the hard part isn't the LLM — it's the infrastructure around it.** Isolation, feedback loops, failure recovery, context management, and CI integration are what separate toy demos from production systems.
