# Keeping Documentation Up to Date

Code often changes first, and the documentation describing the old behavior lags behind. The next coding agent reads the document anyway and works from a description of behavior the code no longer has.

The failure is easy to miss because the document still looks authoritative. Nothing in a normal build says the README, design note, or agent instruction file went stale. Tests fail when they stop matching the code. Prose usually does not.

For teams using coding agents, the gap matters more. Stale prose is not passive reference material. The agent reads the prose as working context.

This chapter is about one narrow extension of the verification story: give important documentation a feedback loop. Not semantic understanding. Not a model grading your prose. A tripwire for turning silent drift into a visible signal.

*Sources: AgentPatterns.ai, "Evaluating AGENTS.md: When Context Files Hurt More Than Help" (last reviewed Jun 13, 2026), stale instruction files and context drift as practical agent failure modes. ThoughtWorks, Technology Radar Vol 34 (April 2026), cognitive debt as stale reasoning in agentic delivery.*

## The asymmetry

Tests already have the property documentation lacks. When the code changes and the test no longer matches, the suite fails. The failure is noisy. Somebody has to deal with it.

Documentation has no equivalent loop by default. A design note describing an old retry policy does not fail. An agent instruction file pointing at a renamed file passes every check unless a structural link validator catches it, and a README documenting last month's module boundary still renders cleanly on GitHub.

The asymmetry is the problem. Generated code changes fast. The surrounding prose drifts at human speed.

The result goes past reader confusion. The next agent session starts from bad premises. A stale architecture note becomes the reason the agent adds a layer the system no longer uses, or follows a rule the team dropped because the instruction file still lists the old rule.

ThoughtWorks calls this cognitive debt: stale reasoning compounding in agentic delivery. Here the compounding is fast, because drift moves from documentation debt to implementation debt in one session.

*Sources: ThoughtWorks, Technology Radar Vol 34 (April 2026), cognitive debt as undocumented or stale reasoning in agentic delivery. AgentPatterns.ai, "Evaluating AGENTS.md: When Context Files Hurt More Than Help" (last reviewed Jun 13, 2026), stale instruction files and context drift as a practical agent failure mode.*

## A stable link from prose to code

The verification move is familiar by now. Do not match text. Match identity.

[AC IDs and Coverage](./ac-ids-coverage) made tests durable by linking each acceptance scenario to a stable Acceptance Criterion ID (AC ID). The scenario text gets rewritten and the test moves files, but the ID remains stable, so the link between intent and proof remains intact.

Documentation needs a lighter version of the same move. Each important document carries a small frontmatter block naming the code paths the check watches, the date somebody last checked the document against those paths, and any outside systems still pointing at the document:

```yaml
---
tracked-paths:
  - services/payments/src
  - services/payments/build.gradle.kts
content-verified-at: 2026-06-25
referred-by:
  - system: jira
    id: PAY-1842
    url: https://jira.example.com/browse/PAY-1842
    reason: Implementation ticket links to this design doc
  - system: confluence
    id: ARCH-221
    url: https://confluence.example.com/x/ARCH-221
    reason: Architecture index links here
referrers-verified-at: 2026-06-20
---
```

- `tracked-paths` lists the repo paths whose changes might invalidate the document.
- `content-verified-at` records the last date somebody checked the document against those paths.
- `referred-by` lists outside records still pointing at the document.
- `referrers-verified-at` records the last date somebody checked those external referrers still needed the document.

Once the fields exist, the check stops guessing. The questions are mechanical: did one of the tracked paths change after `content-verified-at`, and does an outside system still depend on this file staying where the referrer expects after `referrers-verified-at`?

This is not a field standard. This book uses it as a practical synthesis of the AC-ID idea for prose. The point is the shape, not the exact key names.

*Sources: The frontmatter marker and field names are this book's synthesis from AC-ID verification logic applied to prose.*

## What the check looks for

The minimum useful validator is content-blind and deterministic. Content-blindness is what keeps it cheap enough to run on every change.

First, verify the reference itself. Every entry in `tracked-paths` must resolve. A document pointing at code no longer present is already wrong in one concrete way.

Second, compare the review date to the source history. If the latest commit touching one of those paths is newer than `content-verified-at`, the document is now suspect. The check does not claim the prose is false. The check says nobody has confirmed the prose since the source changed.

Three states are enough for the repo-local documentation drift check:

- `broken-ref`: a declared source path no longer resolves
- `stale`: a tracked path changed after `content-verified-at`
- `untracked`: a handwritten document has no marker yet

`broken-ref` should fail the build. `stale` is better as a warning at first, then a build failure later if the team wants a ratchet. `untracked` stays warn-only so adoption does not turn into a migration project before the first signal lands.

