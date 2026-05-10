# Glossary Maintenance

When introducing a technical term in a chapter, follow the first-use rule and keep `content/appendices/glossary.md` current.

## First-use expansion

Every abbreviation expands on its first occurrence within each chapter:

> "...the team writes an Architectural Decision Record (ADR) for the migration..."

After the first use, the abbreviation alone is correct. The rule is per-chapter, not per-book — a VitePress site has no fixed reading order, and any chapter can be a landing page from search.

Apply to: ASE, ADR, MADR, AC ID, MCP, BYOK, TBD, and any other abbreviation introduced in the chapter.

## Glossary upkeep

| When | Update |
|---|---|
| A chapter introduces a new technical term | Add an entry to `content/appendices/glossary.md` if not already present |
| The canonical definition of a term changes | Update the glossary first; chapter prose follows |
| All chapters stop using a term | Glossary entry stays — terminology reference outlives prose |
| A glossary entry references a chapter that has been renamed or moved | Update the link |

## Format

- Sorted alphabetically
- Each entry is an H2: `## Term — Expansion`
- Definition in 1–3 sentences
- Where useful, a link to the chapter that introduces the term: `See [Chapter Title](/topic/chapter-slug).`

## Why

A reader landing on a chapter from a search engine has no upstream context. First-use expansion plus a single canonical glossary location prevents the reader (and the agent helping them) from spending cycles on "what does X stand for?" The glossary is also where new contributors and AI agents look first when they encounter unfamiliar shorthand.
