# Glossary

Sorted alphabetically. Each entry expands the term and gives the definition this book uses.

## AC ID (Acceptance Criterion ID)

A stable identifier (format `[PREFIX-NNN]`, e.g. `SCAFFOLD-001`) attached to each acceptance scenario in a spec. Tests reference the ID via marker or comment, producing traceability from spec to proof. An ASE convention layered on top of OpenSpec; OpenSpec itself prescribes no ID format.

## ADR (Architectural Decision Record)

A document recording a single architectural decision: context, options considered, decision, consequences. The recorded decision is immutable once closed (reversing a decision creates a new ADR that references the old one), though status updates and cross-references can still be edited. Originated in Michael Nygard's 2011 post; the structured-Markdown variant used in this book is MADR. See [Document Types](/foundation/document-types).

## AGENTS.md

The canonical entry point for an AI coding agent at the root of a repository. Acts as a table of contents: short, links to detailed instruction files, points the agent at the architecture overview. Documented at agents.md.

## Agentic Software Engineering (ASE)

The framework this book describes. A set of practices that progressively make an AI coding agent less clueless about a system and the intent behind it. Organised around four topics: Foundation, AI Instructions, Spec-Driven Development, Quality and Verification.

## Brownfield

A codebase that predates ASE practices: typically years of code, undocumented decisions, business rules that exist only in institutional memory. Brownfield repos cannot adopt ASE from intent the way greenfield ones can; they bootstrap with `skeleton.md`. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## Capability-class agent

A CLI agent that combines a thinking model, real tool use, and a plan or architect mode. The book targets this class specifically: Claude Sonnet/Opus 4+, Codex/GPT 5.4+, OpenCode + Deepseek 4 Pro, Junie CLI. IDE-only assistants and completion-only tools are out of scope.

## Cognitive debt

The AI-era analogue to technical debt: undocumented decisions and assumptions that humans hold implicitly but agents cannot read. Coined by ThoughtWorks Technology Radar Vol 34 (April 2026). See [Why Structure Matters](/foundation/why-structure).

## Greenfield

A new codebase, or one being built from explicit intent. Greenfield ASE adoption assumes you can author `AGENTS.md`, ADRs, and specs from requirements, not from reverse-engineering existing code.

## LeanSpec

A lightweight spec-driven development framework focused on small, focused specs (lean-spec.dev). Source for the small-spec discipline this book inherits.

## MADR (Markdown Architectural Decision Record)

A specific Markdown template for ADRs developed by Oliver Kopp, Anita Armbruster, and Olaf Zimmermann (2018). Used in `docs/decisions/` throughout this book. The structure (context, options, decision, consequences) makes ADRs scan-readable and machine-parseable.

## MCP (Model Context Protocol)

The standard agent-tool bridge protocol (modelcontextprotocol.io). Used in this book by `ase-cli` to expose AI-assisted checks via the user's own AI agent (BYOK: bring your own key).

## OpenSpec

A spec-driven-development framework (openspec.dev) built around a change-folder pattern: proposal, delta spec, design, tasks, archive. The book uses OpenSpec end-to-end; `ase-cli` is built with it.

## skeleton.md

An AI-generated structural map of an existing codebase: modules, dependencies, data flow, business-rule outline, C4-style views. The brownfield bootstrap artefact. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## Spec

In this book's sense: the canonical specification of system behaviour. Acceptance criteria, scenarios, test definitions. Lives under `openspec/`, written before implementation, archived after. Distinct from a design doc (which describes the approach) and an ADR (which records a decision).

## Walking skeleton

A thin end-to-end implementation built forward to prove an architecture works. From Alistair Cockburn's *Crystal Clear* (2004). Etymological ancestor of the AI-era `skeleton.md`, which reverses the direction by extracting the skeleton from existing code rather than building one forward.
