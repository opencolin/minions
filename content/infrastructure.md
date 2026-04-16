# Hosting & Execution Infrastructure

Where agents actually run — the compute infrastructure for sandboxed, scalable agent execution. This page covers 50+ vendors across 6 tiers, sourced from ClawCamp Research market guides (April 2026).

For LLM inference solutions, see [Inference](inference.md).

---

## Agent Hosting & Execution Platforms

The agent hosting market has segmented into six distinct tiers, each with different trade-offs for cost, control, security, and time-to-value.

### The Hosting Decision Framework

| Tier | Representative Vendors | Infra Mgmt | Per-Agent Cost | Time-to-Value | Control |
|------|----------------------|-----------|---------------|--------------|---------|
| Turnkey / No-Code | ZenClaw, KlausAI, Coral, Lindy | Zero | Highest ($19-400/mo) | Hours | Limited |
| Agent-Optimized | ClawHost, Claw Cloud, Zo Computer | Minimal | Moderate ($1.50-25/mo) | Hours-Days | Moderate |
| Sandbox + Orchestration | E2B, Sprites.dev, Modal, Temporal, LangGraph | Moderate | Usage-based | Days-Weeks | High |
| Serverless | Nebius Serverless, AWS Lambda, Modal | Near-zero | Usage-based | Hours-Days | Moderate-High |
| Cloud Mac | MacStadium, AWS EC2 Mac, Scaleway | Low-Moderate | Monthly subscription | Hours-Days | High |
| Self-Hosted | Hetzner, Contabo, AWS EC2, Railway, Nebius VM | Full | Lowest per-unit | Weeks | Full |

---

## Code Execution Sandboxes

Isolated environments where agents execute generated code safely. The most consequential security distinction is the isolation model.

| Vendor | Isolation | Persistence | Cold Start | GPU | Price | Strength |
|--------|----------|------------|-----------|-----|-------|----------|
| **E2B** | Firecracker microVM | Ephemeral / pause (beta) | ~150ms | No | $100 credit | Dedicated kernel, SDK-first, SOC 2 |
| **Sprites.dev** | Firecracker microVM | Indefinite + hibernate | Instant | No | Per-sec | Hibernate ~300ms, zero idle cost |
| **Daytona** | Docker containers | Stateful, unlimited | ~90ms | Yes | $200 credit | GPU support, fastest creation |
| **Modal** | gVisor sandbox | Snapshots | Sub-sec | Yes | $30/mo | 50K+ concurrency, full GPU, SOC 2 |
| **Runloop** | Custom hypervisor | Snapshots | Sub-sec | No | Contact | SOC 2, 10K+ parallel, SWE-bench focus |
| **Northflank** | microVM / gVisor | Stateful | Sub-sec | Yes (H100s) | Usage | Enterprise VPC, multi-cloud, SOC 2 |
| **AgentComputer** | Ubuntu VMs | 25 GB persistent | Sub-sec | No | $20/mo | Built for Claude/Codex agents |
| **Microsandbox** | libkrun microVM | Stateful | Sub-sec | No | Free (OSS) | Network-layer secret injection, self-hosted |
| **Zeroboot** | Firecracker CoW | Snapshots | Sub-ms (0.79ms) | No | Free (OSS) | 480x memory density, prototype |
| **AIO Sandbox** | Docker | Stateful | Sub-sec | No | Free (OSS) | Browser+Shell+IDE+MCP, ByteDance |
| **OpenSandbox** | Docker / K8s | Stateful | Sub-sec | No | Free (OSS) | Protocol-driven K8s runtime, Alibaba |
| **Quilt** | Linux namespaces | Stateful | Sub-sec | No | Free (OSS) | Inter-container networking, Rust |
| **CodeSandbox SDK** | microVMs | Forking/snapshots | Sub-sec | No | Usage | SOC 2, owned by Together AI |

**Isolation tiers matter:** Shared kernel containers (Docker, gVisor) provide process-level separation but share an OS kernel. Firecracker microVMs (E2B, Sprites.dev) provide dedicated kernels. Dedicated VMs (Coral, AgentComputer) provide the strongest isolation. Enterprises handling sensitive data should require dedicated kernel isolation at minimum.

---

## Turnkey Managed Platforms

Zero infrastructure management — deploy agents in minutes. Best for business teams validating agent ROI without dedicated engineering resources.

| Vendor | Isolation | Integrations | Price | Key Strength |
|--------|----------|-------------|-------|-------------|
| **ZenClaw AI** | NVIDIA NemoClaw | Multi-model | $400/mo | 9-second deploy, NVIDIA-backed |
| **KlausAI** | Isolated cloud | 40+ SaaS tools | $19/mo | Broadest SaaS integrations |
| **Coral** | Dedicated VM | 500+ integrations | $50/mo | Strongest security, auto cost routing |
| **Lindy AI** | Managed cloud | 6,000+ integrations | Free/$49.99 | Massive integration catalog |

