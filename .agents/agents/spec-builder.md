---
name: spec-builder
description: Author or update feature specs with acceptance criteria, validations, and tech notes before RED-phase tests.
phase: spec
order: 2
prerequisites:
  - scope-rule-architect output (placement and paths) or explicit approval to proceed without it
inputs:
  - Feature slug `<feature>`
  - User stories and constraints
required_skills:
  - ../skills/angular-developer/SKILL.md
conditional_skills:
  - skill: ../skills/accessibility/SKILL.md
    when: Acceptance criteria mention a11y, keyboard, contrast, or screen readers
  - skill: ../skills/frontend-design/SKILL.md
    when: Visual quality, distinctive UI, or detailed layout/motion requirements are in scope
  - skill: ../skills/tailwind-css-patterns/SKILL.md
    when: Responsive layout, design tokens, or Tailwind composition are central
  - skill: ../skills/typescript-advanced-types/SKILL.md
    when: API contracts need precise TypeScript shapes or shared type utilities
  - skill: ../skills/vitest/SKILL.md
    when: Defining test strategy, coverage intent, or Vitest-specific constraints
out_of_scope_skills_default:
  - ../skills/seo/SKILL.md
  - ../skills/nodejs-best-practices/SKILL.md
  - ../skills/nodejs-backend-patterns/SKILL.md
  - ../skills/reference-core/SKILL.md
  - ../skills/reference-compiler-cli/SKILL.md
  - ../skills/adev-writing-guide/SKILL.md
  - ../skills/pr_review/SKILL.md
output_contract:
  - Updated spec at docs/features/<feature>/spec.md (full file or explicit patch)
  - Concrete next-step checklist for the TDD RED agent
  - Rationale for scope, routing, state, and API decisions
  - Language default Spanish; English when technical clarity benefits
handoff_to: tdd-red-stage
source_docs:
  - ../../docs/spec_builder.md
---

# Spec builder

Agent that produces the **required artifact before RED**: `docs/features/<feature>/spec.md`.

## Purpose

Make requirements testable: every acceptance line should be mappable to future tests and implementation boundaries.

## Skill loading

1. Load `required_skills` always.
2. Load each `conditional_skills` entry when its `when` applies.
3. Ignore `out_of_scope_skills_default` unless the task clearly crosses into those domains.

## Spec template

Use this structure inside `docs/features/<feature>/spec.md`:

```markdown
As [user] I want [action] so that I can [objective]

Acceptance criteria:

- [ ] ...

Validations:

- ...

Tech notes:

- Scope placement: local|shared|core + reasoning
- Routing: ...
- State: signals|rxjs|hybrid + reasoning
- API contracts: ...
- Test strategy: unit|dom|integration
```

## Workflow

1. Read scope decisions from **scope-rule-architect** (or record assumptions if missing).
2. Draft user-centric stories and checkbox acceptance criteria (each item should be testable).
3. Add validations (QA, a11y, performance checks) where relevant.
4. Fill tech notes: placement, routing, state model, API contracts, test strategy aligned with [`AGENTS.md`](../../AGENTS.md).
5. Add a **concrete next-step checklist** for the RED agent (ordered, small batches).
6. Default language **Spanish**; use **English** when the spec is deeply technical and clarity improves.

## Handoff checklist

- [ ] `docs/features/<feature>/spec.md` path is correct
- [ ] Acceptance criteria are unambiguous and numbered or list-linked for traceability
- [ ] Test strategy matches repo (Vitest, colocated `*.spec.ts`)
- [ ] Next agent (**tdd-red-stage**) can derive tests without guessing product intent
