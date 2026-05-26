# ASE-QUALITY-AGENT-EVAL-LOOP: Two Feedback Loops

**Layer**: 1
**Categories**: quality, evaluation, agent
**Applies-to**: all
**Summary**: Tests prove the code is right; agent evaluation proves the agent setup is right — two distinct loops.

## Principle

Tests prove the code is right. They say nothing about whether the agent setup is right. That second loop — agent evaluation and regression detection — is the missing one in most teams. It answers: did this change to `AGENTS.md` make the agent better or worse, measured how?

## Why it matters

A team can tune their `AGENTS.md` and skill stack for months without knowing whether the changes help or hurt. Two competing `AGENTS.md` versions look equally plausible to a human reader. Only an A/B comparison on a fixed task reveals which produces better output. Without this loop, instruction tuning is superstition.

## Violations to detect

- Instruction files changed without measuring the effect on agent output quality
- No mechanism to detect when a skill or hook update degrades agent performance
- Agent output quality assessed only by subjective review

## Good practice

Define a fixed task — a spec the agent will implement, a PR the agent will review, a test suite the agent will generate. Run both the old and new `AGENTS.md` against it. Compare output on correctness, completeness, and adherence to conventions. The investment becomes worthwhile when more than one developer shares the same instruction files.

## Sources

- ase-book, *"Agent Evaluation & Regression" chapter*, quality section.
- Anthropic, *"Building effective agents"* (Dec 2024).
- ThoughtWorks Radar Vol 34 (mutation testing as feedback control).