---

## Agent-Optimized Hosting

OpenClaw-specific tooling — agent playgrounds, skills marketplaces, pre-configured integrations — on managed infrastructure. More control than turnkey with lower operational burden than self-hosting.

| Vendor | Isolation | Focus | Price | Key Strength |
|--------|----------|-------|-------|-------------|
| **ClawHost** | Hetzner VPS | Agent playground, ClawHub | $25/mo | Open-source (MIT), low cost |
| **Claw Cloud** | Container (Run) | MCP tools | Free/$1.50 | Free tier, 128 vCPU max |
| **Zo Computer** | Managed server | Personal AI cloud | Free/$18 | Always-on, consumer-oriented |

---

## Agent Orchestration

Durable execution frameworks for running long-lived agent workflows with retry logic, state management, and multi-agent composition.

| Vendor | Type | Open Source | Price | Key Strength |
|--------|------|-----------|-------|-------------|
| **LangGraph Cloud** | Managed hosting | Yes (framework) | Free / $39/user | Durable runtime, LangSmith observability |
| **Temporal.io** | Durable execution | Yes (MIT) | $100/mo managed | Battle-tested, language-native SDKs |
| **Kagent** | K8s framework | Yes (Apache 2.0) | Free OSS | K8s-native, CNCF, multi-framework |

---

## Cloud Mac Hosting

Dedicated macOS environments for agents needing Apple-native capabilities — iMessage, Xcode, iOS Simulator, Neural Engine inference. A hard requirement for agents in the Apple ecosystem.

| Vendor | Hardware | Isolation | Price | Key Strength |
|--------|---------|----------|-------|-------------|
| **MacStadium** | M1/M2/M4 Mac Mini + Max | Orka virtualization | Monthly | Largest Mac cloud, <1s VM launch |
| **AWS EC2 Mac** | M4/M4 Pro/Max (Nitro) | Bare metal | Hourly (dedicated) | Full AWS VPC/EBS integration |
| **Scaleway Mac** | M4 Mac Mini | Bare metal | Hourly | EU sovereign hosting (Paris DC) |
| **MacinCloud** | M1/M2 | Managed / dedicated | Monthly | Global presence, managed CI/CD |
| **Roundfleet** | M4/M4 Pro/Max Mac Mini | Dedicated | Monthly | High availability, fast provisioning |
| **Flow Swiss** | M-series Apple silicon | Bare metal | Monthly | Swiss data sovereignty |

---

## Self-Hosted Infrastructure

Full control over the entire stack. Lowest per-unit cost but highest operational burden.

| Vendor | Type | GPU | Starting Price | Key Strength |
|--------|------|-----|---------------|-------------|
| **Nebius VM** | Dedicated GPU VM | B300/B200/H200/H100/L40S | Hourly + preemptible | Latest GPUs, preemptible discounts, full tenant isolation |
| **Nebius Serverless** | Container + GPU serverless | Yes | Usage-based | Aether 3.5, DevPods/Jobs/Endpoints, pay-as-you-go, zero infra mgmt |
| **AWS EC2** | Virtual machines | Yes | On-demand | Full control, broadest GPU range |
| **AWS Lambda** | Serverless functions | No | $0.20/1M req | Scale-to-zero, vast ecosystem |
| **DigitalOcean** | Droplets (VMs) | Yes | $4/mo | Developer-friendly, managed K8s |
| **Fly.io** | Firecracker VMs | Ltd | Per-second | 30+ regions, Sprites integration |
| **Render** | Persistent containers | No | Free / $25 | SOC 2, HIPAA, ISO 27001 |
| **Railway** | Containers | No | $5/mo | Hard spending caps, MCP server |
| **Heroku** | Dynos (containers) | No | $5/mo | Simple git-push, add-ons |
| **Hetzner** | Cloud VPS + Dedicated | Yes | EUR 3.79 | Exceptional price-to-performance |
| **OVHcloud** | VPS + Bare Metal | Yes | EUR 3.50 | EU data sovereignty, 40+ DCs |
| **Hostinger** | VPS | No | $4.99/mo | Budget-friendly, global reach |
| **GTHost** | Dedicated + GPU | Yes | Custom | AI/ML optimized |
| **Contabo** | VPS + Bare Metal + GPU | Yes | EUR 3.60 | Aggressive pricing, H200 |

---

## What Stripe Uses

