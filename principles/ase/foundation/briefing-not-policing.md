# ASE-FOUNDATION-BRIEFING-NOT-POLICING: Structure is Briefing, Not Policing

**Layer**: 1
**Categories**: foundation, agent, culture
**Applies-to**: all
**Summary**: Structure gives the agent enough briefing to make plausible guesses — it is not about policing.

## Principle

The agent will improvise wherever the repo stays silent. The choice is how much it has to. Nothing about Intent Engineering Foundation requires policing the agent. It requires giving the agent enough briefing to make plausible guesses on its own. The fewer gaps the agent has to fill, the fewer improvisations the team has to catch in review.

## Why it matters

Framing structure as "rules the agent must follow" creates resistance. Framing it as "context the agent needs to succeed" aligns incentives. The team writes structure because it makes their reviews easier, not because they enjoy writing documentation.

## Violations to detect

- Instruction files written as prohibitions without explanation
- Lack of rationale — "don't do X" without "because Y"
- Structure that describes what the agent should not do without describing what it should do instead

## Good practice

For every negative instruction, give the positive alternative. "Don't use raw string concatenation for SQL" is less useful than "Build SQL queries with parameterized methods; see `QueryBuilder` in `src/db/`."

## Sources

- ase-book, *"Why Structure" chapter*, foundation section.
