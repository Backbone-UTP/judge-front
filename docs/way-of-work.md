# Way of Work

Cómo llevamos un issue desde "asignado" hasta `main` en `judge-front`. Si sigues esta guía, tu PR se revisa rápido y aprendes algo en cada review.

## Camino rápido

1. Toma un issue asignado a ti y comenta en él que empiezas.
2. Crea tu rama desde `main` actualizado: `git switch main && git pull && git switch -c feat/us-XX-descripcion-corta`.
3. Abre un PR en **borrador (draft)** en cuanto tengas el primer commit. Así se ve tu avance y se detectan choques temprano.
4. Antes de pedir review, corre los checks locales (ver [Checks antes del PR](#checks-antes-del-pr)).
5. Marca el PR como **Ready for review** y asigna al mentor como reviewer.
6. Responde cada comentario: corrígelo o explica por qué no.
7. Con 1 aprobación humana, el mentor hace **squash merge** y se borra la rama.

> Nunca hagas push directo a `main`. Todo entra por PR.

## Reglas de rama y commits

| Tema           | Regla                                                        | Ejemplo                                           |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------- |
| Nombre de rama | `<tipo>/us-XX-descripcion` en minúsculas                     | `feat/us-08-results-tabs`                         |
| Tipos          | `feat`, `fix`, `refactor`, `test`, `docs`, `chore`           | `fix/us-06-toolbar-focus`                         |
| Commits        | [Conventional Commits](https://www.conventionalcommits.org/) | `feat(results-panel): add tab state with signals` |
| Base           | Siempre desde `main` actualizado                             | —                                                 |

## Reglas del PR

- **Un issue por PR.** El cuerpo incluye `Closes #N`.
- **Tamaño:** apunta a menos de ~400 líneas cambiadas. Si crece más, pártelo en PRs encadenados.
- **UI:** agrega captura o GIF del antes/después.
- **Solo archivos del issue.** Nada de archivos del editor (`.code-workspace`, `.vscode/` personal) ni cambios ajenos.
- **Mantén la rama al día:** si `main` avanza, haz rebase o merge de `main` y resuelve conflictos tú.

### Plantilla del cuerpo del PR

```markdown
## Qué hace

<1-3 líneas>

## Cómo probarlo

1. `npm run start`
2. <pasos>

## Fuera de alcance

<lo que este PR NO cubre, a propósito>

## Checks

- [ ] `npx prettier --check <archivos cambiados>`
- [ ] `npx tsc --noEmit -p tsconfig.app.json`
- [ ] `npm run test -- --watch=false`

Closes #N
```

## Checks antes del PR

```bash
git diff --name-only main... | xargs npx prettier --check --ignore-unknown
npx tsc --noEmit -p tsconfig.app.json
npm run test -- --watch=false
```

El CI corre estos mismos tres checks en cada PR y deben pasar antes del merge. Prettier solo revisa los archivos que tocaste: `main` todavía tiene archivos sin formato y se van corrigiendo a medida que cada PR los toca.

Si alguno falla y no sabes por qué, abre igual el PR en draft y pregunta en él. Preguntar no es un problema; esconder un fallo, sí.

## Contratos compartidos: coordina antes de tocar

Estos archivos los usan varios issues a la vez. Si tu issue los modifica, **avisa en el issue antes de escribir código**:

| Archivo                                                           | Por qué es sensible                                                             |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `features/challenge-workspace/types/challenge.types.ts`           | Define tipos que usan todos los componentes (por ejemplo, el tipo de lenguaje). |
| `features/challenge-workspace/state/challenge-workspace.state.ts` | Estado único de la feature. Dos versiones distintas rompen todo.                |
| `features/challenge-workspace/containers/challenge-workspace/*`   | Todos los componentes se integran aquí.                                         |

Regla: **el primer PR que entra a `main` define el contrato.** Los demás hacen rebase y se adaptan; no crean un tipo paralelo.

## Convenciones Angular que más se rompen

| Si necesitas...      | Usa                                                             | No uses                                   |
| -------------------- | --------------------------------------------------------------- | ----------------------------------------- |
| Un servicio          | `@Injectable({ providedIn: 'root' })` en un archivo `.ts`       | `@Component` con `.html`/`.css`           |
| Tipos o interfaces   | Un archivo `.ts` plano en `types/`                              | `ng generate component`                   |
| Estado de la feature | Signals en `state/`                                             | Variables sueltas en el componente        |
| Generar código       | `ng generate service`, `ng generate component` según lo que sea | El generador equivocado y luego renombrar |

El resto de convenciones (formato, TypeScript estricto, tests) está en [`AGENTS.md`](../AGENTS.md).

## Review

### Para quien abre el PR

- La review automática (Codex) es una **primera pasada**, no una aprobación. Atiende sus hallazgos antes de pedir review humana.
- Responde **cada** comentario. Si no estás de acuerdo, explícalo: eso también cuenta.
- No marques una conversación como resuelta si no la corregiste o no te respondieron.

### Para quien revisa

Etiqueta cada comentario para que el autor sepa qué es obligatorio:

| Etiqueta        | Significa                                            |
| --------------- | ---------------------------------------------------- |
| `[bloqueante]`  | Debe corregirse antes del merge.                     |
| `[sugerencia]`  | Mejora opcional; el autor decide.                    |
| `[pregunta]`    | Necesito entender la decisión.                       |
| `[aprendizaje]` | Contexto o concepto para crecer; no requiere cambio. |

## Uso de IA

Puedes usar Copilot, Codex, Cursor o cualquier agente. La condición:

- **Debes entender y poder explicar cada línea** de tu PR. En review se puede preguntar.
- Un PR generado por un agente necesita un **dueño humano** asignado que responda la review.
- Si la IA propone algo fuera del issue, quítalo del PR.

## PRs e issues inactivos

| Situación                      | Qué pasa                                                     |
| ------------------------------ | ------------------------------------------------------------ |
| PR sin actividad por 2 semanas | El mentor pregunta en el PR por el estado.                   |
| PR sin actividad por 4 semanas | Se cierra o se reasigna el issue.                            |
| Issue sin descripción          | No se trabaja hasta que tenga historia, alcance y checklist. |

## Checklist final

- [ ] Rama con nombre correcto, creada desde `main`.
- [ ] PR con `Closes #N`, cómo probarlo y fuera de alcance.
- [ ] Checks locales en verde.
- [ ] Sin archivos ajenos al issue.
- [ ] Contratos compartidos coordinados en el issue.
- [ ] Todos los comentarios respondidos.
