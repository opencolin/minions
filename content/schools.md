# Schools of Agentic Engineering

There's no single way to build agents. By 2026 a handful of distinct *schools* have emerged — each with its own answer to the question *where does trust live?* and its own set of tools, idioms, and operational assumptions. This page maps them.

Two layers:

- **Philosophical schools** — three orthogonal answers to the trust question (cryptography / observability / process), each associated with a major public voice
- **Operational schools** — the working stacks you can actually inherit, four of which we've already named elsewhere in this reference

Most teams end up *practicing* an operational school while *aligning* with a philosophical one — and the interesting question is which of the two combinations are coherent and which are not.

---

## The Central Question: Where Does Trust Live?

When an agent acts autonomously, *something* has to be trusted: the model's judgment, the harness's verification, the provider's contractual commitments, the operator's review queue, or the underlying hardware. Different schools place that trust in radically different places, and the choice cascades through every other design decision.

| School | Trust mechanism | What you have to believe |
|--------|----------------|--------------------------|
| **Polosukhin / NEAR** | Cryptographic — TEE-enforced execution, on-chain identity, agent-held keys | Hardware attestations are sound; the protocol is the safety boundary |
| **Chase / LangChain** | Observability — tracing, evals, persistent state, human-in-the-loop | Cooperative providers are tractable if you instrument them deeply enough |
| **Ng / DeepLearning.AI** | Process — disciplined evals, error analysis, reflection loops, workflow redesign | Infrastructure is interchangeable; what matters is task decomposition |

These aren't just technical disagreements — they encode different threat models. Polosukhin's architecture assumes *adversarial* providers. Chase's assumes *cooperative* providers in need of better tools. Ng's largely *brackets* the governance question in favor of deployment velocity.

---

## Philosophical Schools

### Trust as Cryptography — Polosukhin

