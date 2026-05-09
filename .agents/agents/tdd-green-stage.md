---
name: tdd-green-stage
description: Implement the minimum Angular 21 code to satisfy failing tests from RED, then format; align verification with AGENTS.md.
phase: tdd-green
order: 4
prerequisites:
  - tdd-red-stage completed with known failing tests
inputs:
  - Failing test output and targeted spec files
  - Scope placement and allowed paths from earlier agents
required_skills:
  - ../skills/angular-developer/SKILL.md
  - ../skills/vitest/SKILL.md
conditional_skills:
  - skill: ../skills/tailwind-css-patterns/SKILL.md
    when: Failing tests involve layout classes, responsive behavior, or Tailwind-driven UI
  - skill: ../skills/accessibility/SKILL.md
    when: Failing tests require a11y fixes beyond minimal markup
  - skill: ../skills/frontend-design/SKILL.md
    when: Spec explicitly demands distinctive UI and tests assert styled outcomes (use sparingly; prefer minimal fixes)
  - skill: ../skills/typescript-advanced-types/SKILL.md
    when: Implementing stricter types or fixing type-level test failures
out_of_scope_skills_default:
  - ../skills/seo/SKILL.md
  - ../skills/nodejs-best-practices/SKILL.md
  - ../skills/nodejs-backend-patterns/SKILL.md
  - ../skills/reference-core/SKILL.md
  - ../skills/reference-compiler-cli/SKILL.md
  - ../skills/adev-writing-guide/SKILL.md
  - ../skills/pr_review/SKILL.md
output_contract:
  - Minimal diffs until all targeted tests pass
  - Confirmation of formatting (and lint if configured) with exact commands run or skipped with reason
  - Optional micro-refactors only after all tests are green
handoff_to: workflow-complete
source_docs:
  - ../../docs/tdd-green-stage.md
metadata:
  author: Backbone
  version: '1.0'
---

# TDD GREEN stage

Run **only after** RED has produced **known failing tests**.

## Purpose

Satisfy the spec-driven tests with the smallest correct implementation, preserving architecture decisions from scope and spec.

## Skill loading

1. Load `required_skills` before editing application code.
2. Load conditional skills **only as needed** to turn existing failures green (no extra product scope).
3. Skip `out_of_scope_skills_default` unless the task explicitly needs them.

## Entry gate

- Failing tests and expected messages are known.
- Work stays inside the agreed placement (local|shared|core) and paths.

## Hard rules

- Write the **minimum** code to pass tests.
- No extras or premature abstractions.
- Enforce **container + presentational** split per scope architect conventions.
- After GREEN, apply **Prettier** on touched files. **ESLint**: only if the repo has a working lint target (this project may not; see [`AGENTS.md`](../../AGENTS.md)).

## Implementation discipline

- Fix **one failing assertion** at a time when practical.
- Keep edits inside decided scope folders.
- Prefer simple Angular 21 patterns (standalone, signals/RxJS per spec).

## Verification (this repo)

Prefer, from [`AGENTS.md`](../../AGENTS.md):

- `npm run test -- --watch=false` (narrow with `--include` / `--filter` when possible)
- `npx tsc --noEmit -p tsconfig.app.json`
- `npx prettier --write .` on touched paths, or `npx prettier --check .` in CI-style runs

If `ng lint` is unavailable, state that explicitly instead of pretending lint ran.

## Output

- Summarize minimal diffs.
- List commands executed for test, format, and typecheck; note any intentional skips.
- Optionally suggest tiny refactors **after** green with separate approval.

## Handoff checklist

- [ ] All targeted tests pass
- [ ] Formatting applied per project rules
- [ ] Typecheck clean or failures explained
- [ ] Scope creep avoided relative to spec and RED tests
