# Infrastructure for Agentic Engineering

The infrastructure layer that powers autonomous coding agents — from LLM inference to serverless compute for agent execution.

---

## Inference Solutions

Agents need fast, reliable access to capable LLMs. The choice of inference provider affects cost, latency, model selection, and reliability.

### Direct API Providers

The model developers themselves, offering first-party API access.

| Provider | Key Models | Strengths | Pricing Model |
|----------|-----------|-----------|---------------|
| **Anthropic** | Claude Opus, Sonnet, Haiku | Best-in-class coding, long context (200K), tool use | Per-token |
| **OpenAI** | GPT-4.1, o3, o4-mini | Broad ecosystem, function calling, vision | Per-token |
| **Google** | Gemini 2.5 Pro/Flash | 1M+ context window, multimodal, competitive pricing | Per-token |
| **xAI** | Grok 3 | Long context, competitive coding performance | Per-token |
| **DeepSeek** | DeepSeek V3, R1 | Strong coding, open weights, very low cost | Per-token |

### Inference Platforms

Third-party platforms that host open-weight models and sometimes proxy proprietary ones, often at lower cost or higher throughput.

| Platform | What It Does | Best For |
|----------|-------------|----------|
| **Together AI** | Hosts open models (Llama, Mixtral, DeepSeek) with serverless and dedicated endpoints | Cost-effective open model inference, fine-tuned models |
| **Fireworks AI** | High-throughput inference with function calling optimizations | Low-latency tool use, structured outputs |
| **Groq** | Custom LPU hardware for ultra-fast inference | Latency-sensitive agent loops, rapid iteration |
| **Cerebras** | Wafer-scale inference for massive throughput | High-throughput batch agent runs |
| **Anyscale** | Ray-based serving for open models | Self-managed scaling, custom deployments |
| **Replicate** | Run open models via API with simple pricing | Quick experimentation, varied model access |
| **Modal** | Serverless GPU compute for custom model serving | Custom fine-tuned models, flexible compute |

### Routing & Gateway Solutions

Middleware that sits between agents and inference providers, adding reliability, cost optimization, and multi-model support.

| Solution | What It Does | Best For |
|----------|-------------|----------|
| **LiteLLM** | Unified API for 100+ LLM providers with load balancing, fallbacks, and spend tracking | Multi-provider setups, cost management |
| **OpenRouter** | Routes requests across providers with automatic fallbacks and price comparison | Multi-model agents, cost optimization |
| **Portkey** | AI gateway with caching, retries, load balancing, and observability | Production agent deployments |
| **Helicone** | Observability and proxy layer for LLM calls with cost tracking | Debugging agent behavior, cost analysis |

### Self-Hosted Inference

Running models on your own infrastructure for maximum control, privacy, and cost optimization at scale.

| Solution | What It Does | Best For |
|----------|-------------|----------|
| **Ollama** | Run models locally with simple CLI | Development, testing, privacy-sensitive work |
| **vLLM** | High-throughput serving engine with PagedAttention | Production self-hosted inference |
| **TGI (Text Generation Inference)** | Hugging Face's production serving solution | Hugging Face model ecosystem |
| **SGLang** | Fast serving with RadixAttention for structured generation | Tool-use heavy agents, structured outputs |
| **llama.cpp** | CPU/GPU inference for GGUF models | Edge deployment, resource-constrained environments |

### Inference Strategy for Agents

Most production agent systems use a **tiered inference strategy**:

1. **Routing/classification** — Cheap, fast models (Haiku, GPT-4.1-mini, Flash) for deciding what to do
2. **Implementation** — Capable models (Sonnet, GPT-4.1, Gemini Pro) for writing code
3. **Complex reasoning** — Top-tier models (Opus, o3) for architectural decisions and difficult bugs
4. **Verification** — Mid-tier models for code review and test analysis

This mirrors OhMyOpenAgent's multi-model routing (visual, reasoning, quick fix, ultrabrain) and AgentField's `.ai()` vs `.harness()` primitives.

**Key insight:** Architecture quality matters more than model capability. AgentField scored 95/100 with both Claude Haiku and MiniMax M2.5 because verification loops and escalation hierarchies compensate for model limitations through iteration.

---

## Serverless Hosting & Agent Compute

Where agents actually run — the compute infrastructure for sandboxed, scalable agent execution.

### Agent Sandbox Platforms

Purpose-built for running AI agents in isolated environments.

