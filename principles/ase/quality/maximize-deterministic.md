# ASE-QUALITY-MAXIMIZE-DETERMINISTIC: Maximize Deterministic Checks

**Layer**: 1
**Categories**: quality, automation, scaling
**Applies-to**: all
**Summary**: Maximize deterministic checks — they scale to agentic speeds; manual review does not.

## Principle

Effective teams maximize the deterministic part of quality assurance, because deterministic checks scale to agentic speeds. Linters, type checkers, link checkers, file-size guards, index-staleness scans — these run in milliseconds and catch the cases humans skip. Manual review catches what deterministic checks cannot, but it does not scale.

## Why it matters

Every manual review minute spent on something a machine could have caught is a minute not spent on intent, architecture, and design. As agent output volume increases, the proportion of review time spent on mechanical checks must decrease. The only way to decrease it is to automate those checks.

## Violations to detect

- Code review comments that could have been caught by a linter or type checker
- CI pipelines with no deterministic quality checks beyond compilation
- Manual verification of things that have a deterministic signature

## Good practice

Add deterministic checks for: link validity (do all links in `AGENTS.md` resolve to existing files?), file size (are any instruction files over a reasonable limit?), index staleness (does `INDEX.md` list all files in the directory?), and naming conventions (do file names follow the project pattern?).

## Sources

- ase-book, *"Before, During, After Checkpoints" chapter*, quality section.
