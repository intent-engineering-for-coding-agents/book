# IEC-FOUNDATION-DOCUMENT-LIFESPAN: Each Document Type Has a Different Lifespan

**Layer**: 1
**Categories**: foundation, document-types
**Applies-to**: all
**Summary**: Each document type has a different lifespan; conflating them corrupts both.

## Principle

ADRs are permanent records of decisions made. Specs are disposable and are archived when the PR merges. `skeleton.md` is a brownfield bootstrap map: live while the repo is being excavated, then historical or retired once its stable findings have moved into permanent docs. Content documents evolve continuously with the codebase. Treating a spec as permanent documentation, an ADR as a live document, or a bootstrap map as current design truth breaks the purpose of all three.

## Why it matters

If a spec is mistaken for permanent documentation, it will be referenced long after the behavior it describes has changed. If an ADR is treated as a living document, its decision record loses integrity because there is no stable point to return to when understanding why a choice was made. If `skeleton.md` stays in active context after architecture, design, and decision docs have taken over, a later agent session will read old reverse-engineered notes from `docs/skeleton.md` beside current docs and act as though both still apply.

## Violations to detect

- Specs kept indefinitely without archiving
- ADRs rewritten in place instead of superseded by a new ADR
- `skeleton.md` left in active docs after its findings were distilled into permanent documents
- Content documents (wikis, design docs) describing behavior that was correct three releases ago

## Good practice

```markdown
# Spec lifecycle
1. Write → 2. Critique → 3. Review → 4. Implement → 5. Archive

# ADR lifecycle
1. Propose → 2. Decide → 3. Immutable once closed; supersede with new ADR

# skeleton.md lifecycle
1. Bootstrap → 2. Distill into permanent docs → 3. Mark historical, archive, or remove

# Content lifecycle
Continuously maintained alongside the code; updated in the same PR
```

## Sources

- intent-book, *"Document Types" chapter*, foundation section.
- MADR (Markdown Architectural Decision Records), https://adr.github.io/madr/.
