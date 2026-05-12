# Development Guide for ase-book

## Setup

`.claude/commands` and `.claude/skills` are Git symlinks that point into `.agents/`. On Linux and macOS this works automatically after cloning.

On Windows, do this **once before cloning** (or before your first `git checkout`):

1. Enable Developer Mode: Settings → System → For developers → Developer Mode → On
2. `git config --global core.symlinks true`

Without Developer Mode, Git materialises symlinks as plain text stub files instead of real filesystem links.
