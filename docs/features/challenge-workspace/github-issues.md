# Challenge Workspace - Issues Individuales

## Issue 01

### Titulo

US-01: Crear shell del Challenge Workspace con route de feature y layout dividido

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: habilitar una experiencia unificada para resolver desafios en una sola pantalla.

### Bloqueantes

- Ninguno.

### Historia de usuario individual

Como usuario, quiero entrar al challenge workspace y ver una pantalla con dos columnas para leer el reto y escribir codigo sin navegar entre vistas separadas.

### Decision de scope

Local (feature).
Razon: layout, route y composicion pertenecen exclusivamente a challenge-workspace.

### Ruta minima propuesta

- src/app/features/challenge-workspace/challenge-workspace.routes.ts
- src/app/features/challenge-workspace/challenge-workspace.ts
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.ts
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.html
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.css
- src/app/app.routes.ts

### Fronteras de API publica

- Exportar solo el entrypoint del feature: `challenge-workspace.ts`.
- Mantener componentes internos como privados al feature.

### Notas tecnicas

- Contenedor standalone con split izquierdo/derecho.
- Header superior persistente y footer de acciones persistente.
- Responsive: desktop en dos columnas, mobile apilado.

### Limitaciones

- Sin logica de negocio en esta issue.
- Sin integraciones de API.

### Checklist

- [ ] Crear route lazy del feature.
- [ ] Crear container `challenge-workspace`.
- [ ] Definir layout de dos columnas.
- [ ] Agregar header y footer persistentes en el shell.
- [ ] Verificar comportamiento responsive.

---

## Issue 02

### Titulo

US-02: Definir contratos de dominio y estado base del workspace

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: normalizar el modelo de datos para Description, Submissions, Hints, Sending y Results.

### Bloqueantes

- Issue 01.

### Historia de usuario individual

Como sistema, quiero tener tipos y estado base consistentes para todas las vistas del challenge workspace y evitar acoplamientos entre UI y datos.

### Decision de scope

Local (feature).
Razon: contratos y estado son especificos del dominio challenge-workspace.

### Ruta minima propuesta

- src/app/features/challenge-workspace/types/challenge.types.ts
- src/app/features/challenge-workspace/state/challenge-workspace.state.ts
- src/app/features/challenge-workspace/shared/challenge.fixture.ts

### Fronteras de API publica

- Exportar desde `types`: `ChallengeDetail`, `ChallengeMeta`, `SubmissionItem`, `HintItem`, `EvaluationProgress`, `CaseResult`, `LanguageId`.
- Exportar desde `state`: selector/escritura minima necesaria para tabs, editor y evaluacion.

### Notas tecnicas

- Estado recomendado: signals para UI state + estado de evaluacion.
- Preparar tipos para casos ocultos/no ocultos en Results.
- Modelar bloqueo de editor durante Sending.

### Limitaciones

- Fixtures locales iniciales.
- Sin persistencia remota en esta etapa.

### Checklist

- [ ] Crear tipos de dominio para las 5 vistas.
- [ ] Crear estado base del feature con signals.
- [ ] Cargar fixture inicial para rendering.
- [ ] Documentar enums/unions de tabs y estados.
- [ ] Agregar pruebas unitarias del estado base.

---

## Issue 03

### Titulo

US-03: Implementar tabs del panel izquierdo (Description, Submissions, Hints)

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: permitir cambiar de contexto sin salir del workspace.

### Bloqueantes

- Issue 01.
- Issue 02.

### Historia de usuario individual

Como usuario, quiero alternar entre Description, Submissions y Hints para consultar toda la informacion del reto mientras sigo codificando.

### Decision de scope

Local (feature).
Razon: navegacion de tabs es estado de UI exclusivo de challenge-workspace.

### Ruta minima propuesta

