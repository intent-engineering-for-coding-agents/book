# IEC-CONTEXT-INSTRUCTION-SKILL-HOOK: Stack Instruction → Skill → Hook

**Layer**: 1
**Categories**: context, skills, hooks, instructions
**Applies-to**: all
**Summary**: Get the instruction right first; add a skill when a procedure repeats; add a hook when forgetting hurts.

## Principle

Stack instruction, skill, and hook in that order. Get the instruction right first: specific, testable, covering the agent's defaults. Add a skill when the same procedure appears in more than two sessions. Add a hook when missing the procedure causes a real problem the team cannot afford.

## Why it matters

Instructions, skills, and hooks serve different purposes. An instruction says "the authentication module works this way." A skill says "here is how to add a new auth provider in five steps." A hook says "before you commit, verify no secrets are in the diff." Conflating them wastes context and dilutes each mechanism.

## Violations to detect

- Skills that should be instructions (describing the codebase, not a repeatable procedure)
- Hooks that should be instructions (checked manually instead of enforced automatically)
- Instructions that describe a procedure (should be a skill) or an enforcement (should be a hook)

## Good practice

```markdown
# Instruction: `docs/architecture/auth.md`
The auth module uses JWT with refresh tokens. Tokens live in `src/auth/`.

# Skill: `.agents/skills/add-auth-provider/SKILL.md`
1. Create provider in `src/auth/providers/`
2. Register in `src/auth/ProviderRegistry.kt`
3. Add tests in `src/test/kotlin/auth/`

# Hook: `.agents/hooks/pre-commit-check-secrets.md`
Before any commit, run: git diff --cached | rg 'sk-|api_key|SECRET'
```

## Sources

- intent-book, *"Skills, Commands, and Hooks" chapter*, agent-instructions section.
