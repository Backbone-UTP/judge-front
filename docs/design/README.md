# Diseño de Judge

Referencia visual para los issues de front. Si tu issue tiene una sección **Diseño**, la pantalla que nombra está aquí.

## Ruta rápida

1. Busca la pantalla de tu issue en la tabla de abajo y abre su captura en `screens/`.
2. Si necesitas medidas exactas (espaciados, tamaños, colores), abre `judge.pen` con [pen.dev](https://pen.dev).
3. Usa los tokens de esta página en vez de colores sueltos.

> El diseño es la referencia visual. El comportamiento lo define el issue. Si se contradicen, pregunta en el issue antes de implementar.

## Pantallas

| Captura                                                          | Pantalla en `judge.pen`            | Issues                                            |
| ---------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------- |
| [01-challenge-description](screens/01-challenge-description.png) | `01 - ChallengeView - Description` | Challenge View                                    |
| [02-challenge-submissions](screens/02-challenge-submissions.png) | `02 - ChallengeView - Submissions` | Challenge View                                    |
| [03-challenge-hints](screens/03-challenge-hints.png)             | `03 - ChallengeView - Hints`       | Challenge View                                    |
| [04-challenge-sending](screens/04-challenge-sending.png)         | `04 - ChallengeView - Sending`     | Challenge View                                    |
| [05-challenge-results](screens/05-challenge-results.png)         | `05 - ChallengeView - Results`     | Challenge View                                    |
| [06-problems](screens/06-problems.png)                           | `06 - Problems`                    | Lista de ejercicios                               |
| [07-leaderboard](screens/07-leaderboard.png)                     | `07 - Leaderboard`                 | Leaderboard                                       |
| [08-profile](screens/08-profile.png)                             | `08 - Profile`                     | Perfil (identidad, racha, insignias, submissions) |
| [09-profile-edit](screens/09-profile-edit.png)                   | `09 - Profile Edit`                | Editar perfil                                     |
| [10-login](screens/10-login.png)                                 | `10 - Login`                       | Login con Google                                  |
| [11-login-error](screens/11-login-error.png)                     | `11 - Login - Error`               | Login con Google (error)                          |
| [app-header](screens/app-header.png)                             | componente `App Header`            | App shell                                         |
| [avatar-menu](screens/avatar-menu.png)                           | componente `Avatar Menu`           | App shell                                         |

Todas las pantallas son desktop a 1280 px. Mobile se resuelve en CSS y se valida en el PR.

## Reglas de progreso y competencia

Aplican a la lista de ejercicios, el leaderboard y el perfil.

| Tema        | Regla                                                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Puntos      | Solo el primer `Accepted` de cada problema suma: Easy 10, Medium 25, Hard 50. Desbloquear pistas descuenta puntos.                                                    |
| Racha       | Un día cuenta si tiene al menos un `Accepted`, en hora `America/Bogota`. No hay freeze.                                                                               |
| Temporadas  | Las define un maintainer (semestre, competencia, festividad). Pueden estar activas varias a la vez. Todos participan. Solo suman los `Accepted` dentro de su ventana. |
| Insignias   | Permanentes: primer Accepted, 10/50/100 resueltos, primer Hard, rachas de 7/30/100 días. De temporada: Top 1, Top 3, Top 10 al cierre, y Participante.                |
| Leaderboard | Pestañas Temporada (por defecto, la activa más reciente) e Histórico. Filtros por universidad y grupo. Top 50 más tu posición.                                        |
| Privacidad  | El perfil solo lo ve su dueño. Lo único público es lo del leaderboard: posición, avatar, nombre, grupo, puntos y resueltos.                                           |
| Perfil      | Se edita nombre, universidad y grupo (estos dos desde listas cerradas). La foto viene de Google.                                                                      |
| Lista       | Búsqueda por título, filtros de dificultad y estado (Resuelto / Intentado / Pendiente), paginación de 20.                                                             |

## Tokens

| Token            | Valor     | Uso                                      |
| ---------------- | --------- | ---------------------------------------- |
| `bg`             | `#0a0a0a` | Fondo de página y editor                 |
| `surface`        | `#1e1e1e` | Paneles y tarjetas                       |
| `surface-raised` | `#262626` | Header, encabezados de tabla, tab activa |
| `border`         | `#333333` | Bordes y separadores                     |
| `text-strong`    | `#ffffff` | Títulos y datos principales              |
| `text`           | `#e0e0e0` | Texto normal                             |
| `text-muted`     | `#a3a3a3` | Texto secundario                         |
| `text-subtle`    | `#525252` | Placeholders y texto deshabilitado       |
| `accent`         | `#fac738` | Acción principal, Medium, racha, puntos  |
| `success`        | `#10b981` | Accepted, Easy                           |
| `error`          | `#ef4444` | Errores, Hard                            |

Tipografía: **Inter** para la interfaz y **JetBrains Mono** para código y números (puntos, posiciones, contadores). Iconos: [Lucide](https://lucide.dev).

## Cambiar el diseño

1. Edita `judge.pen` en pen.dev.
2. Vuelve a exportar las pantallas que cambiaste a `screens/`, con el mismo nombre de archivo.
3. Abre un PR `docs/design-<cambio>` con el `.pen` y las capturas juntos.
