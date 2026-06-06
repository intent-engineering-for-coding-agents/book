# Writing Conventions

## Audience

Senior or experienced developers who already use coding agents and want to work more deliberately. They know what a PR is, what CI does, what a linter enforces. They do not need those explained. They are skeptical of hype and will notice if the book oversells.

Write for a practitioner, not a student. The book adds structure and accountability to something they are already doing.

## Tone and voice

Direct, opinionated, practitioner voice. Credit sources explicitly. No hype about coding agents replacing developers; no doomerism about them either.

See [voice.md](voice.md) for the full voice and craft guide: narrative tension, forbidden patterns, rhythm, and the bar a chapter must clear to feel lived-in. `writing.md` covers mechanics; `voice.md` covers how the prose should sound.

## Structure

Each chapter follows this pattern:

1. Problem: what breaks without this practice (concrete, not abstract)
2. Practice: what to do, with examples from `iec` or the book repo itself
3. Evidence: why it works (references, `iec` tags the reader can check out)
4. Honest caveats: where the practice has limits or is still evolving
5. Tooling (optional, always last): if `iec` demonstrates this practice, mention it here in one paragraph: what command, what it does, how to try it. Frame as "If you want to see this in practice..". Never as a recommendation. The practice is the point; the tool is an example.

Outside the Tooling section, tool names appear at most once per chapter, as a brief illustration only. If a tool is mentioned more than once in the body, move the extra mentions to Tooling or cut them.

Constraints first: put the key constraint, non-goal, or risk at the top of the chapter. Agents and skimmers read top-down and lose focus. Do not bury the point in the conclusion.

Cross-chapter transitions: the last paragraph of a chapter plants a seed for the next (see voice.md — Asimov technique). When the next chapter is written, its opening paragraph should reference (implicitly or explicitly) the tension planted at the end of the previous one. This is bridging: something at the end of chapter N is mirrored or resolved at the start of chapter N+1.

## Formatting

- Prose paragraphs for explanation; code blocks for anything the reader will type or copy
- Markdown tables for comparisons
- Diagrams: Mermaid by default. Author every diagram as Mermaid in a fenced ` ```mermaid ` block. Mermaid renders in the VitePress build and on GitHub, and stays diffable as plain text. Use `<br>` for line breaks inside node labels, not `\n`. Use ASCII / box-art only as a fallback when Mermaid genuinely cannot express the shape (rare; one common case is a directory tree, which reads better as indented text)
- Fenced code blocks with language tag: ` ```bash `, ` ```yaml `, ` ```python `, ` ```ts `
- No heading levels deeper than H3 inside a chapter
- `Sources:` line at the end of any section that draws on a specific reference. Format: `Sources: Author "Title" (Year), claim it backs.` Every source listed must carry a short tag naming the specific claim in that section it supports; a source with no claim to back does not belong on the line. See "Source-to-claim mapping" below.
- Use American English spelling and punctuation throughout prose: `behavior` not `behavior`, `artifact` not `artifact`, `organize` not `organize`, `catalog` not `catalog`. Periods and commas go outside closing quotation marks (`"like this".` not `"like this."`). The one exception is verbatim quoted source titles, which keep their original spelling.
- Use straight quotes and apostrophes throughout (`"`, `'`). Never curly/smart quotes (`"`, `"`, `'`, `'`), in prose or code
- Never use the em dash (`—`) anywhere in book content. It is an agent-writing tell. Rewrite using a comma, a colon, parentheses, or two sentences. This is a hard rule with no exceptions. See `voice.md`.
- Inline code for file names, paths, command names, and flag names
- No bold or italic emphasis in prose. Do not use `**bold**` or `*italic*` to emphasize words in running text. Bold and italic are agent-writing tells. Use sentence structure to carry emphasis instead. Exceptions: inline code (backticks) is fine; book titles in Sources lines use quotes; the `Sources:` citation line itself is wrapped whole in italics (`*Sources: ...*`) to set it apart from body prose. The italic wrapper is sanctioned only for the complete Sources line, not for emphasizing words inside it.

## Prose style rules

These rules apply to every sentence in every chapter.

No contractions. Write "do not" not "don't", "cannot" not "can't", "it is" not "it's". Expanded forms read more deliberately and suit the book's register.

No semicolons in prose. Replace with a period or a comma. The one exception is structured lists inside Sources lines where semicolons separate citation entries.

Short sentences. If a sentence runs past two clauses, split it. Varied rhythm matters more than consistent length, but default short.

Active voice. Write "the agent reads the spec" not "the spec is read by the agent."

Use "you" and "your" to address the reader directly where appropriate.

Avoid these words. Replace or rephrase rather than suppress:

> can, may, just, that, very, really, literally, actually, certainly, probably, basically, could, maybe, delve, embark, enlightening, esteemed, shed light, craft, crafting, imagine, realm, game-changer, unlock, discover, skyrocket, abyss, not alone, in a world where, revolutionize, disruptive, utilize, utilizing, dive deep, tapestry, illuminate, unveil, pivotal, intricate, elucidate, hence, furthermore, however, harness, exciting, groundbreaking, cutting-edge, remarkable, it, remains to be seen, glimpse into, navigating, landscape, stark, testament, in summary, in conclusion, moreover, boost, skyrocketing, opened up, powerful, inquiries, ever-evolving

