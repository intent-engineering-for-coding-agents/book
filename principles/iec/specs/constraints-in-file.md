# IEC-SPECS-CONSTRAINTS-IN-FILE: Constraints Live in the Repo

**Layer**: 1
**Categories**: specs, constraints, context
**Applies-to**: all
**Summary**: Constraints that live only in human memory are constraints the agent will violate.

## Principle

Constraints that live only in human memory — "we don't use that pattern," "this module must never import that module," "never call that API without a rate limit" — are constraints the agent will violate. The agent does not have access to human memory. If the constraint matters, it lives in a file the agent reads before it starts.

## Why it matters

Every team carries unwritten constraints. The senior developer who joined three years ago knows them. The agent that joined three minutes ago does not. The gap between the team's implicit knowledge and the agent's explicit context is where violations happen.

## Violations to detect

- Constraints enforced in code review that are not documented anywhere
- Agent violations of rules the team considers obvious
- Code comments describing constraints that should be in `docs/`

## Good practice

For every constraint the team enforces in review, ask: does this exist in a file the agent reads? If no, write it there. The file is usually `AGENTS.md`, a domain instruction file, or `docs/architecture/constraints.md`.

## Sources

- intent-book, *"When Intent Engineering Fails" chapter*, foundation section.
- intent-book, *"Writing Instructions" chapter*, agent-instructions section.


