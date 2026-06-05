# Security in Depth

The most dangerous agent suggestion is the one that looks like obvious hygiene. Imagine a one-line fix: a library version bump to clear a Common Vulnerabilities and Exposures (CVE) entry the dependency scanner flagged. Small PR, clean diff, passing tests.

The new version pulls in a transitive dependency that exfiltrates environment variables from build agents. The package is a typosquat of a real dependency, published two weeks earlier. The flagged CVE was genuine. The fix was still wrong. The agent had no opinion about the supply chain; it was asked to clear a warning and it cleared it.

Most security advice for agentic teams is standard practice rebranded. Secrets scanners, dependency checkers, static analysis: the tools were good before agents and they stay good. This chapter covers what they do not see. The failure modes specific to an agent that writes code by matching patterns, that defers to the user on risk decisions, and that arrives at a codebase with no memory of why a particular control exists.

Sources: OWASP, OWASP Top 10 (ongoing), the standard application-security baseline this chapter builds on. ThoughtWorks, Technology Radar Vol 34 (April 2026), the agent-specific security failure modes the standard tools do not see.

## Pattern replication

The agent writes a new endpoint. It looks at the nearest existing endpoint and copies its shape: the route structure, the request parsing, the response format, the authorisation check. The authorisation check is the one the team has been meaning to fix for three sprints. The new endpoint has it too.

The agent does not distinguish between a pattern it should follow and a pattern it should not. Given the same codebase, it treats every existing pattern as valid. It sees an authorisation check and concludes that this is how authorisation is done here. It does not know that the check is incomplete, that it was implemented under time pressure and never revisited, or that the security review flagged it as a known hole. The pattern is all it has.

The human reviewer catches this because they remember. They know which endpoint has the inherited hole. They know not to copy its auth pattern. The agent has no memory of the security review, no access to the conversation in which the hole was acknowledged, no context for the ADR comment that says "authorisation model needs revision."

The defence is to make the pattern the agent should follow the easiest pattern to find. A `docs/architecture/authorisation.md` that shows the canonical auth check. A comment on the broken endpoint that says "do not copy, see ADR-0012." An `AGENTS.md` rule that says authorisation patterns must match the canonical example, not the nearest existing endpoint. The agent follows the pattern you put in front of it. Put the right one in front.

## Deference to the user

"Should I disable certificate verification to make this work?"

There is one safe answer to this question, and the agent will accept any answer the user gives. It will accept "yes" from a tired developer on a Friday. It will accept "temporarily" and leave the disabled verification in the code for six months. It will accept "just for testing" and surface the disabled check in a production code path.

The same pattern repeats across security decisions. The agent hardcodes a token from a test fixture into production config, because the fixture was the nearest example of how to set that parameter. It generates a debug endpoint during development and forgets to remove it, because nothing in the spec said it was temporary. It adds verbose error messages that leak stack traces and internal paths, because the existing error handler already did that and the agent copied the pattern.

The defence is to encode the non-negotiable decisions so the question does not get asked. Certificate verification stays on. Transport security is not negotiable.

If the test environment needs an exception, the exception is scoped to test code and gated behind a CI check that blocks production builds containing test-only exceptions. Debug endpoints get a naming convention that a lint rule catches at build time. The agent will honour explicit rules it reads before the session starts. It will not invent them.

## The cleanup PR that removes a control

A rate limiter that did not fire during testing. A Cross-Site Request Forgery (CSRF) token check that was duplicated by middleware. An audit log that did not appear in the spec. Each looks redundant on inspection. Each was there for a reason the agent cannot see.

The rate limiter did not fire because the tests sent traffic below the threshold. The threshold was tuned for production load. The CSRF check was duplicated because one layer was recently added and the old one had not been retired yet. The audit log was requested by compliance and the spec was never updated to reflect it. The agent sees unused code. It does not see the production traffic pattern, the migration timeline, or the compliance requirement.

This is the hardest failure mode to catch because the agent's conclusion is defensible. The code does look redundant. The tests pass without it. The diff is clean. The defence is architectural: changes that remove existing controls need explicit justification in the PR description, not silent removal. "This was no longer needed" is not justification. "This was superseded by the rate limiter in the API gateway deployed last month, confirmed by the load test at 5000 rps" is.

## The agent as attack surface

The agent is also a new entry in the threat model. A prompt-injected document from an external source becomes an instruction the agent follows. A tool definition that does something other than what its description claims. Compromised model weights. These are not application-security failures in the code the agent writes. They are failures in the agent itself.

Prompt injection is the most immediate case. The agent reading content from an external source, summarising it, and acting on it has made the external source an instruction channel. The defence is architectural: constrain what the agent does based on instructions in untrusted content, and treat anything the agent reads from outside the repo as data, not as instructions.

Sources: Simon Willison, "Prompt injection attacks against GPT-3" (simonwillison.net, Sep 12, 2022), the origin of the term prompt injection. OWASP, "OWASP Top 10 for LLM Applications" (LLM01: Prompt Injection, ongoing), prompt injection as a catalogued LLM risk. ThoughtWorks, Technology Radar Vol 34 (April 2026), prompt injection as a cross-cutting concern in agentic coding workflows.

The honest answer in 2026 is that these new entries are not well-defended. The practices in this chapter cover the application security of code the agent writes. The security of the agent itself is still being figured out, and the books that cover it well do not exist yet.

## This does not replace the standard tools

The standard security tools still catch most of what they always caught: secrets scanners, dependency checkers, static analysis. This chapter is not a replacement for them. It describes the failure modes that survive because they match the patterns the agent was shown, not because any tool failed.

Be specific about which failures are addressed and which are not. An AGENTS.md rule that says "dependencies must not change package name between versions" is enforceable. An AGENTS.md rule that says "be careful with security" is not. The rule has to be specific enough that a check verifies it, or the agent will ignore it as background noise.

A human reviewer who reads every PR through a security lens is still the most effective layer. The tools, rules, and pattern defences in this chapter make that reviewer's job possible at agentic speed. They do not replace it.

The next chapter turns from the work that goes into a PR to the shape of the PR itself, because a PR that mixes a behavioural security fix with a structural refactor makes the pattern-replication failure invisible in the diff.
