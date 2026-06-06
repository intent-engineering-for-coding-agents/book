# Review findings

## Remediation status, 2026-06-06

Status: closed for the remaining findings from this review. The book now intentionally uses an `OpenSpec-first` contract, based on the author's direction, rather than pretending to be tool-neutral. The remaining source-policy and provenance gaps were addressed by adding an explicit review-policy exception for navigational pages, splitting source lines closer to operational claims in the named Quality and Team chapters, and labeling book-created or `iec` conventions where the prose prescribes them.

Chapter-level review evidence: `plan.md` now contains the current book outline used for alignment. The reviewed chapters match that outline at the book-arc level: Foundation supplies repo context, Agent Instructions turns context into loadable agent guidance, Spec-Driven Development supplies per-change intent through the OpenSpec-first workflow, Quality and Verification connects that intent to proof, and Team Workflows maps the same workflow onto team delivery. The mandatory credibility pass was rerun on the edited material: vendor-adjacent claims remain bounded, perishable claims are time-labeled, and synthesized book conventions are labeled rather than presented as field consensus.

Additional follow-up handled: `.principles` references in book-facing content now point to `https://dot-principles.github.io/` as the canonical site. The Plain-Text-as-Code principle source was corrected to cite the Plain Text as Code Manifest, not `.principles`.

Original verdict: the book had a coherent macro-argument: context makes intent executable, specs state the target, and verification proves the result. The sequence from `Foundation` through `Quality and Verification` mostly compounded, and many chapter endings carried the reader forward instead of summarizing. It was not release-clean yet. The largest book-level risks were tool-neutrality drift toward `OpenSpec`, uneven provenance for operational claims, and the missing evidence that chapter-level review had already passed. Treat the findings below as the original global review record. The remediation status above is the current status.

## Scope and review basis

- Reviewed current `content/` in sidebar order from `.vitepress/config.mts`.
- Loaded and applied the local `review-book`, `review-chapter`, `review`, `writing`, `voice`, and `credibility-pass` instructions.
- Loaded `plan.md`; it is a rename and positioning plan, not a full chapter outline. The usable book contract is that `Foundation` and `Agent Instructions` supply context, while `Spec-Driven Development` and `Quality and Verification` are intent proper.
- No prior chapter-level review finding files were found. Per `review-book`, the chapters should still receive `review-chapter` passes before this global pass is treated as sign-off.

## Severity key

- `Blocking`: should be fixed before release or sign-off.
- `Major`: materially weakens the book-level argument or credibility.
- `Minor`: local repair, consistency, or polish issue.
- `Pass`: no book-level issue found in that check.

## 1. Narrative arc

### Pass: the central arc is visible and mostly pays off

The introduction states the thesis clearly at `content/introduction.md:13` and the topic contract at `content/introduction.md:25-37`. The overview chain then carries it forward: `Foundation` gives context, `Agent Instructions` makes context legible, `Spec-Driven Development` supplies per-change intent, and `Quality and Verification` closes the loop with proof. `content/spec-driven/spec-gt-code.md:69` lands exactly where `content/quality/index.md:5` picks up.

### Major: the team section weakens the tool-neutral promise

Locations:

- `content/spec-driven/index.md:13`
- `content/team/index.md:3`
- `content/team/index.md:7`
- `content/team/openspec-across-stacks.md:1`
- `content/team/openspec-in-existing-sdlc.md:1`

The book says `OpenSpec` is a demonstration substrate, not the practice itself. By the time the reader reaches Team Workflows, the section headline logic has narrowed to `OpenSpec`: `One OpenSpec change per developer`, `OpenSpec Across Stacks`, and `OpenSpec in an Existing SDLC`. That reads less like a neutral practice using one concrete implementation and more like a book about adopting `OpenSpec`.

Fix: keep `OpenSpec` in concrete examples, but move section-level language to the practice layer. For example, use `one change spec per developer`, `per-stack spec roots`, or `change-folder lifecycle` in topic claims, then say `OpenSpec` is the implementation used in `iec`.

### Major: the current `plan.md` cannot support outline-alignment review

Location: `plan.md:7-12`

The local review system expects chapter drafts to be checked against `plan.md`, but the current `plan.md` mainly records the rename from `ASE` to `Intent Engineering`. It does not provide the current chapter-by-chapter outline. That makes book-level arc review possible, but it prevents a clean `review-chapter` outline-alignment pass.

Fix: add or restore a current outline source that maps each chapter to its intended bullets. If the rename plan must stay in `plan.md`, create a separate outline file and update the review instructions to name it.

## 2. Seed-and-payoff chain

### Pass: most chapter endings create forward motion

Strong examples:

