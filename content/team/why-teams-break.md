# Why Teams Break Agentic Workflows

Both developers had followed the process. Developer A's agent had refactored the notification service's interface to accept a structured payload. Cleaner, the spec said so, the tests passed. Developer B's agent had refactored the same service's interface to accept individual parameters. Also cleaner, also specced, also tested. They worked on separate branches. They each merged on Thursday. The integration tests failed on Friday morning and nobody was surprised. Both had done the right thing. Nobody had done the cross-branch thing.

The individual practice was impeccable. The coordination layer did not exist.

This is the pattern that appears at team scale: not a skills failure, not a tooling failure, but a context failure. Agents are session-local. Two agents in two developer sessions have no shared awareness. Each one acts correctly given what it knows; what they collectively produce depends on what they collectively cannot see.

## N developers, M agents

The compounding math is unfavorable. One developer with one agent produces one context window. Two developers with one agent each produces two isolated context windows. Three developers with two agents each produces six. At each scale, the number of potential conflicts grows faster than the number of developers.

At human speed, this was manageable. Developers talk, stand up, ask each other in Slack. The coordination overhead grew linearly with team size and was absorbed through communication. At agentic speed, the developer is often not watching the agent work. The agent completes its task between the developer's coffee and their next prompt. The opportunity for informal coordination has narrowed.

Steve Yegge described the progression in his 2025 piece "Revenge of the junior developer": Manual coding to Completions to Chat to Coding Agents to Agent Clusters to Agent Fleets. Most teams in mid-2026 are somewhere in the Agent Clusters phase: multiple agents running on the same codebase, coordination still handled by humans at PR review time. The scaling pressure that will push teams toward Agent Fleets, where agents coordinate with each other autonomously, is already visible. The coordination question is not hypothetical.

*Sources: Steve Yegge, ["Revenge of the junior developer"](https://sourcegraph.com/blog/revenge-of-the-junior-developer), Sourcegraph blog, Mar 22, 2025. ThoughtWorks, Technology Radar Vol 34, April 2026.*

## Where individual practice runs out of road

The four practices from the previous sections each have a team-scale breaking point.

**`AGENTS.md`** is a single file. On a solo project, it stays current because one person owns it and feels the pain when it drifts. On a team, ownership is shared, which means nobody owns it. Six months in, the `AGENTS.md` contains instructions that no longer match how the team works, and nobody updated it because nobody felt responsible for it. Agents load it with confidence; it is a confident-sounding lie.

**Specs** assume intent is singular. One developer writing a spec for one change has one set of intent. Two developers writing specs for changes that share a boundary have two sets of intent that nobody has reconciled. The specs do not conflict. They simply do not know about each other. The agent implements each faithfully; the merge is where they meet.

**Tests** prove the code matches the spec for the branch they were run on. They do not prove the code matches the integrated system. Two test suites passing on two branches is not the same as one test suite passing on the merged result.

**Context windows** are session-local by design. An agent briefed in session A has no memory of what was decided in session B. This is a feature in the solo case. Each session starts fresh. In the team case, it is a gap: decisions made by another developer's agent are not visible to this one unless they are recorded somewhere both agents can read.

## The coordination failure modes

These break in predictable patterns.

**Spec collision** is two specs that do not know about each other making incompatible claims about the same component. The Thursday-Friday merge failure above. The fix is making the boundary visible before the specs are written, not after they are implemented.

**AGENTS.md drift** is the instruction file becoming stale enough that different agents on the same team receive different implicit briefings. Developer A's agent (long-lived session, AGENTS.md loaded three days ago) and Developer B's agent (fresh session, current AGENTS.md) are running on different instructions without knowing it.

**Context poisoning** is a subtler variant: an outdated ADR, a superseded design doc, or an archived spec that was not properly archived gets loaded into an agent's context. The agent treats it as current truth. The poison propagates through every decision that references it.

**Drift amplification** is the agentic-speed version of technical debt accumulation. At human speed, inconsistencies accumulate slowly enough that someone notices and corrects. At agentic speed, the agent can generate a hundred inconsistent-but-passing commits before the next human looks at the branch. The inconsistency compounds before it is visible.

ThoughtWorks Radar Vol 34 (April 2026) named the general category "cognitive debt": undocumented decisions and assumptions that agents cannot read and therefore cannot respect. At team scale, cognitive debt accumulates from multiple directions simultaneously.

*Sources: ThoughtWorks, Technology Radar Vol 34, April 2026.*

## Honest caveats

Most teams have not reached Agent Fleets. The coordination problem described here is visible and real at the Agent Clusters phase: multiple agents, human-mediated coordination, PR review as the integration point. The practices in the following chapters are calibrated to that reality. They assume that developers are still in the loop, reviewing specs before they are implemented and PRs before they are merged.

What happens at Agent Fleet scale, where agents hand off to other agents, is not yet clear. The patterns for that phase are being invented in 2026 and are not stable enough to prescribe. The last chapter in this section describes what the SDD ecosystem has and has not figured out.

The coordination failure is structural. So is the fix. An existing SDLC already has the slots these practices need to live in. The question is knowing which slot each artifact fits in.