| Platform | What It Does | Isolation | Best For |
|----------|-------------|-----------|----------|
| **E2B** | Cloud sandboxes for AI agents with filesystem, terminal, and code execution | Per-sandbox VM | Agent frameworks needing full OS access |
| **Daytona** | Development environment management with standardized devcontainers | Container-based | Teams standardizing agent dev environments |
| **Rivet Sandbox Agent** | Universal API to run any coding agent in any sandbox runtime | Multi-runtime (E2B, Daytona, Modal, Docker) | Abstraction over sandbox providers |
| **Morph Cloud** | Snapshot-based VM infrastructure with instant fork/restore | VM snapshots | Checkpoint-based agent execution, branching |

### Serverless Compute Platforms

General-purpose serverless platforms commonly used for agent workloads.

| Platform | What It Does | Best For |
|----------|-------------|----------|
| **Modal** | Serverless GPU/CPU compute with instant cold starts, container snapshots | Custom agent runtimes, GPU-accelerated tasks, model serving |
| **Fly.io** | Edge compute with persistent VMs and global distribution | Long-running agent processes, low-latency globally |
| **Railway** | Deploy from Git with automatic builds and scaling | Simple agent deployments, background workers |
| **Render** | Managed infrastructure with background workers and cron jobs | Straightforward agent hosting |
| **AWS Lambda** | Event-driven serverless functions | Short-lived agent subtasks, event triggers |
| **Google Cloud Run** | Container-based serverless with long timeout support | Containerized agents needing extended execution |
| **Vercel Functions** | Edge and serverless functions integrated with frontend | Agent APIs, webhook handlers, Slack bot backends |

### Container & VM Orchestration

For teams running agents at scale with more control.

| Platform | What It Does | Best For |
|----------|-------------|----------|
| **Kubernetes** | Container orchestration with autoscaling | Large-scale agent deployments (OpenHands supports K8s) |
| **Docker Compose** | Multi-container local/production setups | Development, small-scale deployments |
| **AWS ECS/Fargate** | Managed container orchestration | Enterprise agent fleets without K8s overhead |
| **Nomad** | Lightweight orchestrator for mixed workloads | Simpler alternative to K8s for agent scheduling |

### What Stripe Uses

Stripe's devbox infrastructure is essentially a **custom agent sandbox platform** built on AWS EC2:

- Pre-warmed EC2 instance pools for ~10 second spin-up
- Full dev environment with source code and services pre-loaded
- Isolated from production and internet
- Identical to human developer machines
- No git worktree overhead — full VM isolation

This is the most sophisticated approach but requires significant investment. For most teams, a combination of E2B or Modal for sandboxing plus a serverless platform for orchestration achieves 80% of the value at a fraction of the cost.

---

## Choosing Your Stack

### Starter Stack (Low investment)

- **Inference:** Direct API (Anthropic or OpenAI)
- **Agent:** Claude Code, OpenHands, or OpenCode
- **Compute:** Local Docker or GitHub Actions
- **Cost:** Pay-per-use API tokens only

### Growth Stack (Medium investment)

- **Inference:** Direct API + LiteLLM gateway for routing and observability
- **Agent:** OpenHands or Open SWE with custom rule files
- **Compute:** E2B or Modal for sandboxed execution
- **Orchestration:** GitHub Actions or Slack bot for triggers
- **Cost:** ~$0.50-5 per agent run depending on complexity

### Enterprise Stack (High investment)

- **Inference:** Multi-provider with Portkey gateway, tiered model routing
- **Agent:** Custom agent harness (like Stripe's Goose fork)
- **Compute:** Dedicated VMs or K8s cluster with pre-warmed pools
- **Orchestration:** Custom blueprint/workflow engine
- **Context:** Centralized MCP server (like Stripe's Toolshed)
- **Cost:** Significant infrastructure investment, but amortized across 1,000+ agent runs/week

### Decision Framework

| Question | If Yes... | If No... |
|----------|-----------|----------|
| Need full OS isolation per run? | E2B, Modal, or custom VMs | Docker or git worktrees |
| Running 100+ agents/day? | Dedicated infrastructure, K8s | Serverless (Modal, Lambda) |
| Using open-weight models? | Together, Fireworks, or self-hosted vLLM | Direct API providers |
| Need multi-model routing? | LiteLLM or OpenRouter gateway | Single provider SDK |
| Privacy/compliance requirements? | Self-hosted inference + private compute | Cloud providers with DPAs |
| Budget-constrained? | Haiku/Flash for routing + Sonnet for coding | Opus/GPT-4.1 for everything |
