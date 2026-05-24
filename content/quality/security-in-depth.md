# Security in Depth

The agent suggested a one-line fix. A library version bump to resolve a Common Vulnerabilities and Exposures (CVE) entry the dependency scanner had flagged. The PR was small, the diff was clean, the tests passed. The new version of the library introduced a transitive dependency that exfiltrated environment variables from build agents. The package was a typosquat of a real dependency, published two weeks earlier. The CVE the scanner flagged was real. The fix was wrong. The agent had no opinion about the supply chain; it had been asked to resolve a warning and resolved it.

Security at agentic speed is not a separate stage. It is a property of the inputs the agent is allowed to read, the operations it is allowed to run, and the artefacts it is allowed to produce. Each of those points is a place where an unaligned shortcut becomes a shipped vulnerability.

## The shift the agent forces

Pre-agent, security review was a stage. A change was implemented, reviewed for functionality, then reviewed for security by someone with the right paranoia and the relevant context. The stage worked when the rate of change was slow enough for the security reviewer to keep up.

At agentic rates the stage does not fit. There are too many small changes. The reviewer falls behind, and falling behind means a backlog of unreviewed changes shipping while the review queue grows. The defensible response is to push the security review forward into the artefacts the agent reads and the gates the agent crosses. The reviewer's attention shifts from "is this PR safe?" to "are the guardrails that produce this PR working?"

This is defence in depth applied to the agent. Multiple layers, each catching a different class of failure, none of them depended on as the single point of safety. The layers map onto the three gates from the previous chapter: things to encode before the agent starts, things to enforce during, things to verify after.

*Sources: OWASP, OWASP Top 10 (ongoing). ThoughtWorks, Technology Radar Vol 34 (April 2026).*

## Before: the guardrails in `AGENTS.md`

The agent's first input is `AGENTS.md`. That is also the first place to put security guardrails the agent will be expected to honour.

Three specific instructions cover most of the value. First: never commit secrets, even temporarily, even in tests. Name the secret detection tool or pre-commit hook the repo uses. Without this, the agent generating a test fixture will inline an API key it found in a comment, and the next commit ships it. Second: dependency changes need explicit justification. A bump from `library@1.4.2` to `library@1.4.3` is fine; a bump from `library@1.4.2` to a different library entirely with a similar name is the typosquat case and requires the agent to surface the change to the human, not silently apply it. Third: never execute code from a fetched source without explicit approval. The agent that downloads a script from a URL the user mentioned and runs it has just executed an attacker's payload if the URL was hostile.

These are concrete because vague security advice does not work for agents any better than for humans. "Be careful with dependencies" is not enforceable. "Bumps must use the same package name as the current version, or be surfaced to the user with the package metadata and a one-line justification" is.

## During: the deterministic enforcement layer

Hooks and CI are the layer that does not depend on the agent remembering anything.

Secrets scanning is the obvious one. A pre-commit hook that catches the API key shape, the private key block, the AWS access key prefix, the OpenAI key prefix. Not exhaustive, but expensive to fool, and free to run. The cost of running it on every commit is milliseconds. The cost of not running it is the leak that ends up in a public repo and triggers a credential rotation across the organisation.

Dependency scanning runs in CI on every PR. The dependency scanner catches the known CVEs. It does not catch the typosquat or the supply-chain compromise of a package whose maintainer was phished. A second layer is the lockfile diff: does this PR change `package-lock.json` or `poetry.lock`? Does it introduce packages that did not exist last week? A change to a lockfile is a security event by default. The PR review should ask why the lockfile changed and what the new transitive surface is.

The injection class of vulnerabilities (SQL injection, command injection, cross-site scripting (XSS), prompt injection now joining the family) sits in the same enforcement layer. Static analysis catches some. Linters catch some. The agent that generates a SQL query by string concatenation against user input is reproducing the failure mode that has been on the OWASP Top 10 for twenty years; a linter rule that flags string concatenation in a database call catches it before the PR is opened.

Prompt injection is the new entry. The agent reading content from an external source, summarising it, and acting on it has just made the external source an instruction channel. Treat any content the agent reads from outside the repo as data, not as instructions. Hooks cannot fully catch this; the architectural defence is to constrain what the agent can do based on instructions in untrusted content. ThoughtWorks Radar Vol 34 calls this out as the cross-cutting concern of agentic security; the practical implementation is still maturing.

## After: the review checklist as OWASP filter

The Open Worldwide Application Security Project (OWASP) maintains the Top 10, and the Top 10 is the after-gate checklist. The reviewer working at agentic speed cannot examine every line of every PR for every vulnerability class. What they can do is run the diff against a checklist and stop on hits.

A workable checklist for an agent-generated PR. Authentication and session handling untouched? Authorisation checks present where data is accessed? Input validation at the trust boundary? Sensitive data not logged? Dependencies not changed (or changed with justification)? Errors not leaking stack traces in responses? Cryptography used through library primitives, not hand-rolled?

Most of those are deterministically checkable. A linter rule catches the stack-trace-in-response case. A secret scanner catches the logged credential. A static analyser catches the SQL concatenation. The reviewer's attention goes to the cases the automation cannot decide: is this new endpoint protected by the same authorisation pattern the rest of the service uses, or has the agent invented a slightly different one that almost matches?

This is the OWASP Top 10 used as a filter for human attention, not as a compliance ritual. The compliance version (run the scanner, file the report, move on) catches very little. The filter version (read the diff with the Top 10 in your head, stop on the categories that match) catches the cases the automation missed.

## What the agent gets wrong that humans rarely do

The agent operates on patterns. Patterns are the failure surface. The agent writing a new endpoint copies the shape of the nearest existing endpoint, including its authorisation checks. If the existing endpoint is the one with the inherited authorisation hole the team has been meaning to fix, the new endpoint has it too. Patterns generalise the bug.

The agent also defers to the user too readily on security decisions. "Should I disable certificate verification to make this work?" is a question with one safe answer and the agent will accept any answer the user gives. Encode the safe answer in `AGENTS.md` so the question does not get asked: certificate verification stays on; transport security is not negotiable; if the test environment needs an exception, the exception is scoped to test code and never reaches production code paths.

The third pattern is the cleanup PR that removes a security control the agent decided was unused. A rate limiter that did not fire during testing, a Cross-Site Request Forgery (CSRF) token check that was duplicated by middleware, an audit log that did not appear in the spec. Each looks redundant on inspection; each was there for a reason. The defence is the same as for any other refactor: changes that remove existing controls need explicit justification in the PR, not silent removal.

## Honest caveats

Security in depth does not produce a secure system; it produces a system whose failure modes are visible. A vulnerability that none of the layers catch still ships. The argument is that fewer ship than would otherwise, and the ones that do are caught earlier by the next layer down.

Tool choice matters less than layer placement. The best linter is the one that runs. The most thorough dependency scanner is the one that does not block PRs so often that the team disables it. Pick the tool the team will actually keep in CI six months from now, configure it narrowly, and add another layer rather than tightening the first one to the point of friction.

The agent is also an attack surface. A compromised model weight, a tool definition that does something other than what its description claims, a prompt-injected document that survived the context-window cleanup. These are the new entries in the threat model. They are not yet well-defended. The honest answer in 2026 is that the practices in this chapter cover the application security of code the agent writes; the security of the agent itself is still being figured out, and the books that cover it well do not exist yet.

The next chapter turns from the work that goes into a PR to the shape of the PR itself, because a PR that mixes three classes of change makes every gate in this chapter harder than it has to be.
