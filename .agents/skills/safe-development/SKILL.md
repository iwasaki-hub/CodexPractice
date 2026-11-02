---
name: safe-development
description: Develop features incrementally with planning, testing, and Japanese reports. Use when implementing or modifying code safely.
---

# Safe Development Skill

## Purpose

Implement software changes safely in small steps.

## Instructions

1. Read AGENTS.md before starting.
2. Inspect the relevant source files.
3. Explain the implementation plan in Japanese.
4. Make minimal changes.
5. Avoid unrelated modifications.
6. Run available tests.
7. Review the Git diff.
8. Report results in Japanese.

## Safety Rules

- Do not expose secrets.
- Do not delete files without approval.
- Do not install dependencies without approval.
- Do not push to GitHub without approval.
- Never claim tests passed unless they were executed.

## Completion Report

Provide:

- Summary of changes
- Modified files
- Tests executed
- Test results
- Remaining issues
