---
type: appendix
title: "Feedback & Contributing"
---

# Feedback & Contributing

A book about externalizing intent should make its own intent easy to correct. Every page is a file in the public repo, with each claim open to correction.

There is no separate email or contact form. Feedback runs through GitHub, in the open, where the change and the reason for it stay attached to the file they touch.

## Fix a page directly

Book pages other than the home page have a "Suggest a change to this page" link in the footer. The link opens GitHub's edit view for that file under `content/`. Make the change and propose it as a pull request. This is the short path for a typo, broken link, or wrong example: one edit, one PR, no local checkout.

*Sources: This repository's `.vitepress/config.mts` at revision `f4efc66`, the edit-link target for book pages; the built home and overview pages, the home-page exception.*

## File an issue

When a fix needs explanation, open an issue. Blank issues are disabled, and the issue chooser offers two forms:

- **Report an error or erratum** for something wrong: a factual mistake, a stale reference, a bad code sample.
- **Suggest an improvement** for a concrete change to a page: a clearer explanation, a missing caveat, a sharper example.

Each form asks which page and what should change, so the report arrives actionable instead of vague.

*Sources: This repository's `.github/ISSUE_TEMPLATE/config.yml`, disabled blank issues and discussion route; `correction.yml` and `suggestion.yml`, the two form names and page fields (revision `f4efc66`).*

## Start a discussion

Not every idea is a specific edit yet. For open questions, disagreements, and "what about X" threads, use [Discussions](https://github.com/intent-engineering-for-coding-agents/book/discussions). That is the place to think out loud before anything hardens into an issue or a PR. Corrections belong in issues. Open-ended argument belongs in Discussions.

## If you open a PR

Prose changes follow the writing conventions in the repo, the same ones the book was drafted under. Two rules catch most contributions: no em dashes, and concrete over abstract. The full guide lives in [`CONTRIBUTING.md`](https://github.com/intent-engineering-for-coding-agents/book/blob/main/.github/CONTRIBUTING.md). Run `npm run docs:build` before pushing, then check any links you changed in the built site.

The practices in this book treat tests and specs as the record of intent. Feedback on the book follows the same mechanism. Change the file and state the reason in the PR or issue. The next reader sees both the edit and its rationale in version control.
