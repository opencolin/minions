# Sandboxes for Agentic Engineering

Sandboxes are the single most important piece of infrastructure for autonomous coding agents. They answer the fundamental question: **where does untrusted LLM-generated code actually run?**

Everything else — inference, orchestration, memory, observability — depends on the sandbox layer being correct, fast, and safe.

---

## Why Sandboxes Matter for Agents

An autonomous agent that writes code will, at some point, produce code that is wrong, malicious (via prompt injection), or dangerous (infinite loops, resource exhaustion, file system damage). Without a sandbox, these failures corrupt the host environment and, at worst, leak credentials or attack other systems.

A well-designed sandbox gives agents four critical affordances:

1. **Safe execution** — Run unreviewed code without affecting production, the host, or other tenants
2. **Reproducibility** — Spin up identical environments deterministically for parallel or repeated runs
3. **State management** — Checkpoint, fork, and roll back environment state
4. **Observability** — Capture logs, metrics, and I/O for post-hoc analysis

The quality of these affordances — especially state management and isolation — is what separates toy sandboxes from production agent infrastructure.

---

## The Sandbox Market Structure

The sandbox layer divides into three tiers, and which tier you operate at determines your design tradeoffs.

**Layer A — Primitives.** The underlying isolation technology: Firecracker, gVisor, Kata Containers, libkrun. Hyperscaler-dominated, stable, open source.

**Layer B — Agent-Sandbox Platforms.** Managed services built on Layer A primitives: E2B, Contree, Daytona, Modal, Sprites.dev, Runloop, Northflank, Scrapybara, Steel.dev. This is where almost all buying decisions happen for agent teams.

**Layer C — Embedded in Agent Products.** Sandboxes that ship inside a broader agent product: Cursor's background agents, Devin's workspaces, Copilot Workspace, Replit Agent. These are rarely bought standalone — they're a feature of the agent product.

**The market dynamic:** Layer C is consolidating around a handful of agent products, which means Layer B's addressable market shifts toward fewer, larger customers. The sales motion moves from product-led growth to enterprise / infrastructure partnerships. For buyers, this means Layer B vendors are increasingly specializing on specific use cases rather than trying to serve every agent workflow.

---

## Core Use Cases

### 1. Code Execution & Testing

The baseline. Agent writes code → sandbox runs it → agent sees stdout/stderr/exit code and iterates.

- **Best for:** SWE-bench-style task completion, test-driven development loops, script execution
- **Required:** Fast cold start (<1s), CLI/shell access, file I/O
- **Example vendors:** E2B, Daytona, Modal, AgentComputer, Contree

### 2. Parallel Exploration (Tree-of-Thought)

Agent forks the environment at a decision point, tries multiple approaches in parallel, evaluates each, and continues with the winner.

- **Best for:** Multi-hypothesis reasoning, exploring alternative implementations, competitive eval
- **Required:** Fast branching/forking, checkpoint/restore, parallel concurrency
- **Example vendors:** Contree (Git-native branching), Sprites.dev (hibernate + fork), Modal (snapshots)

### 3. Rollback on Failure

Agent tries an approach, sandbox observes the failure, agent rolls back entire environment state and tries something different.

- **Best for:** Long-horizon agent runs, destructive operations (migrations, refactors), risk-sensitive tasks
- **Required:** Checkpoint at arbitrary points, instant restore, state preservation across rollback
- **Example vendors:** Contree (Git-like rollback), Sprites.dev (300ms hibernate/restore), AgentField (level boundary checkpoints)

### 4. Persistent Agent Environments

Agent works across multiple sessions in the same environment — files, installed packages, shell history persist between invocations.

- **Best for:** Long-running agent assistants, stateful coding sessions, per-user agent workspaces
- **Required:** Persistent storage, wake-from-sleep, low idle cost
- **Example vendors:** Sprites.dev (indefinite + hibernate), AgentComputer (25 GB persistent), CDEs (Gitpod, Codespaces, Coder)

### 5. Multi-Tenant Agent Fleets

Many agents running concurrently, each isolated from the others, with strict resource limits and no cross-contamination.

