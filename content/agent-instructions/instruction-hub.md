# Agent Instruction Hub

Two developers, same repo, same language, same CI pipeline. Why do their pull requests look like they came from different codebases? Different naming, different ideas about which directories are off-limits, different test structure. Nobody changed the rules. The rules diverged: one developer drives Claude Code with `CLAUDE.md`, the other drives Cursor with `.cursorrules`, both files started as copies of the same thing, and a month later they no longer agree.

The fix is not better synchronization between two files. It is one file that both tools point to.

`AGENTS.md` is the entry point, and `.agents/` is what it points into. One directory, no vendor in the name, readable by every tool. Instructions, skills, and hooks live there. Whichever agent is doing the work, it loads from the same place.

## `.agents/instructions/`

An agent modifying the authentication module does not need the CI pipeline rules, and an agent writing a new checker does not need the deployment runbook. Instruction files exist so each session loads only what matters for the current task. Each file covers one domain, letting the agent read the relevant one and skip the rest.

A focused hub stays small. Four instruction files is a realistic count:

```text
.agents/instructions/
├── build-and-ci.md       # uv commands, lint, test, CI pipeline
├── coding-standards.md   # Python style, project structure, testing
├── index-maintenance.md  # when and how to update docs/INDEX.md
└── openspec.md           # specs, AC IDs, test traceability
```

`coding-standards.md` is 50 lines. Type hints, string quoting, the linting rules in `pyproject.toml`, test naming conventions. An agent working on a new checker reads it once and writes code that matches the rest of the codebase. An agent updating a dependency skips it entirely.

One file per domain, not one file per task. `coding-standards.md` covers all Python style instead of splitting into `typing-standards.md` and `testing-standards.md`. Splitting by domain keeps each file coherent. Splitting too fine creates a directory the agent has to enumerate before deciding what to load.

AgentPatterns.ai's evaluation of context files identifies this as the most common failure mode: files that are too large to be useful, or too granular to be discoverable. The instruction file that nobody loads is worse than no instruction file, because it creates a false confidence that the agent has been briefed.

*Sources: AgentPatterns.ai, "Evaluating AGENTS.md: When Context Files Hurt More Than Help", the most common failure mode of context files being too large or too granular.*

## `.agents/skills/`

Skills are workflows, not context. An instruction file tells the agent how things work in this repo. A skill tells it how to do a specific repeatable task.

`update-index` is a skill. It scans `docs/`, reads each file's heading, and regenerates `docs/INDEX.md`, `docs/decisions/README.md`, and `docs/design/README.md`. Five steps, one outcome, invocable any time `docs/` changes. Without the skill, each agent session that creates a new file has to remember to update the index or be told to. With the skill, `AGENTS.md` states the rule once: after changing anything under `docs/`, run `update-index`.

The distinction between instructions and skills: instructions answer "how does this work?" and skills answer "how do I do this specific thing?" A coding-standards file is an instruction. A workflow for generating a new checker from spec is a skill.

Typed from the session, `/update-index` invokes the skill directly. Claude Code surfaces slash commands from `.claude/skills/`, not `.agents/skills/` itself. Keeping one source of truth means symlinking `.claude/skills` to `.agents/skills`, and `.claude/hooks` to `.agents/hooks` for the directory below, which only works if your Git setup and your operating system both tolerate symlinks cleanly.

None of that touches the autonomous trigger: `AGENTS.md` tells the agent which skill to load when the task description matches, whether or not the slash command resolves. The developer can also bypass that layer and invoke the skill explicitly. `/draft-section` starts a new chapter without composing a task description from scratch. Same file either way.

OpenSpec repos generate a full set of skills on `openspec init`: `opsx:new`, `opsx:ff`, `opsx:apply`, `opsx:archive` and others. Each generated skill is a committed file in `.agents/skills/openspec-*/SKILL.md`. These are vendor pointers, generated once and committed, which is why they live alongside the hand-authored skills rather than somewhere separate. The directory does not distinguish between authored and generated skills. Both are plain Markdown files the agent reads the same way.

