# Per-Chapter Review Passes

Date: 2026-06-06 (remediation pass applied same day)

This artifact records the repo-visible `review-chapter` pass state requested by the book-level review. The pass used `.agents/skills/review-chapter.md`, `.agents/instructions/review.md`, `.agents/skills/credibility-pass.md`, `.agents/instructions/writing.md`, and `.agents/instructions/voice.md`.

Original result: not release-ready. A remediation pass has since cleared the mechanical, terminology, framing, DRY, and trust-calibration blockers. What remains open is substantive content work (chapter-length trims, a few missing local `Sources:` lines, optional second-model critiques on high-stakes chapters) plus the cross-chapter seam pass. Re-run `review-chapter` on the changed chapters before treating those rows as fully closed.

## Remediation pass summary (2026-06-06)

Cleared book-wide:

- Sources lines now wrapped in italics (`*Sources: ...*`) across `content/`; the italic exception is documented in `writing.md` and `voice.md`.
- Code fences carry language tags (`text` for directory trees, `markdown` for instruction snippets). No untagged opening fences remain.
- American spelling normalized for `organized`, `standardized`, `recognizable`, `synchronization`.
- `Spec-Kit` spelling normalized in prose (quoted source titles left verbatim).
- `ASE` confined to the glossary umbrella entry.
- Bold lead-ins removed from `credits.md` and `instantiation-checklist.md`.
- Tool-neutral-vs-OpenSpec bridge added (`spec-driven/index.md`, `instantiation-checklist.md`).
- Hooks marked optional and maturity-dependent in the Agent Instructions overview and the checklist.
- Synthesis labels added (`why-specs.md`, `the-spectrum.md`, `spec-lifecycle.md`, `spec-gt-code.md`).
- Vendor framing time-bounded / attributed (`the-spectrum.md` Spec-Kit positioning).
- Companion-repo completeness claim softened in `introduction.md`.
- `AGENTS.md` TOC re-teaching trimmed in `shared-conventions.md` (links back to the canonical chapter).

Still open (needs a content pass, not mechanical edits):

- Chapter-length trims: `document-types.md`, `why-small.md`, `tests-as-proof.md`, `trunk-based-development.md`, `code-review-agent-code.md`.
- Missing local `Sources:` lines for operational claims: `test-strategy.md`, `dot-principles.md`, and additional claims in `tests-as-proof.md`.
- Optional second-model critique on high-stakes chapters: `when-intent-engineering-fails.md`, `spec-gt-code.md`.
- Cross-chapter seam pass (see below).

## Review scope

The scope follows the VitePress sidebar order in `.vitepress/config.mts`.

