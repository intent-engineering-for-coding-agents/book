# IEC-FOUNDATION-AGENT-KNOWLEDGE-IS-PLAINTEXT: Knowledge Lives in Plain Text

**Layer**: 1
**Categories**: foundation, plain-text, repo-structure
**Applies-to**: all
**Summary**: If the agent needs it, it lives in the repo in plain text.

## Principle

Every artifact an agent needs to reason about the codebase must live in the repo as plain text. Diagrams are Mermaid. ADRs are Markdown. Specs are Markdown. Instructions are Markdown. If it is not plain text, the agent cannot read it. If it is not in the repo, the agent cannot find it.

## Why it matters

The agent's only window into the codebase is the files it can read. A convention that lives in a wiki or a diagram that lives in a PNG is invisible. The agent will improvise wherever the repo stays silent, and the improvisation will not match the team's intent.

## Violations to detect

- Architecture documentation stored in a wiki outside version control
- Diagrams committed as PNG or draw.io files without Mermaid source
- Conventions described in PR descriptions but not written into `docs/`
- Code comments carrying architectural rules that should be in `docs/`

## Good practice

Keep everything the agent needs — ADRs, design docs, test strategy, conventions — in `docs/` as Markdown with Mermaid diagrams. Let the repo be the briefing.

## Sources

- intent-book, *"Plain Text as Code" chapter*, foundation section.
- dot-principles, *Plain-Text-as-Code philosophy*, https://github.com/dot-principles/dot-principles.
