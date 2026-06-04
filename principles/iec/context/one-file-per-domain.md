# IEC-CONTEXT-ONE-FILE-PER-DOMAIN: One Instruction File Per Domain

**Layer**: 1
**Categories**: context, instructions, structure
**Applies-to**: all
**Summary**: One instruction file per domain, not per task — splitting too fine forces enumeration by the agent.

## Principle

Instructions should be one file per domain, not one file per task. Splitting too fine creates a directory the agent has to enumerate before it can decide what to load. Conversely, combining unrelated domains into a single file forces the agent to load irrelevant context. The right grain is one domain per file.

## Why it matters

An agent that has to read five files to get started on a task spends context on file enumeration, not on the task. An agent that loads a monolithic instruction file spends context on irrelevant sections. Both errors waste the agent's most constrained resource.

## Violations to detect

- Instruction directories with more than ~12 files
- Single instruction files covering multiple unrelated domains
- Instruction files that only contain one or two directives each

## Good practice

```markdown
# .agents/instructions/testing.md
One file covering: test taxonomy, coverage thresholds, AC ID conventions,
framework choices, file naming, tag conventions.

# Not:
# .agents/instructions/test-coverage.md
# .agents/instructions/test-frameworks.md
# .agents/instructions/test-naming.md
# .agents/instructions/ac-ids.md
# .agents/instructions/test-tags.md
```

## Sources

- intent-book, *"Instruction Hub" chapter*, agent-instructions section.
