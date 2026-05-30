# OpenSpec in an Existing SDLC

The team already has Jira. They already have sprint boards, PR review, a Confluence wiki, a changelog. They adopted OpenSpec because the SDD framing made sense, and now they have a question: where does the change folder go in relation to everything they already have? Does it replace the ticket? Does the spec replace the Confluence page? Is the PR review now two reviews, one for the spec and one for the code?

None of those is the right frame. OpenSpec does not replace the existing workflow; it gives each existing slot its own artefact. The coordination already exists; the question is what lives where.

## Change folder and ticket: the same event, different records

A Jira ticket (or GitHub Issue, or Linear card) records that work is planned. The change folder records how that work was specified. These are not redundant; they serve different readers.

The ticket is for the team. It carries priority, assignee, sprint assignment, status, and comments from the planning meeting. The change folder is for the agent. It carries the delta spec, acceptance criteria, task list, and archive record. The ticket answers "is this being worked on?" The change folder answers "what is being built and how do we know it's done?"

Practically: create the change folder when you start the spec, link the Jira issue ID in the proposal. The spec references the ticket for context; the ticket links to the PR that implements it. The agent reads the spec; the sprint board reads the ticket. Neither replaces the other.

When should you skip the ticket entirely? For small behavioral changes (a one-line fix, a config key rename) where the spec is the only record that matters. The threshold is whether anyone other than the implementing developer needs to track the work. If yes, ticket. If the spec and the commit message are the entire record, skip the overhead.

*Sources: Fission AI, [OpenSpec](https://openspec.dev/) (ongoing).*

## User story to acceptance criteria: the conversion

A Jira user story provides the why and the what: "As a user, I want to filter results by date, so that I can find recent items." The story does not provide the testable how: what happens when the date range is invalid? What does the empty state look like? What is the minimum acceptable date?

One story maps to one or more OpenSpec change folders. The story provides the intent; the spec provides the acceptance criteria. The spec references the Jira story ID for traceability. Any reviewer can navigate from the spec back to the planning decision that initiated it.

The Atlassian MCP (as of mid-2026, Anthropic's Claude AI connects to Jira and Confluence via MCP) allows the agent to fetch story context and Confluence architecture pages during spec drafting. The `AGENTS.md` should instruct the agent to check the linked Jira story before writing the spec, not to copy the story into the spec, but to ensure the acceptance criteria actually address what the story intended. The agent reads the story; the developer reviews the criteria.

MCP connector availability for third-party tools is a mid-2026 snapshot. The specific integration paths will change; the pattern of agents fetching ticket context before writing specs will not.

*Sources: Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46), Medium, Feb 27, 2026.*

## Figma handoff: behavior in the spec, visuals via MCP

The Figma frame link goes in the spec. The agent fetches the design data via Framelink MCP at implementation time: layout metadata, component structure, spacing, colors. The spec covers behavior (states, validation, edge cases); the MCP call covers visuals.

The front-end developer does not paste screenshots into the spec or write pixel dimensions into the acceptance criteria. The spec says "the filter panel renders in collapsed state by default; see Figma frame [link] for visual specification." The agent opens the link during implementation and retrieves the design intent directly.

This pattern is described in more detail in the OpenSpec Across Stacks chapter, which covers the full front-end context model. The integration between Figma and the spec is a mid-2026 snapshot; see that chapter's caveats.

## Spec delta and PR review: the same conversation, not two conversations

The PR review is the place where the spec delta is read and the code diff is read. These are not sequential reviews. A spec review that finishes before the code starts is a waterfall pattern. They happen in the same review session, with the spec delta read first.

Reading the spec delta first means the reviewer answers: does this intent match what was planned? Is anything missing from the acceptance criteria that will cause problems later? Only then do they open the diff and ask: does this implementation match the spec?

This is intent-first review. The quality gate chapter described it in the individual developer context; at team scale it becomes a team norm written into the PR template. The template says: "Review the spec delta in `openspec/changes/` before the code diff." The spec delta is one section of the PR; the diff is another. The reviewer does not get to the diff before the spec.

## tasks.md and the sprint board

The `tasks.md` file in the change folder is the agent's execution checklist. It lists the implementation steps in order, with checkboxes. The agent checks off tasks as it completes them. Not as a courtesy, but because an unchecked task is a task the agent might not have done.

The sprint board tracks the same work at team level. The story moves from "In Progress" to "In Review" when the PR is opened. The `tasks.md` is exhausted before the PR is opened. These are parallel, not competing.

The synchronization point is the PR. A change folder with incomplete tasks (`- [ ]` lines still present) is a change folder that should not have a PR open. The PR template can check for this; the `AGENTS.md` should instruct the agent to verify `tasks.md` is complete before pushing.

## ADRs and the architecture review

An Architecture Decision Record (ADR) is the artifact that replaces an architecture review meeting when the team is disciplined about ADRs, and supplements it when they are not.

Large organizations have architecture review boards (ARBs). The ADR is the input: the context, the options considered, the decision, the consequences. The ARB reads ADRs; it does not generate them. Where there is no ARB, the ADR is its own review. Posted to the team channel, merged after comment period.

Cross-cutting decisions (API contracts, authentication models, data retention policies) always go into ADRs. These are the decisions that the agent in one stack needs to know about even though they were made in another context. The ADR is permanent; the spec is temporary. The ADR outlives the change that necessitated it.

## The delegate, review, own loop

Rick Hightower describes the emerging cross-tool operating model in SDD writing as "delegate, review, own": the developer delegates spec drafting to the agent, reviews what it produced, and owns the result before handing it to implementation.

This loop maps directly onto the existing workflow. The Jira story (or brief, or design document) is the input. The agent drafts the spec, fetching Jira story context and Confluence architecture pages via MCP. The developer reviews the draft, editing the acceptance criteria until they are accurate and complete. The developer then opens the PR with the spec delta. The reviewer reads the spec before the diff. The agent implements against the owned spec.

"Delegate, review, own" is not a new ceremony. It is a name for what good spec authorship already looks like, applied consistently across the team.

*Sources: Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46), Medium, Feb 27, 2026.*

## Honest caveats

The mapping described here assumes a reasonably mature team workflow: tickets exist, PRs have reviewers, ADRs are written when significant decisions are made. Teams that have none of these in place need to establish the primitives before layering spec-driven practices on top. The spec does not replace the ticket; it assumes the ticket exists and is well-understood.

The MCP integrations described here (Jira, Confluence, Figma) are mid-2026 tools. The underlying patterns are stable even as the specific tooling evolves.

The workflow fits because it follows branches. Short-lived branches, specifically. That is where trunk-based development has been pointing for decades.
