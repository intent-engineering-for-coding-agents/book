---
type: appendix
title: Credits
---

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

Rick Hightower's comparative survey of SDD tools (Spillwave, February 2026) is the main map this book uses for current SDD tool comparisons.

## Agent conventions

AgentPatterns.ai named and documented the TOC pattern for AGENTS.md. That framing runs through the Agent Instructions topic.

Andrej Karpathy coined "vibe coding" on February 2, 2025. The Preface's opening argument starts there.

ThoughtWorks Technology Radar Vol 34 (April 2026) named cognitive debt and flagged semantic diffusion across spec-driven development and harness engineering terminology. A handful of chapters cite it where those claims matter.

Birgitta Böckeler has written and spoken clearly about agent-assisted software delivery. Several framing decisions in the Agent Instructions topic are downstream of that work.

## Plain text and diagrams

Mermaid (mermaid.js.org) is the diagram format used throughout. Every diagram in this book is plain text that diffs and renders the same way.

The Write the Docs community's docs-as-code guide is the precedent for the plain-text-as-code practice the Foundation topic extends.

The Plain Text as Code Manifest (github.com/Plain-Text-as-Code) is the author's prior statement of the same philosophy. The Foundation topic is its application to agentic engineering.

## How this book was written

This book was written with the practices it describes, coding agents included. I used agents for the work they are good at: planning the book, the companion CLI repo, and the phases of both; spelling and grammar; cross-checking chapters against each other; removing redundancy; verifying sources; keeping one voice across chapters; sparring on structure and arguments; and refactoring, moving content to the chapter where it belongs. The repo behind the book carries the same setup the book teaches, including review skills that check a single chapter and the whole book, plus a credibility pass that hunts for claims I cannot back, so an untrue statement or a misattributed source gets caught before a reader finds it.

The agents did not decide anything. What the book claims, which practices it recommends, and which sources it trusts are my calls, and every chapter went through my review before it shipped. That is the same rule this book applies to agent-generated code: the agent produces, the author owns.
