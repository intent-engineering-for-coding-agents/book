# Failure Modes and Recovery

Two stuck agents can look identical from the outside and need opposite fixes. One has lost the thread as its context filled, and it is drifting. The other has hit a real conflict it lacks the authority to resolve, and it is cycling through the same three function signatures waiting for someone to decide. That second one is a spin: stuck, not broken.

Knowing which mode you are in determines the recovery. Treating a spin as a drift resets a session that only needed a decision. Treating a drift as a spin piles fresh instructions onto a session that needed a clean reset instead. Same symptom, opposite cure.

## The six modes

This chapter uses a working taxonomy rather than a field-standard one. The labels are meant to be operationally useful during a session, not to claim settled academic categories.

**Drift** is the agent losing the thread of the task as context fills or as the task grows past the original brief. Signs: earlier constraints dropped from the output, code that contradicts the spec, increasingly generic responses that no longer reference the specific requirements. Recovery: reset the session with a fresh brief. The agent is not broken; it has lost context.

**Spin** is the agent stuck on a sub-problem it cannot resolve alone. Signs: multiple similar attempts at the same solution, requests for clarification about the same constraint, acknowledgment of a blocker without progress past it. Recovery: provide the missing information or make the decision the agent cannot make on its own. Spin is not hallucination. The agent knows something is wrong. It needs input, not a reset.

**Halt** is the agent stopping before the task is done, usually because it hit an unexpected state and defaulted to caution. Signs: the agent reports completion but leaves tasks unchecked, or reports a blocker and waits. Recovery: resume explicitly. "Continue with step 4" is often enough. Halt is the most benign mode; it wastes time but does not produce incorrect output.

**Hallucination** is the agent inventing facts: files that do not exist, APIs that do not match the actual interface, library methods that were removed two versions ago. Signs: code that references non-existent paths, confident claims about behaviour the agent cannot have verified. Recovery: verify the claim directly, correct the agent's understanding, and if the hallucination was load-bearing, reset and load the relevant documentation explicitly before continuing.

**Context poisoning** is a bad instruction compounding across sessions. Signs: the same incorrect pattern appearing in output across multiple sessions, the agent citing an instruction that no longer matches the codebase. Recovery: fix the instruction. Context poisoning is the only failure mode whose root cause is in the repo, not the session. Resetting the session fixes the symptom; fixing the instruction file fixes the problem.

**Tool misuse** is the agent using the wrong tool for the task: running a full test suite to verify a single change, or writing a one-off script where a targeted file edit would do. Signs: overhead that does not match the task size, side effects outside the expected scope. Recovery: interrupt and redirect. Tool misuse rarely compounds if caught early.

*Sources: Geoffrey Huntley, "Everything is a Ralph Loop" (Jan 17, 2026), the looping/spin behavior of a stuck agent. Tim De Schryver, "Keep Agentic AI Simple: A Practical Workflow for Software Development" (May 2026), clutter and complexity as drivers of agent failure. ThoughtWorks Technology Radar Vol 34 (April 2026), context-related failure as an emerging concern. The six-mode taxonomy itself is this book's working synthesis.*

## The framing that helps

None of these modes are agent failures in the sense of the model being broken. They are predictable consequences of the architecture: context windows that fill, instructions that go stale, tasks that require decisions the agent was not given authority to make.

The framing that usually produces the right remediation is: the agent is not broken, it is clueless. Fix the context. A broken agent needs a different model. A clueless agent needs better information. In many day-to-day failures, the second diagnosis is the useful one, which means the fix is in the repo or the session, not in the model.

A useful signal: when the agent is spending time but producing nothing, rerunning the same check, generating nearly identical variants, stalling on a tool call, something is wrong. Do not let it run unchecked. Toyota's production philosophy calls this pulling the Andon cord: stop the line when a defect appears rather than letting the problem compound downstream. The analogy is imperfect, but the intervention logic is the useful part.

The question to ask when you stop: why is the agent struggling here? Often the answer is the same. The agent lacks information. It is missing a constraint, cannot find a file it needs, or has hit a decision it was never given authority to make. The fix is rarely "let it keep trying". The fix is to give it what it is missing, or to make the decision on its behalf.

*Sources: Geoffrey Huntley, "Everything is a Ralph Loop" (Jan 17, 2026), the loop signal of an agent spending time but producing nothing. Tim De Schryver, "Keep Agentic AI Simple: A Practical Workflow for Software Development" (May 2026), the clueless-not-broken framing and fixing the context first. Toyota, "What is Andon?" (ongoing), stopping the line when a defect appears rather than letting it compound.*

## When to reset vs when to redirect

Reset when the session has accumulated enough context that the agent cannot reliably maintain the task's constraints. Reset when context poisoning is the mode. The agent needs fresh context, not more instructions layered on top of stale ones. Reset when drift is the diagnosis.

Redirect when the agent has the right context but is stuck. A spin, a halt, or tool misuse all respond to a message. "You are spinning on the interface constraint. Here is the decision: use the existing interface and add a new method". A redirect costs one message. A reset costs a full re-briefing.

In practice, the distinction is: if the agent was working well before it went wrong, redirect. If the session has been running long enough that you are unsure what the agent still has in context, reset.

## Maturity honesty

This chapter describes what the book asserts and what it leaves open. The taxonomy above is observation, not settled science. Failure mode categories are a useful mental model, not a formal specification. Recovery strategies are what teams have found effective, not what the literature has proven.

The most under-documented aspect of agentic engineering is not how to start well. Plenty covers that. It is how to recover when things go wrong. Operational experience is accumulating, but the field is early. Expect these practices to be refined.

The failure modes described here are session-level. There is a quieter, slower failure mode that operates across sessions: the same instruction written in three vendor files, diverging gradually, corrupting three different tools simultaneously. That one has a structural fix.