The same shortcut does not travel to IDEs. Cursor, VS Code with Copilot, and JetBrains AI each have their own slash command surfaces, and none of them read `.agents/skills/` as commands. They reach the instruction files through `AGENTS.md` pointers. The workflow logic is shared, but the slash command invoking it is not. Vendor-neutral structure gets you as far as the file. The keyboard shortcut stays local to each tool.

## `.agents/hooks/`

Hooks are the part of the hub that most teams have not wired up yet. Often the directory exists with nothing in it except a `.gitkeep`.

A hook fires on a trigger: after a file edit, before a commit, when a session ends. It runs a script without waiting for the agent to decide whether it should. Anthropic's guidance on building effective agents draws a hard line between instructions, which are advisory, and hooks, which are deterministic. Instructions prevent drift when the agent reads and follows them. Hooks prevent drift regardless.

The most common hook candidates: run the linter after any source file edit, validate `docs/INDEX.md` after any change under `docs/`, check that no secrets appear in staged files before a commit. These are tasks `AGENTS.md` might instruct the agent to do. A hook makes them non-optional.

Doc comment formatting is a cleaner hook candidate than it first appears. An agent editing a `.java` file produces Javadoc that compiles but may not match the codebase's conventions: wrong tag order, missing `@return`, summary lines that exceed the configured limit. Instructing the agent to fix this competes with the rest of the task. A hook does not. In `.agents/hooks/` that becomes three files:

```text
.agents/hooks/
├── java.md   # checkstyle on modified .java files
├── cs.md     # dotnet-format on modified .cs files
└── py.md     # docformatter on modified .py files
```

Each file defines a trigger (a file edit matching that extension) and the command to run. The agent does not get a vote.

The honest caveat: hook authoring is immature. The tooling varies by agent, the syntax is not standardized across tools, and the failure modes when a hook blocks unexpectedly are not always easy to debug. `.agents/hooks/` is the right place for them when they are ready. For most teams right now, they are not ready.

*Sources: Anthropic, "Building effective agents" (Dec 2024), the hard line between instructions (advisory) and hooks (deterministic).*

The hub gives the agent its orientation about the codebase. What it still needs for any particular task is a spec: not how the system works in general, but what this specific change is supposed to do. A well-built hub briefs the agent on the rules. The spec briefs it on the intent. Both have to exist, and writing the spec well is its own discipline.

## When the hub becomes overhead

The `.agents/` hub solves a coordination problem. When two developers use different tools, or when one developer uses multiple tools across sessions, the hub prevents instruction drift. When neither of those is true, the hub is overhead without the payoff.

A solo developer working with a single tool does not have a coordination problem. Their `CLAUDE.md` or `.cursorrules` is the source of truth because there is only one source. The hub adds a directory structure, a pointer file, and a maintenance ritual for a problem that does not exist yet. The coordination cost is real: every instruction file needs a load clause, every skill needs a trigger, every hook needs a definition. For a solo project, that cost buys nothing.

The hub earns its keep when the coordination problem appears: a second developer joins with their own tool, a solo developer starts using Cursor for some tasks and Claude Code for others, or a team grows from two to five and needs consistent agent behavior across all of them. At that point, the hub prevents the fork that would otherwise happen. The investment pays off when the alternative is divergence.

The practical test: if you are maintaining one instruction file and it works, keep it. If you find yourself copying instructions between files, or if two tools produce different output from what should be the same brief, build the hub. The hub is the solution to a specific problem. Building it before the problem appears is premature structure.

## Tooling

If you want to see this in practice, the [`iec` companion repo](https://github.com/intent-engineering-for-coding-agents/cli) has the four instruction files above, the `update-index` skill, and an `.agents/hooks/` directory waiting to be filled. See [Companion Repo](../appendices/companion-repo) for how to browse it. The hub gives the agent standing context. The next constraint is per-change intent: the spec that says what this session is supposed to build.
