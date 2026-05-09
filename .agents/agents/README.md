# IDE-agnostic agent catalog

This directory defines **four workflow agents** for backbone-judge. Any coding assistant (CLI, IDE plugin, CI bot, or chat UI) can use them by loading the Markdown files here—no vendor-specific configuration required.

Canonical human-readable specs live under [`docs/`](../../docs/). These agent files add **YAML frontmatter**, **skill wiring**, and **handoffs** so tools know what to load and in what order.

## Agents and execution order

| Order | Agent file                                         | Phase                             |
| ----: | -------------------------------------------------- | --------------------------------- |
|     1 | [scope-rule-architect.md](scope-rule-architect.md) | Placement and structure           |
|     2 | [spec-builder.md](spec-builder.md)                 | `docs/features/<feature>/spec.md` |
|     3 | [tdd-red-stage.md](tdd-red-stage.md)               | Failing Vitest tests              |
|     4 | [tdd-green-stage.md](tdd-green-stage.md)           | Minimal implementation            |

Run phases **sequentially** unless the task explicitly skips one (for example, editing an existing spec only).

## Discovery protocol

1. Open this README (or list `.agents/agents/*.md`).
2. Parse the **YAML frontmatter** of the chosen agent (`name`, `description`, `phase`, `order`, skills, contracts).
3. Recursively load each file listed under `required_skills` (paths are relative to the agent file, under [`.agents/skills/`](../skills/)).
4. For each entry under `conditional_skills`, load `skill` only when `when` matches the user request or ticket.
5. Do **not** load skills listed under `out_of_scope_skills_default` unless the task explicitly requires that domain (SEO, Node backends, Angular compiler internals, PR review automation, etc.).

## Skill inventory

All bundled skills are under [`.agents/skills/`](../skills/). Top-level `SKILL.md` files include:

- `angular-developer` — Angular 21 architecture, DI, routing, signals, testing fundamentals
- `vitest` — Vitest APIs, mocking, coverage, filtering
- `tailwind-css-patterns` — Tailwind v4-oriented UI patterns
- `accessibility` — WCAG-focused a11y guidance
- `typescript-advanced-types` — Complex TypeScript typing
- `frontend-design` — High-quality visual design direction
- `reference-signal-forms` — Deep dive for Angular signal-forms **subsystem** (use only when relevant)
- Others (`seo`, `nodejs-*`, `reference-core`, `reference-compiler-cli`, `adev-writing-guide`, `pr_review`) — load only on explicit need

## Project conventions

Stack-specific commands, TypeScript strictness, and formatting rules are in **[`AGENTS.md`](../../AGENTS.md)** at the repository root. Agents should defer to it when this catalog and an older doc disagree (for example, Vitest vs Jest, or Prettier vs ESLint availability).

## Minimal integration examples

**Human or planner:** Paste the agent path and say “Follow this agent.”

**Automation:** Read frontmatter JSON-equivalent, resolve `required_skills` to absolute paths from repo root, append file contents to the system prompt or tool context.

**Handoffs:** Use `handoff_to` in frontmatter and the handoff checklist at the bottom of each agent body to know the next file to load.

## Source mapping

| Agent                | Primary doc                                                |
| -------------------- | ---------------------------------------------------------- |
| scope-rule-architect | [`docs/scope_architect.md`](../../docs/scope_architect.md) |
| spec-builder         | [`docs/spec_builder.md`](../../docs/spec_builder.md)       |
| tdd-red-stage        | [`docs/tdd-red-stage.md`](../../docs/tdd-red-stage.md)     |
| tdd-green-stage      | [`docs/tdd-green-stage.md`](../../docs/tdd-green-stage.md) |
