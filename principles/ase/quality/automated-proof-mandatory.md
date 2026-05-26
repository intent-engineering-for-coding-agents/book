# ASE-QUALITY-AUTOMATED-PROOF-MANDATORY: Automated Proof is Mandatory at Agentic Speeds

**Layer**: 1
**Categories**: quality, testing, agent
**Applies-to**: code
**Summary**: AI generates code faster than you can verify manually — automated proof is mathematically required.

## Principle

AI generates code faster than you can verify manually. Automated proof is not optional — it is mathematically required at agentic speeds. When an agent can produce a thousand lines of code in minutes, human review cannot keep pace. Only automated tests, checks, and verifications scale to match the generation rate.

## Why it matters

Without automated proof, the bottleneck shifts from code generation to verification. The agent produces code faster, but the review queue grows longer. The pressure to skip review increases. Quality degrades not because the agent is worse, but because human review cannot scale.

## Violations to detect

- Projects using agentic workflows without CI-enforced test suites
- Code review as the only verification mechanism
- Agent-generated PRs merged without automated checks passing
- Coverage metrics celebrated without inspection of what the tests verify

## Good practice

Every agent-generated change must be accompanied by automated proof that the change is correct. Tests are the primary proof mechanism, but linters, type checkers, and architecture checks also qualify. The question is not "did a human look at this?" but "would a wrong implementation be caught?"

## Sources

- ase-book, *"Tests as Proof, Not Ritual" chapter*, quality section.
- ase-book, plan.md, Living Principles appendix.
- Dave Farley, *Modern Software Engineering*.
