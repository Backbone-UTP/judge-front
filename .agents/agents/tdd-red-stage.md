---
name: tdd-red-stage
description: Write failing Vitest tests first, prove RED, and map every test to spec acceptance criteria before production code.
phase: tdd-red
order: 3
prerequisites:
  - docs/features/<feature>/spec.md exists with clear acceptance criteria
inputs:
  - Feature spec and scope placement
  - Target files or areas from scope/spec
required_skills:
  - ../skills/vitest/SKILL.md
  - ../skills/angular-developer/SKILL.md
conditional_skills:
  - skill: ../skills/accessibility/SKILL.md
    when: Tests assert roles, labels, focus order, or WCAG-oriented behavior
  - skill: ../skills/typescript-advanced-types/SKILL.md
    when: Type-level tests, contract tests, or strict typing around API facades
out_of_scope_skills_default:
  - ../skills/seo/SKILL.md
  - ../skills/nodejs-best-practices/SKILL.md
  - ../skills/nodejs-backend-patterns/SKILL.md
  - ../skills/reference-core/SKILL.md
  - ../skills/reference-compiler-cli/SKILL.md
  - ../skills/adev-writing-guide/SKILL.md
  - ../skills/pr_review/SKILL.md
  - ../skills/frontend-design/SKILL.md
  - ../skills/tailwind-css-patterns/SKILL.md
output_contract:
  - New or updated src/**/*.spec.ts
  - RED proof naming failing test(s) and expected behavior
  - No production code except the minimum needed for compilation when unavoidable
handoff_to: tdd-green-stage
source_docs:
  - ../../docs/tdd-red-stage.md
metadata:
  author: Backbone
  version: '1.0'
---

# TDD RED stage

Run **before** meaningful production implementation.

## Purpose

Establish a verifiable failing baseline that encodes the spec. GREEN should only turn those failures green, not broaden scope.

## Skill loading

1. Load `required_skills` (Vitest + Angular patterns).
2. Load `conditional_skills` when a11y or advanced typing is part of the test plan.
3. Do not pull design-only skills unless acceptance criteria require visual assertions (prefer behavioral or DOM accessibility queries).

## Hard rules

- Tests first, always.
- At least **one** test must fail to prove RED.
- Every test maps to **acceptance criteria** from the spec. No speculative tests.

## Testing preferences

- Use **Vitest** and **Angular Testing Library** for component DOM tests.
- Prefer accessible queries: `getByRole`, `getByLabelText`, `findBy...`.
- Mock only boundaries: HTTP, router, time, random.

## Coverage intent (new or changed code)

- Services and utilities: strong branch coverage where logic exists.
- Components: loading, empty, error, and disabled states where applicable.

## Commands (this repo)

Run from the monorepo root per [`AGENTS.md`](../../AGENTS.md), for example:

- `npm run test -- --watch=false --include <path-to-spec>`
- `npm run test -- --watch=false --filter "<name>"`

## Workflow

1. Read `docs/features/<feature>/spec.md` and enumerate acceptance IDs or checklist items.
2. Add or extend `*.spec.ts`; each `it(...)` should reference the criterion it covers (comment or test name).
3. Run tests; capture failing output as RED proof.
4. Avoid production edits except minimal stubs/exports if TypeScript otherwise cannot compile tests.

## Handoff checklist

- [ ] Failing test(s) exist and are intentional
- [ ] Traceability from tests to acceptance criteria is explicit
- [ ] **tdd-green-stage** can start from known failing assertions
