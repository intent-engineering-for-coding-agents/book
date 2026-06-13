# Agent Instruction Hub

Two developers, same repo, same language, same CI pipeline. Why do their pull requests look like they came from different codebases? Different naming, different ideas about which directories are off-limits, different test structures. Nobody changed the rules. The rules diverged: one developer drives Claude Code with `CLAUDE.md`, the other drives Cursor with `.cursorrules`, both files started as copies of the same thing, and a month later they no longer agree.

The fix is not better synchronization between two files. It is one file that both tools point to.

`AGENTS.md` is the entry point, and `.agents/instructions/` is what it points into. One directory, no vendor in the name, readable by every tool. Instructions, skills, and hooks live there. Whichever agent is doing the work, it loads from the same place.

## `.agents/instructions/`

An agent modifying the authentication module does not need the CI pipeline rules, and an agent writing a new checker does not need the deployment runbook. Instruction files exist so each session loads only what matters for the current task. Each file covers one domain, letting the agent read the relevant one and skip the rest.

`instructions/` is this book's name for this layer. At the time of writing, no cross-tool standard specifies this subdirectory path yet.

A focused hub stays small. Here is what one looks like in practice:

```text
.agents/instructions/
├── build-and-ci.md       # build commands, lint, test, CI pipeline
├── coding-standards.md   # coding style, project structure, testing
├── index-maintenance.md  # when and how to update any INDEX.md
└── openspec.md           # OpenSpec extensions for specs, AC IDs, test traceability
```

`coding-standards.md` is 50 lines. Type hints, string quoting, linting rules, test naming conventions. An agent working on a new checker reads it once and writes code that matches the rest of the codebase. An agent updating a dependency skips it entirely.

One file per domain, not one file per task. `coding-standards.md` covers all style conventions instead of splitting into `naming-conventions.md` and `formatting.md`. Splitting by domain keeps each file coherent. Splitting too fine creates a directory the agent has to enumerate before deciding what to load.

## `.agents/skills/`

Skills are workflows, not context. An instruction file tells the agent how things work in this repo. A skill tells it how to do a specific repeatable task. `.agents/skills/` is the emerging standard path: OpenAI Codex scans it natively from the current directory up to the repo root.

Take `update-changelog` as an example: scan commits since the last tag, extract the relevant entries, regenerate `CHANGELOG.md`. Five steps, one outcome, invocable any time a feature merges. Without the skill, each agent session has to remember to update the changelog or be told to. With the skill, the agent instructions state the rule once: after merging a feature, run `update-changelog`.

The distinction between instructions and skills: instructions answer "how does this work?" and skills answer "how do I do this specific thing?" A coding-standards file is an instruction. Scaffolding a new module is a skill.

Typed from the session, `/update-changelog` invokes the skill directly. Claude Code surfaces slash commands from `.claude/skills/`, not `.agents/skills/` itself. Keeping one source of truth means symlinking `.claude/skills` to `.agents/skills`, and `.claude/hooks` to `.agents/hooks` for the directory below, which only works if your Git setup and your operating system both tolerate symlinks cleanly.

None of that touches the autonomous trigger. Agent instructions tell the agent which skill to load when the task description matches, whether or not the slash command resolves. The developer can also bypass that layer and invoke the skill explicitly. `/update-changelog` runs it directly without waiting for a matching task description. Same file either way.

