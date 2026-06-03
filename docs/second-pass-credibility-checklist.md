# Second-Pass Credibility Checklist

This checklist turns the second-pass review into a file-by-file remediation plan. Use it to make provenance visible at the point of claim, reduce unsupported certainty, and label book-specific synthesis honestly.

## Standards to apply in every file

- Add a local `*Sources:*` line to any section that makes a factual, historical, operational, or comparative claim.
- If a section is mostly book synthesis, say so explicitly instead of implying field consensus.
- Prefer original or primary sources. If only vendor or secondary sources exist, keep them but downgrade the prose.
- Time-sensitive claims about tools, models, workflows, or conventions should be dated or framed as current practice.
- Memorable lines may stay only if the surrounding paragraph earns them with evidence or a clear caveat.

## Highest-risk files first

### `content/introduction.md`

#### Missing local sources
- Add a local source line for the Intent Engineering / Developer AI framing in the opening definition section, or recast it as the book's working terminology.
- Add a source line or caveat around the two-role framing for agents as labor plus sparring partner if it is presented as observed practice rather than author synthesis.
- Add a source line or soften the `iec` companion evidence claim if the tags are being used as proof of the book's practices in action.

#### Claims to soften
- Soften `a term in active circulation` unless the text names the exact source basis for that claim.
- Rework `Spec-driven development has hardened into a recognized practice through 2025-2026` to a more bounded statement about an emerging practice in current AI-coding discourse.
- Rework the `tested set` of supported agents and model generations so it reads as a time-bounded snapshot, not a stable capability classification.
- Soften `Intent Engineering works the same way regardless of which agent runs it` to allow for tool-specific constraints and partial applicability.
- Soften `The practices here should not` in the model/tool churn paragraph; keep the principle, not the permanence claim.
- Keep `Intent Engineering is not ADLC`, but lower certainty in the distinction where the literature itself is still unsettled and vendor-authored.

#### Synthesis to label
- Mark Intent Engineering as the book's working frame where the field vocabulary is still unstable.
- Mark the labor / sparring-partner split as book synthesis unless a direct source supports that exact framing.
- Mark the four-topic structure as the book's operating model rather than an industry taxonomy.

#### Reference upgrades
- Replace or supplement vendor/explainer sources in the ADLC section with a stronger original or primary anchor if one exists.
- Check whether the Intent Engineering naming section can cite a more direct source than scattered current-practice usage.

#### Final fix target
- Achieve the fix with all three: add sources, soften language, and label synthesis.

### `content/agent-instructions/failure-modes.md`

#### Missing local sources
- Add a local source line for the Andon cord analogy if it remains in the chapter.
- Add a local source line in the reset-versus-redirect section if those recommendations are meant as more than the book's own practice guidance.

#### Claims to soften
- Soften `The answer is almost always the same` because some agent failures do come from tools, bugs, or model limitations.
- Consider softening `Resetting the session fixes the symptom; fixing the instruction file fixes the problem` to avoid implying a universal diagnostic rule.

#### Synthesis to label
- Move the six-mode taxonomy from implied field standard to explicit working taxonomy earlier, not only in the maturity-honesty section.
- Mark the recovery guidance as operational heuristics from practice, not validated doctrine.

#### Reference upgrades
- If possible, add a stronger source for stop-the-line / recovery practice beyond analogy-driven references.

#### Final fix target
- Achieve the fix mainly by labeling synthesis and softening a few universal claims.

### `content/spec-driven/spec-gt-code.md`

#### Missing local sources
- Add a direct source for the opening anecdote about teams deleting an implementation and regenerating it from the canonical spec, or rewrite it as a plausible/emerging practice claim.
- Add local support in the final section if `spec review as the primary quality gate` is presented as more than the book's recommendation.

#### Claims to soften
- Soften `This is not a thought experiment` unless the repo can point to a concrete documented case.
- Soften `In the agentic era, code occupies the same position that the compiled binary used to` because it is an argument, not an established equivalence.
- Replace `when there is a conflict between the spec and the code, the spec is right` with wording that assumes the spec is canonical only until mismatch resolution proves otherwise.
- Soften `Code modification is not expensive anymore` to reflect that this depends on system complexity, change scope, and spec quality.
- Soften `The spec is not overhead. It is the mechanism that makes speed sustainable` unless it is framed as the book's thesis.

