# IEC-QUALITY-CANONICAL-PATTERN-VISIBLE: Make the Right Pattern Easy to Find

**Layer**: 1
**Categories**: quality, security, agent
**Applies-to**: code
**Summary**: Make the pattern the agent should follow the easiest pattern to find in the codebase.

## Principle

The defence against pattern replication — the agent copying broken patterns because it does not distinguish trusted from untested — is to make the pattern the agent should follow the easiest pattern to find. The canonical implementation of an auth check, an error handler, or a database access pattern must be more visible to the agent than the legacy code that does it wrong.

## Why it matters

Agents learn from the codebase. If the codebase contains four implementations of the same pattern and three are wrong, the agent has a 75% chance of copying the wrong one. The team's job is to make the right one unmissable: named clearly, documented, and referenced from `AGENTS.md` or the relevant instruction file.

## Violations to detect

- Multiple implementations of the same pattern with no indication of which is canonical
- `AGENTS.md` not linking to canonical implementations
- New code following legacy patterns instead of the documented convention

## Good practice

For each cross-cutting concern — auth, error handling, logging, database access, API client creation — designate one file or module as the canonical implementation. Name it obviously (`CanonicalAuthFilter`, not `AuthUtils`). Link to it from the relevant instruction file. When the canonical implementation changes, the agent follows.

## Sources

- intent-book, *"Security in Depth" chapter*, quality section.