- src/app/features/challenge-workspace/components/challenge-tabs/challenge-tabs.ts
- src/app/features/challenge-workspace/components/challenge-tabs/challenge-tabs.html
- src/app/features/challenge-workspace/components/challenge-tabs/challenge-tabs.css
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.html
- src/app/features/challenge-workspace/state/challenge-workspace.state.ts

### Fronteras de API publica

- Exponer `LeftPanelTab` desde `challenge.types.ts`.
- `challenge-tabs` expone solo input de tab activa y output de cambio de tab.

### Notas tecnicas

- Semantica ARIA: tablist/tab/tabpanel.
- Flechas izquierda/derecha para navegacion de tabs.
- Contenido de cada tab renderizado por secciones del contenedor.

### Limitaciones

- Sin persistencia de tab entre sesiones.

### Checklist

- [ ] Crear componente de tabs.
- [ ] Integrar tab activa con estado global del feature.
- [ ] Conectar paneles de contenido por tab.
- [ ] Agregar navegacion con teclado.
- [ ] Agregar pruebas unitarias de transicion.

---

## Issue 04

### Titulo

US-04: Implementar vista Description con metadatos, enunciado, ejemplos y constraints

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: permitir comprender completamente el reto antes de enviar solucion.

### Bloqueantes

- Issue 03.
- Issue 02.

### Historia de usuario individual

Como usuario, quiero ver dificultad, submissions globales, aprobaciones globales, autor, descripcion, ejemplos y restricciones para entender el problema con precision.

### Decision de scope

Local (feature).
Razon: contenido y presentacion del problema pertenecen al dominio de challenge-workspace.

### Ruta minima propuesta

- src/app/features/challenge-workspace/components/challenge-header/challenge-header.ts
- src/app/features/challenge-workspace/components/challenge-header/challenge-header.html
- src/app/features/challenge-workspace/components/challenge-header/challenge-header.css
- src/app/features/challenge-workspace/components/problem-content/problem-content.ts
- src/app/features/challenge-workspace/components/problem-content/problem-content.html
- src/app/features/challenge-workspace/components/problem-content/problem-content.css
- src/app/features/challenge-workspace/components/example-block/example-block.ts
- src/app/features/challenge-workspace/components/example-block/example-block.html
- src/app/features/challenge-workspace/components/example-block/example-block.css
- src/app/features/challenge-workspace/components/constraints-list/constraints-list.ts
- src/app/features/challenge-workspace/components/constraints-list/constraints-list.html
- src/app/features/challenge-workspace/components/constraints-list/constraints-list.css
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.html

### Fronteras de API publica

- Componentes presentacionales reciben solo datos tipados por input.
- Ningun componente de Description conoce detalles del editor ni de envio.

### Notas tecnicas

- Soporte de codigo inline y enfasis en enunciado.
- Badge de dificultad por nivel.
- Scroll estable en panel izquierdo para contenido largo.

### Limitaciones

- Sin parser markdown completo.
- Sin i18n completa en esta etapa.

### Checklist

- [ ] Renderizar header con metadatos.
- [ ] Renderizar descripcion del problema.
- [ ] Renderizar lista de ejemplos.
- [ ] Renderizar lista de constraints.
- [ ] Agregar pruebas unitarias/snapshot de rendering.

---

## Issue 05

### Titulo

US-05: Implementar vista Submissions con historial de intentos

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: dar visibilidad del progreso historico del usuario en el reto.

### Bloqueantes

- Issue 03.
- Issue 02.

### Historia de usuario individual

Como usuario, quiero ver mi historial de submissions con estado, runtime, memoria, fecha y casos pasados para decidir el siguiente intento.

### Decision de scope

Local (feature).
Razon: historial de submissions mostrado en challenge-workspace pertenece a esta feature.

### Ruta minima propuesta

- src/app/features/challenge-workspace/components/submissions-list/submissions-list.ts
- src/app/features/challenge-workspace/components/submissions-list/submissions-list.html
- src/app/features/challenge-workspace/components/submissions-list/submissions-list.css
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.html
- src/app/features/challenge-workspace/types/challenge.types.ts

