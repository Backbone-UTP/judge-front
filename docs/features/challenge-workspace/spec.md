# Especificacion del Espacio de Trabajo de Desafios

## Historia de producto

Como estudiante de programacion competitiva, quiero leer un problema de codigo, escribir y probar codigo, y enviar una solucion desde un unico espacio de trabajo para poder resolver desafios rapido sin cambiar de contexto.

## Historias de usuario

### US-01 Estructura base del workspace y layout dividido

Como usuario, quiero un espacio de trabajo de desafio con dos paneles, barra superior fija y pie de acciones para poder ver el problema y el editor de codigo al mismo tiempo.

Criterios de aceptacion:

- [ ] La barra de navegacion superior es visible con la marca del producto y acciones de cuenta.
- [ ] El area principal se divide en panel izquierdo de problema y panel derecho de editor.
- [ ] El area inferior de acciones permanece visible con acciones de Reset Code, Run Code y Submit.
- [ ] El layout soporta desktop como base y degrada a paneles apilados en pantallas estrechas.

Validaciones:

- Prueba de regresion visual para breakpoints de desktop y mobile.
- El orden de tabulacion por teclado va de header a panel izquierdo, luego a panel derecho y finalmente a acciones del footer.

### US-02 Encabezado del problema y metadatos

Como usuario, quiero ver el titulo del problema y metadatos (dificultad, conteo de aceptaciones, engagement, autor) para poder evaluar la complejidad del desafio antes de codificar.

Criterios de aceptacion:

- [ ] El titulo del problema se muestra de forma destacada.
- [ ] La insignia de dificultad usa color y es legible.
- [ ] Las estadisticas (envios/engagement) son visibles y estan formateadas.
- [ ] Se muestra la atribucion del autor.

Validaciones:

- Pruebas unitarias para formato de metadatos y valores de respaldo.
- Revisiones de accesibilidad para contraste de color y etiquetas de insignias.

### US-03 Renderizado del contenido del problema

Como usuario, quiero el enunciado completo con enfasis de codigo inline para entender los requisitos con precision.

Criterios de aceptacion:

- [ ] Los parrafos del enunciado se renderizan preservando la jerarquia.
- [ ] Los tokens de codigo inline (por ejemplo nums, target) usan estilo de codigo.
- [ ] El texto enfatizado aparece en negrita donde corresponde.

Validaciones:

- Prueba unitaria para renderizado de tokens inline.
- Prueba snapshot para bloques de parrafos mixtos de texto + codigo inline.

### US-04 Seccion de ejemplos y restricciones

Como usuario, quiero ejemplos y restricciones en bloques dedicados para derivar correctamente el comportamiento en casos limite.

Criterios de aceptacion:

- [ ] Los bloques de ejemplo muestran lineas de Input y Output.
- [ ] La explicacion del ejemplo aparece cuando exista.
- [ ] La lista de restricciones se muestra con limites numericos con estilo de codigo.
- [ ] El contenido permanece desplazable dentro del panel del problema.

Validaciones:

- Pruebas unitarias para orden de renderizado de la lista y explicacion opcional.
- Prueba DOM que verifique que el panel sigue siendo desplazable con contenido largo.

### US-05 Navegacion de pestanas del panel izquierdo

Como usuario, quiero pestanas de Description, Submissions y Hints para cambiar de contexto del desafio sin salir del workspace.

Criterios de aceptacion:

- [ ] La pestana Description esta activa por defecto.
- [ ] La pestana activa tiene estado visual claro.
- [ ] Al cambiar de pestana se actualiza el estado de vista del contenido del panel izquierdo.

Validaciones:

- Pruebas unitarias para transiciones de estado de pestana activa.
- Prueba de accesibilidad para semantica de pestanas y navegacion con flechas de teclado.

### US-06 Barra de herramientas del editor y selector de lenguaje

Como usuario, quiero elegir lenguaje y acceder a configuraciones del editor para poder codificar con mi runtime preferido.

Criterios de aceptacion:

- [ ] El lenguaje actual se muestra en la barra de herramientas del editor.
- [ ] El menu de lenguaje se abre y actualiza el lenguaje seleccionado.
- [ ] Las acciones utilitarias del editor (por ejemplo controles de settings/fullscreen) estan disponibles.

Validaciones:

- Pruebas unitarias para estado de seleccion de lenguaje y persistencia en el estado de la feature.
- Prueba de contrato para validar que el editor recibe el identificador del lenguaje seleccionado.

### US-07 Superficie del editor de codigo

Como usuario, quiero un editor de codigo con numeros de linea y resaltado de sintaxis para escribir soluciones de forma eficiente.

Criterios de aceptacion:

- [ ] El editor muestra codigo inicial precargado para el lenguaje seleccionado.
- [ ] El gutter de numeros de linea es visible.
- [ ] El cursor y el resaltado de linea actual son visibles.
- [ ] El viewport del editor hace scroll con codigo largo.

Validaciones:

- Prueba de componente para inyeccion de codigo inicial por lenguaje.
- Prueba de interaccion para editar y preservar codigo no guardado en el estado.

### US-08 Pestanas del panel de resultados

Como usuario, quiero pestanas de Test Results y Custom Input para inspeccionar feedback de ejecucion y probar casos personalizados.

Criterios de aceptacion:

- [ ] La pestana Test Results esta disponible y seleccionada por defecto.
- [ ] La pestana Custom Input se puede seleccionar.
- [ ] El estilo de pestana activa es claro y consistente.

Validaciones:

- Pruebas unitarias para estado de seleccion de pestanas del panel inferior.
- Prueba de accesibilidad para roles de pestanas y atributos aria.

### US-09 Flujo de ejecucion de codigo

Como usuario, quiero ejecutar codigo sin enviarlo para iterar de forma segura.

Criterios de aceptacion:

- [ ] Run Code dispara una solicitud de ejecucion sin envio.
- [ ] El estado de la solicitud se refleja en la UI (cargando/deshabilitado mientras ejecuta).
- [ ] Los resultados aparecen en el panel Test Results cuando finaliza la ejecucion.
- [ ] Los errores se muestran de forma accionable.

Validaciones:

- Prueba de servicio para contrato del endpoint de ejecucion y mapeo de errores.
- Prueba de integracion desde contenido del editor hasta renderizado de resultados.

### US-10 Flujo de envio

Como usuario, quiero enviar mi solucion y recibir feedback del veredicto para completar el desafio.

Criterios de aceptacion:

- [ ] Submit dispara una solicitud de envio con codigo actual y lenguaje seleccionado.
- [ ] El boton Submit se deshabilita mientras el envio esta en progreso.
- [ ] El payload del veredicto se renderiza en el area de resultados.
- [ ] El envio no limpia el contenido del editor.

Validaciones:

- Prueba de servicio para contrato del endpoint de envio.
- Prueba de integracion para estados del ciclo de vida de envio.

### US-11 Comportamiento de reset de codigo

Como usuario, quiero una accion de reset para volver rapidamente al codigo inicial.

Criterios de aceptacion:

- [ ] Reset Code restaura la plantilla inicial para el lenguaje seleccionado.
- [ ] Reset no cambia el lenguaje seleccionado.
- [ ] Se muestra confirmacion opcional cuando el codigo diverge de la plantilla inicial.

Validaciones:

- Prueba unitaria para semantica de reset con estado sucio del editor.
- Prueba de interaccion para rutas de confirmar/cancelar.

### US-12 Accesibilidad y uso keyboard-first

Como usuario de teclado, quiero acceso completo por teclado a pestanas, acciones del editor y botones CTA para poder completar el desafio sin mouse.

Criterios de aceptacion:

- [ ] Todos los controles accionables son alcanzables por teclado.
- [ ] Los indicadores de foco son visibles sobre fondos oscuros.
- [ ] La activacion con Enter/Espacio funciona para acciones y cambios de pestana.