The useful twist is diff scoping. Checking only documents changed in the Pull Request (PR) fails the moment somebody forgets the doc update. The validator should also pull in tracked documents whose `tracked-paths` entries intersect the code changed by the PR.

*Sources: The `tracked-paths`, `content-verified-at`, state names, fail/warn policy, and diff-scoping rule are this book's synthesis from AC-ID verification logic applied to prose.*

## External referrers change the retention rule

Documents under `docs/` have a second failure mode. The file is still linked from Jira, Confluence, an internal wiki, or some other system outside the repo. Delete the document, rename it, or move it without updating those links, and the repo stays green while the next developer lands on a dead reference.

This is a different check from local drift. `tracked-paths` asks whether the document still matches the code. `referred-by` asks whether some outside system still depends on the document existing at this path.

The base pattern here is an inventory. The checker does not crawl for backlinks or discover them on its own. It validates a declared list of known referrers:

- `system`: where the reference lives, for example `jira` or `confluence`
- `id`: the stable identifier in the external system
- `url`: the direct link
- `reason`: why the external record points at this document

This book uses two extra states for the inventory:

- `unknown-ref`: a `referred-by` entry is malformed or incomplete
- `live-ref`: one or more `referred-by` entries still exist, so deletion or rename is blocked until those entries are cleared

`unknown-ref` should fail because the inventory is already broken. `live-ref` is not a failure on an ordinary edit. It becomes a failure when a PR deletes or renames the document while external referrers still exist.

The retention rule follows from the inventory. A file in `docs/` with live `referred-by` entries stays put until the team removes or updates those external links and then clears the inventory entry in the same change. Local docs drift silently. Dead backlinks drift silently too, and they break a different reader.

*Sources: The `referred-by` inventory and retention rule are this book's synthesis for repository documents with declared external backlinks.*

## Three layers again

This book reuses the pattern from [Skills, Commands, and Hooks](../agent-instructions/skills-commands-hooks) here.

Layer one is the instruction. Tell the agent which documents need markers, what the marker means, and what to do when a code change trips a stale warning.

Layer two is the on-demand check. A skill or script the agent runs mid-task gives fast feedback before the change reaches Continuous Integration (CI).

Layer three is the build gate. The CI job checks tracked documents on every Pull Request and blocks on hard failures such as broken references. The same gate blocks a delete or rename when a `docs/` file still has live `referred-by` entries. The gate matters because stale documentation is easy to postpone and easy to forget.

Nothing here depends on one tool. The practice is broader: one rule the agent reads, one fast self-check, one hard backstop independent of memory.

*Sources: The three-layer placement is this book's synthesis from the instruction, command, and hook pattern applied to documentation drift.*

## Why this belongs in verification

This is not a general documentation chapter in disguise. The point is narrower.

[Docs > Specs > Code](../spec-driven/docs-gt-specs-gt-code) argued for design intent above code because this book treats generated code as the more disposable artifact. Once you accept the order, stale documents become a quality problem rather than a writing problem. The disposable artifact changed. The durable artifact did not.

Verification closes the code gap with tests. A documentation drift check closes part of the prose gap. Both are the same shape of control:

- attach a stable link to the artifact under review
- run a deterministic check against the link
- surface failure where the team already pays attention, in CI

The check does less than a test. A test proves behavior. A documentation drift check only proves nobody reviewed the prose after the source moved, or an outside record still depends on the file staying put. The weaker claim is still valuable because silent drift is the normal state otherwise.

## Limits worth naming

The signal is blunt. A commit touching a tracked directory marks the document stale even when the change was a rename, a comment edit, or an internal helper the document never mentioned.

The dates are bookkeeping markers, not proof of careful reading. Bumping `content-verified-at` or `referrers-verified-at` silences the warning.

Cross-cutting documents are awkward. A design note covering four subsystems and two team boundaries has no tidy sibling path list. Those documents need manual `tracked-paths` entries, and many teams will defer the work.

The external inventory is only as good as the discipline behind it. A missing `referred-by` entry means the checker never knows the outside link exists. As of mid-2026, teams with Model Context Protocol (MCP) connectors into Jira or Confluence might confirm some records through APIs, but API confirmation is a higher-maturity extension and a perishable one.

None of those limits sink the practice. They define it. This is a tripwire, not semantic verification. For documentation, tripwires carry most of the value because the baseline is silence.

The before-gate in [Before, During, After Checkpoints](./checkpoints) asks whether architecture and instructions are still current. This chapter turns the question into something a checker asks too.

*Sources: Model Context Protocol documentation, connector pattern for reaching external systems during agent work. Atlassian Rovo MCP Server and sooperset `mcp-atlassian` documentation (mid-2026 snapshot), Jira and Confluence connector availability as a perishable tooling example. This chapter's extension of AC-ID verification logic from tests to prose is this book's synthesis.*
