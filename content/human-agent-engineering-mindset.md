# The Human-Agent Engineering Mindset

Many teams do not have a shared engineering workspace. They have code in repos, decisions in wiki pages, requirements in tickets, diagrams in slide decks, and rules in review habits.

Developers compensate with memory. Coding agents do not, at least not yet.

A developer hears "new internal services use gRPC" in a meeting and remembers it during implementation. A coding agent opens a fresh session, reads the repo, finds old REST handlers, and adds another one. The agent did what the input allowed. We cannot blame it: the rule never reached the files it read.

Call it cognitive debt: undocumented decisions and assumptions that coding agents cannot read. At agent speed, every missing rule becomes another plausible implementation.

## The failure mode

Architecture passed by speech in one meeting does not persist across agent sessions. It barely reaches developers who missed the meeting, never read the memo, or had other priorities that day.

A principal developer explains the service pattern in a meeting, and a lead turns it into two slides. Reviewers keep rejecting PRs that break it until the team learns by correction. For developers who were in the room, this half-works: the rule lives in memory and review pressure. A coding agent starts each session without the meeting, the slides, or the memory of the last rejection. For the agent, a rule that lives only there does not exist.

Review has the same defect.

A reviewer carries a checklist:

- no new REST endpoints
- validation stays out of controllers
- every external call has a timeout
- retries follow the platform policy

For humans, this is annoying but workable. A developer learns through rejected PRs. The reviewer remembers the rule next time.

The agent does not. A review comment fixes the current diff. The next session starts cold.

Commit the rule where the agent reads it, and the rule persists. The next session reads it. The one after that reads it too.

## Not prompt engineering

The same gRPC rule shows the difference.

Prompt engineering puts the rule in chat:

```text
When you add this service, use gRPC. Do not add REST endpoints.
```

That helps one session.

Context engineering loads the rule for the current task. Better, but still dependent on retrieval, file selection, or a developer loading the right file.

Intent Engineering makes the rule source:

```text
docs/decisions/0014-use-grpc-for-internal-services.md
AGENTS.md -> read docs/decisions/ before adding service endpoints
.agents/hooks/ts.md -> on .ts edits, run the endpoint policy check
```

Now the rule is no longer a prompt. It is part of the engineering system.

Context engineering is the better-known frame: control what reaches the model's context window. This book uses that distinction, then moves the load-bearing rules into source-controlled artifacts.

## The scope is often missing

Do not assume there is one clean repo.

Real systems are messier:

- one monolith with stale docs
- five services with copied conventions
- a UI repo, a Backend for Frontend (BFF) repo, and a back-end repo
- Jira tickets used as decision records
- Confluence pages nobody trusts
- diagrams exported as images

The mess is not in the layout. It is in the missing scope.

If nobody wrote down where the knowledge for a change starts and stops, the agent guesses, and the developer and reviewer are guessing right along with it.

That is not a workflow. It is archaeology with a pull request at the end.

## Why this book exists

The same decision should not be made twice because nobody recorded it the first time.

The same review comment should not be written ten times because the checklist only lives in one reviewer's head.

The same architecture rule should not depend on who attended the meeting.

Coding agents expose this faster than humans because they have no oral culture. They read files. If the rule is not there, the rule is absent.

**Write it down, or it didn't happen!**

This book is about moving engineering intent into a source: decisions, instructions, specs, checks, and proof. The chapters after this one cover the mechanics.