### Fronteras de API publica

- Exponer tipo `SubmissionItem` desde `challenge.types.ts`.
- `submissions-list` solo recibe lista de submissions; no maneja fetch.

### Notas tecnicas

- Mostrar `passedCases/totalCases` con formato consistente.
- Orden por fecha descendente por defecto.
- Estados visuales al menos para `approved`, `rejected`, `runtime-error`.

### Limitaciones

- Sin paginacion inicial.
- Sin detalle de submission individual en esta issue.

### Checklist

- [ ] Crear componente `submissions-list`.
- [ ] Renderizar campos definidos por diseño.
- [ ] Integrar en tab Submissions.
- [ ] Manejar estado vacio (sin submissions).
- [ ] Agregar pruebas unitarias de orden y formato.

---

## Issue 06

### Titulo

US-06: Implementar vista Hints con desbloqueo progresivo

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: ayudar al usuario a avanzar sin revelar toda la solucion de inmediato.

### Bloqueantes

- Issue 03.
- Issue 02.

### Historia de usuario individual

Como usuario, quiero ver reglas de desbloqueo y una lista de pistas bloqueadas/desbloqueadas para decidir cuando consumir ayuda.

### Decision de scope

Local (feature).
Razon: reglas de visualizacion de hints son funcionalidad propia de challenge-workspace.

### Ruta minima propuesta

- src/app/features/challenge-workspace/components/hints-panel/hints-panel.ts
- src/app/features/challenge-workspace/components/hints-panel/hints-panel.html
- src/app/features/challenge-workspace/components/hints-panel/hints-panel.css
- src/app/features/challenge-workspace/state/challenge-workspace.state.ts
- src/app/features/challenge-workspace/types/challenge.types.ts

### Fronteras de API publica

- Exponer tipo `HintItem` con estado `locked|unlocked`.
- `hints-panel` emite accion de desbloqueo sin conocer infraestructura de backend.

### Notas tecnicas

- Mensaje de reglas siempre visible arriba.
- Lista con estados visuales claros de bloqueo/desbloqueo.
- Mantener trazabilidad de pistas ya desbloqueadas.

### Limitaciones

- Sin costo real de desbloqueo en esta fase.
- Sin telemetria avanzada.

### Checklist

- [ ] Crear componente `hints-panel`.
- [ ] Renderizar texto de reglas de desbloqueo.
- [ ] Renderizar lista de hints con estado.
- [ ] Implementar accion de desbloqueo local.
- [ ] Agregar pruebas unitarias de transicion locked/unlocked.

---

## Issue 07

### Titulo

US-07: Implementar panel derecho con editor y selector de lenguaje

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: permitir escribir solucion en el lenguaje elegido.

### Bloqueantes

- Issue 01.
- Issue 02.

### Historia de usuario individual

Como usuario, quiero un editor con selector de lenguaje para escribir y ajustar mi solucion en mi runtime preferido.

### Decision de scope

Local (feature).
Razon: editor y configuracion de lenguaje son parte central del workspace del reto.

### Ruta minima propuesta

- src/app/features/challenge-workspace/components/editor-toolbar/editor-toolbar.ts
- src/app/features/challenge-workspace/components/editor-toolbar/editor-toolbar.html
- src/app/features/challenge-workspace/components/editor-toolbar/editor-toolbar.css
- src/app/features/challenge-workspace/components/code-editor/code-editor.ts
- src/app/features/challenge-workspace/components/code-editor/code-editor.html
- src/app/features/challenge-workspace/components/code-editor/code-editor.css
- src/app/features/challenge-workspace/state/challenge-workspace.state.ts
- src/app/features/challenge-workspace/types/challenge.types.ts

### Fronteras de API publica

- Exponer `LanguageId` en types.
- `editor-toolbar` emite cambio de lenguaje.
- `code-editor` recibe `sourceCode`, `language` y `readonly`.

### Notas tecnicas