Running `openspec init` for a specific agent generates a full set of skills: `opsx:new`, `opsx:ff`, `opsx:apply`, `opsx:archive` and others. At the time of writing, `openspec init` does not write directly into `.agents/skills/`; the workaround is to copy the generated files there after initialization (native `.agents/` support is tracked in [OpenSpec issue #1104](https://github.com/Fission-AI/OpenSpec/issues/1104)).

CLI agents are the exception: Codex scans `.agents/skills/` natively, and Claude Code reaches it via symlink from `.claude/skills/`. Most IDE integrations are a different story — they have their own slash command surfaces and reach instruction files through `AGENTS.md` pointers rather than reading `.agents/skills/` directly. The workflow logic is shared, but the slash command invoking it is not. Vendor-neutral structure gets you as far as the file. The keyboard shortcut stays local to each tool.

*Sources: OpenAI, "Codex Skills" (developers.openai.com/codex/skills), `.agents/skills/` as the native Codex scan path.*

## `.agents/hooks/`

Few teams use agent hooks yet. The case for them comes down to one word: guarantee. An instruction tells the agent to run the linter after editing a source file. The agent usually does. A hook runs the linter after every source file edit, regardless of what the agent decided. Anthropic's guidance on building effective agents draws a hard line between the two: instructions are advisory, hooks are deterministic.

Hooks can also be scoped to file types. A hook configured to fire on `.java` file edits runs checkstyle every time the agent touches a Java file — not because the agent remembered to, but because the trigger matched. The Javadoc use case is a clean example: an agent adding a new public method may or may not add a Javadoc comment. A hook configured on `.java` edits can check every public and protected method and force the agent to fill in what is missing.

If you wire them up, `.agents/hooks/` is the natural home: one location, no vendor in the name, readable by every tool — the same reasoning as the rest of the hub.

Common hook candidates: run the linter after any source file edit, keep a generated file in sync after its sources change, check that no secrets appear in staged files before a commit. These are things the agent instructions might tell the agent to do. A hook makes them non-optional. In `.agents/hooks/` the doc-comment example above becomes three files:

```text
.agents/hooks/
├── java.md   # checkstyle on modified .java files
├── cs.md     # dotnet-format on modified .cs files
└── py.md     # docformatter on modified .py files
```

Each file defines a trigger (a file edit matching that extension) and the command to run. The agent does not get a vote.

The honest caveat: hook authoring is immature. The tooling varies by agent, the syntax is not standardized across tools, and the failure modes when a hook blocks unexpectedly are not always easy to debug. Where each tool actually looks for hook definitions also varies. For most teams right now, hooks are not ready.

*Sources: Anthropic, "Building effective agents" (Dec 2024), the hard line between instructions (advisory) and hooks (deterministic).*

The hub gives the agent its orientation about the codebase. What it still needs for any particular task is a spec: not how the system works in general, but what this specific change is supposed to do. A well-built hub briefs the agent on the rules. The spec briefs it on the intent.

## When the hub becomes overhead

The `.agents/` hub solves a coordination problem. When two developers use different tools, or when one developer uses multiple tools across sessions, the hub prevents instruction drift. When neither of those is true, the hub is overhead without the payoff.

A solo developer working with a single tool and no plans to change does not have a coordination problem. A single instruction file — whether it is called `CLAUDE.md`, `AGENTS.md`, or anything else — is the source of truth because there is only one source. Note that using `CLAUDE.md` does not prevent the hub: a `CLAUDE.md` that points into a shared instruction directory is using the hub with a different entry point. The overhead question is whether you maintain `.agents/` as a shared directory at all. The hub adds that directory structure, a pointer file, and a maintenance ritual for a problem that does not exist yet. The coordination cost is real: every instruction file needs a load clause, every skill needs a trigger, every hook needs a definition. For that project, that cost buys nothing.

Two things change the calculation. First, tool independence: a developer who wants to stay portable — not locked into any single agent, able to shift as the tooling landscape shifts — benefits from a vendor-neutral hub even alone. Second, multi-agent workflows: running one agent to write code and another to review it is a coordination problem even for one person. Both agents need the same instructions, the same skill definitions, the same conventions. A vendor-specific file serves only the tool it was written for.

The hub earns its keep when the coordination problem appears: a second developer joins with their own tool, a solo developer starts using Cursor for some tasks and Claude Code for others, or a team grows from two to five and needs consistent agent behavior across all of them. Open source projects are a special case: the moment you accept contributions, you cannot expect every contributor to use your preferred agent. With many coding agents to choose from today, a vendor-specific instruction file is a barrier a vendor-neutral hub removes. At that point, the hub prevents the fork that would otherwise happen. The investment pays off when the alternative is divergence.

The practical test: if you are maintaining one instruction file and it works, keep it. If you find yourself copying instructions between files, or if two tools produce different output from what should be the same brief, build the hub. The hub is the solution to a specific problem. Building it before the problem appears is premature structure.

## Tooling

If you want to see this in practice, the [`iec` companion repo](https://github.com/intent-engineering-for-coding-agents/cli) has the four instruction files above, the `update-index` skill, and an `.agents/hooks/` directory waiting to be filled. See [Companion Repo](../appendices/companion-repo) for how to browse it. The hub gives the agent standing context. The next constraint is per-change intent: the spec that says what this session is supposed to build.
