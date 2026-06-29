# What the Scanners Miss

The most dangerous agent suggestion is the one that looks like obvious hygiene.

Consider a one-line dependency bump to clear a Common Vulnerabilities and Exposures (CVE) entry the scanner flagged. Small PR, clean diff, passing tests. The new version pulls in a typosquatted transitive dependency that exfiltrates environment variables from build agents. The flagged CVE was genuine. The fix was still wrong.

The agent had no model of the supply chain. It was asked to clear a warning, and it cleared it.

Most security advice for agentic teams is standard practice with a new label. Secrets scanners, dependency checkers, static analysis: the tools were good before agents and they stay good. This chapter covers what they do not see: the failure modes specific to an agent that writes code by matching patterns, defers risk decisions to the user, and arrives at a codebase with no memory of why a given control exists.

| Failure mode | What the agent does | Why the scanners miss it | The defense |
|---|---|---|---|
| Pattern replication | Copies the nearest endpoint, inherited auth hole and all | Tools see valid-looking code, not which pattern is broken | Make the canonical pattern easiest to find. Mark the broken one "do not copy" |
| Deference to the user | Accepts "yes, disable cert verification" from a tired developer | No scanner overrides a decision the user signed off on | Encode the non-negotiable as an instruction so the question is never asked |
| Cleanup that removes a control | Deletes a rate limiter, CSRF check, or audit log that looks redundant | Diff is clean and tests pass. The reason for the control lives outside the code | Require explicit justification to remove a control, never silent deletion |

*Sources: OWASP, OWASP Top 10 (ongoing), the standard application-security baseline this chapter builds on. ThoughtWorks, Technology Radar Vol 34 (April 2026), that agent-specific security failure modes exist beyond what the standard tools see. The three-mode breakdown that follows is this book's synthesis.*

## Pattern replication

The agent writes a new endpoint and copies the nearest existing endpoint: the route structure, the request parsing, the response format, the authorization check. The authorization check is the one the team has been meaning to fix for three weeks. The new endpoint has it too.

The agent does not distinguish between a pattern it should follow and a pattern it should not. Given the same codebase, it treats every existing pattern as valid. It sees an authorization check and concludes this is how authorization is done here. It does not know the check is incomplete, flagged in a security review as a hole nobody has closed. The pattern is all it has.

The human reviewer catches this because they remember which endpoint has the inherited hole and know not to copy its auth pattern. The agent has no memory of that review and no access to the ADR comment that says "authorization model needs revision".

The defense is to make the pattern the agent should follow the easiest pattern to find: a `docs/architecture/authorization.md` that shows the canonical auth check, a comment on the broken endpoint that says "do not copy, see ADR-0012", and an agent instruction that says authorization patterns must match the canonical example, not the nearest existing endpoint. The agent follows the pattern you put in front of it. Put the right one in front.

## Deference to the user

"Should I disable certificate verification to make this work?"

There is only one safe answer to this question, and the agent will accept any answer the user gives. It will accept "yes" from a tired developer on a Friday. "Temporarily" leaves the disabled verification in the code for six months. "Just for testing" surfaces the disabled check in a production code path.

The same thing happens across security decisions. The agent hardcodes a token from a test fixture into production config, because the fixture was the nearest example of how to set that parameter. A debug endpoint generated during development stays in, because nothing in the spec marked it temporary. Verbose error messages leak stack traces and internal paths: the existing error handler already did that, and the agent copied it.

Encode the non-negotiable decisions and the question never gets asked. Certificate verification stays on, written into an agent instruction the agent reads before it touches transport code.

If the test environment needs an exception, the exception is scoped to test code and gated behind a CI check that blocks production builds containing test-only exceptions. Debug endpoints get a naming convention that a lint rule catches at build time. The agent will honor explicit rules it reads before the session starts. It will not invent them.

## The cleanup PR that removes a control

A rate limiter that did not fire during testing. A Cross-Site Request Forgery (CSRF) token check that was duplicated by middleware. An audit log that did not appear in the spec. Each looks redundant on inspection, and each was there for a reason the agent cannot see.

The rate limiter did not fire because the tests sent traffic below the threshold, and that threshold was tuned for a production load. The CSRF check was duplicated mid-migration: one layer recently added, the old one not yet retired. The audit log came from compliance, and the spec was never updated to reflect it. The agent sees unused code. It does not see the reason each piece was put there.

This is the hardest failure mode to catch because the agent's conclusion is defensible. The code does look redundant. The tests pass without it. The diff is clean. The defense is architectural: changes that remove existing controls need explicit justification in the PR description, not silent removal. "This was no longer needed" is not justification. "This was superseded by the rate limiter in the API gateway deployed last month, confirmed by the load test at 5000 rps" is.

## The limits of the defense

Security is not the subject of this book, and one chapter does not make it one. The field has its own literature and its own specialists, and a threat surface far wider than anything Intent Engineering touches. The claim here is narrow: the agent introduces failure modes the standard tools were not built to see, and those particular failures yield to the same artifact discipline the rest of the book is built on.

The agent is itself a new entry in the threat model: a prompt-injected document becomes an instruction it follows, and a tool definition does something other than what its description claims. Both are poorly defended in 2026 and outside this book's scope. The failure modes above are the ones Intent Engineering is equipped to address.

*Sources: Simon Willison, "Prompt injection attacks against GPT-3" (simonwillison.net, Sep 12, 2022), the origin of the term prompt injection. OWASP, "OWASP Top 10 for LLM Applications" (LLM01: Prompt Injection, ongoing), prompt injection as a cataloged LLM risk.*

How far the artifact discipline reaches depends on how specific the rule is. "Dependencies must not change the package name between versions" is enforceable by a check. "Be careful with security" is a background noise the agent ignores. The rule has to be precise enough for a check to verify.

None of this replaces the human who reads every PR through a security lens. The artifact defenses in this chapter make that reviewer's job possible at agentic speed. They do not retire it.

Every defense here assumes a reviewer sees the change clearly. A PR that buries a behavioral security fix inside a structural refactor makes the pattern-replication failure invisible in the diff. The shape of the PR is the next control to get right.