Stripe's devbox infrastructure is essentially a **custom agent sandbox platform** built on AWS EC2:

- Pre-warmed EC2 instance pools for ~10 second spin-up
- Full dev environment with source code and services pre-loaded
- Isolated from production and internet
- Identical to human developer machines
- No git worktree overhead — full VM isolation

---

## Sandbox vs. Serverless: Fit-for-Purpose

A critical distinction often missed: code execution sandboxes (E2B, Sprites, Daytona) are designed for short-running, developer-oriented workflows — executing code, running tests, isolating discrete tasks. They are not architected for long-running, always-on agents. Serverless agent-ready platforms (Nebius Serverless, AWS Lambda, Modal) address this gap with faster cold-start wake times, container-based GPU execution, and billing models aligned with agent utilization rather than continuous reservation. Teams should select based on workload duration, not just cost per compute unit.

---

## Key Trends

- **Security is the primary buying criterion** — The ClawJacked vulnerability (CVE-2026-25253) exposed credential isolation weaknesses across the ecosystem. Demand for dedicated VM/microVM isolation has surged. Only a minority of platforms offer hardware-level isolation guarantees.
- **Cost optimization via model routing** — LLM API costs comprise 60-80% of agent operating expenses. See [Inference](inference.md#cost-optimization-through-model-routing) for details on intelligent routing strategies.
- **Checkpoint/hibernate patterns** — Sprites.dev's ~300ms checkpoint/restore and auto-sleep after 30 seconds of idle time represents a shift from always-on to always-available agent infrastructure. Full state preservation with zero idle cost is expected to become standard.
- **Multi-agent composition drives orchestration demand** — As deployments mature from single agents to multi-agent systems, demand for durable orchestration layers (Temporal, LangGraph) is accelerating.

---

## Choosing Your Stack

### Starter Stack (Low investment)

- **Inference:** Direct API (Anthropic or OpenAI) — see [Inference](inference.md)
- **Agent:** Claude Code, OpenHands, or OpenCode
- **Compute:** Local Docker or GitHub Actions
- **Cost:** Pay-per-use API tokens only

### Growth Stack (Medium investment)

- **Inference:** Direct API + LiteLLM gateway for routing and observability
- **Agent:** OpenHands or Open SWE with custom rule files
- **Compute:** E2B or Modal for sandboxed execution
- **Orchestration:** GitHub Actions or Slack bot for triggers
- **Cost:** ~$0.50-5 per agent run depending on complexity

### Scale Stack (Medium-high investment)

- **Inference:** Nebius Token Factory for self-hosted open models + direct API for proprietary models
- **Agent:** OpenHands or custom harness with multi-model routing
- **Compute:** Nebius managed Kubernetes with GPU clusters for model serving + E2B for agent sandboxes
- **Orchestration:** AgentField or Symphony
- **Advantage:** Best price-performance for teams running open-weight models at high volume. Nebius's serverless inference autoscales with agent demand, and the KV-aware routing keeps latency low during multi-turn agent loops.
- **Cost:** Predictable token-level pricing, significantly lower than API providers at volume

### Enterprise Stack (High investment)

- **Inference:** Multi-provider with Portkey gateway, tiered model routing. Nebius GPU clusters for self-hosted models, direct API for proprietary.
- **Agent:** Custom agent harness (like Stripe's Goose fork)
- **Compute:** Dedicated VMs or K8s cluster with pre-warmed pools (Nebius offers managed K8s with up to thousands of GPUs)
- **Orchestration:** Custom blueprint/workflow engine
- **Context:** Centralized MCP server (like Stripe's Toolshed)
- **Cost:** Significant infrastructure investment, but amortized across 1,000+ agent runs/week

---

## Decision Framework

| Question | If Yes... | If No... |
|----------|-----------|----------|
| Need full OS isolation per run? | E2B, Modal, or custom VMs | Docker or git worktrees |
| Running 100+ agents/day? | Dedicated infrastructure, K8s | Serverless (Modal, Lambda) |
| Need macOS-specific capabilities? | Cloud Mac (MacStadium, AWS EC2 Mac, Scaleway) | Linux sandboxes |
| Handling production credentials? | Dedicated VM / microVM (Coral, AgentComputer, Nebius VM) | Shared-kernel OK |
| EU data sovereignty required? | Hetzner, OVHcloud, Contabo, Scaleway, Flow Swiss | Global providers |
| Long-running always-on agents? | Serverless agent-ready (Nebius, Lambda, Modal) | Ephemeral sandboxes |
| Budget-constrained at scale? | Self-hosted (Hetzner, Contabo) with custom hardening | Managed platforms |

See also: [Inference Solutions](inference.md) for choosing your LLM provider.
