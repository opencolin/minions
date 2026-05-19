# Who's Who in Agentic Engineering

The shortest way to get oriented in agentic engineering is to figure out *whose work to follow*. This is the people page — twenty names worth knowing, why they matter, and the single thing of theirs to read or watch first.

Three rough archetypes:

- **🧠 Researchers / educators** — shape the *ideas*. The vocabulary, the mental models, the theory.
- **🔨 Operators / founders** — build the *systems*. The products on the [Approaches](approaches.md) page.
- **✍️ Chroniclers / synthesizers** — translate the field for the *practitioners*. Public writing, podcasts, frameworks for thinking about what's happening.

Most of these people fit cleanly into one of those three; the most interesting ones overlap.

---

## Andrej Karpathy

> 🧠 Researcher / educator · [karpathy.ai](https://karpathy.ai/) · [@karpathy](https://twitter.com/karpathy) · [GitHub](https://github.com/karpathy)

The person who named both halves of this field. Karpathy coined **["vibe coding"](https://x.com/karpathy/status/1886192184808149383)** in early 2025 to describe pure-AI-autopilot prototyping, and **["agentic engineering"](https://x.com/karpathy/status/2019137879310836075)** in early 2026 to describe its disciplined, human-in-the-loop counterpart. The IBM, Anthropic, and OpenAI write-ups on agentic engineering all trace their terminology back to those two posts. Before that, his **["Software 2.0"](https://karpathy.medium.com/software-2-0-a64152b37c35)** essay (Nov 2017) was the first widely-read framing of "models as the new code"; his **"LLM OS"** framing (State of GPT, 2023) is the conceptual scaffold most agent architects work inside.

Career: BSc Toronto under Hinton, PhD Stanford under Fei-Fei Li (designed CS231n, the first deep-learning course at Stanford), founding member at OpenAI, Director of AI at Tesla running Autopilot vision + briefly Optimus, back at OpenAI 2023–2024 on midtraining + synthetic data, now running Eureka Labs (AI education) and the **[Zero to Hero](https://www.youtube.com/@AndrejKarpathy)** lecture series.

**Key works to know:**

- *Software 2.0* (2017) — [karpathy.medium.com](https://karpathy.medium.com/software-2-0-a64152b37c35)
- *A Recipe for Training Neural Networks* (2019) — [karpathy.github.io](https://karpathy.github.io/2019/04/25/recipe/)
- *State of GPT* (Microsoft Build 2023) — [YouTube](https://www.youtube.com/watch?v=bZQun8Y4L2A) · [slides](https://karpathy.ai/stateofgpt.pdf)
- *[Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)* — the lecture series with micrograd, nanoGPT, etc.
- *[Deep Dive into LLMs like ChatGPT](https://www.youtube.com/watch?v=7xTGNNLPyMI)* (2025) — under-the-hood explanation aimed at general audiences

**Start here:** If you've never watched it, *State of GPT* is the highest-leverage 40 minutes in this list — every later "LLM OS" / "agent stack" diagram you'll see traces back to it.

---

## Lilian Weng

> 🧠 Researcher / educator · Co-founder, [Thinking Machines Lab](https://thinkingmachines.ai/) · [@lilianweng](https://twitter.com/lilianweng) · [lilianweng.github.io](https://lilianweng.github.io/)

The author of *[LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)* (June 2023) — the foundational blog post that defined the planning / memory / tool-use decomposition every subsequent agent framework rests on. Weng spent six years at OpenAI on safety, red-teaming, and post-training (Instruction Hierarchy, automated red teaming, RLHF), then co-founded Thinking Machines Lab with Mira Murati in 2025. Her 2025 writing on test-time compute ("Why We Think") is the cleanest single primer for how to reason about reasoning models. If the schools framing this reference uses has a *taxonomic ancestor*, it's Weng's planning/memory/tool-use breakdown.

**Key works to know:**

- *[LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)* (2023) — the foundational decomposition
- *[Why We Think](https://lilianweng.github.io/posts/2025-05-01-thinking/)* (2025) — test-time compute primer
- *[The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions](https://arxiv.org/abs/2404.13208)* (2024)
- Her [blog](https://lilianweng.github.io/) — every long-form post is a citable source for someone
- [Thinking Machines Lab](https://thinkingmachines.ai) — current home

**Start here:** *LLM Powered Autonomous Agents*. If you read one blog post about agents before reading any others, this is the one.

---

## Peter Steinberger (steipete)

> 🔨 Operator · OpenClaw / crabbox / clawpatch / clawsweeper · [x.com/steipete](https://twitter.com/steipete) · [GitHub](https://github.com/steipete)

The most aggressive public experimenter in token-unbounded agentic engineering. Steinberger runs OpenClaw (355K stars, the dominant personal-AI-agent platform) and a sprawling ecosystem of supporting tools — [Crabbox](approaches.md#crabbox), [Clawpatch](approaches.md#clawpatch), [ClawSweeper](approaches.md#clawsweeper), Discrawl, CodexBar, [fs-safe](https://github.com/openclaw/fs-safe), [peekaboo](https://peekaboo.sh). The whole stack is a working answer to *"how would we build software if tokens didn't matter?"* — reportedly ~$1.3M/month in inference spend across ~100 Codex instances, operated by a team of ~3. We treat this pattern as its own [school of thought](approaches.md#the-steinberger-school) on the Approaches page.

Background: Austrian iOS developer, founded PSPDFKit (sold), then turned the same operational rigor on agents. The interesting thing about Steinberger is that he's not a model researcher — he's an *operator* willing to run the experiment at production cost and document the results in public.

**Where to follow:** Mostly [@steipete on X](https://twitter.com/steipete) — the OpenClaw release cadence and the "AI Software Factory" thread is the primary primary source. The [OpenClaw repo](https://github.com/openclaw/openclaw) is the secondary.

**Start here:** Read his ["AI Software Factory" infographic / thread](https://x.com/steipete) describing what ~100 cloud Codex instances actually do per project event (PR review, commit security scan, issue auto-PR, meeting listener, etc.). Then go look at the ecosystem repos under [github.com/openclaw](https://github.com/openclaw).

---

## Garry Tan

> 🔨 Operator + investor · [GStack](approaches.md#gstack) / [GBrain](approaches.md#gbrain) · President & CEO, Y Combinator · [@garrytan](https://twitter.com/garrytan)

The YC CEO who open-sourced his actual Claude Code setup as **[GStack](https://github.com/garrytan/gstack)** (23 specialist SKILL.md skills — CEO / Designer / Eng Manager / Release Manager / Doc Engineer / QA), then released **[GBrain](https://github.com/garrytan/gbrain)** (a self-wiring typed knowledge graph + 29 skills + Postgres-native "Minions" job queue) as its memory companion. Reports ~600K production LOC in 60 days using GStack inside [Conductor](infrastructure.md#autonomous-coding-agents) with 10–15 parallel sprints. Together GStack + GBrain form what we call the [Tan School](approaches.md#gstack): one-engineer, opinionated skill packs, parallel worktrees.

Career: founder of Posterous (acq. Twitter), then Initialized Capital (early Coinbase / Instacart / Cruise / Flexport investments), now running YC as its third president since Paul Graham and Sam Altman.

**Key works to know:**

- [GStack](https://github.com/garrytan/gstack) — the skill pack, 82.7K stars
- [GBrain](https://github.com/garrytan/gbrain) — the brain, 11.1K stars; [gbrain-evals](https://github.com/garrytan/gbrain-evals) for BrainBench
- *"Skill files are code"* — [his X post](https://x.com/garrytan/status/2042925773300908103) that the GBrain README leans on heavily
- [garrytan.com](https://garrytan.com) + [YC YouTube](https://www.youtube.com/@ycombinator) for the broader founder-mode commentary

**Start here:** Install GStack into your own `~/.claude/skills/` and read the SKILL.md files. The skills *are* the playbook — that's the whole point of the project.

---

## Boris Cherny

> 🔨 Operator · Creator / Lead of [Claude Code](approaches.md#terminal-coding-clis) · Anthropic · [@bcherny](https://twitter.com/bcherny) · [GitHub](https://github.com/bcherny)

The engineer behind Claude Code — the coding agent that the entire Claude Code ecosystem covered in this reference (GStack, GBrain, Superpowers, AgentHub, Crabbox, Clawpatch, ClawSweeper, OpenClaw…) is built on top of. Cherny's bet — articulated in his AI Ascent 2026 talk and the Pragmatic Engineer interview — was that **agentic coding works better with `glob`/`grep` over a real filesystem than with RAG / vector DBs over a parsed codebase**. That single architectural choice is why most of the harnesses we profile are *file-first* rather than *embedding-first*, and why "agent + bash" became the dominant pattern. Before Anthropic he authored *Programming TypeScript* (O'Reilly, 2020) and led developer tooling at Brigade and Khan Academy.

**Key works to know:**

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — the coding agent
- [*Building Claude Code with Boris Cherny*](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) — Pragmatic Engineer interview
- [AI Ascent 2026 talk](https://www.youtube.com/watch?v=SlGRN8jh2RI) — the "glob is all you need" thesis
- *Programming TypeScript* (O'Reilly, 2020)

**Start here:** The Pragmatic Engineer interview — the cleanest first-person account of the design decisions that shape the entire coding-agent ecosystem the rest of this reference covers.

---

## Simon Willison

> ✍️ Chronicler / practitioner · [simonwillison.net](https://simonwillison.net/) · [@simonw](https://twitter.com/simonw) · [GitHub](https://github.com/simonw)

The most prolific public synthesizer of LLM developments. Willison ships near-daily blog posts that combine careful reproductions, vocabulary-defining framings (he coined **["prompt injection"](https://simonwillison.net/2022/Sep/12/prompt-injection/)** in 2022), and meticulous chronologies of what just happened in the field. He's also the author of **[Datasette](https://datasette.io/)** (the open-source data exploration tool) and **[`llm`](https://llm.datasette.io/)** (the Python CLI for talking to language models that has become the de facto "lingua franca" for benchmarking and scripting against LLMs).

His ["vibe engineering"](https://simonwillison.net/2025/Oct/7/vibe-engineering/) post (Oct 2025) was the bridge between Karpathy's "vibe coding" and what Karpathy later called "agentic engineering." Addy Osmani's [agentic engineering essay](https://addyosmani.com/blog/agentic-engineering/) explicitly cites Willison as a primary influence.

**Key works to know:**

- His [blog](https://simonwillison.net/) — every post is a primary source for someone
- The [`llm` library](https://llm.datasette.io/) — the easiest way to compare models from a terminal
- [Datasette](https://datasette.io/) — the substrate underneath much of his analysis
- ["Prompt injection"](https://simonwillison.net/2022/Sep/12/prompt-injection/) (2022) and ["Vibe engineering"](https://simonwillison.net/2025/Oct/7/vibe-engineering/) (2025) — vocabulary-defining pieces

**Start here:** Subscribe to [his RSS feed](https://simonwillison.net/atom/everything/). If you only read one piece, the [annual "Things I've learned about LLMs"](https://simonwillison.net/tags/llms/) retrospectives are the cleanest single-document summaries of where the field has been.

---

## Addy Osmani

> ✍️ Chronicler · Software Engineer at Google (Cloud / Gemini) · [addyosmani.com](https://addyosmani.com/) · [@addyosmani](https://twitter.com/addyosmani)

Long-time web-performance authority — author of *Learning JavaScript Design Patterns*, *Image Optimization*, and many of the canonical books in front-end practice — who has become one of the most-read synthesizers of agentic engineering for mainstream engineering audiences. His [February 2026 essay "Agentic Engineering"](https://addyosmani.com/blog/agentic-engineering/) is the clearest published piece making the case that *vibe coding* and *agentic engineering* are two distinct activities and that conflating them causes real damage. He's also written a new O'Reilly book — **["Beyond Vibe Coding"](https://beyond.addy.ie/)** — that's becoming the practitioner reference for the discipline.

Background: ex-Chrome lead at Google, prolific OSS author (TodoMVC, Yeoman, Material Design lab), now working on Cloud and Gemini.

**Key works to know:**

- *Agentic Engineering* (Feb 2026) — [addyosmani.com/blog/agentic-engineering](https://addyosmani.com/blog/agentic-engineering/)
- *[Beyond Vibe Coding](https://beyond.addy.ie/)* — the O'Reilly book
- Earlier-but-still-relevant: *[The Cost of JavaScript](https://addyosmani.com/blog/long-tasks/)*, *[Image Optimization](https://images.guide/)*
- [Substack newsletter](https://addyo.substack.com/)

**Start here:** The *Agentic Engineering* essay above — it cleanly defines the spectrum from vibe coding to agentic engineering and lays out the workflow most senior engineers are converging on.

---

## Jesse Vincent (obra)

> 🔨 Operator · [Superpowers](approaches.md#superpowers) · Prime Radiant · [@obra](https://twitter.com/obra) · [obra.com](https://obra.com/)

The agentic-engineering newcomer with the longest software-engineering pedigree. Vincent created **[Request Tracker](https://bestpractical.com/request-tracker)** (the ticketing system used across the open-source world for ~25 years), was a release manager for **Perl 5**, and co-founded **[Keyboardio](https://shop.keyboard.io/)** (the mechanical keyboard company). When he turned his attention to Claude Code in October 2025 — the same week Anthropic launched the plugin system — he shipped **[Superpowers](approaches.md#superpowers)** within days. It hit 93K+ stars on the strength of a different design center than GStack: instead of "ship products faster," Superpowers enforces *the engineering discipline humans took decades to develop* — design-doc-first, TDD-mandatory, bite-sized tasks (2–5 minutes), autonomous subagents.

Vincent's relevance: he brings the long view. The discipline he's encoding into skills isn't theoretical — it's how he ran RT and Perl 5 for two decades.

**Key works to know:**

- [Superpowers framework](https://github.com/obra/superpowers) — the methodology-as-skills artifact
- [Request Tracker](https://bestpractical.com/request-tracker) — the long-running production system that informs the methodology
- [obra.com](https://obra.com/) — his blog
- [Prime Radiant](https://primeradiant.com/) — his current company

**Start here:** The [Superpowers README](https://github.com/obra/superpowers) plus the brainstorming skill (`SKILL.md` for `brainstorming`) — that one skill captures the design-first philosophy that distinguishes Superpowers from every other Claude Code skill pack.

---

## Harrison Chase

> 🔨 Operator · Co-founder & CEO, [LangChain](https://www.langchain.com/) · [@hwchase17](https://twitter.com/hwchase17) · [GitHub](https://github.com/hwchase17)

Made the first commit to LangChain on October 24, 2022. By 2025–2026, LangChain + LangGraph + LangSmith was the most-deployed agent stack in enterprise production — referenced across our [Infrastructure / Orchestration tables](infrastructure.md#agent-specific-orchestration-frameworks) and the [Vercel Open Agents](approaches.md#vercel-open-agents) stack. Chase has articulated more of the *practitioner vocabulary* of the field than almost anyone else: he popularized **context engineering**, the **scaffold vs. harness** distinction, **ambient agents**, and the **read-vs-write multi-agent scalability axis**. His worldview — *trust through observability, HITL as a permanent feedback loop, memory as the next moat* — gets a dedicated treatment in our [Schools](schools.md#trust-as-observability-chase) page.

**Key works to know:**

- [LangChain](https://github.com/langchain-ai/langchain) (2022) — abstractions for LLM apps + tools
- [LangGraph](https://github.com/langchain-ai/langgraph) (early 2024) — stateful agent orchestration
- [LangSmith](https://smith.langchain.com/) — observability + evals + Prompt Hub
- *[How and When to Build Multi-Agent Systems](https://www.langchain.com/blog/how-and-when-to-build-multi-agent-systems)* (June 2025) — the multi-agent design framework
- *[Reflections on Three Years of Building LangChain](https://www.langchain.com/blog/three-years-langchain)* — the meta-take

**Start here:** *[How to Think About Agent Frameworks](https://www.langchain.com/blog/how-to-think-about-agent-frameworks)* (April 2025) — Chase's cleanest framing of where the agent stack is going. Pair with the [Sequoia podcast episode](https://sequoiacap.com/podcast/training-data-harrison-chase-2/) for long-form.

---

## Teknium (Karan Malhotra)

> 🧠 Operator + researcher · Nous Research · [Hermes Agent](approaches.md#hermes-agent) / [Hermes model line](https://nousresearch.com/) / [Atropos RL](https://github.com/NousResearch/atropos) · [@Teknium1](https://twitter.com/Teknium1)

Co-founder of **[Nous Research](https://nousresearch.com/)** — the model lab behind the **Hermes** language-model series (Hermes 1, 2, 3, 4 — open-weights, trained on Atropos RL with rejection sampling across ~1,000 task-specific verifiers), **[Atropos](https://github.com/NousResearch/atropos)** (their distributed RL framework), and the **[Hermes Agent](approaches.md#hermes-agent)** that consumes the model line. Teknium is the most visible public face of Nous, has driven a significant chunk of the post-training community's tooling, and represents an unusual category: the model-lab founder who also ships an agent that *uses the model lab's own training pipeline* as feedback.

Why this matters: most agent frameworks treat the model as a fixed input. Hermes Agent treats it as another component the agent maintains — every trajectory is training data, every Curator pass is a quality filter, the agent's own behavior feeds the next model release.

**Key works to know:**

- [Hermes Agent](https://github.com/NousResearch/hermes-agent) (95K+ stars, fastest-growing OSS agent of 2026)
- [Atropos](https://github.com/NousResearch/atropos) — distributed RL framework, used in Hermes 4 training
- Hermes 3/4 model releases — see [nousresearch.com](https://nousresearch.com/)
- [Nous Forge](https://forge.nousresearch.com/) — their inference + fine-tuning platform

**Start here:** Install Hermes Agent locally, let it run for a week with the Curator on, then read the audit log at `~/.hermes/logs/curator/<timestamp>/REPORT.md`. The audit log is the cleanest single artifact in agentic engineering demonstrating "self-improvement" with an explicit cadence and rubric.

---

## John Yang

> 🧠 Academic researcher · Princeton NLP · [SWE-agent](approaches.md#swe-agent) / mini-SWE-agent / SWE-bench · [@jyangballin](https://twitter.com/jyangballin)

The Princeton PhD student behind **[SWE-agent](https://github.com/SWE-agent/SWE-agent)** (the original open-source SWE-bench harness, NeurIPS 2024) and **mini-SWE-agent** (the 100-line agent that scores 74%+ on SWE-bench Verified — a result that broke the "you need a sophisticated framework to do well on SWE-bench" assumption). With his co-authors (Carlos Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, Ofir Press) at Princeton NLP, he also leads **[SWE-bench](https://www.swebench.com/)** itself — the benchmark every other agent in this list publishes against.

Why he matters: SWE-bench / SWE-bench Verified is *the* shared metric in coding-agent research, and SWE-agent is the canonical reference harness. The "harness = scaffolding around a model" framing that the OpenAI/Anthropic harness-engineering posts inherit was first explicitly articulated in the SWE-agent paper as the "Agent-Computer Interface" concept.

**Key works to know:**

- [SWE-bench](https://www.swebench.com/) — the benchmark, leaderboard, and paper
- [SWE-agent](https://github.com/SWE-agent/SWE-agent) — the reference harness
- [mini-SWE-agent](https://github.com/SWE-agent/mini-SWE-agent) — the 100-line proof that minimal harnesses can be top-tier
- [SWE-bench Multimodal](https://www.swebench.com/multimodal.html), [SWE-bench Multilingual](https://www.swebench.com/multilingual.html), [SWE-bench Pro](https://github.com/scaleapi/SWE-bench_Pro-os) — the expanding family

**Start here:** Read the *[SWE-agent](https://arxiv.org/abs/2405.15793)* NeurIPS 2024 paper. Then look at [mini-SWE-agent's 100-line agent](https://github.com/SWE-agent/mini-SWE-agent) and ask why it works.

---

## Shunyu Yao

> 🧠 Researcher · Research Scientist, OpenAI · [@ShunyuYao12](https://twitter.com/ShunyuYao12) · [ysymyth.github.io](https://ysymyth.github.io/)

Yao's PhD thesis at Princeton (under Karthik Narasimhan) is essentially the canonical academic story of how the modern language-agent stack came together. He's lead or co-lead on **[ReAct](https://arxiv.org/abs/2210.03629)** (the reasoning+acting interleave pattern), **[Tree of Thoughts](https://arxiv.org/abs/2305.10601)** (deliberate problem-solving via search), **[Reflexion](https://arxiv.org/abs/2303.11366)** (verbal RL), **[WebShop](https://arxiv.org/abs/2207.01206)** (the original web-environment benchmark), **[τ-bench](https://arxiv.org/abs/2406.12045)** (tool-agent-user interaction), and **SWE-bench / SWE-agent** alongside [John Yang](#john-yang). Now at OpenAI working on Computer-Using Agent (CUA) and Deep Research.

His essay *[The Second Half](https://ysymyth.github.io/The-Second-Half/)* argues the next phase of agentic AI is about *evaluation* rather than capability — which is exactly the thesis our [Benchmarks](benchmarks.md) page tracks.

**Key works to know:**

- *[ReAct](https://arxiv.org/abs/2210.03629)* (ICLR 2023) — the reasoning + acting interleave
- *[Tree of Thoughts](https://arxiv.org/abs/2305.10601)* (NeurIPS 2023) — search over reasoning trees
- *[Reflexion](https://arxiv.org/abs/2303.11366)* (NeurIPS 2023) — verbal reinforcement learning
- *[SWE-agent](https://arxiv.org/abs/2405.15793)* (NeurIPS 2024) — the canonical reference harness
- *[The Second Half](https://ysymyth.github.io/The-Second-Half/)* (2025) — the eval-first thesis for what comes next

**Start here:** Read ReAct first, then *The Second Half*. ReAct shows where the agent stack came from; *The Second Half* tells you where it's going.

---

## Noam Brown

> 🧠 Researcher · Research Scientist, OpenAI · [@polynoamial](https://twitter.com/polynoamial) · [noambrown.github.io](https://noambrown.github.io/)

The reasoning lineage from poker to o1. Brown spent the late 2010s building **Libratus** (2017, superhuman heads-up no-limit poker) and **Pluribus** (2019, superhuman multiplayer poker) — both demonstrations that *search at inference time* could close the gap between fixed-policy models and human experts. Then **CICERO** (Science 2022) extended that to natural-language Diplomacy, the first AI to play at human level in a strategic-communication game. He joined OpenAI in 2023 and was a foundational contributor to the **o1** reasoning models.

His core thesis — that test-time search / planning matters as much as model scale — is the intellectual root of the entire "reasoning model" wave of 2024–2026, and is why our [Inference Strategy for Agents](inference.md#inference-strategy-for-agents) treats inference compute as a first-class variable.

**Key works to know:**

- Libratus (2017) + Pluribus (2019) — superhuman poker via search + CFR
- *[Human-level play in the game of Diplomacy](https://www.science.org/doi/10.1126/science.ade9097)* (Science 2022) — CICERO
- OpenAI o1 / o3 reasoning models — research contributor
- *[OpenAI talk on planning in AI](https://www.youtube.com/watch?v=eaAonE58sLU)* — the cleanest single-source explanation of the thesis

**Start here:** The OpenAI talk on planning above. It traces the line from poker through Diplomacy to o1 in one self-contained presentation.

---

## Douwe Kiela

> 🧠 Researcher / 🔨 Operator · Co-founder & CEO, [Contextual AI](https://contextual.ai/) · Adjunct Prof, Stanford Symbolic Systems · [@douwekiela](https://twitter.com/douwekiela)

The RAG paper's first author. Kiela led the team behind *[Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)* (NeurIPS 2020) — the paper that named and operationalized retrieval-augmented generation. Since then he's been the bridge between retrieval research and enterprise production: Contextual AI ships the RAG + context-engineering platform that grounds agents over private high-stakes knowledge.

Why he matters here: every agent in [Approaches](approaches.md) that touches enterprise documents — Sierra, LlamaIndex, GBrain, Clawpatch — sits on top of variants of the RAG architecture Kiela helped define. He's also Dynabench's co-creator, which set the template for the "evals-as-product" startup pattern that's now everywhere in our [Eval](infrastructure.md#evaluation-testing) section.

**Key works to know:**

- *[Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)* (NeurIPS 2020) — the RAG paper
- *[Retrieval Augmentation Reduces Hallucination in Conversation](https://arxiv.org/abs/2104.07567)* (2021)
- *[Dynabench](https://dynabench.org/)* — dynamic NLP benchmarking, predecessor of many eval-as-product startups
- [Contextual AI blog](https://contextual.ai/blog) — production RAG patterns

**Start here:** The original RAG paper. It's short, technical, and you'll see why every "retrieval over private data" product is downstream of it.

---

## Illia Polosukhin

> 🧠 Researcher / 🔨 Operator · Co-founder, [NEAR Protocol](https://near.org/) + [NEAR AI](https://near.ai/) · *Attention Is All You Need* co-author · [@ilblackdragon](https://twitter.com/ilblackdragon)

One of the eight co-authors of *Attention Is All You Need* (2017) — the Transformer paper — Polosukhin is the most prominent voice making a **decentralized-trust** case for agentic infrastructure. His thesis, covered in our [Schools](schools.md#trust-as-cryptography-polosukhin) page: centralized AI providers represent a structural manipulation risk; agents need their own keys, TEE-isolated execution, and on-chain identity to be genuinely autonomous economic participants.

His current work — **NEAR AI**, **[IronClaw](approaches.md#openclaw)** (a Rust agent runtime that runs inside Trusted Execution Environments and serves as the OS layer of the OpenClaw ecosystem), the **Confidential GPU Marketplace**, and the **Shade Agent** framework — bets that cryptographic sovereignty is the foundation autonomous agents will eventually require. Worth understanding even if you don't buy the blockchain framing, because the TEE-secured-execution argument is increasingly being adopted on traditional clouds (Azure Confidential Computing, Google Cloud Confidential VMs).

**Key works to know:**

- *[Attention Is All You Need](https://arxiv.org/abs/1706.03762)* (2017) — the Transformer paper, co-author
- [NEAR AI](https://near.ai) — current home
- IronClaw (Rust agent runtime in TEE; OpenClaw ecosystem OS layer)
- *[Shade Agents: The First Truly Autonomous AI Agents](https://www.near.org/blog/shade-agents-the-first-truly-autonomous-ai-agents)* — the "if an agent doesn't have its own keys, it's not an agent" thesis
- [Intelligence at the Frontier keynote](https://www.youtube.com/watch?v=M-BVxaqKp-0) (2026)

**Start here:** Read the Shade Agents post — the clearest one-page version of his argument, and the cleanest diff against the Chase/Ng frame.

---

## Ethan Mollick

> ✍️ Chronicler + academic · Wharton (UPenn) · *[Co-Intelligence](https://www.penguinrandomhouse.com/books/741805/co-intelligence-by-ethan-mollick/)* · [One Useful Thing newsletter](https://www.oneusefulthing.org/) · [@emollick](https://twitter.com/emollick)

The academic who's done more than anyone to translate the agent / LLM transformation for senior leaders and educators. Mollick is a Wharton professor whose **[*Co-Intelligence: Living and Working with AI*](https://www.penguinrandomhouse.com/books/741805/co-intelligence-by-ethan-mollick/)** (Apr 2024) is the closest thing the field has to a single book to hand to a non-technical executive who needs to understand what's happening. His **[One Useful Thing](https://www.oneusefulthing.org/)** Substack newsletter has the largest practitioner audience for any single LLM/agent writer, and his framing of **"four rules for getting good results"** and **"the jagged frontier"** (some tasks AI nails, adjacent tasks it fails entirely) have become standard vocabulary in agentic-engineering presentations.

For the agentic-engineering reader specifically: Mollick's value is the *organizational lens*. Most names in this list are technical; Mollick is the one writing about what happens when these systems land in real companies with real people.

**Key works to know:**

- *Co-Intelligence: Living and Working with AI* (book, 2024)
- [One Useful Thing](https://www.oneusefulthing.org/) Substack — esp. the "jagged frontier" / "centaurs vs cyborgs" essays
- His [Wharton agent / AI courses](https://aiclass.wharton.upenn.edu/)
- The original "[Centaurs and Cyborgs on the Jagged Frontier](https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged)" study

**Start here:** If you read books, *Co-Intelligence*. If not, the *Jagged Frontier* essay above.

---

## swyx (Shawn Wang) + Alessio Fanelli

> ✍️ Chroniclers / podcasters · [Latent Space](https://www.latent.space/) · [@swyx](https://twitter.com/swyx) / [@alessiofanelli](https://twitter.com/alessiofanelli)

The hosts of **[Latent Space](https://www.latent.space/)** — the highest-signal AI engineering podcast and Substack, with the interview circuit that most major agentic-engineering systems pass through. Their conversation with the OpenAI Symphony team is the canonical primary source for the [Symphony approach](approaches.md#openai-symphony) and the underlying "harness engineering" terminology OpenAI later wrote up. They've also interviewed the Stripe Minions team, Anthropic engineering, the Hermes / Nous Research team, and most of the other names in this list.

swyx (Shawn Wang) is also a prolific independent essayist — he coined the term **"AI Engineer"** (and runs the [AI Engineer Summit](https://www.ai.engineer/)), and has written several of the framing documents — *[Rise of the AI Engineer](https://www.latent.space/p/ai-engineer)*, *[The Four Wars of the AI Stack](https://www.latent.space/p/dec-2023)* — that the field uses to think about itself.

**Key works to know:**

- [Latent Space podcast](https://www.latent.space/) — start with their *OpenAI Symphony* episode (the canonical Symphony primary source)
- [AI Engineer Summit](https://www.ai.engineer/) — annual conference
- *[Rise of the AI Engineer](https://www.latent.space/p/ai-engineer)* (2023) — the essay that named the job category
- swyx's [personal site](https://swyx.io/) for the longer essays

**Start here:** Subscribe to the [podcast](https://www.latent.space/podcast). The interview circuit is where most agentic-engineering practitioners get their first deep dive on each new system.

---

## Lee Robinson

> 🔨 Operator · Vercel · [Vercel Open Agents](approaches.md#vercel-open-agents) / Vercel AI SDK · [@leeerob](https://twitter.com/leeerob) · [leerob.com](https://leerob.com/)

VP of Product at Vercel, the most-cited public voice on the Vercel agent stack — the AI SDK, AI Gateway, Vercel Workflow, Vercel Sandbox, and Vercel Open Agents template. Robinson's role at Vercel + his prolific public output (YouTube, blog, conferences) makes him the de facto evangelist for **the "agent outside the sandbox" architectural pattern** that Vercel Open Agents codifies, and one of the most influential voices on how millions of front-end engineers think about agent integration.

Outside Vercel he's also one of the most followed Next.js / React educators; that scale of audience is the reason Vercel's agent design choices propagate so quickly through the web-dev ecosystem.

**Key works to know:**

- [Vercel AI SDK](https://sdk.vercel.ai/) — the TypeScript toolkit underneath Open Agents
- [Vercel Open Agents](https://github.com/vercel-labs/open-agents) — the reference template (covered in our [Approaches](approaches.md#vercel-open-agents) page)
- [Vercel Skills](https://github.com/vercel-labs/skills) — `npx skills` to install SKILL.md skills into 51+ agents
- [leerob.com](https://leerob.com/) blog + [YouTube](https://www.youtube.com/@leerob)

**Start here:** Read [The Vercel AI SDK docs](https://sdk.vercel.ai/docs) — it's the cleanest treatment of "streaming tool use + structured outputs + UI integration" available. Then look at [Vercel Open Agents](https://github.com/vercel-labs/open-agents) for how those primitives compose into a complete cloud-agent stack.

---

## Beyang Liu

> 🔨 Operator · [Sourcegraph](https://sourcegraph.com/) / [Amp](https://ampcode.com/) · [@beyang](https://twitter.com/beyang) · [beyang.org](https://beyang.org/)

Co-founder & CTO of Sourcegraph, the company that's been building code intelligence at scale since 2013 and which now ships **[Amp](https://ampcode.com/)** (formerly Cody) — one of the major frontier coding agents that appears regularly on Terminal Bench and SWE-bench leaderboards. Liu's value as a Who's Who entry: he's been thinking about *the code-search-and-context problem that agents need solved* longer than anyone in this list. Sourcegraph's code graph is the substrate underneath Amp; the way Amp does multi-repo coding, code-graph context, and large-codebase reasoning is several years ahead of newer entrants that started after the model wave.

Background: Stanford CS, Palantir before Sourcegraph. Hosts the **[Sourcegraph Dev Tools podcast](https://about.sourcegraph.com/podcast/)**, which is one of the few places senior code-intelligence people speak publicly about how this stuff actually works at scale.

**Key works to know:**

- [Amp](https://ampcode.com/) — the agent
- Sourcegraph's [code graph](https://sourcegraph.com/) — the substrate
- [Dev Tools Time podcast](https://about.sourcegraph.com/podcast/) and [Sourcegraph blog](https://sourcegraph.com/blog/)
- [beyang.org](https://beyang.org/) for personal essays

**Start here:** Try Amp on a real multi-repo refactor that touches three or more services. You'll learn more about why "code graph context" matters than from any number of blog posts.

---

## Jerry Liu

> 🔨 Operator · Co-founder & CEO, [LlamaIndex](https://www.llamaindex.ai/) · [@jerryjliu0](https://twitter.com/jerryjliu0)

Founder of [LlamaIndex](https://github.com/run-llama/llama_index), which began life as GPT Index in 2022 as one of the earliest RAG frameworks (alongside [LangChain](#harrison-chase)) and has since pivoted into **agentic document infrastructure** — the parsing, extraction, classification, and workflow-orchestration layer that lets agents reliably operate over real-world enterprise documents (invoices, contracts, medical records, regulatory filings). His 2025–2026 pivot from "RAG framework for everyone" to "agentic document workflows for enterprise" is one of the clearest examples in the ecosystem of an open-source framework finding its specific load-bearing position in the broader agent stack.

**LlamaParse**, **LlamaCloud**, and **LlamaIndex Workflows** are the productization. If [Douwe Kiela](#douwe-kiela) defined the retrieval substrate, Liu defined the document-pipeline substrate.

**Key works to know:**

- [LlamaIndex](https://github.com/run-llama/llama_index) — the framework
- [LlamaCloud + LlamaParse](https://cloud.llamaindex.ai/) — managed document parsing / extraction
- *[LlamaIndex Is More Than a RAG Framework](https://www.llamaindex.ai/blog/llamaindex-is-more-than-a-rag-framework)* — the architectural pivot in his own words
- [LlamaIndex blog](https://www.llamaindex.ai/blog) — the most useful single source on "how to actually do agentic document work"

**Start here:** Sign up for LlamaCloud and parse one of your own complex PDFs. Then read the "more than a RAG framework" post to see why the pivot was the right call.

---

## Appendix: people, projects, and writers we considered but didn't profile

This page caps at 12 to stay useful. Strong candidates we deliberately didn't write up — each of them is worth following:

- **Anthropic Applied AI team** (Eli Bixby, Hannah Erlich, et al.) — authors of [*Effective Harnesses for Long-Running Agents*](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) and [*Harness Design for Long-Running Application Development*](https://www.anthropic.com/engineering/harness-design-long-running-apps), referenced extensively in [Harness Engineering](harness-engineering.md). Collective authorship.
- **OpenAI harness engineering authors** — the team behind [*Harness Engineering: Leveraging Codex in an Agent-First World*](https://openai.com/index/harness-engineering/) and the million-LOC Codex experiment. Also collective.
- **Stripe Minions team** — kept anonymous in [the Stripe blog post](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents), but the patterns are now the [Stripe School](approaches.md#stripe-minions).
- **Stanshy** (AgentHub + Claude Code Mastery course) — intentionally pseudonymous. The [course material](https://github.com/Stanshy/Claude-code-mastery) is excellent.
- **The Walking Labs team** (Learn Harness Engineering course) — anonymous OSS account; the [12-lecture course](https://walkinglabs.github.io/learn-harness-engineering/en/) is the most thorough public synthesis of the discipline.
- **Sigrid Jin** ([Claw Code](https://claw-code.codes/)) — the clean-room Rust + Python rewrite of Claude Code after the March 2026 source leak; fastest repo to 100K stars.
- **Affaan M.** ([Everything Claude Code](approaches.md#everything-claude-code)) — the security-auditing harness.
- **Mario Zechner / badlogic** (Pi coding agent) — author of the minimal pi-mono harness inside OpenClaw.
- **Sam Bhagwat / Mastra team** — building the TypeScript-native agent framework (YC W25).
- **Garry Tan's GBrain co-architects** — gbrain's contributors deserve credit beyond just Garry's branding.
- **Logan Kilpatrick** — ex-OpenAI DevRel, now Google DeepMind; defines how a lot of API-facing engineers think about agents.
- **Anna Gutowska** (IBM) — author of [IBM's *What is Agentic Engineering?*](https://www.ibm.com/think/topics/agentic-engineering); good mainstream-enterprise framing.
- **João Moura** (CrewAI) — multi-agent orchestration framework with significant enterprise adoption; products covered in our [Infrastructure / Orchestration](infrastructure.md#agent-specific-orchestration-frameworks) section.
- **Demis Hassabis** (Google DeepMind / Isomorphic Labs) — the establishment heavyweight whose AlphaGo / AlphaFold lineage underpins much of how the field thinks about planning + search + memory.
- **Robert Nishihara** (Anyscale / Ray) — distributed compute substrate that increasingly underpins agentic RL workloads.
- **Bret Taylor** (Sierra, OpenAI Chairman) — enterprise CX agents; not coding-agent-shaped but a major voice on enterprise agent deployment.
- **Mustafa Suleyman** (Microsoft AI) — DeepMind co-founder, Inflection co-founder, now leads MAI Superintelligence team; the "humanist superintelligence" framing.
- **Chip Huyen** — *AI Engineering* (O'Reilly 2025) and *Designing Machine Learning Systems* (2022); the production-ML engineering discipline upstream of agentic engineering.
- **Yohei Nakajima** (BabyAGI) — the 2023 task-loop architecture that kicked off the modern autonomous-agent boom; now invests via Untapped Capital and Agent Fund.
- **Joon Sung Park** (Simile, ex-Stanford) — *Generative Agents: Interactive Simulacra of Human Behavior* (2023) — the Smallville paper that defined memory-stream / reflection / retrieval agent architecture.
- **Sholto Douglas** (Anthropic) — RL scaling, verifiable rewards, computer-use; deep agent-infrastructure work.

If you'd extend the page to 30+, those are the next names worth profiling.

---

## Reading order if you're new

If the list looks overwhelming, here's a one-week onboarding path:

| Day | Read / watch | Why |
|-----|--------------|-----|
| 1 | Karpathy: *State of GPT* (40 min) | Foundation — every agent diagram traces back here |
| 2 | Osmani: *Agentic Engineering* essay | Cleanest definition of the field as it stands today |
| 3 | Willison: latest "Things I've learned about LLMs" + one week of his blog | Current vocabulary, what's actually new |
| 4 | Karpathy: *Software 2.0* (2017) + *A Recipe for Training Neural Networks* (2019) | The intellectual roots |
| 5 | Steinberger: OpenClaw repo + AI Software Factory thread | What an aggressive production implementation looks like |
| 6 | Tan: install GStack into your `~/.claude/` and read the SKILL.md files | Hands-on reference harness |
| 7 | Latent Space podcast: OpenAI Symphony episode + one other Vincent or Liu or Teknium episode you choose | How the operators talk about their work |

That's enough background to read [Harness Engineering](harness-engineering.md) and the rest of this reference with full context.
