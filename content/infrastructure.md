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
| **Contree** | microVM (Nebius) | Git-like branching + snapshots | Sub-sec | Yes | Usage | Git-style fork/rollback, MCP server + Python SDK, Nebius-backed |
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

### Contree — Git-Native Sandbox for Agents

[Contree](https://contree.dev) is a standout in the sandbox category: built by [Nebius](https://nebius.com), it combines VM-level isolation with a Git-inspired branching model that's uniquely suited to agent workloads. Rather than treating sandboxes as ephemeral containers, Contree treats them like a version-controlled filesystem — agents can checkpoint, branch, explore multiple solution paths in parallel, and instantly roll back without re-execution.

**Why this matters for agents:**

- **Branch-and-explore workflows** — An agent can fork from any checkpoint to try multiple approaches, evaluate outcomes, and continue down the best path. This maps directly to how reasoning agents should operate (explore, evaluate, commit) but is natively impossible in traditional sandbox platforms.
- **VM-level isolation with container efficiency** — Hardware-level guarantees for untrusted code execution, without the overhead of spinning up full VMs for each run.
- **OCI-compliant image support** — Bring any Docker Hub / GHCR image as a sandbox base. The mental model aligns with Git: images are commits, branches enable parallel work, tags are snapshots.
- **MCP-native** — First-class MCP server (`contree-mcp`) with 17 tools (run, rsync, import_image, list_images, upload, download, registry_auth, operation management, etc.) — drops into any MCP-compatible agent like Claude Code without glue code.
- **Python SDK** — Sync and async clients (`contree-sdk`) with image and session abstractions for programmatic use.
- **Resource tracking** — Built-in monitoring of CPU time, memory, and I/O per execution.
- **Async operations** — Long-running tasks with polling and cancellation — essential for agent workloads that may run for minutes or hours.

**Unique agent patterns this enables:**

- *Tree-of-thought sandboxing* — Fork the environment at each decision point, run parallel branches to evaluate, then merge the winner. This is the AgentField "branching and rollback" pattern made native.
- *7,000 preloaded environments* — Use checkpoint-and-branch to instantiate thousands of pre-configured environments instantly, then fork for per-task work. Ideal for benchmarking, batch agent runs, or large-scale eval harnesses.
- *Rollback-on-failure* — If an agent's code execution produces a bad state, roll back the entire sandbox in milliseconds rather than rebuilding from scratch.

Contree is particularly well-suited to teams already using Nebius for inference (see [Inference](inference.md#nebius-ai-cloud--standout-platform)) — the combined stack gives you agent sandboxing, Token Factory serverless inference, and GPU clusters all on one provider with consistent pricing and operational tooling.

**Resources:** [Docs](https://docs.contree.dev/) · [MCP Quickstart](https://docs.contree.dev/mcp/quickstart.html) · [Python SDK](https://docs.contree.dev/sdk/python_sdk/index.html) · [Contree Skill (Claude Code)](https://github.com/opencolin/contree-skill/)

### Cloud Development Environments (CDEs)

Full dev environments that can host coding agents with persistent state, similar to Stripe's devbox approach but as managed services.

| Vendor | Isolation | Price | Key Strength |
|--------|----------|-------|-------------|
| **GitHub Codespaces** | Container per workspace | Usage-based | Native GitHub integration |
| **Gitpod / Gitpod Flex** | Container per workspace | Free + paid | Ephemeral per-PR dev environments |
| **Coder** | Self-hosted CDE | OSS + enterprise | Self-hosted dev env orchestration |
| **DevPod** | Client-only CDE (Loft Labs) | Free OSS | BYO infra dev containers, no server needed |
| **JetBrains Space / CodeCanvas** | Managed | Paid | JetBrains IDE-native cloud environments |
| **Replit Sandboxes / Nix** | Nix sandbox | Freemium | Nix-based reproducible sandboxes |
| **Vercel Sandbox** | Vercel-hosted | Usage-based | Ephemeral exec for AI workloads, Vercel-native |
| **Cloudflare Sandbox / Containers** | Edge containers | Usage-based | Edge-deployed isolated containers |
| **StackBlitz WebContainers** | In-browser Node | Free + commercial API | Full Node stack in-browser, no server |
| **Val Town** | Serverless JS | Free + paid | Write and share server-side JS instantly |

### Open-Source Isolation Primitives

The underlying isolation technologies that higher-level sandboxes build on.

| Tech | Maintainer | Key Strength |
|------|-----------|-------------|
| **Firecracker** | AWS (OSS) | MicroVM hypervisor powering Lambda/Fargate |
| **Kata Containers** | OpenInfra Foundation | VM-isolated OCI-compatible containers |
| **gVisor** | Google | User-space kernel via syscall interception |
| **Nsjail** | Google | Lightweight Linux process jail via namespaces |
| **Firejail** | OSS community | SUID sandbox with seccomp |
| **Bubblewrap** | Flatpak project | Unprivileged Linux sandboxing |
| **Jailkit** | OSS community | Classic chroot-based user jails |

---

## Turnkey Managed Platforms

Zero infrastructure management — deploy agents in minutes. Best for business teams validating agent ROI without dedicated engineering resources. This category now includes OpenClaw-native platforms, general no-code agent builders, enterprise agent hubs, and autonomous coding agents.

### OpenClaw-Native

| Vendor | Isolation | Integrations | Price | Key Strength |
|--------|----------|-------------|-------|-------------|
| **ZenClaw AI** | NVIDIA NemoClaw | Multi-model | $400/mo | 9-second deploy, NVIDIA-backed |
| **KlausAI** | Isolated cloud | 40+ SaaS tools | $19/mo | Broadest SaaS integrations |
| **Coral** | Dedicated VM | 500+ integrations | $50/mo | Strongest security, auto cost routing |
| **Lindy AI** | Managed cloud | 6,000+ integrations | Free/$49.99 | Massive integration catalog |

### Enterprise Agent Hubs

Platforms built for enterprise deployments with deep integration into existing enterprise stacks.

| Vendor | Price | Key Strength |
|--------|-------|-------------|
| **Microsoft Copilot Studio** | $200/25K msgs | Deep M365/Teams/Dataverse native integration |
| **Google Agentspace** | Enterprise paid | Gemini + Google Workspace + enterprise search unified |
| **AWS Bedrock Agents** | Usage-based (tokens) | Native AWS service/Lambda action group integration |
| **Dust** | Paid per seat ($29+/user) | Deep workspace data connectors (Notion, Slack, GitHub, Drive) |
| **Stack AI** | Paid tiered | SOC2/HIPAA compliance focus for regulated industries |
| **Sema4.ai** | Paid enterprise | Python-based agents with Robocorp RPA lineage |
| **Beam AI** | Paid enterprise | Vertical agents for ops/finance workflows |
| **Orby AI** | Enterprise | Learns workflows from user demonstrations |

### General No-Code Agent Builders

| Vendor | Price | Key Strength |
|--------|-------|-------------|
| **Relevance AI** | Freemium + usage | "AI workforce" framing with multi-agent teams and tool library |
| **n8n AI Agents** | Self-host free / Cloud $20+ | Fair-code licensed, 400+ integrations, self-hostable |
| **Zapier Agents / Central** | Usage-based tasks | 7000+ app integrations out of the box |
| **Vellum** | Paid tiered | Strong eval/prompt management with production workflows |
| **Retool Agents** | Paid per user | Bridges agents with internal apps/databases |
| **Voiceflow** | Freemium + paid | Specialized in voice/chat customer-facing agents |
| **Wordware** | Freemium | Prompts-as-code editor for agent flows |
| **Lutra AI** | Paid | Chat-driven multi-step SaaS automation |
| **Cognosys** | Freemium + usage | Browser-based autonomous web agents for research |
| **AgentGPT** | Freemium | Simplest "give goal, watch it work" UX |
| **MultiOn** | Freemium + API | Consumer-grade autonomous web agent |
| **SuperAGI** | Free OSS + cloud | GUI + marketplace for agent templates and tools |

### Autonomous Coding Agents

Agents specifically focused on software engineering tasks, from PRs to migrations.

| Vendor | Price | Key Strength |
|--------|-------|-------------|
| **Cognition Labs (Devin)** | $500/mo + ACU usage | End-to-end SWE autonomy with VM workspace per task |
| **Factory.ai** | Paid enterprise | Codebase-aware "Droids" for reviews, migrations, incidents |
| **Cursor Background Agents** | $20+/mo Pro | Tight IDE coupling with parallel background task execution |
| **Replit Agent** | $25/mo Core+ | Full app scaffolding + hosting in one workflow |
| **Fine.dev** | Paid | Focus on autonomous PRs and code tasks |
| **Adept** | Enterprise | Models trained specifically for UI actions |

### Visual Agent IDEs

Open-source and cloud-hosted visual builders for agent workflows.

| Vendor | Price | Key Strength |
|--------|-------|-------------|
| **AutoGen Studio** | Free (OSS) | Microsoft's GUI for AutoGen multi-agent conversations |
| **Flowise** | Free OSS + cloud | Visual LangChain/LlamaIndex orchestration |
| **Langflow** | Free OSS + cloud | DataStax-backed LangChain visual IDE |
| **CrewAI Enterprise** | Free OSS + paid cloud | Role-based crew orchestration paradigm |

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

Durable execution frameworks for running long-lived agent workflows with retry logic, state management, and multi-agent composition. The orchestration layer has become the central battleground for agent infrastructure — with durable execution engines, multi-agent frameworks, and cloud-native workflow platforms all competing.

### Durable Execution Platforms

General-purpose workflow engines that handle failure, retries, and state across long-running processes.

| Vendor | Type | Open Source | Price | Key Strength |
|--------|------|-----------|-------|-------------|
| **Temporal.io** | Durable execution | Yes (MIT) | OSS + Cloud usage | Battle-tested, polyglot SDKs, language-native |
| **Inngest** | Durable functions for AI | Yes | Free + usage | Step functions with first-class AI agent primitives |
| **Trigger.dev** | Background jobs with durable runs | Yes | Free + usage | Developer-friendly TS-native with long-running tasks |
| **Restate** | Durable async runtime | Yes | OSS + Cloud | Lightweight single-binary durable execution |
| **DBOS** | Durable execution in Postgres | Yes | OSS + Cloud | Stores state in your Postgres, no separate service |
| **Hatchet** | Distributed task queue + workflows | Yes | OSS + Cloud | Postgres-backed, Temporal-lite ergonomics |
| **Windmill** | OSS dev platform for workflows | Yes | OSS + Cloud | Scripts + flows + UIs in one self-hostable platform |
| **Orkes (Conductor)** | Managed Netflix Conductor | Yes | OSS + Cloud | Proven at Netflix scale, microservices orchestration |
| **Uber Cadence** | Temporal's predecessor | Yes | OSS | Uber-backed durable workflow engine |
| **Resonate HQ** | Distributed async/await | Yes | OSS | Durable promises as core primitive |
| **Kestra** | Declarative YAML orchestrator | Yes | OSS + cloud | YAML-first, language-agnostic |
| **Convex Workflows** | Durable workflows in reactive DB | No | Free + usage | Tightly integrated with reactive DB backend |
| **Cloudflare Workflows** | Durable execution on Workers | No | Usage-based | Edge-native durable execution |
| **Upstash Workflow** | Serverless durable workflows | No | Free + usage | QStash-backed, serverless-first |

### Cloud Provider Workflow Engines

Managed state-machine services from the major clouds.

| Vendor | Price | Key Strength |
|--------|-------|-------------|
| **AWS Step Functions** | Per-transition | Deep AWS integration, visual state machines |
| **Azure Durable Functions** | Consumption | Orchestrator pattern in Azure Functions |
| **Google Cloud Workflows** | Per-step | Serverless integration orchestration on GCP |

### Agent-Specific Orchestration Frameworks

Open-source and managed frameworks purpose-built for multi-agent systems.

| Vendor | Type | Price | Key Strength |
|--------|------|-------|-------------|
| **LangGraph / LangGraph Platform** | Stateful graph agents | OSS + Cloud ($39/user) | Graph-based agent state machines, LangSmith integration |
| **CrewAI** | Multi-agent role orchestration | OSS + enterprise | Role/task/crew abstraction |
| **Microsoft AutoGen** | Multi-agent conversation framework | OSS | Conversational multi-agent patterns |
| **OpenAI Swarm / Agents SDK** | Lightweight handoff orchestration | OSS | Minimal handoff-style agent routing |
| **LlamaIndex Workflows** | Event-driven agent workflows | OSS + cloud | Event-driven steps tied to LlamaIndex RAG |
| **Pydantic AI** | Type-safe agent framework | OSS | Pydantic-grade type safety for agents |
| **Burr** | State-machine agent framework | OSS | Explicit state machine + telemetry for agents |
| **Haystack Agents** | deepset's agent framework | OSS + cloud | Pipeline-oriented RAG + agents |
| **Mastra** | TypeScript AI agent framework | OSS | TS-native agents with workflows + evals |
| **Kagent** | K8s framework | Free OSS | K8s-native, CNCF, multi-framework |

### Data & ML Orchestrators (Cross-Over)

Traditional data/ML orchestrators increasingly used for AI agent workflows.

| Vendor | Price | Key Strength |
|--------|-------|-------------|
| **Prefect** | OSS + Cloud | Pythonic DAGs with dynamic runtime flows |
| **Dagster** | OSS + Cloud | Asset-first model, strong for data+AI pipelines |
| **Apache Airflow / Astronomer** | OSS + managed | Industry-standard data orchestration |
| **Flyte / Union.ai** | OSS + Cloud | Typed, reproducible ML pipelines, K8s-native |

---

## Cloud Mac Hosting

Dedicated macOS environments for agents needing Apple-native capabilities — iMessage, Xcode, iOS Simulator, Neural Engine inference. A hard requirement for agents in the Apple ecosystem.

### Dedicated Mac Hosting

| Vendor | Hardware | Isolation | Price | Key Strength |
|--------|---------|----------|-------|-------------|
| **MacStadium** | M1/M2/M4 Mac Mini + Max | Orka virtualization | Monthly | Largest Mac cloud, <1s VM launch |
| **AWS EC2 Mac** | M4/M4 Pro/Max (Nitro) | Bare metal | Hourly (24hr min dedicated) | Full AWS VPC/EBS integration |
| **Scaleway Mac** | M4 Mac Mini | Bare metal | Hourly | EU sovereign hosting (Paris DC) |
| **MacinCloud** | M1/M2 | Managed / dedicated | Monthly | Global presence, managed CI/CD |
| **Roundfleet** | M4/M4 Pro/Max Mac Mini | Dedicated | Monthly | High availability, fast provisioning |
| **Flow Swiss** | M-series Apple silicon | Bare metal | Monthly | Swiss data sovereignty |
| **MacinCloud** | M1/M2 Macs | Managed | Monthly | Global presence, turnkey setup |
| **HostMyApple** | M1/M2 Macs | VPS + dedicated | Monthly | Budget M-series rentals, 3 DCs |
| **Macly** | M4 Mac Mini | Dedicated | Monthly | 24/7 support included, no sales calls |
| **Mac-in-a-Box** | Dedicated Mac hardware | Bare metal | Monthly flat | Budget dedicated Mac rentals |
| **Nimble** | Apple silicon | Dedicated | Monthly | Dedicated Apple silicon hosts |
| **MacWeb** | Mac hosting | Dedicated | Monthly | Long-running Mac hosting |
| **Oakhost** | Apple silicon | Dedicated | Monthly | EU-hosted Apple silicon |

### Mac CI Runners

Managed CI services with macOS runners — useful for build-and-test agent workflows that don't need persistent Mac state.

| Vendor | Price | Key Strength |
|--------|-------|-------------|
| **Apple Xcode Cloud** | Usage (compute hours) | Native Apple integration, App Store signing |
| **GitHub Actions macOS Runners** | Per-minute | Integrated with GitHub workflows |
| **CircleCI macOS** | Per-credit | Mature iOS CI pipelines |
| **Codemagic** | Free tier + usage | Flutter/mobile-app specialized |
| **Bitrise** | Per-seat + usage | Mobile-app workflow library |
| **Appcircle** | Paid tiered | Mobile-only DevOps platform |
| **Cirrus CI Mac** | Usage-based | Generous free tier for OSS, per-minute Apple silicon |

---

## Self-Hosted Infrastructure

Full control over the entire stack. Lowest per-unit cost but highest operational burden. Split across three sub-categories: specialized GPU clouds (for model serving), general-purpose clouds, and VPS/bare-metal providers.

### Specialized GPU Clouds

Purpose-built GPU infrastructure for AI workloads — the most cost-effective path for running open-weight models at scale.

| Vendor | GPU Inventory | Price Model | Key Strength |
|--------|--------------|-------------|-------------|
| **Nebius** | B300/B200/H200/H100/L40S | Hourly + preemptible | AI-native cloud, Aether 3.5 serverless |
| **CoreWeave** | H100/H200/GH200 at scale | Hourly reserved | Purpose-built H100 cloud, largest dedicated GPU fleet |
| **Lambda Labs** | H100/GH200 | Hourly | On-demand for ML researchers |
| **RunPod** | Community + datacenter GPUs | Per-second | Community cloud + serverless GPU endpoints |
| **Paperspace (DigitalOcean)** | H100/A100 + notebooks | Hourly | Gradient ML notebooks included |
| **Genesis Cloud** | H100/A100 (EU) | Hourly | 100% renewable energy, EU-based |
| **Voltage Park** | H100 at non-profit rates | Hourly reserved | Non-profit H100 capacity |
| **TensorDock** | Mixed GPU marketplace | Hourly | Cheap community GPU rentals |
| **Crusoe** | Flared-gas-powered GPU | Contract | Climate-aligned data centers |
| **FluidStack** | Aggregated GPU supply | Hourly | GPU aggregator with competitive prices |
| **Vast.ai** | Decentralized GPU marketplace | Bid-based | Cheapest consumer GPU spot market |
| **Together AI** | Training clusters | Hourly + tokens | Training + fast inference unified |
| **Cudo Compute** | Distributed GPU cloud | Hourly | Distributed GPU availability |
| **Hyperstack (NexGen)** | H100/H200 reserved | Hourly | NVIDIA-partner GPU cloud |

### General-Purpose Cloud Platforms

| Vendor | Type | GPU | Starting Price | Key Strength |
|--------|------|-----|---------------|-------------|
| **AWS EC2** | Virtual machines | Yes | On-demand | Full control, broadest GPU range |
| **AWS Lambda** | Serverless functions | No | $0.20/1M req | Scale-to-zero, vast ecosystem |
| **Google Cloud Compute** | VMs + TPU | Yes | Per-second | TPU exclusivity, deep BigQuery integration |
| **Azure VMs** | Virtual machines | Yes | Per-minute | Enterprise + OpenAI partnership |
| **Oracle Cloud (OCI)** | Full-stack cloud | Yes | Generous free tier | Always-free ARM Ampere instances |
| **IBM Cloud** | Enterprise + bare metal | Yes | Varies | Enterprise/regulated industry focus |
| **Alibaba Cloud** | Largest China cloud | Yes | Pay-as-you-go | Dominant APAC/China presence |
| **Tencent Cloud** | China cloud + gaming | Yes | Pay-as-you-go | Gaming/media APAC specialization |
| **DigitalOcean** | Droplets (VMs) | Yes | $4/mo | Developer-friendly, managed K8s |
| **Linode (Akamai)** | VPS + edge cloud | Yes | Hourly/monthly | Simple pricing, Akamai edge network |
| **Vultr** | Global VPS + GPU | Yes | Hourly | 30+ global locations, bare metal options |
| **Scaleway** | EU-sovereign cloud | Yes | Hourly | EU data sovereignty, ARM options |
| **UpCloud** | High-performance VPS (EU) | No | Hourly | MaxIOPS storage performance |
| **Fly.io** | Firecracker VMs | Ltd | Per-second | 30+ regions, Sprites integration |
| **Render** | Persistent containers | No | Free / $25 | SOC 2, HIPAA, ISO 27001 |
| **Railway** | Containers | No | $5/mo | Hard spending caps, MCP server |
| **Heroku** | Dynos (containers) | No | $5/mo | Simple git-push, add-ons |
| **Exoscale** | Swiss/EU cloud | No | Hourly | Swiss data sovereignty |
| **CloudSigma** | EU/US VPS | No | Hourly | Fully customizable resource sliders |

### VPS & Bare Metal Providers

Budget-focused providers best suited for self-hosting agent infrastructure at lowest per-unit cost.

| Vendor | GPU | Starting Price | Key Strength |
|--------|-----|---------------|-------------|
| **Hetzner** | Yes | EUR 3.79 | Exceptional price-to-performance |
| **OVHcloud** | Yes | EUR 3.50 | EU data sovereignty, 40+ DCs |
| **Hostinger** | No | $4.99/mo | Budget-friendly, global reach |
| **GTHost** | Yes | Custom | AI/ML optimized dedicated servers |
| **Contabo** | Yes | EUR 3.60 | Aggressive pricing, H200 available |
| **Kamatera** | No | Hourly | Highly configurable VMs |
| **Latitude.sh** | No | Hourly/monthly | Bare metal in 20+ regions |
| **Equinix Metal** | No | Hourly | Bare metal at IX colos, premium interconnect |
| **Leaseweb** | Yes | Monthly | Large dedicated server inventory |
| **phoenixNAP** | Yes | Monthly | Enterprise bare metal provider |

---

## Agent Memory & Context Infrastructure

Stateless agents forget everything between sessions. Memory infrastructure gives agents persistent, retrievable context across conversations, users, and sessions — transforming them from stateless tools into adaptive systems that learn and improve.

### Purpose-Built Agent Memory

Memory layers designed specifically for AI agents, with multi-level scoping (user, session, agent) and semantic retrieval.

| Vendor | Type | Price | Key Strength |
|--------|------|-------|-------------|
| **Mem0** | Agent memory layer | OSS + cloud | Self-improving memory, 26% accuracy gain over OpenAI Memory |
| **Letta (MemGPT)** | Stateful agent server | OSS + cloud | MemGPT research lineage, memory hierarchy |
| **Zep** | Long-term memory + knowledge graph | OSS + cloud | Temporal knowledge graph for agents |
| **Cognee** | AI memory engine | OSS + cloud | Knowledge graph + vector hybrid memory |
| **Graphlit** | Knowledge API for agents | Usage-based | RAG + knowledge graph as a service |
| **Motorhead** | Chat memory server | OSS | Lightweight chat history service |
| **Basic Memory / OpenMemory** | OSS agent memory protocols | Free OSS | Standardized memory protocols |

### Vector Databases

The underlying infrastructure for semantic search and retrieval over agent memory.

| Vendor | Type | Price | Key Strength |
|--------|------|-------|-------------|
| **Pinecone** | Managed vector DB | Usage-based | Serverless pioneer, mature vector index |
| **Weaviate** | Vector DB with modules | OSS + cloud | Hybrid search + built-in modules |
| **Chroma** | Embedding DB for AI | OSS + cloud | Dev-friendly, simple API |
| **Qdrant** | Rust-based vector DB | OSS + cloud | Rust performance, rich filtering |
| **Milvus / Zilliz Cloud** | Scalable vector DB | OSS + cloud | Billion-scale vector workloads |
| **LanceDB** | Embedded vector DB | OSS + cloud | Serverless embedded + multimodal |
| **Turbopuffer** | Object-store-backed vectors | Usage-based | Cheap vector search on S3 |
| **MongoDB Atlas Vector Search** | Vectors in MongoDB | Cluster-based | Unified document + vector store |
| **pgvector (Neon, Supabase)** | Postgres vector extension | OSS / DB-tier | Vectors alongside relational data |
| **Redis / Redis Stack** | In-memory vector + cache | OSS + cloud | Lowest-latency vector + KV |
| **Marqo** | End-to-end vector search | OSS + cloud | Multimodal embeddings built-in |
| **Typesense** | Open-source search + vector | OSS + cloud | Typo-tolerant hybrid search |
| **Elasticsearch / OpenSearch** | Search + kNN | OSS + cloud | Mature search with vector support |
| **Vespa** | Full search + vector platform | OSS + cloud | Yahoo-scale search + vector hybrid |
| **Vectara** | Managed RAG-as-a-service | Usage-based | End-to-end RAG with hallucination scoring |
| **Azure AI Search** | Managed hybrid search | Usage-based | Deep Azure/OpenAI integration |
| **Vertex AI Vector Search** | Google's ScaNN service | Usage-based | Google's internal ScaNN algorithm |
| **SingleStore** | HTAP with vectors | Paid | Transactional + analytical + vector |

### Graph Databases for Agent Knowledge

For agents reasoning over structured knowledge rather than flat key-value pairs.

| Vendor | Price | Key Strength |
|--------|-------|-------------|
| **Neo4j + GraphRAG** | OSS + cloud | Industry-standard graph DB, GraphRAG-native |
| **Mem0g (Graph Memory)** | OSS + cloud | Mem0's graph feature mapping entity relationships |

---

## Agent Observability & Evaluation

As agents move to production, observability becomes critical. This category splits into tracing (what happened), evaluation (was it correct), and guardrails (prevent bad outcomes).

### LLM & Agent Tracing / Observability

Platforms for tracing agent runs, debugging failures, and monitoring costs in production.

| Vendor | Type | Price | Key Strength |
|--------|------|-------|-------------|
| **LangSmith** | LangChain-native tracing/evals | Free tier + usage | Deepest LangChain/LangGraph integration |
| **Langfuse** | OSS LLM observability | OSS + cloud | Self-hostable LangSmith alternative |
| **Arize Phoenix / Arize AX** | OSS + enterprise LLM ops | OSS + cloud | OTel-based, strong ML+LLM crossover |
| **Weights & Biases Weave** | LLM tracing on W&B | Paid tiered | Integrated with W&B ML experiment tracking |
| **Helicone** | LLM proxy + observability | OSS + cloud | Simple one-line proxy onboarding |
| **Datadog LLM Observability** | LLM tracing in Datadog | Per-span pricing | Unified with existing APM |
| **Dynatrace AI Observability** | Auto-instrumented AI ops | Enterprise | Auto-discovery AI pipelines |
| **Honeycomb for LLMs** | High-cardinality LLM tracing | Usage-based | BubbleUp for LLM anomaly detection |
| **OpenLLMetry / Traceloop** | OTel-standard LLM semantics | OSS + cloud | Vendor-neutral OTel for LLMs |
| **AgentOps** | Agent session replay + costs | Free + paid | Session-replay view of agent runs |
| **PromptLayer** | Prompt versioning + logs | Free + paid | Prompt-registry-first workflow |
| **LangWatch** | LLM monitoring + evals | OSS + cloud | European LLM observability |
| **Lunary** | OSS LLM observability | OSS + cloud | Lightweight open alternative |
| **Literal AI** | Eval + observability (Chainlit) | Paid | Chainlit-native LLM ops |
| **Fiddler AI** | ML + LLM monitoring | Enterprise | Enterprise explainability + drift |

### Evaluation & Testing

Tools focused on measuring agent quality and regression testing.

| Vendor | Type | Price | Key Strength |
|--------|------|-------|-------------|
| **Braintrust** | Eval-first LLM platform | Paid tiered | Eval-driven prompt iteration |
| **Patronus AI** | Automated LLM eval | Paid | Pre-built eval models (Lynx, etc.) |
| **Galileo** | LLM eval + guardrails | Paid | ChainPoll metrics for hallucinations |
| **HumanLoop** | Prompt + eval management | Paid | PM/engineer collaborative prompt eng |
| **Comet Opik** | OSS LLM eval | OSS + cloud | Comet ML lineage, strong evals |
| **TruLens** | Eval framework (Snowflake) | OSS | Groundedness/answer/context triad |
| **Ragas** | OSS RAG eval framework | OSS | De-facto RAG metrics library |
| **DeepEval** | Unit-test-style LLM evals | OSS | Pytest-style LLM assertions |
| **Confident AI** | DeepEval hosted platform | Paid | Hosted DeepEval with regression testing |

### Guardrails & Safety

Runtime safeguards preventing agents from producing harmful or policy-violating outputs.

| Vendor | Type | Price | Key Strength |
|--------|------|-------|-------------|
| **NVIDIA NeMo Guardrails** | Programmable guardrails | Free OSS | Colang DSL for conversation rails |
| **Guardrails AI** | Validation library | OSS + cloud | Structured output + validators library |
| **Lakera** | LLM security guardrails | Paid | Prompt injection defense specialist |
| **Protect AI** | AI security posture | Enterprise | MLSecOps / AI red-team toolkit |
| **WhyLabs / LangKit** | LLM safety monitoring | Free + paid | Safety/guardrails metrics focus |

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
- **Compute:** Nebius managed Kubernetes with GPU clusters for model serving + Contree or E2B for agent sandboxes
- **Sandbox superpower:** Contree's Git-like branching enables tree-of-thought agent workflows — fork at each decision, evaluate in parallel, rollback on failure
- **Orchestration:** AgentField or Symphony
- **Advantage:** Best price-performance for teams running open-weight models at high volume. Nebius's serverless inference autoscales with agent demand, and the KV-aware routing keeps latency low during multi-turn agent loops. Single-provider stack (Contree sandboxes + Nebius inference + Nebius GPU clusters) simplifies operations.
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