| Order | Chapter | Status | Result |
|---:|---|---|---|
| 1 | `content/foreword.md` | Clear | No chapter-local blocker recorded. |
| 2 | `content/introduction.md` | Cleared | Companion-repo claim softened to "core practices" with status deferred to the companion-repo appendix. |
| 3 | `content/foundation/index.md` | Clear | Overview chapter. No chapter-local blocker recorded. |
| 4 | `content/foundation/why-structure.md` | Clear | No chapter-local blocker recorded. |
| 5 | `content/foundation/document-types.md` | Open | Length and DRY: chapter still runs long and repeats document-type framing from the Foundation overview. Spelling fixed. |
| 6 | `content/foundation/plain-text-as-code.md` | Cleared | All fenced blocks verified tagged. |
| 7 | `content/foundation/intent-engineering-and-the-sdlc.md` | Cleared | All fenced blocks verified tagged. |
| 8 | `content/foundation/honest-maturity.md` | Clear | No chapter-local blocker recorded. |
| 9 | `content/foundation/brownfield-vs-greenfield.md` | Clear | No chapter-local blocker recorded. |
| 10 | `content/foundation/when-intent-engineering-fails.md` | Open | High-stakes chapter. Optional second-model critique still recommended before release. Spelling fixed. |
| 11 | `content/agent-instructions/index.md` | Cleared | `.agents/hooks/` now framed as optional and maturity-dependent in the overview. |
| 12 | `content/agent-instructions/agents-md.md` | Cleared | Fence tagged. Remains the canonical home for the `AGENTS.md` TOC pattern. |
| 13 | `content/agent-instructions/instruction-hub.md` | Cleared | Directory-tree fences tagged `text`; `synchronization` and `standardized` normalized. |
| 14 | `content/agent-instructions/writing-instructions.md` | Clear | No chapter-local blocker recorded. |
| 15 | `content/agent-instructions/skills-commands-hooks.md` | Cleared | `standardized` normalized. |
| 16 | `content/agent-instructions/context-window.md` | Clear | No chapter-local blocker recorded. |
| 17 | `content/agent-instructions/failure-modes.md` | Clear | No chapter-local blocker recorded. |
| 18 | `content/spec-driven/index.md` | Cleared | Bridge added: OpenSpec is the demonstration substrate, the practice is tool-neutral. |
| 19 | `content/spec-driven/why-specs.md` | Cleared | Change-scoped spec definition labeled as the book's synthesis with a local `Sources:` line. |
| 20 | `content/spec-driven/why-small.md` | Open | Length: chapter still runs above the review target. Check for padding in a content pass. |
| 21 | `content/spec-driven/why-important-first.md` | Clear | No chapter-local blocker recorded. |
| 22 | `content/spec-driven/the-spectrum.md` | Cleared | Spec-Kit recast as vendor positioning; formality-to-risk labeled as synthesis; `recognizable` normalized. |
| 23 | `content/spec-driven/spec-lifecycle.md` | Cleared | Five-stage lifecycle labeled as the book's synthesis; `Sources:` line given claim tags. |
| 24 | `content/spec-driven/spec-gt-code.md` | Cleared (critique open) | Spec-as-canonical rule labeled "this book adopts." Optional second-model critique still recommended. |
| 25 | `content/quality/index.md` | Clear | Overview chapter. No chapter-local blocker recorded. |
| 26 | `content/quality/tests-as-proof.md` | Open | Length and source coverage: chapter runs long and several operational claims still need local `Sources:` lines. |
| 27 | `content/quality/test-strategy.md` | Open | No local `Sources:` line for operational claims (still open). Fence tagged; no prose bold found (earlier flag was a false positive). |
| 28 | `content/quality/agent-evaluation.md` | Cleared | Tooling/demo status stays honest (eval-demo marked not-yet-shipped); the softened introduction no longer overclaims. |
| 29 | `content/quality/ac-ids-coverage.md` | Cleared | Opening is an explicitly-marked hypothetical ("Imagine ..."), an allowed device; prose semicolon removed. H4 headings and Gherkin bold live inside fenced spec examples and are valid. |
| 30 | `content/quality/checkpoints.md` | Cleared | Mermaid fence tagged. References the canonical `AGENTS.md` TOC chapter rather than re-teaching. |
| 31 | `content/quality/security-in-depth.md` | Clear | No chapter-local blocker recorded. |
| 32 | `content/quality/pr-taxonomy.md` | Cleared | Mermaid fence verified tagged. |
| 33 | `content/quality/dot-principles.md` | Open | No local `Sources:` line for the `.principles` operational claims (still open). Spelling fixed. |
| 34 | `content/team/index.md` | Cleared | OpenSpec terminology verified: framework vs `openspec/` directory vs change-folder workflow used consistently. |
| 35 | `content/team/openspec-across-stacks.md` | Cleared | Directory-tree fence tagged `text`; multi-tier pattern already labeled as book synthesis. |
| 36 | `content/team/openspec-in-existing-sdlc.md` | Cleared | Atlassian MCP and related claims already time-bounded ("as of mid-2026" plus snapshot caveat). |
| 37 | `content/team/trunk-based-development.md` | Open | Length: chapter runs long. Fences verified tagged; nested-italic Sources line fixed. |
| 38 | `content/team/code-review-agent-code.md` | Open | Length: chapter runs long. Content trim pass needed. |
| 39 | `content/team/shared-conventions.md` | Cleared | `AGENTS.md` TOC re-teaching trimmed; links back to the canonical chapter. |
| 40 | `content/team/cross-team-coordination.md` | Clear | No chapter-local blocker recorded. |
| 41 | `content/team/what-is-still-evolving.md` | Cleared | `Spec-Kit` spelling normalized; current-practice claims already time-bounded. |
| 42 | `content/appendices/glossary.md` | Cleared | `ASE` kept to the umbrella entry; `recognizable` normalized; OpenSpec entry distinguishes framework from directory. |
| 43 | `content/appendices/living-principles.md` | Clear | No chapter-local blocker recorded. |
| 44 | `content/appendices/tooling-landscape.md` | Cleared | `Spec-Kit` spelling correct; tool claims carry "at time of writing". |
| 45 | `content/appendices/companion-repo.md` | Cleared | Directory-tree fence tagged; the introduction now defers completeness to this appendix. |
| 46 | `content/appendices/instantiation-checklist.md` | Cleared | Bold lead-in removed; required practice distinguished from the OpenSpec example; optional hook experiments separated from the required hub. |
| 47 | `content/appendices/credits.md` | Cleared | Bold contributor lead-ins removed; italic book titles converted to quotes; `Spec-Kit` spelling correct. |

## Cross-chapter seam notes

The part-level seed chain passed in `review-findings.md`. The chapter-level seam chain still needs a dedicated pass now that the blockers are cleared.

| Seam | Review note |
|---|---|
| Foreword -> Introduction | Works as front matter into thesis. No blocker recorded. |
| Introduction -> Foundation | Works at the part level: context first, then intent. |
| Foundation sequence | Untagged fences cleared. Long chapters (`document-types`, others) still pending a length pass before the seam check is meaningful. |
| Foundation -> Agent Instructions | Works at the part level: repository structure becomes agent-readable instructions. |
| Agent Instructions sequence | `agents-md.md` is canonical; later chapters now rely on it. |
| Agent Instructions -> Spec-Driven Development | Works at the part level: context becomes per-change intent. |
| Spec-Driven sequence | Synthesis labeling and tool-neutral framing now in place. Ready for the seam pass. |
| Spec-Driven -> Quality | Works at the part level: written intent needs executable proof. |
| Quality sequence | Structural blockers cleared. Missing `Sources:` lines in `test-strategy` and `dot-principles` remain. |
| Quality -> Team Workflows | Works at the part level: proof practices scale into team workflow. |
| Team sequence | OpenSpec terminology normalized and current-practice claims time-bounded. Length trims remain. |
| Team Workflows -> Appendices | Appendix formatting and terminology now match the book voice. |

## Release gate

Before the book is treated as release-ready:

1. Close the rows still marked Open above (length trims, missing `Sources:` lines, optional second-model critiques).
2. Run the cross-chapter seam pass.
3. Re-run `review-chapter` for each changed chapter and record the new result in this file.
4. Re-run the book-level review and update `review-findings.md`.