- Starter code por lenguaje.
- Sincronizacion bidireccional con estado del feature.
- Preparar `readonly` para flujo Sending.

### Limitaciones

- Sin autocompletado avanzado garantizado.
- Sin ejecucion local dentro del editor.

### Checklist

- [ ] Crear toolbar con selector de lenguaje.
- [ ] Crear componente editor.
- [ ] Cargar starter por lenguaje.
- [ ] Sincronizar cambios de codigo con estado.
- [ ] Agregar pruebas unitarias de seleccion y edicion.

---

## Issue 08

### Titulo

US-08: Implementar acciones del footer (Submit y Reset Code)

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: habilitar acciones principales del flujo de resolucion.

### Bloqueantes

- Issue 07.
- Issue 02.

### Historia de usuario individual

Como usuario, quiero enviar mi solucion y resetear mi codigo para iterar de forma rapida dentro del mismo workspace.

### Decision de scope

Local (feature).
Razon: acciones de submit/reset afectan solo estado del challenge workspace.

### Ruta minima propuesta

- src/app/features/challenge-workspace/components/workspace-actions/workspace-actions.ts
- src/app/features/challenge-workspace/components/workspace-actions/workspace-actions.html
- src/app/features/challenge-workspace/components/workspace-actions/workspace-actions.css
- src/app/features/challenge-workspace/state/challenge-workspace.state.ts
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.html

### Fronteras de API publica

- `workspace-actions` expone eventos: `submit` y `resetCode`.
- La logica de confirmacion/estado vive en state y contenedor, no en componente visual.

### Notas tecnicas

- Reset restaura starter code del lenguaje activo.
- Submit dispara transicion a flujo Sending.
- Deshabilitar acciones cuando corresponda por estado.

### Limitaciones

- Sin confirmacion modal compleja.
- Sin persistencia de borradores remotos.

### Checklist

- [ ] Crear componente de acciones del footer.
- [ ] Conectar boton Submit a estado.
- [ ] Conectar boton Reset Code con confirmacion minima.
- [ ] Deshabilitar acciones durante evaluacion.
- [ ] Agregar pruebas unitarias de submit/reset.

---

## Issue 09

### Titulo

US-09: Implementar Sending Subtab con progreso de evaluacion y bloqueo de editor

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: informar avance del envio y prevenir edicion durante la evaluacion.

### Bloqueantes

- Issue 08.
- Issue 07.
- Issue 02.

### Historia de usuario individual

Como usuario, quiero ver una subtab de Sending con progreso, tiempo transcurrido y estado por test case para entender que mi envio sigue en proceso.

### Decision de scope

Local (feature).
Razon: visualizacion de progreso de submit y bloqueo de editor es funcionalidad del mismo workspace.

### Ruta minima propuesta

- src/app/features/challenge-workspace/components/sending-panel/sending-panel.ts
- src/app/features/challenge-workspace/components/sending-panel/sending-panel.html
- src/app/features/challenge-workspace/components/sending-panel/sending-panel.css
- src/app/features/challenge-workspace/services/challenge-execution.service.ts
- src/app/features/challenge-workspace/state/challenge-workspace.state.ts
- src/app/features/challenge-workspace/components/code-editor/code-editor.ts

### Fronteras de API publica

- Exponer contrato de servicio `submitCode` y stream/resultado de progreso.
- Exponer en estado `evaluationStatus`, `progressPercent`, `elapsedMs`, `caseStatuses`.

### Notas tecnicas

- Subtab inferior expandible en estado `sending`.
- Editor en modo `readonly` mientras `sending=true`.
- Mostrar estado por caso: pending/running/passed/failed.

### Limitaciones

- Sin streaming en tiempo real obligatorio (se permite mock/polling simple).
- Sin reintentos automaticos en esta issue.

### Checklist

- [ ] Crear componente `sending-panel`.
- [ ] Modelar estados de evaluacion en state.
- [ ] Integrar `challenge-execution.service` para submit.
- [ ] Bloquear editor durante envio.
- [ ] Agregar pruebas unitarias/integracion del flujo sending.

