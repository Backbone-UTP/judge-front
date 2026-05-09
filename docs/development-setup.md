# Guía de desarrollo local y MCP

Esta guía ayuda a configurar el entorno para contribuir al proyecto y a habilitar los servidores MCP **a nivel de proyecto** (versionados en el repositorio).

## Requisitos previos

- **Git**
- **Node.js** compatible con el proyecto (usa una versión LTS reciente; el `package.json` declara `npm@11.7.0` como gestor esperado).
- **npm** (viene con Node o según la versión indicada en `packageManager` del `package.json`).
- Editor con soporte MCP:
  - **Cursor**, o
  - **VS Code** (con soporte MCP / Copilot según la documentación de tu versión).
- Cuenta **Figma** (para OAuth del MCP remoto).
- Cuenta **GitHub** y un **Personal Access Token (PAT)** con los permisos necesarios para las operaciones que quieras hacer vía MCP (issues, PRs, repos, etc.). Crea el token en [GitHub → Settings → Developer settings → Tokens](https://github.com/settings/tokens).

**Importante:** no subas nunca tokens reales al repositorio. En VS Code el PAT se pide por input; en Cursor, GitHub MCP se configura fuera del JSON del proyecto (UI o `~/.cursor/mcp.json`).

## Clonar e instalar dependencias

Desde la raíz del repositorio (`judge-front`):

```bash
npm install
```

## Ejecutar la aplicación en local

```bash
npm run start
```

Abre el navegador en `http://localhost:4200/`. El servidor recarga al cambiar los archivos fuente.

Otros comandos útiles:

| Objetivo                         | Comando                                 |
| -------------------------------- | --------------------------------------- |
| Build producción                 | `npm run build`                         |
| Build en modo watch (desarrollo) | `npm run watch`                         |
| Tests (una vez, sin watch)       | `npm run test -- --watch=false`         |
| Tests en watch                   | `npm run test`                          |
| Type-check sin emitir JS         | `npx tsc --noEmit -p tsconfig.app.json` |
| Comprobar formato (Prettier)     | `npx prettier --check .`                |
| Formatear con Prettier           | `npx prettier --write .`                |

**Lint:** no hay target `lint` configurado en `angular.json`; `ng lint` puede fallar por falta de proyecto lint. Para más convenciones del repo, consulta [`AGENTS.md`](../AGENTS.md).

## MCP a nivel proyecto

Este repo define MCP compartidos en dos sitios según el editor:

| Editor  | Archivo                                   | Formato                 |
| ------- | ----------------------------------------- | ----------------------- |
| Cursor  | [`.cursor/mcp.json`](../.cursor/mcp.json) | clave raíz `mcpServers` |
| VS Code | [`.vscode/mcp.json`](../.vscode/mcp.json) | clave raíz `servers`    |

En **Cursor**, el archivo versionado incluye solo servidores que **no** llevan secretos (Figma OAuth en el cliente y Angular CLI por `npx`). **GitHub MCP no está en `.cursor/mcp.json`** para evitar placeholders con PAT que puedan acabar en un commit por error; configúralo por UI o en configuración global fuera del repo (ver abajo).

Tras clonar, abre la carpeta del proyecto en el editor y revisa **Tools & MCP** (Cursor) o la configuración MCP del workspace (VS Code). Reinicia el editor si los servidores no aparecen.

### Cursor: añadir MCP desde la UI (sin editar JSON del proyecto)

1. Abre **Cursor Settings**: **Ctrl+Shift+J** (Windows/Linux) o **Cmd+Shift+J** (macOS).
2. Entra en **Tools & MCP**.
3. Desde ahí puedes **añadir servidores** del marketplace, usar flujos guiados o **editar** un servidor existente (icono de lápiz) para pegar URL, cabeceras u opciones **solo en tu máquina** (no en el JSON del repositorio si no lo tocas).

Si necesitas GitHub MCP sin tocar el proyecto: usa el botón **Install** / deep link de la [guía oficial de instalación en Cursor](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-cursor.md) y completa el PAT **en el flujo del cliente**. También puedes definir el servidor en **`~/.cursor/mcp.json`** (global, normalmente no versionado), donde Cursor fusiona configuración con la del proyecto.

### Figma MCP (servidor remoto recomendado)

- URL del servidor remoto: `https://mcp.figma.com/mcp`
- En **VS Code**, la configuración del workspace incluye `type: "http"` y esa URL.
- En **Cursor**, se usa el campo `url` del servidor `figma`.
- Completa el flujo **OAuth / Allow access** cuando el cliente lo solicite.

Referencias oficiales:

- [Figma — Remote server installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
- [Cursor + Figma](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server)

Opcional en Cursor: plugin Figma (`/add-plugin figma` en el chat del agente), que puede incluir skills y reglas adicionales.

### Angular CLI & Docs MCP

Ejecuta el servidor MCP del Angular CLI vía `npx`, alineado con la documentación oficial:

- [Angular CLI MCP](https://angular.dev/ai/mcp)

Herramientas útiles por defecto (entre otras): `list_projects`, `get_best_practices`, `search_documentation`. Opciones adicionales del comando `ng mcp` (por ejemplo `--read-only`, `--experimental-tool`) se pueden añadir como argumentos extra en `args` si el equipo las adopta.

### GitHub MCP (servidor remoto recomendado)

- URL: `https://api.githubcopilot.com/mcp/`
- Requiere **Cursor ≥ 0.48.0** para Streamable HTTP según la guía oficial del servidor.
- El servidor remoto actualmente usa **Bearer token** con tu PAT en el header `Authorization`.

**Cursor:**

- **No** está en [`.cursor/mcp.json`](../.cursor/mcp.json) del repo: así no hay placeholders con PAT que puedan subirse por accidente.
- Añádelo con **Tools & MCP** (UI) o con el deep link de la [guía de instalación en Cursor](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-cursor.md). Introduce el PAT **solo** en el cliente (formulario / configuración que Cursor guarda fuera del proyecto).
- Alternativa: define `github` en **`~/.cursor/mcp.json`** personal; sigue sin ir al repositorio.

**VS Code** ([`.vscode/mcp.json`](../.vscode/mcp.json)):

- El PAT se solicita como **input** (`promptString` con `password: true`) al usar el servidor; no queda guardado en el JSON del repo.

Guías y configuración avanzada:

- [Instalar GitHub MCP en Cursor](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-cursor.md)
- [Configuración del servidor](https://github.com/github/github-mcp-server/blob/main/docs/server-configuration.md) (toolsets, read-only, headers, etc.)

### Comprobar que MCP funciona

1. Reinicia el editor por completo tras cambiar la configuración.
2. En Cursor: **Settings → Tools & MCP** y estado del servidor (punto verde).
3. En el chat/composer, revisa herramientas disponibles.
4. Prueba un prompt simple (por ejemplo listar repositorios con GitHub MCP o buscar en la documentación de Angular con el MCP del CLI).

### Solución de problemas MCP

- **Logs MCP:** en Cursor, panel Output → **MCP Logs**.
- **GitHub Streamable HTTP:** actualiza Cursor si falla la conexión HTTP al servidor remoto.
- **Tokens:** verifica scopes del PAT y que no haya expirado.

## Referencias internas

- Convenciones y comandos para agentes: [`AGENTS.md`](../AGENTS.md)
