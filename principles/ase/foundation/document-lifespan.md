# ASE-FOUNDATION-DOCUMENT-LIFESPAN: Each Document Type Has a Different Lifespan

**Layer**: 1
**Categories**: foundation, document-types
**Applies-to**: all
**Summary**: Each document type has a different lifespan; conflating them corrupts both.

## Principle

ADRs are permanent records of decisions made. Specs are disposable — they describe intent for one change and are archived when the PR merges. Content documents evolve continuously with the codebase. Treating a spec as permanent documentation or an ADR as a live document corrupts the purpose of both.

## Why it matters

If a spec is mistaken for permanent documentation, it will be referenced long after the behavior it describes has changed. If an ADR is treated as a living document, its decision record loses integrity — there is no stable point to return to when understanding why a choice was made.

## Violations to detect

- Specs kept indefinitely without archiving
- ADRs rewritten in place instead of superseded by a new ADR
- Content documents (wikis, design docs) describing behavior that was correct three releases ago

## Good practice

```markdown
# Spec lifecycle
1. Write → 2. Critique → 3. Review → 4. Implement → 5. Archive

# ADR lifecycle
1. Propose → 2. Decide → 3. Immutable once closed; supersede with new ADR

# Content lifecycle
Continuously maintained alongside the code; updated in the same PR
```

## Sources

- ase-book, *"Document Types" chapter*, foundation section.
- MADR (Markdown Architectural Decision Records), https://adr.github.io/madr/.
