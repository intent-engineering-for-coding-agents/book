# References

*Last reviewed: 2026-05-25.*

Grouped by theme. Each entry includes the publication date, or "(ongoing)" with the last-reviewed date for living sites. Inline `*Sources:*` lines in [plan-ase-book.md](plan-ase-book.md) point into this section.

## Foundations — engineering practice, decision records, plain-text-as-code

- Andrej Karpathy — ["Vibe coding"](https://x.com/karpathy/status/1886192184808149383). X (Twitter), *Feb 2, 2025*. Origin of the term used in this book's subtitle.
- Simon Willison — ["Not all AI-assisted programming is vibe coding"](https://simonwillison.net/2025/Mar/19/vibe-coding/). *Mar 19, 2025*. Practical counterweight to Karpathy.
- Ian Sommerville — *Software Engineering* (10th ed., Pearson, 2015). SDLC definition and phases; cited in "The Map: ASE and the SDLC".
- Dave Farley — *Modern Software Engineering* (Addison-Wesley, 2021); with Jez Humble: *Continuous Delivery* (Addison-Wesley, 2010) and [continuousdelivery.com](https://continuousdelivery.com/) (ongoing). Feedback loops, sampling, CI/CD vocabulary.
- Paul Hammant — [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/) (ongoing) and *Trunk-Based Development and Branch by Abstraction* (Leanpub, 2020). Canonical TBD reference.
- Michael Nygard — ["Documenting Architecture Decisions"](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions). Cognitect blog, *Nov 15, 2011*. Origin of the ADR practice.
- Oliver Kopp, Anita Armbruster, Olaf Zimmermann — [MADR template](https://adr.github.io/madr/) (ongoing) and ["Markdown Architectural Decision Records: Format and Tool Support"](https://ceur-ws.org/Vol-2072/paper9.pdf), CEUR-WS Vol-2072, *2018*. Markdown ADR template used in `docs/decisions/`.
- Flemming N. Larsen — [Plain Text as Code Manifest](https://github.com/Plain-Text-as-Code). GitHub, *March 2026, ongoing*. Author's foundational statement of the philosophy; the Foundation chapter applies it to ASE.
- [Docs as Code — Write the Docs guide](https://www.writethedocs.org/guide/docs-as-code.html) (ongoing). Plain-text-as-code practice.
- [Mermaid](https://mermaid.js.org/) (ongoing). Text-defined diagrams; includes [live editor](https://mermaid.live) and [diagram catalogue](https://mermaid.js.org/ecosystem/tutorials.html).
- Simon Brown — [C4 model](https://c4model.com/) (ongoing). Architecture views.
- Simon Brown — [Structurizr](https://docs.structurizr.com/) (ongoing). Models-as-code tooling for C4 DSL.
- Terrastruct — [D2](https://d2lang.com/) (ongoing). A modern diagram scripting language; produces richer layouts than Mermaid but as of 2026 is not rendered inline by major Git hosts. Referenced in the Plain-Text-as-Code chapter as context for why Mermaid is the current practical choice.
- Frederick P. Brooks Jr. — *The Mythical Man-Month: Essays on Software Engineering* (Addison-Wesley, 1975; 20th anniversary ed. 1995). "Plan to Throw One Away" (ch. 11): the first system will be discarded; plan for it. Agentic regeneration collapses the cost of that discard from months to minutes.
- Alistair Cockburn — *Crystal Clear: A Human-Powered Methodology for Small Teams* (Addison-Wesley, *2004*). Origin of the "walking skeleton" pattern — etymology for the modern `skeleton.md` artefact.
- Apache Maven Project — ["Introduction to the Standard Directory Layout"](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html). Maven Documentation, last modified *Mar 9, 2014*. Maven popularized "convention over configuration" in the Java build world starting with Maven 1 (2004); this page is the canonical illustration.
- David Heinemeier Hansson — ["The Rails Doctrine"](https://rubyonrails.org/doctrine/). Ruby on Rails, *Jan 19, 2016*. Codifies "Convention over Configuration" as one of nine doctrinal pillars (Rails released 2004); the most-cited popular usage of the phrase.

## Spec-driven development

- Fission AI — [OpenSpec](https://openspec.dev/) ([repo](https://github.com/Fission-AI/OpenSpec), ongoing). The change-folder + delta-spec framework this book uses end-to-end.
  - openspec.dev — [FAQ](https://openspec.dev/faq) (ongoing). Source for the "Lightweight. Minimal steps, minimal process". quote used in the AC IDs chapter to establish that OpenSpec deliberately does not prescribe ID formats or coverage rules.
- GitHub — [Spec-Kit](https://github.com/github/spec-kit) ([docs](https://github.github.com/spec-kit/), ongoing). Enterprise end of the spectrum.
- [LeanSpec](https://lean-spec.dev) (ongoing). Smaller-community framework articulating the small-spec discipline.
- Rick Hightower — ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI: Where SDD Tools Diverge"](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46). Medium, *Feb 27, 2026*. Tool-tradeoff map for Phase T.
- Rick Hightower — ["What Is GSD? Spec-Driven Development Without the Ceremony"](https://pub.spillwave.com/what-is-gsd-spec-driven-development-without-the-ceremony-570216956a84). Spillwave, *Feb 23, 2026*. Companion piece on the lightweight end of SDD.
- GitHub Blog — ["Spec-driven development with AI: Get started with a new open source toolkit"](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/). *Sep 2, 2025*. Official launch context for SpecKit.
- ["Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants"](https://openreview.net/forum?id=bw5mNj75h9). OpenReview submission to AIware 2026, *Jan 30, 2026* (modified Apr 2, 2026). Academic framing of spec-as-contract; anchor for the "spec-driven hardened into a recognized practice" claim in the Introduction.
- SolGuruz — ["Spec-Driven Development Guide"](https://solguruz.com/blog/spec-driven-development-guide/). *Mar 12, 2026*. Industry overview of spec-driven workflows.
- IntuitionLabs — ["Spec-Driven Development & Spec-Kit"](https://intuitionlabs.ai/articles/spec-driven-development-spec-kit). Revised *Feb 21, 2026*. Spec-Kit walkthrough.
- ["From Vibe Coding to Spec-Driven Development"](https://towardsdatascience.com/from-vibe-coding-to-spec-driven-development/). Towards Data Science, *2025*. Describes the transition from ephemeral chat-based prompting to version-controlled spec artefacts; confirms vibe coding produces no formal spec file by default.
- Framelink — [Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP) (ongoing, 14.9k★). MCP server bridging Figma design data to AI coding agents; fetches layout metadata, component structure, spacing, and colors from Figma files.

## Agentic engineering & AI instructions

- Tsinghua University et al. — ["GLM-5: From Vibe Coding to Agentic Engineering"](https://arxiv.org/abs/2602.15763). arXiv:2602.15763, *Feb 2026*. A major model paper whose subtitle mirrors this book's own framing — academic confirmation that "vibe coding → agentic engineering" is the recognized arc. Linked as a key resource in the jordimas/awesome-agentic-engineering list.
- [AGENTS.md](https://agents.md/) (ongoing). De-facto AI-agent entry-point file (May 2026 snapshot).
- GitHub Changelog — ["Copilot coding agent now supports AGENTS.md custom instructions"](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/). *Aug 28, 2025*. Confirms native AGENTS.md support in the Copilot coding agent.
- AgentPatterns.ai — ["AGENTS.md: Project-Level README for AI Coding Agents"](https://agentpatterns.ai/standards/agents-md/) and ["Evaluating AGENTS.md: When Context Files Hurt More Than Help"](https://agentpatterns.ai/instructions/evaluating-agents-md-context-files/) (ongoing). TOC pattern, context-file evaluation.
- Anthropic — ["Building effective agents"](https://www.anthropic.com/research/building-effective-agents). *Dec 2024*. Design philosophy behind the MCP-driven check architecture.
- [Model Context Protocol](https://modelcontextprotocol.io) (ongoing). Agent-tool bridge standard.
- ThoughtWorks — Technology Radar Vol 34: [press release](https://www.thoughtworks.com/about-us/news/2026/combat-ai-cognitive-debt-radar-v34) and [PDF](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/04/tr_technology_radar_vol_34_en.pdf). *April 2026*. Cognitive debt, harness engineering, named SDD frameworks.
- Birgitta Böckeler — [publications hub](https://birgitta.info/) (ongoing) and ["Navigating AI Development Workflows"](https://refactoring.fm/p/navigating-ai-development-workflows) (Refactoring.fm interview). ThoughtWorks Distinguished Engineer, AI-assisted software delivery lead.
- Steve Yegge — ["Revenge of the junior developer"](https://sourcegraph.com/blog/revenge-of-the-junior-developer). Sourcegraph blog, *Mar 22, 2025*. Six-wave model for the agentic shift (Manual → Completions → Chat → Coding Agents → Agent Clusters → Agent Fleets).
- Bill Doerrfeld — ["AI doesn't create great developers, it amplifies them"](https://leaddev.com/ai/ai-doesnt-create-great-developers-it-amplifies-them). LeadDev, *Jan 20, 2026*. The amplification thesis: AI multiplies the developer's existing skill — bad inputs ship bad code faster, experienced inputs ship experienced code faster. A touchstone reference for why ASE targets senior developers.
- Geoffrey Huntley — ["Everything is a Ralph loop"](https://ghuntley.com/loop/). *Jan 17, 2026*. Harness / back-pressure engineering primer.
- Microsoft — ["An AI-led SDLC: Building an end-to-end agentic software development lifecycle"](https://techcommunity.microsoft.com/blog/appsonazureblog/an-ai-led-sdlc-building-an-end-to-end-agentic-software-development-lifecycle-wit/4491896). *Feb 5, 2026*. Industry-view backdrop.
- IBM — ["AI in SDLC"](https://www.ibm.com/think/topics/ai-in-sdlc) (ongoing). Industry-view backdrop.
- Outshift (Cisco) — ["Agentic SDLC: A New Evolution in Software Engineering"](https://outshift.cisco.com/blog/ai-ml/agentic-sdlc-new-evolution-in-software-engineering). *Apr 14, 2026*. Specs-and-harnesses framing of the coding-agent SDLC; closest in scope to this book.
- EPAM — ["Agentic Development Lifecycle (ADLC): A New Model for AI Systems Beyond SDLC"](https://www.epam.com/insights/ai/blogs/agentic-development-lifecycle-explained). *Feb 5, 2026*. Phase-0 governance + validation gates; ADLC literature for *building agents as products*, distinct scope from ASE.
- Arthur AI — ["The Agent Development Lifecycle (ADLC): A Blueprint to Ship Reliable AI"](https://www.youtube.com/watch?v=Odj-x2OZODw). YouTube talk, *Dec 8, 2025*. Eval-driven development and the post-deploy agent flywheel; ADLC for agents-as-products.
- Jesper Lowgren — ["Agentic AI Breaks the SDLC. Now What?"](https://www.youtube.com/watch?v=nSU7wiTyI4Q). YouTube talk, *Mar 31, 2026*. Six governance pillars (Intent / Boundary / Semantic / Policy / Protocol / Assurance) and a 12-step Agentic SDLC; the runtime-governance and deterministic-cage angle on agents-as-products. Surfaces the terminology collision: "Agentic SDLC" used here for autonomous-agent governance, distinct from Outshift's coding-agent SDLC.
- Tim De Schryver — ["Keep Agentic AI Simple: A Practical Workflow for Software Development"](https://timdeschryver.dev/blog/keep-agentic-ai-simple-a-practical-workflow-for-software-development). *May 6, 2026*. Practical individual-developer workflow.
- [.principles / dot-principles](https://github.com/dot-principles) and [example-catalog](https://github.com/dot-principles/example-catalog) (ongoing). Principle-as-code experiment, optional complement to specs/tests.
- [Reversa](https://github.com/sandeco/reversa) (ongoing, MIT). Five-phase reverse-engineering framework that coordinates AI sub-agents inside Claude Code / Cursor / Codex to extract C4 diagrams, ERDs, state machines, and API contracts from legacy code — the canonical brownfield `skeleton.md` toolchain.
- Stephan Schwab — ["AI as Your Legacy Code Archaeologist"](https://www.caimito.net/en/blog/2026/02/07/ai-as-your-legacy-code-archaeologist.html). Caimito blog, *Feb 7, 2026*. Practitioner voice on AI-driven extraction of business rules from legacy code.
- Fujitsu — ["Generative AI service that analyzes source code and automatically generates design documents"](https://global.fujitsu/en-global/pr/news/2026/03/30-01). Fujitsu press release, *Mar 30, 2026*. Industry-scale validation of automated legacy-to-design extraction.

## Security

- [OWASP](https://owasp.org/) (ongoing) and [OWASP Top 10](https://owasp.org/www-project-top-ten/) (ongoing). Review checklist anchor for the Security in Depth chapter.