- `content/foundation/when-intent-engineering-fails.md` ends by asking what the agent should read, which sets up `Agent Instructions`.
- `content/agent-instructions/failure-modes.md` ends by naming per-change intent as the gap, which sets up `Spec-Driven Development`.
- `content/spec-driven/spec-gt-code.md:69` ends on executable proof, which sets up `Quality and Verification`.
- `content/quality/dot-principles.md` ends by moving from personal practice to team practice, which sets up `Team Workflows`.

### Minor: one transition points at the wrong previous dependency

Location: `content/quality/agent-evaluation.md:59`

The chapter says, `The acceptance-criterion IDs the previous chapter assumed exist...`, but the previous chapter in sidebar order is `Test Strategy and Convention`, not `AC IDs and Positive/Negative Coverage`. `test-strategy.md` introduces the `AC registry` at `content/quality/test-strategy.md:80-82`, but it does not do the full AC ID argument.

Fix: revise the sentence to match the actual sequence, for example: `The strategy chapter introduced AC IDs as part of the convention surface. The next chapter turns that hint into a durable traceability mechanism.`

### Minor: two early Agent Instruction chapters end as examples rather than seeds

Locations:

- `content/agent-instructions/agents-md.md` final paragraph
- `content/agent-instructions/instruction-hub.md` final paragraph

Both endings point to `iec` examples. That is useful, but weaker than the surrounding chapter endings because it does not create pressure toward the next chapter. The section later recovers, but these two endings feel like appendix pointers inside the main arc.

Fix: keep the `iec` pointer, then add one final sentence that names the next constraint: from `AGENTS.md` to hub design, and from hub design to instruction quality.

## 3. Global duplication

### Major: `OpenSpec` is repeatedly re-explained across structural positions

Locations:

- `content/foundation/document-types.md:47`
- `content/spec-driven/index.md:13`
- `content/spec-driven/the-spectrum.md:30-42`
- `content/team/openspec-across-stacks.md:5-17`
- `content/team/openspec-in-existing-sdlc.md:5-7`
- `content/appendices/tooling-landscape.md:21-32`

Each location has a reason to mention `OpenSpec`, but together they repeat the same positioning work: it is lightweight, change-folder-based, used by `iec`, and not the whole practice. The repetition amplifies the tool-neutrality problem.

Fix: designate one canonical `OpenSpec` explanation. Recommended location: `content/spec-driven/the-spectrum.md`, with `content/appendices/tooling-landscape.md` as the snapshot table. Other chapters should link forward or back and only restate what is locally necessary.

### Minor: AC ID mechanics repeat before the dedicated chapter

Locations:

- `content/quality/test-strategy.md:80-82`
- `content/quality/ac-ids-coverage.md:7-17`
- `content/appendices/glossary.md:5-11`
- `content/appendices/living-principles.md` table rows for registry and traceability

The repetition is not harmful yet, but `test-strategy.md` introduces enough of the mechanism that `ac-ids-coverage.md` has to restart. The book can keep the early mention, but it should be explicitly framed as a preview.

Fix: in `test-strategy.md`, keep the registry paragraph short and end with `The allocation discipline is the next chapter's subject.` Let `ac-ids-coverage.md` own the complete mechanics.

## 4. Contradiction sweep

### Major: `OpenSpec` as optional example conflicts with `OpenSpec` as assumed team workflow

Locations:

- `content/spec-driven/index.md:13`
- `content/team/index.md:7`
- `content/team/openspec-across-stacks.md:15-17`
- `content/team/trunk-based-development.md:7-15`

This is not a direct factual contradiction, but it is a framing contradiction. Early chapters say the practice works with a plain `spec.md`, `Spec-Kit`, or an existing team tool. Later team chapters assume `OpenSpec` change folders as the unit of coordination. A reader not adopting `OpenSpec` may feel the book has switched contract halfway through.

Fix: add a short adapter note at the start of Team Workflows: `This section says OpenSpec because the companion repo uses it. If your team uses another tool, map "OpenSpec change" to your per-change spec artifact and archive lifecycle.` Then make chapter titles or first paragraphs carry the practice-level term.

### Pass: no book-level contradiction found in the `Intent Engineering` versus `ADLC` distinction

The introduction distinguishes `ADLC` from `Intent Engineering` at `content/introduction.md:55-65`, and the glossary mirrors that distinction at `content/appendices/glossary.md:13-15`. The relationship is stable: `ADLC` builds agents as products; this book uses agents as workers.

## 5. Terminology drift against `glossary.md`

### Minor: `BFF` appears before expansion

Locations:

- First content use: `content/team/openspec-across-stacks.md:3`
- Glossary entry: `content/appendices/glossary.md:33-35`

`BFF` is defined in the glossary, but its first chapter use appears without expansion. The glossary-maintenance rule requires first-use expansion.

Fix: change first use to `Backend for Frontend (BFF)`.

### Major: `Capability-class agent` definition is under pressure from a borderline example

Locations:

- `content/introduction.md:45-49`
- `content/appendices/glossary.md:41-43`
- `content/appendices/tooling-landscape.md:7-19`

