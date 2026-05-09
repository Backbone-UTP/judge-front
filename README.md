# BackboneJudge

Frontend generado con [Angular CLI](https://github.com/angular/angular-cli) 21.2.2 (Angular 21, Vitest, Tailwind CSS v4).

## Onboarding

Para instalación local, MCP (Figma y Angular CLI en el repo; GitHub en Cursor vía UI o config global) y convenciones del repo, lee **[Guía de desarrollo local y MCP](docs/development-setup.md)**.

Resumen rápido desde la raíz del proyecto:

```bash
npm install
npm run start
```

Abre `http://localhost:4200/`. Otros comandos: `npm run build`, `npm run test -- --watch=false`, `npx tsc --noEmit -p tsconfig.app.json`. Detalle en la guía y en [`AGENTS.md`](AGENTS.md).

## Development server

```bash
npm run start
```

Equivalente a `ng serve`. La app recarga al modificar los ficheros fuente.

## Code scaffolding

```bash
ng generate component component-name
```

Lista completa de esquemáticos:

```bash
ng generate --help
```

## Building

```bash
npm run build
```

Los artefactos quedan en `dist/` (build optimizado en modo producción por defecto).

## Running unit tests

Tests con [Vitest](https://vitest.dev/) vía Angular CLI:

```bash
npm run test -- --watch=false
```

Modo watch: `npm run test`.

## Running end-to-end tests

Para e2e, Angular CLI no trae un framework por defecto. De momento no se encuentra en el scope de la v1 de este proyecto:

```bash
ng e2e
```

## Additional Resources

- [Angular CLI Overview](https://angular.dev/tools/cli)
- [Angular CLI MCP](https://angular.dev/ai/mcp)
