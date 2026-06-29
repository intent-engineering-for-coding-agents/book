# Credits

The full bibliography appears in [References](/appendices/references). This page is attribution-only: intellectual debts, tool precedents, and prior art named in one place.

## Foundational engineering practice

Dave Farley ("Modern Software Engineering", 2021) and Jez Humble ("Continuous Delivery", 2010) are the conceptual anchor for how this book thinks about feedback loops, small batches, and CI discipline. The Farley test shaped the scope discipline here. Does "Modern Software Engineering" have an Operations chapter? No, because ops dissolves into feedback loops.

Michael Nygard coined the Architectural Decision Record in 2011. Every `docs/decisions/` directory in this book and in `iec` is downstream of that post.

Oliver Kopp, Anita Armbruster, and Olaf Zimmermann created the MADR template (2018). The structured, scannable ADR format used throughout is theirs.

Paul Hammant built the canonical reference for trunk-based development at trunkbaseddevelopment.com. The branch discipline and merge cadence running through the Team Workflows topic trace back there.

Alistair Cockburn's walking skeleton pattern ("Crystal Clear", 2004) is the etymological ancestor of the agentic-era `skeleton.md`. Same metaphor, reversed direction.

## Spec-driven development

Fission AI built OpenSpec (openspec.dev), the change-folder framework this book uses end-to-end. `iec` was built with OpenSpec from its first commit.

LeanSpec (lean-spec.dev) articulated the small-spec discipline: match formality to risk. The Why Small? chapter inherits that framing directly.

GitHub's Spec-Kit is the enterprise-scale spec-driven development example this book cites.

Rick Hightower's comparative survey of SDD tools (Spillwave, Feb 2026) is the main map this book uses for current SDD tool comparisons.

## Agent conventions

AgentPatterns.ai named and documented the TOC pattern for AGENTS.md. That framing runs through the Agent Instructions topic.

Andrej Karpathy coined "vibe coding" on February 2, 2025. The Preface's opening argument starts there.

ThoughtWorks Technology Radar Vol 34 (April 2026) named cognitive debt and assessed the SDD tool field as fragmented. A handful of chapters cite it where those two claims matter.

Birgitta Böckeler has written and spoken clearly about agent-assisted software delivery. Several framing decisions in the Agent Instructions topic are downstream of that work.

## Quality and principles

The [.principles project](https://dot-principles.github.io/) is the experiment this book describes in the Quality and Verification topic. The principle catalog for this book is maintained as a companion set against that framework.

## Plain text and diagrams

Mermaid (mermaid.js.org) is the diagram format used throughout. Every diagram in this book is plain text that diffs and renders the same way.

The Write the Docs community's docs-as-code guide is the precedent for the plain-text-as-code practice the Foundation topic extends.

The Plain Text as Code Manifest (github.com/Plain-Text-as-Code) is the author's prior statement of the same philosophy. The Foundation topic is its application to agentic engineering.
