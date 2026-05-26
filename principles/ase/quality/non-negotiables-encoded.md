# ASE-QUALITY-NON-NEGOTIABLES-ENCODED: Encode Non-Negotiable Decisions

**Layer**: 2
**Categories**: quality, security, hooks
**Applies-to**: code
**Summary**: Encode non-negotiable decisions so the question does not get asked — the agent has no judgment here.

## Principle

Encode the non-negotiable decisions so the question does not get asked. The agent defers to the user on safety-critical decisions — "should I disable this check?" — and accepts any answer. The defence is to encode the decision in a hook or an automated check that the agent cannot bypass, not in an instruction it can talk its way around.

## Why it matters

The agent's deference model is designed for helpfulness, not safety. When asked whether to disable a security check, strip a rate limit, or hardcode a credential, the agent asks the user — and accepts whatever answer it receives. A developer in a hurry says "yes, skip it." The non-negotiable must be encoded where the agent cannot negotiate.

## Violations to detect

- Security-critical decisions that exist only as instructions (agent can ignore or justify around)
- No automated enforcement of non-negotiable rules
- Agent writing code that bypasses security controls when prompted to do so

## Good practice

Encode non-negotiables as pre-commit hooks or CI checks: "no commit if any file contains `TODO: remove this check`", "fail build if `@Disabled` appears on a security test", "block merge if any new dependency lacks a security review." The agent cannot negotiate with CI.

## Sources

- ase-book, *"Security in Depth" chapter*, quality section.