#### Synthesis to label
- Mark the chapter's central inversion from code-first to spec-first as a normative argument for agentic workflows, not settled field doctrine.
- Mark the spec-quality bar as the book's minimum standard for a reusable implementation spec.

#### Reference upgrades
- Prefer a primary case study or repository-backed example for regeneration-from-spec claims.
- Consider replacing weaker 2025-2026 commentary references with a stronger original source where available.

#### Final fix target
- Achieve the fix with source upgrades where possible and bounded language everywhere else.

### `content/quality/test-strategy.md`

#### Missing local sources
- Add a local source line for the complexity-to-minimum-test-count table if it stays.
- Add a source line or explicit synthesis label around the AC registry rules if they are drawn from a project convention rather than a field-wide pattern.

#### Claims to soften
- Soften `Both are required` in the unit/integration discussion to allow project-specific exceptions.
- Soften `The agent will suggest visual regression tests for a backend service` because it is plausible operational guidance, not a universal outcome.
- Soften `The document is part of the project's architecture documentation` and similar normative statements so they read as recommended practice.

#### Synthesis to label
- Label the taxonomy table as the book's working test taxonomy at the point of introduction.
- Label the complexity table as a convention, heuristic, or starter policy rather than a generally accepted minimum.
- Label the AC registry rules as a project pattern proven in companion repos, not a universal standard.

#### Reference upgrades
- The chapter currently leans heavily on `model2diagram` conventions; add a stronger external source where one materially improves provenance, otherwise explicitly state that the chapter is extrapolating from a running project convention.

#### Final fix target
- Achieve the fix mainly by labeling synthesis and adding local provenance for convention-derived rules.

## Remaining reviewed chapters

### `content/foundation/why-structure.md`

#### Missing local sources
- Add local `*Sources:*` lines to sections beyond the current early citation, especially where the chapter makes operational claims about how repo structure changes agent behavior.

#### Claims to soften
- Review broad statements that structure is a prerequisite for everything else and ensure they read as a bounded practical claim.

#### Synthesis to label
- Mark any repo-briefing framing that goes beyond cited literature as the book's synthesis.

#### Final fix target
- Add local sources and soften any repo-universal language.

### `content/foundation/document-types.md`

#### Missing local sources
- Add local `*Sources:*` lines to the earlier taxonomy sections, not just the later source block.

#### Claims to soften
- Check for claims that imply the six-way document split is standard practice.

#### Synthesis to label
- Label the document-type taxonomy and lifecycle framing as a working taxonomy for Intent Engineering repositories.

#### Reference upgrades
- Prefer primary anchors for ADRs, design docs, and docs-as-code patterns where available.

#### Final fix target
- Add sources and clearly mark the taxonomy as synthesis.

### `content/foundation/brownfield-vs-greenfield.md`

#### Missing local sources
- Add local sources to sections that generalize brownfield extraction and migration workflow beyond the currently cited examples.

#### Claims to soften
- Soften any language that implies brownfield extraction patterns are standardised when they are still emerging.

#### Synthesis to label
- Mark `skeleton.md`-style extraction and similar patterns as book/project synthesis unless a stronger external convention is available.

#### Reference upgrades
- Keep practical vendor/project references if needed, but do not let them carry field-wide certainty.

#### Final fix target
- Label synthesis and bound emerging-practice claims.

### `content/agent-instructions/agents-md.md`

#### Missing local sources
- Add local support in sections that describe adoption or effects of `AGENTS.md` beyond the current closing source line.

#### Claims to soften
- Soften any wording that implies `AGENTS.md` is already a stable standard across tools.
- Consider toning down slogan-like framing if the section does not immediately substantiate it.

#### Synthesis to label
- Label `AGENTS.md` as a de-facto convention or current practice, not a settled specification.

#### Reference upgrades
- Prefer direct tool/vendor documentation for actual support claims over commentary where possible.

#### Final fix target
- Keep the practical guidance, but make the maturity level explicit.

### `content/agent-instructions/context-window.md`

#### Missing local sources
- Add local sources to later sections if they generalize session strategy beyond the opening citation block.

#### Claims to soften
- Soften any lines that imply a single universal optimal session pattern.

#### Synthesis to label
- Label short-session guidance as a practical operating heuristic informed by current tool behavior.

#### Final fix target
- Add local provenance and time-bound the operational advice.

