# IEC-QUALITY-RULES-FIRST-PRINCIPLES-SECOND: Write Rules Before Principles

**Layer**: 1
**Categories**: quality, dot-principles, automation
**Applies-to**: all
**Summary**: Write deterministic rules when detection is possible. Write principles for judgment.

## Principle

The dividing line between a rule and a principle is whether a deterministic check can be written. If yes, write the rule and automate it. If no — the judgment requires understanding intent, context, or design — write the principle and apply it in review. Rules scale to agentic speeds; principles require human (or LLM) judgment.

## Why it matters

Conflating rules and principles wastes both. A rule that stays advisory could have been automated. A principle that blocks CI is performing judgment a machine cannot make. The discipline is to keep the principle catalog small, the principles concrete, and the audit pass advisory until the catalog has earned trust.

## Violations to detect

- Principle-like rules that could be deterministic but are left as prose
- Rule-like principles that block CI but depend on subjective judgment
- Principle catalogs that grow without corresponding automated checks

## Good practice

For every desirable property of the codebase, ask: can I write a deterministic check for this? If yes → write the check, put it in CI. If no → write the principle, put it in `docs/` where the agent reads it. The principle becomes a rule when automated detection becomes possible.

## Sources

- intent-book, *".principles — Raising the Bar" chapter*, quality section.
- .principles, https://dot-principles.github.io/.
