---
type: appendix
title: Credits
---

# Credits

The full bibliography appears in [References](/appendices/references). This page is attribution-only: intellectual debts, tool precedents, and prior art named in one place.

## Foundational engineering practice

Dave Farley ("Modern Software Engineering", 2021) and Jez Humble ("Continuous Delivery", 2010) are the conceptual anchor for this book's feedback loops, small batches, and Continuous Integration (CI) discipline.

Michael Nygard's 2011 account of Architectural Decision Records (ADRs) shaped the `docs/decisions/` pattern used in this book and in `iec`.

Oliver Kopp, Anita Armbruster, and Olaf Zimmermann documented Markdown Architectural Decision Records (MADR) in 2018. This book uses their structured template for ADRs.

Paul Hammant's trunkbaseddevelopment.com documents short-lived branches and frequent merges. The Team Workflows topic draws on that guidance.

Alistair Cockburn's walking skeleton pattern ("Crystal Clear", 2004) informed this book's `skeleton.md` analogy. The brownfield file maps an existing system, while Cockburn's pattern builds a thin new path through one.

*Sources: Farley, "Modern Software Engineering" (2021), feedback loops; Humble and Farley, "Continuous Delivery" (2010), small batches and CI; Nygard, "Documenting Architecture Decisions" (2011), the ADR form; Kopp, Armbruster, and Zimmermann, "Markdown Architectural Decision Records" (2018), the MADR template; Hammant, trunkbaseddevelopment.com, branch and merge discipline; Cockburn, "Crystal Clear" (2004), walking skeleton. The `skeleton.md` analogy is this book's synthesis.*

## Spec-driven development

Fission AI built OpenSpec, the change-folder framework this book uses as its concrete workflow. The companion `iec` repository uses OpenSpec in its worked examples.

LeanSpec documents concise specifications maintained alongside implementation. The Spectrum uses it as one example of lighter process.

GitHub's Spec-Kit is another structured development process this book compares with OpenSpec.

Rick Hightower's February 2026 comparison helped map the Spec-Driven Development (SDD) tools discussed in The Spectrum. Its tool descriptions are a dated snapshot.

*Sources: Fission AI, OpenSpec documentation, change folders and lifecycle; companion CLI repository at revision `2491a62`, worked OpenSpec folders; LeanSpec project documentation, concise evolving specs; GitHub, Spec-Kit documentation, structured processes; Rick Hightower, "Agentic Coding" (February 2026), comparative tool snapshot. The book's framework selection is its own synthesis.*

## Agent conventions

AgentPatterns.ai documents the table-of-contents (TOC) pattern for `AGENTS.md`. That framing runs through the Agent Instructions topic.

Andrej Karpathy coined "vibe coding" on February 2, 2025. The Preface's opening argument starts there.

Thoughtworks Technology Radar Vol. 34 (April 2026) warned about codebase cognitive debt and semantic diffusion in agent-related terminology. Chapters using those claims cite the report locally.

Birgitta Böckeler has written about agent-assisted software delivery. Several framing decisions in the Agent Instructions topic draw on that work.

*Sources: AgentPatterns.ai, "AGENTS.md: Project-Level README for AI Coding Agents", the TOC pattern; Karpathy, "Vibe coding" (February 2025), the term; Thoughtworks Technology Radar Vol. 34 (April 2026), cognitive debt and semantic diffusion; Böckeler, "Harness engineering for coding agent users" (April 2026), agent guidance and controls.*

## Plain text and diagrams

Mermaid is the diagram format used throughout. Its source lives in Markdown, where reviewers see the text diff before GitHub or the site renders the diagram.

The Write the Docs community's docs-as-code guide is the precedent for the plain-text-as-code practice the Foundation topic extends.

The Plain Text as Code Manifest (github.com/Plain-Text-as-Code) is the author's prior statement of the same philosophy. The Foundation topic is its application to agentic engineering.

*Sources: Mermaid documentation, text-defined diagrams; Write the Docs, docs-as-code guide, documentation in version control; Plain Text as Code Manifest, the author's prior statement. The book's format choice is its project convention.*

## How this book was written

I used coding agents while writing this book and its companion CLI. They helped plan work, compare chapters, catch spelling errors, check sources, and move or cut repeated passages. The repository includes procedures for chapter review, book-wide consistency, and claim provenance.

The agents did not decide what this book claims. I chose its recommendations and sources, and reviewed each chapter before publication. The agent produces. The author owns.