Notes on the list:
- "cannot" is acceptable as a negation; "can" as a positive modal is not
- "it" as a pronoun with a clear, named antecedent is usually fine; "it" as a vague subject ("it is important", "it turns out") is not
- "that" as a relative pronoun is sometimes unavoidable; avoid it where restructuring is easy

Avoid constructions like "not just X, but also Y." Rewrite as two direct sentences.

No setup language: no "in conclusion," "in closing," "to summarize," "as mentioned above."

No unnecessary adjectives or adverbs. If the word does not change what the sentence says, cut it.

## Length

Chapters are long-form but not padded. Length follows the story. If a section is filler, cut it. If the argument is not finished, do not stop because of a word count.

## Chapter outlines

Each chapter has an outline in `plan.md`. Expand the bullet points into prose. Do not invent structure not in the outline, and do not omit bullet points that are. The outline is the spec.

## References

Every reference used must appear in the `plan.md` References section. Do not cite sources not in that list without adding them there first. Verify attributions before writing them.

## Mandatory credibility pass

Every writing task must load and run `.agents/skills/credibility-pass.md` before the draft is considered complete. Draft first, then run the credibility pass, then fix what it finds. Do not hand off a chapter or section for review until the credibility pass has no blocking issues.

### Source-to-claim mapping

A `Sources:` line is not a decorative attribution strip. The reader must be able to tell which claim each source backs and confirm the source is relevant to where it is cited. Two rules:

1. Tag every source with its claim. Each entry in a `Sources:` line ends with a short note naming the specific claim in that section it supports, e.g. `ThoughtWorks Technology Radar Vol 34 (April 2026), cognitive debt.` A source listed without such a tag reads as filler and must either get one or be cut.
2. Attribute load-bearing claims inline. When a claim leans on a named source (a coined term, a finding, a framing the book borrows), name the source in the prose where the claim is made (`ThoughtWorks called this cognitive debt...`, `Yegge framed this as...`), not only in the trailing line. The trailing line then confirms the citation; it does not carry the attribution alone.

A source that does not back any claim in its section must be removed, not annotated, even a strong one. Citing a reference next to a claim it does not support (or next to prose that explicitly labels itself book synthesis) is worse than omitting it. The model to follow is `content/foundation/why-structure.md`.

### Source hygiene rules

- Treat provenance as part of the writing, not as an end-of-draft cleanup step.
- Every section that makes a factual, historical, operational, or comparative claim needs a local `Sources:` line, even if the source also appears elsewhere in the chapter.
- For each claim, decide what kind of source you are using: primary/original, primary documentation, secondary commentary, or vendor-authored. Prefer the strongest available source. If you only have a weaker source, keep it and lower the certainty of the prose.
- Do not present book synthesis as field consensus. If a taxonomy, split, workflow, or naming scheme is this book's framing, say so explicitly with language like `This book uses...`, `The working taxonomy here is...`, or `This is a practical synthesis...`.
- Do not present emerging conventions as standards unless the source supports that claim. Terms like `AGENTS.md`, Intent Engineering, agentic software engineering, ADLC variants, test taxonomies, and current agent workflows often need `de-facto`, `emerging`, `current practice`, or equivalent framing.
- Time-sensitive claims about tools, model families, supported features, and current workflow patterns must be dated or bounded in time. Avoid pretending that a 2025-2026 snapshot is a permanent truth.
- If the evidence does not justify certainty, downgrade the wording. Prefer `often`, `in some teams`, `in current practice`, or `this book argues` over universal claims.
- When a section is mostly opinion or synthesis but includes one concrete factual claim, keep the local `Sources:` line for that factual part.
- Before sign-off, run the credibility pass and resolve every `Missing local source`, `Weak provenance`, `Overstated claim`, `Unlabeled synthesis`, `Perishable claim`, `Field-consensus overreach`, `Unmapped source`, and `Decorative source` finding.

## Living principles

Every chapter expresses normative claims: rules about how things should be done. When you draft a new chapter or substantively edit an existing one, extract any new principles that emerged and add them to the catalog.

1. After completing the draft, scan for normative claims: "must", "should", "always", "never", "the rule is", load-bearing theses, claims about how to structure work the agent does
2. For each new principle not already in `principles/iec/`, create a new `.md` file in the appropriate category directory (`principles/iec/foundation/`, `principles/iec/context/`, `principles/iec/specs/`, `principles/iec/testing/`, `principles/iec/quality/`, `principles/iec/team/`)
3. Follow the `.principles` file schema: `# ID: Title`, `Layer: 1|2|3`, `Summary:`, `## Principle`, `## Why it matters`, `## Violations to detect`, `## Good practice`, `## Sources`
4. Add the new ID to `groups/intent-book.yaml`
5. Add the principle's row to the table in `content/appendices/living-principles.md` under the correct category
6. If a chapter edit invalidates an existing principle, update or remove the principle file and the appendix table row