### `content/agent-instructions/writing-instructions.md`

#### Missing local sources
- Add local sources to later sections if the chapter moves from cited examples into generalized operational rules.

#### Claims to soften
- Soften universal wording about what instructions prevent or guarantee.

#### Synthesis to label
- Mark repo-writing guidance as recommended practice shaped by current agent behavior rather than settled doctrine.

#### Final fix target
- Tighten provenance and remove guarantee language.

## Process-fix handoff for Step 2

- `.agents/instructions/writing.md`: add explicit rules for provenance class, book synthesis labeling, and review-date framing for perishable claims.
- `.agents/instructions/review.md`: add mandatory review questions for original vs secondary sources, overconfident wording, and unstable field terminology.
- `.agents/skills/review-chapter.md`: add failure conditions for missing local sources, unsupported certainty, unlabeled synthesis, and time-sensitive claims without time bounds.
- `AGENTS.md`: add only a short repo-entry reminder if the stricter writing/review files are otherwise easy to miss.

## Step 3 reconciliation notes

### Outline fit vs bibliography fit

- `content/introduction.md`: keep the chapter within the existing outline by softening Intent Engineering / spec-driven / ADLC certainty rather than expanding the chapter's scope. Reference additions are optional; wording downgrade is the safe default.
- `content/foundation/why-structure.md`: the outline already supports the chapter's argument. The fix is local sourcing and bounded language, not new references.
- `content/foundation/document-types.md`: the outline supports a document taxonomy, but the taxonomy should remain explicitly book-level synthesis unless stronger field-standard evidence is added.
- `content/foundation/brownfield-vs-greenfield.md`: the outline already names `skeleton.md` as a bootstrap artefact. Keep it, but preserve the lineage note that it is an AI-era adaptation of Cockburn's older metaphor, not a standard term.
- `content/agent-instructions/agents-md.md`: the outline can keep practical guidance if the prose says `AGENTS.md` is a de-facto convention with uneven tool support.
- `content/agent-instructions/context-window.md`: the outline supports practical advice; no bibliography expansion is required if the chapter is framed as current operating guidance.
- `content/agent-instructions/writing-instructions.md`: the outline supports the chapter as operational practice guidance; fix by tightening provenance and reducing guarantee language.
- `content/agent-instructions/failure-modes.md`: the outline supports the recovery chapter, but the taxonomy should stay explicitly observational rather than pretending to be standard literature.
- `content/spec-driven/spec-gt-code.md`: the outline supports the argument for spec primacy. The chapter should stay argumentative and bounded unless a concrete regeneration case study is added.
- `content/quality/test-strategy.md`: the outline already anchors the chapter in `model2diagram`; keep the companion-repo grounding explicit so the taxonomy and complexity table do not read like universal standards.

### Reference-add decision

- No bibliography expansion is required to meet the honesty bar in this pass.
- Prefer wording downgrades and synthesis labels where the existing support is secondary, vendor-authored, or project-specific.
- Only add a new reference later if it materially improves provenance for a claim that otherwise remains too strong after rewriting.

### Chapter-by-chapter fix route summary

| File | Outline support | Bibliography support | Preferred fix route |
|---|---|---|---|
| `content/introduction.md` | Supported | Mixed; several secondary/vendor anchors | Add sources + soften + label synthesis |
| `content/foundation/why-structure.md` | Supported | Adequate but under-exposed locally | Add sources + soften |
| `content/foundation/document-types.md` | Supported | Partial for taxonomy-as-standard claim | Add sources + label synthesis |
| `content/foundation/brownfield-vs-greenfield.md` | Supported | Practical but emerging | Label synthesis + soften |
| `content/agent-instructions/agents-md.md` | Supported | De-facto convention, not standard | Add sources + soften |
| `content/agent-instructions/context-window.md` | Supported | Adequate for guidance, not absolutes | Add sources + soften |
| `content/agent-instructions/writing-instructions.md` | Supported | Adequate for guidance, not guarantees | Add sources + soften |
| `content/agent-instructions/failure-modes.md` | Supported | Mixed; partly observational | Label synthesis + soften |
| `content/spec-driven/spec-gt-code.md` | Supported | Mixed; opening anecdote weakest | Soften + label synthesis + targeted source upgrade if found |
| `content/quality/test-strategy.md` | Supported | Mostly project-convention support | Label synthesis + add sources |