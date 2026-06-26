# Intent Engineering for Coding Agents

How humans and coding agents design software together.

This repository holds the VitePress source for the book *Intent Engineering for Coding Agents*, a practical guide for senior developers who already use coding agents in real codebases. The focus is designing source-controlled collaboration so coding agents work from human decisions, not from guesswork.

**Read it online:** https://intent-engineering-for-coding-agents.github.io/book/

## Companion repository

The book has a companion CLI, `iec` (Intent Engineering Checker), at https://github.com/intent-engineering-for-coding-agents/cli. It checks a repo for the conventions the book describes: `AGENTS.md`, ADRs, OpenSpec specs, and test traceability. The book treats it as worked evidence, not a required tool.

## Build locally

The site is built with [VitePress](https://vitepress.dev). Prose lives in `content/` (`srcDir`), and `docs/` is reserved for the repo's own Intent Engineering documentation.

```bash
npm install
npm run docs:dev      # local dev server with hot reload
npm run docs:build    # build to .vitepress/dist/
npm run docs:preview  # preview the production build
```

## Contributing

Feedback and changes run through GitHub. See [`CONTRIBUTING.md`](.github/CONTRIBUTING.md) and the [Feedback & Contributing](content/appendices/feedback.md) page. Every page on the site also has a "Suggest a change to this page" link that opens an edit PR directly.

## License

This project is dual-licensed to fit its two kinds of content:

- **Book prose** (everything under `content/`, excluding fenced code samples) is licensed under [Creative Commons Attribution 4.0 International (CC-BY-4.0)](LICENSE-CONTENT). Share and adapt it with attribution.
- **Code and configuration** (the VitePress config, scripts, build setup, and code samples within the prose) is licensed under [Apache License 2.0](LICENSE).

When in doubt: text is CC-BY-4.0, code is Apache-2.0.
