# Vendor Files That Point, Not Duplicate

The team updated `CLAUDE.md` with the new library convention. Three weeks later, a developer using Copilot opened a PR that used the old library. The `copilot-instructions.md` file had not been updated. Both files had started as copies of `AGENTS.md`. The Claude update never propagated. Neither tool notified anyone. The drift was silent.

This is what per-tool instruction files look like when maintained by hand. The first update happens. The second is forgotten. Keeping them synchronised manually is possible in theory: compare each file, identify which paragraphs conflict, pick the newer convention when they disagree. In practice, by the time the divergence surfaces, nobody remembers which change came first. Two instruction files that have drifted across six months do not diff cleanly, and there is no merge strategy that recovers intent rather than just text.

## One source, many pointers

The fix is not better update discipline. Discipline that can fail will fail. The fix is architecture: one canonical file, vendor files that point to it.

`AGENTS.md` is the canonical file. Vendor files are pointers.

For Claude Code, the pointer is one line:

```markdown
# CLAUDE.md
@AGENTS.md
```

Claude Code reads `CLAUDE.md`, follows the import, and loads `AGENTS.md`. Any update to `AGENTS.md` propagates automatically. No manual sync. No drift.

GitHub Copilot's coding agent added native `AGENTS.md` support in August 2025. No pointer file is needed. It reads `AGENTS.md` and `.agents/` directly, the same way Codex does. If your team uses Copilot Chat, which has its own context mechanism separate from the coding agent, `.github/copilot-instructions.md` still applies. Keep it as a one-sentence pointer, not a copy:

```markdown
# .github/copilot-instructions.md
See AGENTS.md at the repo root for all project conventions and AI instructions.
```

One canonical source, thin pointers, no authored duplicates.

*Sources: [agents.md](https://agents.md/) (May 2026 snapshot). AgentPatterns.ai, "AGENTS.md: Project-Level README for AI Coding Agents." GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (Aug 28, 2025).*

## Why generated is better than authored

A generated vendor file is a known point-in-time output from a known process. An authored vendor file is a copy that is already behind by the time it is committed.

`ase generate claude` writes the `CLAUDE.md` pointer. `ase generate copilot` writes the `copilot-instructions.md` pointer. Both are one or two lines. Neither requires the developer to author anything. The convention is encoded in the generator, not in a human's memory.

Generated files can be committed without ambiguity. They are clearly outputs, not sources. A developer who sees a generated file in a PR review knows not to edit it: edit the source, regenerate, commit the output.

The regeneration ceremony has a useful side effect. Each `ase generate` run is an opportunity to notice that the pointer is out of date. Regenerating on tool adoption and on major `AGENTS.md` changes is enough of a cadence.

## The rule

If a vendor file needs to exist, it contains only the pointer syntax that tool requires. No instructions live there that are not already in `AGENTS.md`. One source of truth. Thin pointers. No authored duplicates.

The cost of violating this rule is not immediate. Vendor files drift from `AGENTS.md` slowly, one unsynced update at a time. The signals are subtle: one tool producing code that other tools do not, inconsistencies that are difficult to trace. By the time the divergence is obvious, it has been compounding for months.

## The direction of travel

Codex read `AGENTS.md` natively from the start. GitHub Copilot's coding agent followed in August 2025. The pattern is clear: capability-class tools are converging on `AGENTS.md` as the standard entry point, without requiring a pointer file as an adapter.

The pointer pattern is a workaround for tools that have not yet adopted native support. As that support spreads, the workaround shrinks. Today: `CLAUDE.md` with one line for Claude Code. `.github/copilot-instructions.md` with one sentence if your team uses Copilot Chat. Both committed, both generated, neither authored.

The hub is complete. Every session arrives oriented. The agent knows the codebase conventions, has access to the repeatable workflows, and operates under the enforcement that fires automatically. What still varies by session is intent: what this specific change is supposed to do. Intent that lives only in a chat message disappears when the session ends. Intent that lives in a spec survives context resets, team turnover, and the agent that starts fresh next Tuesday.
