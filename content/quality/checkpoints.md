---
type: chapter
title: "Before, During, After: The Three Checkpoints"
---

# Before, During, After: The Three Checkpoints

Before accepting an agent's patch, check which spec it implemented and what evidence supports the result. A passing test run leaves the review unfinished if the tests assert a different behavior from the acceptance criteria.

Use this book's three checkpoints as a short checklist during the change. The linked chapters explain the decisions and procedures.

| When | Check before proceeding | Details |
|---|---|---|
| Before implementation | Relevant instructions resolve, the governing decisions are current, and the spec has been reviewed. | [Spec Lifecycle](../spec-driven/spec-lifecycle), [Keeping Documentation Up to Date](./keeping-docs-up-to-date) |
| During implementation | The agent is working from the agreed spec. Inspect relevant check results and resolve changed requirements or missing context before continuing. | [Spec Lifecycle](../spec-driven/spec-lifecycle), [Context Window Management](../agent-instructions/context-window) |
| Review and completion | Compare the diff and test assertions with the intended change. Update affected documentation and record any owned follow-up. After integration, archive the verified change before completing the ticket. | [Code Review for Agent-Generated Code](../team/code-review-agent-code), [documentation maintenance](../foundation/intent-engineering-and-the-sdlc), [Spec Lifecycle](../spec-driven/spec-lifecycle) |

For example, if implementation exposes an incorrect assumption in the spec, revise the assumption and review the affected scenario before continuing. Do not leave the next session a spec describing behavior the team rejected.

*Sources: The checkpoints and changed-assumption example are this book's workflow synthesis.*

Instructions tell the agent which checks to run. To block merging when a check fails, configure the check as required in Continuous Integration (CI) and restrict bypass permissions. GitHub documents these controls as required status checks and branch-protection bypass settings.

*Sources: GitHub, ["About protected branches"](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) (reviewed October 22, 2026), required status checks and bypass permissions.*

Review still needs a diff with a clear purpose. Mixing a refactor with a behavior change gives the reviewer two different jobs in the same patch, the distinction [PR Taxonomy](./pr-taxonomy) addresses.
