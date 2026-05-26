# ASE-FOUNDATION-DECISIONS-LIVE-IN-DOCS: Decisions Live in the Repo

**Layer**: 1
**Categories**: foundation, repo-structure, decisions
**Applies-to**: all
**Summary**: Architectural decisions and conventions live in `docs/`, not in PR descriptions or code comments.

## Principle

If a decision or convention needs to exist, it lives in a Markdown file in `docs/` or `AGENTS.md`. Not in a PR description. Not in a commit message. Not in a code comment. Not in a Slack thread. The agent cannot read PR descriptions from six months ago. It cannot read code comments it never visits.

## Why it matters

Decisions that exist only in transient channels are invisible to the agent. The agent will violate conventions it was never told about. PR descriptions and commit messages are records of a moment, not living references. Code comments carry isolated context and are fragile — they are not preserved when code is refactored.

## Violations to detect

- Architectural rules documented only in PR templates or descriptions
- Conventions described only in team wiki or Slack
- Code comments carrying decisions that should be in `docs/decisions/`

## Good practice

Every architectural decision gets an ADR in `docs/decisions/`. Every convention gets a file in `docs/` with a stable location. Every exception to a convention is documented near the convention it excepts.

## Sources

- ase-book, *"Plain Text as Code" chapter*, foundation section.
- MADR (Markdown Architectural Decision Records), https://adr.github.io/madr/.