The book defines the target as a CLI agent with thinking, real tool use, and plan or architect mode, but the tooling table lists `Junie` as `IDE-embedded`. That may be true and still in scope, but the definition says `CLI agent`. The mismatch invites a needless terminology debate.

Fix: either change the glossary to `A coding agent that combines...` instead of `A CLI agent...`, or move `Junie` into a note explaining why IDE-embedded agents can still meet the capability-class bar.

### Pass: the `Intent Engineering` / `agentic software engineering` split is mostly stable

The introduction, glossary, and `plan.md` use `agentic software engineering` as the umbrella and `Intent Engineering` as the narrower practice. That rename work appears coherent.

## 6. Substance vs. filler

### Pass: the book is mostly dense rather than padded

The strongest chapters earn their length by adding distinctions instead of examples for their own sake: `content/foundation/document-types.md`, `content/spec-driven/spec-gt-code.md`, `content/quality/tests-as-proof.md`, and `content/team/code-review-agent-code.md` all move the argument forward.

### Major: some appendices duplicate positioning instead of adding reference value

Locations:

- `content/appendices/tooling-landscape.md:47-53`
- `content/appendices/companion-repo.md:3-7`
- `content/appendices/credits.md:1-5`

The appendices are useful, but the `Companion tool`, `Companion Repo`, and `Credits` openings repeat book-positioning material that is already present in the introduction and topic chapters. The appendix should be where readers look up facts, not where they re-read the premise.

Fix: make appendix entries more reference-like. For example, `Tooling Landscape` should stay a dated snapshot. `Companion Repo` should foreground tags, evidence status, and gaps. `Credits` should stay attribution-only.

## 7. Cross-cutting provenance patterns

### Blocking: source placement is too sparse for several operational chapters

Locations:

- `content/quality/test-strategy.md:29`
- `content/quality/agent-evaluation.md:15`
- `content/quality/ac-ids-coverage.md:17`
- `content/team/openspec-in-existing-sdlc.md` source lines
- `content/team/shared-conventions.md` source lines

Several chapters carry many operational prescriptions under one broad `Sources:` line. That makes it hard to tell which claims are sourced, which are book synthesis, and which are based on the `iec` companion repo. The local review rules require factual claims and named practices to have local source support, with book synthesis labeled honestly.

Fix: split source lines closer to the claims they support. Label book-created conventions directly, as `This is the book's convention` or `This is the iec convention`, especially for AC IDs, `Test-type:`, scenario complexity tiers, and agent eval suite shape.

### Major: the `Spec > Code` thesis still leans on weak and vendor-adjacent evidence

Location: `content/spec-driven/spec-gt-code.md:3-21`

The chapter correctly weakens the thesis with `workflow rule this book adopts, not a law of nature` at `content/spec-driven/spec-gt-code.md:19`. Still, the opening claim that some teams delete tangled implementations and regenerate them in a session is doing heavy rhetorical work. The cited evidence includes tool vendors and secondary commentary, which is acceptable only if the wording remains careful.

Fix: either add stronger primary evidence or keep the anecdote explicitly bounded: `reported by tool vendors and practitioners`, `not yet a general industry baseline`, and `safe only when the spec and tests are strong enough to catch regressions`.

### Pass: perishable tool claims are often time-bounded

Good examples:

- `content/introduction.md:45-49` names the tool roster as time-sensitive.
- `content/appendices/tooling-landscape.md:3` labels the page a mid-2026 snapshot.
- `content/quality/agent-evaluation.md:49-57` labels eval suites as early practice and dates the `iec` demo status.

## 8. Structural consistency

### Pass: heading depth and code-fence language tags are structurally clean

A verification sweep found no `H4+` headings outside code blocks and no unlabeled opening code fences under `content/`. The `#### Scenario:` lines in `content/quality/ac-ids-coverage.md` are inside fenced `markdown` examples, so they do not violate the heading-depth rule.

### Minor: source-line policy is inconsistent in front matter and appendices

Locations:

- `content/foreword.md`
- topic overview pages such as `content/foundation/index.md`, `content/agent-instructions/index.md`, `content/spec-driven/index.md`, `content/quality/index.md`, `content/team/index.md`
- `content/appendices/glossary.md`

It is reasonable for overviews and the glossary to have lighter source treatment, but the repository rules currently read as if every factual claim needs local source support. The current practice is implicit rather than stated.

Fix: either add a short review policy exception for navigational pages and glossary entries, or add compact source lines where those pages make dated or factual claims.

## Recommended fix order

1. Add or restore a current chapter outline source so `review-chapter` can run honestly.
2. Reframe Team Workflows away from `OpenSpec` as the section-level noun.
3. Split and label source lines in operational chapters, especially Quality and Team.
4. Run `review-chapter` on each chapter, then rerun `review-book` after the chapter-local blockers are fixed.