[Illia Polosukhin](who-is-who.md#illia-polosukhin), Transformer co-author and NEAR Protocol co-founder, makes the most aggressive case for *decentralized* agent infrastructure. His thesis: as agents start holding your information, money, and identity, *"you don't want any singular company to have control."* The xAI / Grok manipulation incidents and the general fragility of centralized providers, in his framing, mean that hardware-enforced trust is structurally necessary — not just preferable.

**The stack:**

- **AI brain** runs inside Trusted Execution Environments (TEEs) on NEAR AI Cloud
- **Smart-contract body** holds state, funds, and rules on-chain
- **Coordination marketplace** lets agents hire each other for specialized tasks (competitive bidding *or* cooperative profit-sharing)

His distinction between *automated workflows* and *real agents*: *"If an agent doesn't have its own keys, it's not an agent — it's just a script"* ([Shade Agents](https://www.near.org/blog/shade-agents-the-first-truly-autonomous-ai-agents)).

**Concrete instantiation:** [IronClaw](approaches.md#openclaw) — a Rust agent runtime that runs inside encrypted TEEs, with isolated WebAssembly containers per tool, credentials in an encrypted vault that intercepts outbound connections against policy, and sub-30-second attestation. The **Confidential GPU Marketplace** locks out the host OS, GPU operators, and NEAR AI itself from inference workloads. Worth noting: IronClaw is built by NEAR AI but is positioned as the OS layer of the broader [OpenClaw ecosystem](approaches.md#openclaw) — the same lineage that produced [crabbox](approaches.md#crabbox), [clawpatch](approaches.md#clawpatch), and [ClawSweeper](approaches.md#clawsweeper).

**HITL stance:** Polosukhin's design *eliminates* HITL for mature agents — replaced by policy-based guardrails at the infrastructure layer (credential vaults, spending limits, attestation). Trust gets established once, cryptographically.

**Where this lands:** regulated-data workloads (healthcare PHI, government classified, financial PII), DeFi / agentic finance, and any context where the threat model includes the provider itself.

### Trust as Observability — Chase

[Harrison Chase](who-is-who.md#harrison-chase), creator of LangChain, makes the opposite case. His three years of watching beautiful prototypes shatter in production led to **agent engineering** — *the professional craft of converting AI capability into deployed, observable, reliable systems*. Centralized cloud is fine, *if* every step is traceable, evaluable, and rewindable.

**The stack:**

- [**LangGraph**](https://github.com/langchain-ai/langgraph) — stateful event-driven orchestration; declarative graph + imperative node logic
- **LangGraph Platform** — deployment runtime (cloud, hybrid, self-hosted)
- [**LangSmith**](https://smith.langchain.com/) — tracing, evals, annotation queues, LLM-as-judge, Prompt Hub
- **Deep Agents** — opinionated harness for long-horizon coding work
- **Open Agent Platform** — no-code builder with MCP servers, RAG-as-a-service, agent registry

**Core thesis:** *"The hard part of building reliable agentic systems is making sure the LLM has the appropriate context at each step."* Chase popularized **context engineering**, the **scaffold vs. harness** distinction, and the **ambient agent** pattern (listening to event streams, acting in the background). His January 2026 framing: **memory as the next competitive moat** — agents reviewing their own traces overnight to rewrite their own instructions ("sleep-time compute").

**HITL stance:** Permanent and richly specified. LangGraph supports four canonical HITL patterns:

1. **Approve / reject** specific actions before execution
2. **Edit** suggested actions rather than binary accept/deny
3. **Clarify** by answering stuck-agent questions mid-task
4. **Time travel** — return to step *n*, modify state, redirect the trajectory

Chase distinguishes **human-on-the-loop** (post-hoc trajectory review and rewinding) from **human-in-the-loop** (real-time approval). Both are first-class. *"Without HITL there are no interactions to inform future performance"* — HITL is the substrate for agent improvement, not a temporary scaffold.

**Where this lands:** the broad enterprise middleware stack. LangGraph is the dominant orchestration framework in production deployments at Uber, LinkedIn, Elastic, Klarna, and Replit. Per the [LangChain State of Agent Engineering 2025](https://www.langchain.com/state-of-agent-engineering): a majority of orgs have agents in production, with quality (not cost) as the top barrier — exactly the problem LangSmith was built to address.

### Trust as Process — Ng

[Andrew Ng](https://www.andrewng.org/) is the most *pedagogically* influential voice in the field. DeepLearning.AI reaches millions; AI Fund builds startups; Landing AI ships enterprise deployments. If Polosukhin is building rails and Chase is building runtime, **Ng is writing the curriculum**.

**The framework:** *the four agentic design patterns*, introduced in his 2024 essay and adopted as common vocabulary across the industry:

1. **Reflection** — agent critiques its own output and iterates
2. **Tool Use** — LLM makes function calls to APIs, databases, code executors, web search
3. **Planning** — LLM decomposes complex requests into sub-tasks and sequences execution
4. **Multi-Agent Collaboration** — specialized agents in different roles

His kinetic analogy: *the difference between writing an essay in one pass versus drafting, researching, critiquing, and revising*. His mid-2026 evolution: **workflow redesign** over mere tool adoption. *"AI creates real value only when workflows are redesigned end-to-end, not when it's used as a plug-in for one step."*

**Infrastructure stance:** Pragmatic and cloud-agnostic. Embraces MCP as the integration substrate (*"10 providers and 20 sources = 30 pieces of work instead of 200"*). Strongly open-weight-advocating — by mid-2025 he's arguing that *"the top open models are from China"* (DeepSeek R1, Kimi K2, Qwen3) and his portfolio companies use them in production.

**HITL stance:** HITL is embedded in the patterns themselves (Reflection is computational HITL — the agent critiques itself). Explicit human review is deferred until post-prototype. *"Implement oversight and guardrails later in the lifecycle to avoid stalling innovation."* The future human skill, per Ng: *"the ability to tell AI exactly what you want."* HITL shifts from approval-time to specification-time. Evals replace ongoing oversight: *"a disciplined error analysis process is the single biggest predictor for whether the team executes well."*

**Where this lands:** the application layer. AI Fund portfolio spans healthcare (Affineon, Woebot), financial services (ValidMind, Credo AI), supply chain (Freight Hero, Gaia Dynamics), legal/compliance. Empirical claim worth quoting: *"a 'dumber' model using agentic workflows can beat a 'smarter' model on simple prompting"* — citing 95% vs 67% accuracy in a presented study.

---

## Side-by-Side Comparison

| Dimension | Polosukhin | Chase | Ng |
|-----------|-----------|-------|-----|
| **Trust model** | Cryptographic / hardware-enforced | Policy-based via observability | Process-based via evals |
| **Infrastructure locus** | Decentralized blockchain + TEE | Centralized cloud + observability layer | Any cloud; framework-agnostic |
| **Orchestration unit** | Shade Agent (smart contract + TEE worker) | LangGraph node + harness | Four-pattern workflow |
| **HITL philosophy** | Eliminate via cryptographic policy (for mature agents) | Systematize and enrich as a feedback loop | Defer until post-prototype; HITL as specification |
| **Agent autonomy target** | Full autonomy with self-sovereign keys | "Goldilocks" — constrained but flexible | Task-appropriate; workflows vs. agents per use case |
| **Developer entry point** | Infra-first (security, identity, keys) | Framework-first (LangGraph orchestration) | Pattern-first (Reflect / Tool / Plan / Multi-Agent) |
| **Communication protocol** | AITP (Agent Interaction and Transaction Protocol) | LangGraph APIs + MCP | MCP (full embrace) |
| **Model stance** | Open-weight preferred; TEE-verifiable execution | Model-agnostic in principle, family-tuned in practice | Open-weight advocate, often Chinese models in production |
| **Enterprise value prop** | Trustless privacy for regulated data | Observability + reliability + memory moats | ROI through workflow redesign; vertical apps |
| **Political economy** | AI as commons; user sovereignty | AI as industry standard; enterprise toolchain | AI as productivity multiplier; vertical application layer |
| **One-line summary** | Building rails | Building runtime | Writing the curriculum |

The three fault lines worth naming:

1. **Where trust lives.** Polosukhin: cryptography. Chase: observability. Ng: evals. These encode different threat models, not just different tools.
2. **HITL as a philosophy of agent maturity.** Chase treats HITL as *permanent and enriching*. Polosukhin treats it as a *temporary limitation* dissolved by cryptographic trust. Ng treats it as a *specification mechanism* — humans define the task, then get out of the way.
3. **Decentralization vs. integration.** Polosukhin requires buy-in to a blockchain ecosystem (NEAR), a new trust model (TEEs), and a new commerce layer. Chase requires LangGraph/LangSmith adoption but integrates with existing cloud + identity. Ng requires no platform buy-in at all.

---

## Operational Schools

The philosophical schools sit at the level of *what to believe*. The operational schools sit at the level of *what to inherit*. These are the actual working stacks you can copy.

### The Stripe School

> See: [Approaches § Stripe Minions](approaches.md#stripe-minions)

Pattern: pre-warmed devboxes (EC2 instances cloned from production developer machines) + Goose-derived harness + Toolshed MCP server + blueprint orchestration. Engineers invoke minions from Slack and receive complete PRs. *"Spin up many in parallel; one-shot design (task in, PR out, no interaction in between); max 2 CI rounds."*

**Trust mechanism:** organizational — Stripe owns the model, the harness, the devbox, the CI pipeline, and the people. Trust is end-to-end vertical.

**Philosophical alignment:** Mostly Chase-aligned (observability + structured orchestration), with elements of Ng-aligned process discipline. Not Polosukhin-aligned at all — Stripe is the *most centralized* trust model possible.

### The Tan School

> See: [Approaches § GStack](approaches.md#gstack) + [GBrain](approaches.md#gbrain)

Pattern: one-engineer, opinionated SKILL.md skill pack + parallel worktree execution + persistent markdown brain. [Garry Tan's](who-is-who.md#garry-tan) stated workflow runs 10–15 parallel Claude Code sessions inside [Conductor](infrastructure.md#autonomous-coding-agents) on a single Mac with gstack as the engine and gbrain as the memory companion.

**Trust mechanism:** craft — *"skill files are code,"* every skill encodes battle-tested verification, the human reads every PR before merge.

**Philosophical alignment:** Chase-aligned (observability via gbrain + structured skills) with Ng-aligned process discipline (the gstack skills *are* the four-pattern framework in practice — reflection, tool use, planning, multi-agent built into specific commands).

### The Walking Labs / Mastery School

> See: [Harness Engineering](harness-engineering.md)

Pattern: validator-first methodology. The [Walking Labs *Learn Harness Engineering*](https://walkinglabs.github.io/learn-harness-engineering/en/) course argues that *"a good validator with a bad workflow beats a good workflow without a validator,"* and that the arithmetic of serial steps (5 × 80% = 33% success) makes verification mandatory rather than optional. The five-subsystem model (instructions / tools / environment / state / feedback) is its taxonomic backbone.

**Trust mechanism:** verification — every step has executable success criteria; the harness *enforces* the criteria; failures are mapped to specific subsystem defects via the diagnostic loop.

**Philosophical alignment:** Almost pure Ng — process / evals / error analysis as the load-bearing layer, infrastructure interchangeable. The "thin harness, fat skills" ethos that recurs in [GBrain](approaches.md#gbrain) and [AgentHub](approaches.md#agenthub) is the direct lineage.

### The Steinberger School

> See: [Approaches § The Steinberger School](approaches.md#the-steinberger-school)

Pattern: token-unbounded automation. [Peter Steinberger's](who-is-who.md#peter-steinberger-steipete) reported workflow runs ~100 Codex agents continuously, ~$1.3M/month inference spend, ~3 engineers. Every project event — PR review, commit security scan, issue triage, meeting transcript, performance regression — has an agent listening. Supporting toolchain: [Crabbox](approaches.md#crabbox), [Clawpatch](approaches.md#clawpatch), [ClawSweeper](approaches.md#clawsweeper), Discrawl, CodexBar, fs-safe, peekaboo.

**Trust mechanism:** automation surface area — the assumption is that *every* event is worth an agent pass, and the volume of automation compensates for individual call unreliability.

**Philosophical alignment:** Hybrid. The infrastructure is centralized cloud (Chase-aligned), but the *spirit* is closer to Polosukhin in that Steinberger explicitly experiments with infrastructure choices most operators don't (fs-safe for filesystem isolation, TEE-friendly architecture in IronClaw). The harness discipline is Walking Labs / Ng-aligned. The whole stack is what happens when you take Chase's observability bet, Ng's workflow-redesign bet, and Walking Labs' validator-first bet and *spend on all three simultaneously*.

---

## Cross-Map: Operational × Philosophical

| Operational school | Polosukhin | Chase | Ng |
|--------------------|-----------|-------|-----|
| **Stripe** | ✗ | ◐ (centralized, deeply observed) | ◐ (blueprints = workflow redesign) |
| **Tan** | ✗ | ◐ (gbrain is its observability layer) | ● (gstack ≈ the four patterns) |
| **Walking Labs / Mastery** | ✗ | ◐ (validator = a kind of observer) | ● (evals-first is the thesis) |
| **Steinberger** | ◐ (fs-safe + TEE-friendly architecture) | ● (everything is observed) | ● (workflows redesigned per project event) |

`●` strongly aligned · `◐` partially aligned · `✗` not aligned

The diagonal reading: nobody yet runs a *Polosukhin-aligned operational school* at production scale. That's the unbuilt cell. If decentralized TEE-secured agents become a dominant pattern in regulated-data verticals over the next 24 months, there will be a fifth school worth naming.

---

## What the Next 24 Months Look Like

Likely convergence at the infrastructure layer:

- **MCP** becomes the dominant agent communication protocol (already adopted by Anthropic and OpenAI), making Chase's and Ng's architectures interoperable
- **TEE-secured compute** gains traction *even without* blockchain — Google Cloud Confidential VMs and Azure Confidential Computing offer similar guarantees on traditional clouds, which lifts Polosukhin's infrastructure ideas without requiring his political-economy bet
- **HITL primitives** Chase shipped in LangGraph (approve/edit/reject/time-travel) become the blueprint other frameworks copy
- **The four-pattern framework** stays as the common vocabulary across teams using LangGraph, AutoGen, OpenAI Agents SDK, gstack, or raw Python

Likely persistent divergence at the philosophy layer:

- Polosukhin's bet: dominant trust infrastructure is *cryptographic sovereignty*, not *institutional accountability*
- Chase's bet: *observable, governed cloud infrastructure* is sufficient if rigorously implemented
- Ng's bet: *task decomposition and measurement* solve the reliability problem regardless of infrastructure

Each finds its natural market: Polosukhin in crypto-native and regulated-data enterprises; Chase in the broad enterprise middleware stack; Ng in education and the vertical application layer.

The practical takeaway: a builder who can hold all three philosophies in mind simultaneously — and pick the right one per context — will outperform anyone treating these as competing religious doctrines.

---

## Further Reading

Primary sources for the three philosophical schools:

- **Polosukhin** — [Shade Agents](https://www.near.org/blog/shade-agents-the-first-truly-autonomous-ai-agents) · [Intelligence at the Frontier keynote](https://www.youtube.com/watch?v=M-BVxaqKp-0) · [Business Insider interview, April 2026](https://www.businessinsider.com/illia-polosukhin-transformer-author-ai-agents-near-protocol-2026-4)
- **Chase** — [How to Think About Agent Frameworks](https://www.langchain.com/blog/how-to-think-about-agent-frameworks) · [How and When to Build Multi-Agent Systems](https://www.langchain.com/blog/how-and-when-to-build-multi-agent-systems) · [Sequoia podcast: Context Engineering Our Way to Long-Horizon Agents](https://sequoiacap.com/podcast/context-engineering-our-way-to-long-horizon-agents-langchains-harrison-chase/) · [State of Agent Engineering 2025](https://www.langchain.com/state-of-agent-engineering)
- **Ng** — [DeepLearning.AI Agentic AI course](https://www.deeplearning.ai/courses/agentic-ai) · [Snowflake BUILD 2024 talk](https://www.youtube.com/watch?v=KrRD7r7y7NY) · [VB Transform 2025](https://www.youtube.com/watch?v=lB8jythC-vQ)

For the operational schools, see the per-school links inline above. For the underlying methodology, see [Harness Engineering](harness-engineering.md).

> *Some numerical claims in the philosophical-school sections are drawn from public talks and interviews and have not been independently verified — particularly LangChain's monthly-download figures, NEAR's marketplace agent counts, and AI Fund's reported portfolio metrics. Treat them as directional rather than precise.*
