# IEC-QUALITY-REFACTOR-AT-MERGE: Refactor at the Merge Boundary

**Layer**: 1
**Categories**: quality, refactoring, process
**Applies-to**: code
**Summary**: The agent's first generation is rarely the right shape — refactor at merge, not three weeks later.

## Principle

The agent's first generation is rarely the right shape for the next change. Refactor at the merge boundary, not in a follow-up PR three weeks later. When the spec is implemented and the tests pass, the developer's job is to ask: is this code shaped for the next person who has to change it? If no, fix the shape now. The agent cannot do this; the developer must.

## Why it matters

Deferring structural cleanup creates a growing mass of code shaped for the first PR, not the fifth. Each subsequent change works around the existing shape because "there's a refactor ticket in the backlog." The refactor ticket is never the priority until the shape is so wrong that every change takes twice as long as it should.

## Violations to detect

- PRs merged with known structural issues and a "cleanup later" ticket
- Code shaped for the current change but hostile to the next one
- Agent-generated code merged without human structural review

## Good practice

The merge boundary is the right moment for structural adjustment because: the implementation is fresh in the developer's mind, the tests are already proving the behavior, and the next developer hasn't started yet. The cost of refactoring at merge is minutes; the cost of refactoring later is hours.

## Sources

- intent-book, *"Before, During, After Checkpoints" chapter*, quality section.
