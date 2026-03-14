# AGENTS.md

Guidance for agentic coding tools in `backbone-judge`.
Stack: Angular 21, TypeScript strict mode, Vitest, Tailwind CSS v4.

## 1) Project Snapshot

- Package manager: `npm` (`npm@11.7.0`).
- Framework: Angular 21 (`@angular/*`).
- Unit test builder: `@angular/build:unit-test`.
- Test runner default: `vitest`.
- App bootstrap: `src/main.ts`.
- Global styles: `src/styles.css`.

## 2) Commands

Run commands from `/home/djkde/development/backbone/backbone-judge`.

### Setup and build

- Install deps: `npm install`
- Dev server: `npm run start` (same as `ng serve`)
- Production build: `npm run build`
- Development watch build: `npm run watch`
- Type-check app (no emit): `npx tsc --noEmit -p tsconfig.app.json`

### Tests

- Run all tests once: `npm run test -- --watch=false`
- Run tests in watch mode: `npm run test`
- Run one test file: `npm run test -- --watch=false --include src/app/app.spec.ts`
- Run subset by regex: `npm run test -- --watch=false --filter "App"`
- List discovered tests only: `npm run test -- --watch=false --list-tests`
- Run with coverage: `npm run test -- --watch=false --coverage`

Single-test guidance:

- Prefer `--include` when targeting a specific `*.spec.ts` file.
- Prefer `--filter` when targeting one `describe`/`it` by name.
- Prefer `--watch=false` for CI or non-interactive agent runs.

### Lint and formatting

- No lint target is configured in `angular.json`.
- `ng lint` currently fails with: `Cannot find "lint" target for the specified project.`
- Format check: `npx prettier --check .`
- Auto-format: `npx prettier --write .`
- If linting is added later, use Angular ESLint (`ng add angular-eslint`).

## 3) Coding Standards

### Formatting rules

- Follow `.editorconfig`: UTF-8, spaces, `indent_size=2`, final newline.
- Trim trailing whitespace except for Markdown files.
- Follow `.prettierrc`: `printWidth=100`, `singleQuote=true`.
- HTML templates are formatted with Prettier Angular parser.

### TypeScript strictness

Treat these compiler options as mandatory:

- `strict`
- `noImplicitOverride`
- `noPropertyAccessFromIndexSignature`
- `noImplicitReturns`
- `noFallthroughCasesInSwitch`
- `isolatedModules`

Type expectations:

- Do not introduce `any` unless absolutely unavoidable.
- Prefer interfaces, union types, utility types, and generics.
- Add explicit types at API/module boundaries when inference is unclear.
- Narrow nullable and optional values before accessing members.
- Ensure all required branches return values.

### Angular architecture conventions

- Prefer standalone components.
- Keep app-level providers in `src/app/app.config.ts`.
- Keep route declarations in `src/app/app.routes.ts`.
- Keep tests colocated as `*.spec.ts` under `src/`.
- Keep bootstrap logic centralized in `src/main.ts`.

### Import conventions

- Import order: Angular/framework, third-party, then local relative.
- Prefer named imports over namespace imports.
- Remove unused imports.
- Match the import style used in nearby files.

### Naming conventions

- Types/classes/components: `PascalCase`.
- Functions/methods/variables: `camelCase`.
- Constants: `camelCase` by default; use `UPPER_SNAKE_CASE` only for true module constants.
- Filenames: Angular-style (`feature.ts`, `feature.spec.ts`, `feature.html`, `feature.css`).
- CSS class names: kebab-case.

### Templates and styles

- Prefer component CSS files over large inline `<style>` blocks.
- Keep templates accessible: semantic HTML, appropriate `aria-*`, keyboard-safe behavior.
- Use Angular template syntax consistently (`@for`, bindings, structural control flow).
- Keep markup and styling maintainable; avoid oversized monolithic templates.

### Error handling

- Fail fast on impossible states.
- Catch errors only to recover or add context.
- Never silently swallow exceptions.
- For top-level runtime boundaries, log actionable error context.
- In async flows, ensure rejections are intentional and testable.

### Testing style

- Use `describe` blocks per unit/feature.
- Use behavior-based names: `it('should ...')`.
- Prefer Arrange-Act-Assert structure.
- Use Angular test utilities (`TestBed`, fixtures) for component tests.
- Keep tests deterministic and avoid fragile timing dependencies.

## 4) Agent Workflow

Before editing:

- Read `angular.json`, `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.spec.json`.
- Read nearby files to match architecture and naming patterns.
- Prefer minimal, targeted changes.

Before finishing:

- Run Prettier check (or write) on touched files.
- Run type-check command.
- Run targeted tests (`--include` and/or `--filter`) for changed code.
- Run full tests if the change scope is broad.
- Report any skipped verification steps explicitly.

## 5) Cursor/Copilot Instruction Files

Repository scan results:

- `.cursorrules`: not present.
- `.cursor/rules/`: not present.
- `.github/copilot-instructions.md`: not present.

If these files are added later, treat them as higher-priority repository-local agent guidance.