Validaciones:

- Aprobacion de prueba de accesibilidad para roles, nombres y orden de foco.
- Checklist manual de recorrido por teclado registrado en notas de QA.

## Ubicacion de alcance y division de arquitectura

Decision de ubicacion: local

Razonamiento:

- Toda la UI y el estado de esta vista son especificos de una sola feature challenge-workspace y deben iniciar en alcance local de feature.
- Promover solo despues de observar reutilizacion:
  - 2+ features consumiendo el mismo componente/servicio => mover a features/shared.
  - Preocupaciones singleton transversales (auth, interceptors, global tokens) => mover a core.

### Rutas de archivos minimas propuestas

- src/app/features/challenge-workspace/challenge-workspace.routes.ts
- src/app/features/challenge-workspace/challenge-workspace.ts
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.ts
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.html
- src/app/features/challenge-workspace/containers/challenge-workspace/challenge-workspace.css
- src/app/features/challenge-workspace/components/challenge-header/challenge-header.ts
- src/app/features/challenge-workspace/components/challenge-tabs/challenge-tabs.ts
- src/app/features/challenge-workspace/components/problem-content/problem-content.ts
- src/app/features/challenge-workspace/components/example-block/example-block.ts
- src/app/features/challenge-workspace/components/constraints-list/constraints-list.ts
- src/app/features/challenge-workspace/components/editor-toolbar/editor-toolbar.ts
- src/app/features/challenge-workspace/components/code-editor/code-editor.ts
- src/app/features/challenge-workspace/components/results-panel/results-panel.ts
- src/app/features/challenge-workspace/components/workspace-actions/workspace-actions.ts
- src/app/features/challenge-workspace/services/challenge-execution.service.ts
- src/app/features/challenge-workspace/state/challenge-workspace.state.ts
- src/app/features/challenge-workspace/types/challenge.types.ts

### Limites de API publica

- Exportar solo la entrada del contenedor y la configuracion de rutas desde la raiz de la feature:
  - src/app/features/challenge-workspace/challenge-workspace.ts
  - src/app/features/challenge-workspace/challenge-workspace.routes.ts
- Mantener privados los detalles de implementacion de la feature:
  - components/*
  - services/*
  - state/*
  - types/* (excepto tipos consumidos explicitamente fuera de la feature)

## Notas tecnicas

- Ubicacion de alcance: local, porque todas las capacidades mapean a una sola feature y aun no existe reutilizacion comprobada.
- Routing: la ruta de la feature debe lazy-load del contenedor challenge-workspace para mantener liviano el app shell.
- Estado: hibrido (signals para estado de UI local y view model, rxjs para flujos async de run/submit y cancelacion).
- Contratos de API:
  - runCode(request: { problemId: string; language: string; sourceCode: string; customInput?: string })
  - submitCode(request: { problemId: string; language: string; sourceCode: string })
  - la forma comun de respuesta debe incluir status, logs, runtime, memory y veredicto opcional.
- Estrategia de pruebas: unit + dom + integration
  - Unit: reducers/signals de estado, helpers de formato, transiciones de pestanas.
  - DOM/component: semantica de pestanas, renderizado de metadatos, estados habilitado/deshabilitado de acciones.
  - Integration: ciclo de vida de run y submit usando respuestas de servicio mockeadas.

## Checklist concreto de siguientes pasos

- [ ] Confirmar este slug de feature: challenge-workspace.
- [ ] Crear archivos esqueleto de la feature bajo src/app/features/challenge-workspace.
- [ ] Implementar US-01 a US-05 (layout + panel de problema) con datos fixture estaticos.
- [ ] Implementar US-06 a US-08 (toolbar/editor/pestanas de resultados) solo con estado local.
- [ ] Agregar servicio de ejecucion de desafios y cablear US-09 a US-11.
- [ ] Agregar pruebas a11y y checks de recorrido por teclado para US-12.
- [ ] Finalizar cableado de rutas y lazy loading en rutas de la app.