---

## Issue 10

### Titulo

US-10: Implementar Results Subtab con detalle de casos evaluados

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: entregar feedback accionable al finalizar la evaluacion.

### Bloqueantes

- Issue 09.

### Historia de usuario individual

Como usuario, quiero ver los resultados por caso con estado, input y outputs esperado/recibido para corregir mi solucion rapidamente.

### Decision de scope

Local (feature).
Razon: detalle de resultados de evaluacion pertenece al dominio del challenge workspace.

### Ruta minima propuesta

- src/app/features/challenge-workspace/components/results-panel/results-panel.ts
- src/app/features/challenge-workspace/components/results-panel/results-panel.html
- src/app/features/challenge-workspace/components/results-panel/results-panel.css
- src/app/features/challenge-workspace/state/challenge-workspace.state.ts
- src/app/features/challenge-workspace/types/challenge.types.ts

### Fronteras de API publica

- Exponer tipo `CaseResult` con `isHidden`.
- `results-panel` recibe lista de casos y summary de veredicto.

### Notas tecnicas

- Reutilizar misma subtab inferior usada por Sending.
- Mostrar `input`, `expectedOutput` y `receivedOutput` solo en casos no ocultos.
- Mostrar estado `approved/rejected` por caso y resumen global.

### Limitaciones

- Sin historial de ejecuciones multiples en esta etapa.
- Sin diff avanzado de output.

### Checklist

- [ ] Crear componente `results-panel`.
- [ ] Renderizar lista de casos y estado.
- [ ] Manejar reglas de casos ocultos.
- [ ] Integrar transicion Sending -> Results.
- [ ] Agregar pruebas unitarias de rendering condicional.

---

## Issue 11

### Titulo

US-11: Garantizar accesibilidad y flujo keyboard-first end-to-end

### Contexto feature/producto

Feature: challenge-workspace.
Objetivo de producto: permitir uso completo del workspace sin mouse y con semantica accesible.

### Bloqueantes

- Issue 04.
- Issue 05.
- Issue 06.
- Issue 09.
- Issue 10.

### Historia de usuario individual

Como usuario de teclado, quiero operar tabs, acciones y subtabs de evaluacion con foco visible y atajos estandar para completar el reto sin barreras.

### Decision de scope

Local (feature), transversal dentro de challenge-workspace.
Razon: la a11y requerida aplica a componentes internos de esta feature.

### Ruta minima propuesta

- src/app/features/challenge-workspace/components/challenge-tabs/challenge-tabs.ts
- src/app/features/challenge-workspace/components/hints-panel/hints-panel.ts
- src/app/features/challenge-workspace/components/submissions-list/submissions-list.ts
- src/app/features/challenge-workspace/components/workspace-actions/workspace-actions.ts
- src/app/features/challenge-workspace/components/sending-panel/sending-panel.ts
- src/app/features/challenge-workspace/components/results-panel/results-panel.ts
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.html
- src/app/features/challenge-workspace/**/*.spec.ts

### Fronteras de API publica

- Mantener contratos de inputs/outputs sin romper para componentes ya implementados.
- Agregar solo atributos ARIA y comportamiento teclado en componentes existentes.

### Notas tecnicas

- Roles y labels accesibles para tabs, subtab y botones.
- Navegacion por teclado: Tab, Enter, Space y flechas en tabs.
- Focus ring visible en todos los elementos interactivos.

### Limitaciones

- Sin auditoria WCAG completa en esta iteracion.
- Requiere checklist manual de QA ademas de pruebas unitarias.

### Checklist

- [ ] Revisar orden de foco completo del layout.
- [ ] Corregir roles/nombres accesibles.
- [ ] Implementar activacion por teclado en controles clave.
- [ ] Agregar pruebas de interaccion teclado.
- [ ] Documentar checklist manual de QA a11y.
