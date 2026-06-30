# Feedback & Contributing

A book about externalizing intent should make its own intent easy to correct. This one is plain text in a public repo, so every page is a file you can edit and every claim is one you can argue with.

There is no separate email or contact form. Feedback runs through GitHub, in the open, where the change and the reason for it stay attached to the file they touch.

## Fix a page directly

Every page has a "Suggest a change to this page" link in its footer. The link opens the GitHub edit view for that exact file under `content/`. Make the change, and GitHub walks you through opening a pull request. This is the short path for a typo, a broken link, or a wrong example: one edit, one PR, no local checkout.

## File an issue

When a fix needs explanation, open an issue. Blank issues are off, so you land on one of two forms:

- **Report an error or erratum** for something wrong: a factual mistake, a stale reference, a bad code sample.
- **Suggest an improvement** for a concrete change to a page: a clearer explanation, a missing caveat, a sharper example.

Each form asks which page and what should change, so the report arrives actionable instead of vague.

## Start a discussion

Not every idea is a specific edit yet. For open questions, disagreements, and "what about X" threads, use [Discussions](https://github.com/intent-engineering-for-coding-agents/book/discussions). That is the place to think out loud before anything hardens into an issue or a PR. Corrections belong in issues. Open-ended argument belongs in Discussions.

## If you open a PR

Prose changes follow the writing conventions in the repo, the same ones the book was drafted under. Two rules catch most contributions: no em dashes, and concrete over abstract. The full guide lives in [`CONTRIBUTING.md`](https://github.com/intent-engineering-for-coding-agents/book/blob/main/.github/CONTRIBUTING.md). Run `npm run docs:build` before pushing to confirm the site still builds with no broken links.

The practices in this book treat tests and specs as the record of intent. Feedback on the book follows the same mechanism. Change the file, state the reason in the PR or issue, and the next reader can inspect both the edit and the rationale in the version control.
