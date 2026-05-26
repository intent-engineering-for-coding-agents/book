# ASE-TEAM-REPO-IS-BRIEFING: The Repo is the Briefing

**Layer**: 1
**Categories**: team, onboarding, context
**Applies-to**: all
**Summary**: The repo is the briefing — every new developer and every new agent session starts here.

## Principle

The repo is the briefing. Every new developer and every new agent session starts here. If it takes a meeting, a Slack thread, or a tribal knowledge transfer session to get someone started, the repo's briefing is incomplete. The onboarding a human needs and the context an agent needs share more in common than most teams assume.

## Why it matters

The onboarding cost that a human pays once per developer, an agent pays once per session. A repo where the architecture is illegible, the conventions are undocumented, and the key decisions are in people's heads is a repo where every agent session starts with a handicap. The fix is the same fix that makes human onboarding faster.

## Violations to detect

- New team members requiring extensive verbal knowledge transfer to become productive
- Agent sessions that fail on the first attempt because critical context is missing
- `AGENTS.md` that assumes knowledge not present in the repo

## Good practice

A complete briefing answers: what is this project? What does it depend on? Where does each kind of code live? What conventions does it follow? What decisions shaped it? `README.md` answers the first for humans; `AGENTS.md` answers them all for agents.

## Sources

- ase-book, *"ASE and the SDLC" chapter*, foundation section.
- ase-book, *"Why Structure" chapter*, foundation section.