- **Best for:** Enterprise agent deployments, SaaS agent platforms, shared agent infrastructure
- **Required:** Hardware-level isolation, VPC support, audit logging, per-tenant scoping
- **Example vendors:** Northflank (enterprise VPC), Runloop (10K+ parallel), Modal (50K+ concurrency)

### 6. Apple-Native Workflows

Agents that interact with iMessage, Xcode, iOS Simulator, or Apple's Neural Engine.

- **Best for:** Mobile app build/test agents, iOS automation, Apple ecosystem tooling
- **Required:** macOS hardware, often Apple silicon (M1-M4)
- **Example vendors:** MacStadium, AWS EC2 Mac, Scaleway Mac (see [Hosting](infrastructure.md#cloud-mac-hosting))

### 7. Coding Agent Dev Environments

A persistent dev environment that hosts a coding agent's entire workflow — similar to Stripe's devbox model.

- **Best for:** Team-shared agent platforms, PR-producing agents, Stripe Minions-style infrastructure
- **Required:** Pre-warmed pools, source code pre-loaded, per-agent isolation
- **Example vendors:** GitHub Codespaces, Gitpod, Coder, Vercel Sandbox, custom EC2 (Stripe's approach)

### 8. SWE-Bench & Agent Evaluation

Running benchmarks like SWE-bench, Bird-SQL, HumanEval, or custom agent harnesses at scale. Each task needs an identical, pre-configured environment — and ideally a way to run thousands in parallel.

- **Best for:** Frontier labs, agent research, model eval pipelines, agent CI/CD across patches
- **Required:** Preloaded environment libraries, fast per-task instantiation, checkpoint/branch primitives
- **Example vendors:** Contree (ships 7,000+ SWE-bench environments as tags), Runloop (SWE-bench focus), Modal (50K+ concurrency)

### 9. Best-of-N Sampling & Tree Search

An agent generates N candidate solutions, runs each in isolation, scores them, and returns the best. Essential for tree-search coding agents and RL training loops.

- **Best for:** Tree-search coding agents, best-of-N generation, Monte Carlo tree search over code
- **Required:** Fast branching from a shared base, cheap parallel sandboxes, result aggregation
- **Example vendors:** Contree (branching-first), Modal (snapshots + concurrency), Sprites.dev (hibernate-based parallelism)

### 10. Latent / Research Use Cases

Emerging use cases that sandbox infrastructure is starting to enable:

- **Training data generation pipelines** — Use branching to generate diverse agent traces for RL training. The branching tree *is* the replay buffer.
- **Reproducibility-as-a-service** — Cite image UUIDs in papers and blog posts; reviewers and readers can reproduce exact environments on demand.
- **Counterfactual debugging** — "What if the agent had done X at step 7?" Fork from a checkpoint, change the action, observe the outcome.
- **Multi-agent coordination & competition** — Fork state, run multiple agents concurrently against the same baseline, evaluate interaction outcomes.
- **Educational sandboxes with visible traces** — Instructors inspect the full attempt tree of a student's agent, not just the final output.
- **Regulatory audit trails** — Environment lineage as an immutable audit artifact for finance/healthcare compliance.

These are largely underexplored today but represent where sandbox infrastructure is heading as agent workflows mature.

---

## Isolation Tiers — The Security Ladder

Sandboxes vary dramatically in how strongly they isolate. Choosing the right tier is a security decision, not a performance decision.

| Tier | Tech | Boundary | Exploit Surface | Use When |
|------|------|----------|----------------|----------|
| **Process Isolation** | chroot, namespaces, Firejail | Same OS, separated process | Kernel syscalls, /proc, shared FS | Dev-only, trusted code, CI with known inputs |
| **Container Isolation** | Docker, Podman | Shared OS kernel | Kernel exploits, container escape | Internal agent use, non-sensitive data |
| **User-Space Kernel** | gVisor | Intercepted syscalls | Smaller syscall surface | Good middle ground for mixed-trust code |
| **Firecracker microVM** | E2B, Sprites.dev, Contree | Dedicated kernel per sandbox | Hypervisor exploits only | Untrusted LLM-generated code, standard |
| **Dedicated VM** | Coral, AWS EC2, AgentComputer | Full hardware isolation | Physical attacks, hypervisor | Production credentials, regulated data |
| **Bare Metal** | Hetzner dedicated, EC2 Mac (Nitro) | Physical server | Physical access | Extreme compliance, HSM-adjacent workloads |

**Recommendation for agents:** Default to **Firecracker microVM** (E2B, Sprites.dev, Contree). This is the sweet spot: hardware-level isolation with container-like startup speed and cost.

For agents handling production credentials or regulated data, step up to **dedicated VMs**.

---

## Purpose-Built Agent Sandboxes

The core vendor landscape — sandboxes designed specifically for running AI-generated code.

| Vendor | Isolation | Persistence | Cold Start | GPU | Price | Strength |
|--------|----------|------------|-----------|-----|-------|----------|
| **Contree** | microVM (Nebius) | Git-like branching + snapshots | Sub-sec | Yes | Usage | Git-style fork/rollback, MCP server + Python SDK, Nebius-backed |
| **E2B** | Firecracker microVM | Ephemeral / pause (beta) | ~150ms | No | $100 credit | Dedicated kernel, SDK-first, SOC 2, 200M+ sandboxes |
| **Sprites.dev** | Firecracker microVM | Indefinite + hibernate | Instant | No | Per-sec | Hibernate ~300ms, zero idle cost |
| **Daytona** | Docker containers | Stateful, unlimited | ~90ms | Yes | $200 credit | GPU support, fastest creation, Computer Use desktops |
| **Modal** | gVisor sandbox | Snapshots | Sub-sec | Yes | $30/mo | 50K+ concurrency, full GPU (A100/H100), SOC 2 |
| **Runloop** | Custom hypervisor | Snapshots | Sub-sec | No | Contact | SOC 2, 10K+ parallel, SWE-bench focus, VPC deploy |
| **Northflank** | microVM / gVisor | Stateful | Sub-sec | Yes (H100s) | Usage | Enterprise VPC (AWS/GCP/Azure), multi-cloud, SOC 2 |
| **AgentComputer** | Ubuntu VMs | 25 GB persistent | Sub-sec | No | $20/mo | Built for Claude/Codex agents, API-driven |
| **Microsandbox** | libkrun microVM | Stateful | Sub-sec | No | Free (OSS) | Network-layer secret injection, self-hosted, YC X26 |
| **Zeroboot** | Firecracker CoW | Snapshots | Sub-ms (0.79ms) | No | Free (OSS) | 480x memory density, prototype |
| **AIO Sandbox** | Docker | Stateful | Sub-sec | No | Free (OSS) | Browser+Shell+IDE+MCP, ByteDance-backed |
| **OpenSandbox** | Docker / K8s | Stateful | Sub-sec | No | Free (OSS) | Protocol-driven K8s runtime, Alibaba-backed |
| **Quilt** | Linux namespaces | Stateful | Sub-sec | No | Free (OSS) | Inter-container networking, Rust |
| **CodeSandbox SDK** | microVMs | Forking/snapshots | Sub-sec | No | Usage | SOC 2, owned by Together AI |

---

## Contree — The Git-Native Sandbox

[Contree](https://contree.dev) is worth understanding in depth because it represents a fundamentally different approach to agent sandboxing. Built by [Nebius](https://nebius.com), it treats the sandbox as a version-controlled filesystem rather than an ephemeral container.

### The Git Mental Model

- **Images = commits** — Container images with state, tagged and immutable
- **Branches = parallel work** — Fork from any checkpoint to explore alternatives
- **Tags = snapshots** — Named references to specific sandbox states
- **Merge = consolidation** — (Conceptually) combine outcomes from multiple branches

This matches how reasoning agents should actually operate: explore options, evaluate outcomes, commit to the best path, branch again. Other sandboxes treat state as linear and ephemeral, forcing agents to discard context when they try something new.

### Why This Matters for Agent Patterns

**Tree-of-thought sandboxing**: An agent can checkpoint the current environment, spawn N branches exploring different approaches, run each in parallel, evaluate, and continue with the winner. No other sandbox makes this native.

**Rollback-on-failure**: If an agent's code execution produces a bad state (failed test, corrupted file, wrong migration), the entire sandbox rolls back in milliseconds — no rebuild required.

**Preloaded environment pools**: Use checkpoint-and-branch to instantiate thousands of pre-configured environments instantly. Ideal for batch eval, SWE-bench runs, or agent benchmarking at scale.

**Per-task isolation at scale**: Each task forks from a golden base — no contamination between parallel agent runs, no setup time per task.

### Three Ways to Use It

1. **Managed service** — API-driven, no infrastructure to run
2. **MCP server (`contree-mcp`)** — 17 tools (`run`, `rsync`, `import_image`, `list_images`, `upload`, `download`, `registry_auth`, operation management) — drops into any MCP-compatible client like Claude Code
3. **Python SDK (`contree-sdk`)** — Sync + async clients with image and session abstractions

### Durability-Ranked Differentiation

Based on [independent strategic analysis](https://github.com/opencolin/contree-skill/blob/main/strategy.md), Contree's differentiation ranks in four tiers:

1. **Branching as a first-class primitive (strong, narrow).** Content-addressed storage plus microVM spawning is an architectural choice competitors can't quickly retrofit. The catch: outside tree-search agents and SWE research, branching is a feature looking for its killer use case. Adoption depends on agent workflows catching up.
2. **7,000+ preloaded SWE-bench environments (strong, narrow).** Possibly the most underleveraged asset in the category. Reproducing SWE-bench from scratch takes weeks; Contree ships it as a tag. A single image UUID can cite an exact benchmark environment in a paper or PR.
3. **MCP-native design (medium, broadening).** MCP-first rather than SDK-first — aligned with where agent tooling is standardizing. Most competitors bolted MCP on later; Contree's is primary.
4. **Nebius infrastructure integration (medium, private).** Cost advantages from microVM spawning, storage, and colocated inference are invisible externally but show up in pricing aggression.

### Where Contree Wins vs. Where It Doesn't

The sandbox market has tiered fit — not every use case wants a branching sandbox.

**Tier 1 — E2B's territory.** Individual LLM code snippets, one-shot execution, untrusted code review, data analysis notebooks. Contree can do these, but if branching and preloaded environments aren't part of the value, the incumbent wins on DX and ecosystem depth.

**Tier 2 — Contree's sweet spot (80%+ of where branching pays off):**
- SWE-bench benchmarking and research
- Tree-search coding agents
- Best-of-N sample selection
- Long-running multi-step agent traces with checkpoint/rollback
- Agent CI/CD across patches

**Tier 3 — Latent opportunities.** Training data generation for code RL, reproducibility-as-a-service, agent RL environments (the branching tree *is* the replay buffer), counterfactual debugging, multi-agent coordination, educational traces, compliance audit lineage. These are largely unbuilt today but map naturally to branching semantics.

### When Contree Is the Right Choice

- You're running multi-hypothesis reasoning agents
- You need rollback semantics without the cost of rebuilding
- You're already on Nebius (inference + GPUs) and want a unified stack
- You're running benchmarks or evals at scale (SWE-bench, Bird-SQL, custom harnesses) with shared golden environments
- You're training code-RL models and need diverse trace generation
- You want MCP-native integration with Claude Code or Cursor
- You're publishing research and want cite-able, reproducible environments

### When to Pick Something Else

- Single-shot code execution with no branching or rollback needs → E2B (simpler SDK, larger ecosystem)
- Always-on persistent agent workspaces → Sprites.dev or AgentComputer
- Heavy GPU workloads that aren't SWE-bench-shaped → Modal (better concurrency + GPU economics)
- Deep enterprise VPC requirements → Northflank or Runloop

**Resources:** [Docs](https://docs.contree.dev/) · [MCP Quickstart](https://docs.contree.dev/mcp/quickstart.html) · [Python SDK](https://docs.contree.dev/sdk/python_sdk/index.html) · [Contree Skill for Claude Code](https://github.com/opencolin/contree-skill/) · [Strategic analysis](https://github.com/opencolin/contree-skill/blob/main/strategy.md)

---

## Cloud Development Environments (CDEs)

When agents need persistent dev environments rather than ephemeral sandboxes — the Stripe Minions / devbox model. These are full OS environments with source code pre-loaded, tools installed, and services running.

| Vendor | Isolation | Price | Key Strength |
|--------|----------|-------|-------------|
| **GitHub Codespaces** | Container per workspace | Usage-based | Native GitHub integration, most-used CDE |
| **Gitpod / Gitpod Flex** | Container per workspace | Free + paid | Ephemeral per-PR dev environments |
| **Coder** | Self-hosted CDE | OSS + enterprise | Self-hosted dev env orchestration, Terraform-based |
| **DevPod** | Client-only CDE (Loft Labs) | Free OSS | BYO infra dev containers, no server needed |
| **JetBrains Space / CodeCanvas** | Managed | Paid | JetBrains IDE-native cloud environments |
| **Replit Sandboxes / Nix** | Nix sandbox | Freemium | Nix-based reproducible sandboxes |
| **Vercel Sandbox** | Vercel-hosted | Usage-based | Ephemeral exec for AI workloads, Vercel-native |
| **Cloudflare Sandbox / Containers** | Edge containers | Usage-based | Edge-deployed isolated containers |
| **StackBlitz WebContainers** | In-browser Node | Free + commercial API | Full Node stack in-browser, no server |
| **Val Town** | Serverless JS | Free + paid | Write and share server-side JS instantly |

**CDE vs Sandbox — which do you want?**

- **Sandbox** (E2B, Contree, Modal) — Short-lived, per-task, code-execution focused. Spin up, run code, shut down.
- **CDE** (Codespaces, Gitpod, Coder) — Long-lived, per-user/project, dev-environment focused. Persistent state across sessions.

Agents frequently use both: a CDE as their "home base" that runs the agent itself, and sandboxes spawned from within the CDE for actual code execution.

---

## Open-Source Isolation Primitives

The underlying technologies that higher-level sandboxes build on. Useful if you're building your own sandbox or need specific guarantees.

| Tech | Maintainer | Isolation Level | Key Strength |
|------|-----------|-----------------|-------------|
| **Firecracker** | AWS (OSS) | microVM | Powers Lambda/Fargate, <125ms boot, <5MB memory overhead |
| **Kata Containers** | OpenInfra Foundation | VM-isolated OCI | OCI-compatible containers with VM-level isolation |
| **gVisor** | Google | User-space kernel | Syscall interception, smaller attack surface than containers |
| **Nsjail** | Google | Namespaces + seccomp | Lightweight Linux process jail |
| **Firejail** | OSS community | SUID sandbox | Simple namespace/seccomp app sandboxing |
| **Bubblewrap** | Flatpak project | Unprivileged namespaces | Flatpak's underlying sandbox tech |
| **Jailkit** | OSS community | chroot-based | Classic chroot user jails |
| **libkrun** | Containers/OSS | microVM library | Used by Microsandbox |

---

## Agent Patterns Enabled by Modern Sandboxes

Specific patterns that become possible when sandboxes support fast branching, checkpointing, and isolation.

### Pattern: Checkpoint-Explore-Commit

```
1. Agent reaches decision point → checkpoint current sandbox
2. Branch N sandboxes from checkpoint
3. Run alternative implementations in parallel
4. Score each outcome (tests pass, benchmark score, human review)
5. Destroy losing branches, continue with winner
```

Enables tree-of-thought reasoning at the environment level, not just the LLM level.

### Pattern: Golden Environment Pool

```
1. Pre-warm N sandboxes with standard config (deps installed, repo cloned, services running)
2. Tag the golden image
3. On task arrival, fork from golden (sub-second) instead of rebuilding
4. Discard task sandbox when done
```

Stripe's devbox approach, made native in Contree via Git-style tags. Reduces per-task setup time from minutes to milliseconds.

### Pattern: Destructive Operation Safety

```
1. Agent needs to run a database migration / delete files / refactor
2. Checkpoint sandbox before operation
3. Run operation; observe outcome
4. On failure, instantly restore from checkpoint
5. On success, commit new state as the baseline
```

Lets agents safely perform high-risk operations that would otherwise require extensive human oversight.

### Pattern: Fleet-Wide Reproducibility

```
1. Define sandbox image once (Dockerfile / Nix / OCI)
2. All agents in the fleet spawn from the same image
3. Deterministic behavior across CI, local dev, production agent runs
4. Bug reports reference exact image + commit → reproducible debugging
```

The sandbox becomes the unit of reproducibility, not the host machine.

### Pattern: Sandbox-as-Context

```
1. Sandbox state (files, installed packages, open processes) is part of agent context
2. Agent reasons about "what's installed" as readable context
3. New agent sessions resume from prior sandbox state without re-priming
4. Long-horizon agents maintain project context across weeks
```

Extends MCP-style context gathering to include environment state, not just files and tools.

---

## Decision Framework

Use this to pick a sandbox for your agent workflow.

| Question | If Yes | If No |
|----------|--------|-------|
| Need Git-style branching for tree-of-thought? | **Contree** | E2B / Sprites.dev / Modal |
| Need GPU for code execution? | Modal, Daytona, Northflank | E2B / Sprites.dev / Contree |
| Need persistent state across sessions? | Sprites.dev, AgentComputer, CDEs | E2B (ephemeral) |
| Need enterprise VPC deployment? | Northflank, Runloop | Managed sandboxes |
| Handling untrusted/prompt-injected code? | microVM minimum (E2B, Contree, Sprites.dev) | Shared-kernel OK |
| Need sub-100ms cold start? | Zeroboot (~0.8ms), Daytona (~90ms) | Others |
| Running 10K+ parallel agents? | Runloop, Modal (50K+) | Purpose-built sandboxes |
| Want MCP-native integration? | **Contree**, AIO Sandbox | Others via custom wiring |
| Building your own sandbox? | Firecracker / libkrun / gVisor | Managed vendor |
| Need persistent dev environment (Minions-style)? | CDEs: Gitpod, Codespaces, Coder | Ephemeral sandboxes |
| Mac-specific workflows? | [Cloud Mac](infrastructure.md#cloud-mac-hosting) | Linux sandboxes |

---

## Integration Examples

### MCP Integration (Claude Code, Cursor, etc.)

The cleanest path for agent-sandbox integration is MCP. Agents gain sandbox tools via the same protocol they use for every other capability.

**Contree via MCP:**
```json
{
  "mcpServers": {
    "contree": {
      "command": "npx",
      "args": ["-y", "contree-mcp"],
      "env": { "CONTREE_API_KEY": "..." }
    }
  }
}
```

Once configured, agents can `import_image`, `run`, `rsync`, `upload`, `download`, and manage operations through natural tool calls.

### SDK Integration (Python)

For programmatic agent frameworks (LangChain, CrewAI, custom harnesses):

```python
from contree import ContreeClient

client = ContreeClient(api_key=...)
image = client.import_image("docker://python:3.11-slim")
session = client.run(image, "pip install numpy && python -c 'import numpy'")
result = session.wait()
```

Similar SDK patterns exist for E2B, Modal, Daytona. Choose based on which client supports your orchestration framework best.

### Custom Harness Pattern

```python
# Pseudocode for a tree-of-thought agent using Contree-style branching
base = sandbox.checkpoint()
branches = []
for approach in agent.generate_approaches(task):
    branch = sandbox.fork_from(base)
    branch.run(approach)
    branches.append((approach, branch, branch.test_score()))

winner = max(branches, key=lambda b: b[2])
for approach, branch, score in branches:
    if branch != winner[1]:
        branch.destroy()

return winner[1].artifact()
```

This pattern is impractical without fast branching (Contree) or snapshots (Modal, Sprites.dev).

---

## Further Reading

- [Hosting & Execution](infrastructure.md) — Full hosting landscape including sandboxes in context
- [Inference](inference.md) — LLM providers that produce the code your sandbox runs
- [Patterns](patterns.md) — Broader agentic engineering patterns including failure recovery and multi-agent coordination
- [Approaches](approaches.md) — Systems like Stripe Minions and OpenAI Symphony that depend on sandbox infrastructure
