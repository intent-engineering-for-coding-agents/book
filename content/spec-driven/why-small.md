# Why Small?

The spec was thorough. Forty-seven acceptance criteria across twelve scenarios. Edge cases, rollback behaviour, audit trail requirements, error message copy, monitoring thresholds. All of it documented. The developer spent three days writing it and two hours having it reviewed. Then they gave it to the agent and watched it drift.

By scenario eighteen, the agent was generating code that contradicted scenario three. By scenario thirty-two, it had lost track of the non-goals section entirely. By the end, it had implemented roughly the first twenty criteria reliably and improvised the rest. The spec had not been too short. It had been too long for the agent to hold at once.

## Context window economics

Every token the agent spends tracking a long spec is a token it is not spending on the code.

This is not a theoretical concern. A 500-line spec consumes a meaningful fraction of a context window that the agent also uses for the codebase it is working in, the files it has open, the conversation history, and the code it is generating. When the spec is long enough to compete with those other inputs, the agent starts losing the thread. Not dramatically. Quietly. An early constraint is not checked against a later implementation. A non-goal mentioned in line forty-two is not weighted against a decision made in line four hundred.

An agent that finishes a small spec produces more value than an agent that drifts through a large one. Drift is not just slower. Drift produces code that partially satisfies the spec and then requires a second pass to reconcile, which costs more time than writing a smaller spec in the first place.

## One PR, one spec

A spec is a change proposal scoped to one PR. Not a requirements document covering all known future enhancements. Not an architecture overview for the whole subsystem. One PR's worth of intent.

This framing has a useful property: the spec size is naturally bounded by the PR size, and small PRs are already a practice most teams want. If the spec requires sixty acceptance criteria, the spec is too large. Split the change. Smaller PRs are easier to review, faster to merge, and safer to revert. The spec discipline reinforces the PR discipline.

It has a second useful property: the spec is not supposed to freeze the scope. Changes emerge during implementation and PR review. The spec anchors the intent so the implementation does not drift from it, but anchors is not the same as locks. When the implementation reveals that scenario four was based on a wrong assumption, update the spec. The spec is a living document until the PR merges. After merge, it archives.

*Sources: LeanSpec. Anthropic, "Building effective agents" (Dec 2024).*

## The size argument

The specific threshold at which a spec becomes too large to follow reliably is model-dependent. Current-generation models start losing the thread on specs much longer than a few hundred lines, particularly when the spec competes with open files, conversation history, and the code being generated. That threshold will shift as models improve. The underlying argument will not.

A spec that requires 500 lines to describe is describing a change too large to implement in one PR without risking quietly incompatible edge cases. The size limit is not primarily a context window problem. It is a scope problem. Large specs describe large changes. Large changes are harder to review, harder to revert, and more likely to contain scenarios that contradict each other in ways that only surface during implementation.

The solution is not compression. Compressing a large spec into 200 lines of dense prose does not help; it just makes the dense prose harder to parse. The solution is scope reduction. Split the change. The spec that fits in one PR is not the spec that describes everything; it is the spec that describes one coherent thing, completely.

## Small is not the same as vague

Small specs create their own failure mode: a spec too vague to be useful.

"Add error handling to the API" fits in ten lines but tells the agent almost nothing. The constraint is not size. It is specificity per line. A 200-line spec with twenty precise acceptance criteria beats a 50-line spec with five vague ones, every time.

Write small and write precisely. The constraint is not "fewer words". It is "one PR's scope, one concrete outcome per scenario, nothing else". The next question is where to put things inside that scope: which part of the spec the agent reads first, and why that order matters more than most teams expect.
