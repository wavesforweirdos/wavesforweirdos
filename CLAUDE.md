# CLAUDE.md

Instrucciones de proyecto para Claude Code. Este archivo es la fuente de verdad
para construir **wavesforweirdos** — portfolio y CV personal de Marta,
Full Stack / Frontend Developer (Barcelona).

Sigue este documento fase a fase. **No avances a la siguiente fase sin
confirmación explícita del usuario.** Al final de cada fase, resume qué se
hizo y pregunta si continuar.

---

## 1. Objetivo del proyecto

Portfolio + CV personal, construido desde cero, que sirva como:
1. Carta de presentación profesional (experiencia, skills, proyectos reales).
2. **Pieza de portfolio técnico** que demuestre en vivo exactamente las
   habilidades que se buscan en procesos de selección de Frontend actuales:
   JavaScript avanzado, integración de librerías complejas, visualización
   2D/3D, y procesamiento en cliente con buen rendimiento.

No es un sitio de contenido pesado ni un CMS. Es una SPA estática, sin backend,
pero **multi-página**: navegación client-side entre Home, About, listado de
Proyectos y una página de detalle por proyecto (case study), según el diseño
real de Figma (ver sección 3).

---

## 2. Stack tecnológico (y por qué)

| Capa | Tecnología | Motivo |
|---|---|---|
| Framework | **React 19 + Vite** | Rápido en desarrollo, build óptimo, ya dominado |
| Enrutado | **React Router** | El diseño de Figma es multi-página (Home, About, listado de Proyectos, detalle por proyecto) — estándar de facto con React + Vite |
| Estilos | **SCSS** (variables/tokens, sin frameworks de UI) | Control total, demuestra CSS avanzado real |
| Scroll | **Lenis** | Scroll suave performante, sucesor mantenido de Locomotive Scroll |
| Animación 2D | **GSAP + ScrollTrigger** | Estándar de la industria para animación basada en scroll |
| **Visualización 2D/3D** | **Three.js vía React Three Fiber (R3F) + drei** | Requisito explícito de la oferta. Ver sección 5 |
| Contacto | **Formspree** (sin backend) | Evita montar backend innecesario |
| Despliegue | **Vercel o Netlify** | Gratis, deploy automático desde GitHub |
| Contenido | JSON en `src/data/*.json` | Editable sin tocar componentes |

No usar: Next.js (no aporta nada sin SSR real necesario), Redux (estado
demasiado simple para justificarlo), ningún UI kit (Material UI, Chakra...) —
el diseño es a medida.

---

## 3. Sistema de diseño

**Fuente de verdad visual: el archivo de Figma.**
`https://www.figma.com/design/TTxtWMw7tXf1AEAsaYhJsW/wavesforweirdos?m=auto&t=PqHYFrsr16NOmW05-6`

El archivo de Figma (marcado "Ready for dev") contiene el layout definitivo
del sitio: **Home**, **About**, **listado de Proyectos** (con filtros por
categoría y panel de stack técnico) y **página de detalle por proyecto**
(case study a página completa). Es la fuente de verdad para layout, color,
tipografía y comportamiento — **manda Figma** siempre que haya conflicto con
los valores de esta sección. Antes de maquetar cualquier pantalla en la
Fase 3, revisa el frame correspondiente en Figma y extrae medidas exactas
(usa el modo Inspect/Dev Mode si tienes acceso).

Si tienes conectado el MCP de Figma (Dev Mode), pide explícitamente:
*"extrae el contexto de diseño del frame [Home/About/Proyectos/Detalle de
proyecto]"* antes de escribir el CSS de esas pantallas, en vez de asumir
valores.

Estética: **clara, editorial, minimalista**, con textura de grano sutil sobre
el fondo. Un único acento en verde vivo; un lila suave como acento secundario
solo para enlaces inline en texto largo (bio de About). Nav numerada fija
**abajo** (no arriba), como barra de pie persistente en todas las páginas:
`00 home`, `01 about`, `02 e-mail` a la izquierda-centro, `03 github`,
`04 linkedin` al lado; "Barcelona, Catalunya. / marta cruz" a la izquierda,
marca `.mc` (o `.wf`) + un cuadrado negro decorativo a la derecha, y copyright
en la esquina inferior.

```scss
--bg: #f1f0ee;           // gris/blanco roto con grano — APROXIMADO, confirmar hex exacto
--fg: #17181a;            // texto casi negro — APROXIMADO
--fg-dim: #b3b2ae;        // texto secundario/deshabilitado (ítems inactivos) — APROXIMADO
--accent: #1edb64;        // verde vivo, único acento primario — APROXIMADO
--accent-soft: #a9a0ff;   // lila suave, solo enlaces inline en párrafos largos — APROXIMADO
--line: rgba(23, 24, 26, 0.12);

--font-display: TBD, sans-serif;  // grotesk geométrico — falta confirmar nombre exacto con Marta
--font-body: TBD, sans-serif;     // misma familia que display, variando peso
--font-mono: "JetBrains Mono", monospace;  // labels técnicos: nav numerada, ficha EXIF (f/4.0, ISO), lista de stack
```

> Estos valores son una lectura aproximada de capturas de pantalla, no de
> Figma Dev Mode. Antes de darlos por definitivos en la Fase 3, confirma con
> Marta el nombre exacto de la fuente display/body y los hex reales (o
> conéctate al MCP de Figma si está disponible).

Además del layout de página, el sitio incluye un **preloader** de carga
inicial (indicador de progreso 0→100% antes de revelar el contenido).

Reglas no negociables:
- Respeta `prefers-reduced-motion` en TODAS las animaciones (GSAP, Lenis, R3F).
- Foco de teclado visible (`:focus-visible`) en todos los elementos interactivos.
- Mobile-first en el layout; el canvas 3D debe degradar con gracia en móvil
  (ver sección 5).

---

## 4. Estructura de carpetas

```
src/
  data/            # profile.json, skills.json, experience.json, projects.json
  pages/           # Home, About, Projects (listado), ProjectDetail — una ruta = una page
  components/      # un componente = un .jsx + un .scss junto a él (compartidos entre pages)
  hooks/           # useSmoothScroll, useScrollReveal, hooks de R3F
  three/           # escenas y componentes de Three.js/R3F, separados de la UI
  styles/          # tokens.scss, global.scss
```

Contenido SIEMPRE en JSON, nunca hardcodeado en JSX. Antes de escribir
cualquier dato de experiencia/proyectos, comprueba `src/data/*.json` — si
falta algo, pregunta a Marta en vez de inventarlo.

---

## 5. Pieza central: visualización 2D/3D en cliente

Esto es lo más importante para el objetivo de la entrevista. La oferta pide
literalmente: *"componentes de visualización web, gráficos 2D/3D"*,
*"aplicaciones con una carga importante de procesamiento en cliente"*,
*"resolución de problemas de rendimiento"*.

### Qué construir
Un componente `<WaveScene />` en `src/three/`: una malla 3D animada (un plano
con vértices desplazados por una función de ruido/seno, tipo "campo de olas")
usando **React Three Fiber**, colocado como fondo del Hero o como sección
dedicada `06 — Lab`.

Requisitos técnicos concretos que debe cumplir (y que podrás explicar en la
entrevista):
1. **Geometría animada por vértice** (`useFrame` + desplazamiento en el
   vertex shader o vía `BufferAttribute`), no una animación de transform CSS.
2. **Control de rendimiento explícito**: limitar `pixelRatio` (`Math.min(devicePixelRatio, 2)`),
   pausar el render loop cuando la sección no es visible (`IntersectionObserver`
   + pausar `useFrame`), y usar `useMemo`/`useRef` para no recrear geometría
   en cada render.
3. **Degradación en móvil / gama baja**: detectar `navigator.hardwareConcurrency`
   o el ancho de viewport y renderizar una versión con menos vértices, o un
   fallback estático (imagen/CSS) si `prefers-reduced-motion` está activo.
4. **Cleanup correcto**: `dispose()` de geometrías/materiales en el `useEffect`
   de desmontaje, para evitar memory leaks — esto es exactamente
   "resolución de problemas de rendimiento" que pide la oferta.
5. Opcional (si hay tiempo): un segundo mini-demo en Canvas 2D puro (sin
   librería) — por ejemplo, un gráfico de barras animado con datos de
   `skills.json` dibujado directamente con la Canvas API. Esto demuestra
   dominio de gráficos 2D nativos, sin depender de una librería, que es otra
   señal fuerte para este tipo de entrevista.

### Por qué Three.js/R3F y no otra cosa
- Es la librería de facto para 3D en web — cualquier entrevistador técnico la
  reconoce inmediatamente.
- R3F permite integrarlo de forma declarativa en React sin salir del
  paradigma de componentes que ya domina Marta.
- `drei` da helpers (`OrbitControls`, `Text3D`, etc.) para no reinventar lo
  básico.

---

## 6. Fases de construcción (seguir en orden, confirmar entre cada una)

**Fase 0 — Setup**
`npm create vite@latest . -- --template react`, instalar dependencias
(`sass three @react-three/fiber @react-three/drei gsap lenis`), configurar
`.gitignore`, `vercel.json` con cabeceras de seguridad, `.github/dependabot.yml`.
Inicializar el repo con la estrategia de ramas de la sección 7: primer commit
en `master`, crear `develop`, y arrancar la primera rama `feature/setup-proyecto`.
Cada fase siguiente (1 a 6) se trabaja en su propia rama `feature/*` y se
mergea a `develop` con `--no-ff` al terminar.

**Fase 1 — Fundaciones de diseño**
`src/styles/tokens.scss` y `global.scss` con el sistema de la sección 3.
Fuentes vía Google Fonts en `index.html`.

**Fase 2 — Datos**
Rellenar `src/data/*.json` con contenido real (preguntar a Marta por
cualquier dato que falte: fechas exactas, descripciones de proyectos, stack
usado en cada uno).

**Fase 3 — Layout y componentes base**
**Antes de escribir código de esta fase, revisa el archivo de Figma** (sección
3) frame a frame — el diseño es multi-página. Instalar y configurar React
Router. Construir: nav numerada fija (footer persistente en todas las
páginas), página Home, página About (bio + servicios + foto), página de
listado de Proyectos (con filtros por categoría y panel de stack técnico) y
página de detalle por proyecto (case study). Preloader de carga inicial.
Sin animación todavía — que funcione y se vea bien estático primero. Para
cualquier sección que Figma no cubra explícitamente (p. ej. dónde viven
Skills/Experiencia si no tienen pantalla propia), sigue los tokens de la
sección 3 y pregunta a Marta antes de asumir la ubicación.

**Fase 4 — Scroll y animación**
`useSmoothScroll` (Lenis) + `useScrollReveal` (GSAP ScrollTrigger) sobre los
componentes ya construidos.

**Fase 5 — La pieza 2D/3D**
Construir `<WaveScene />` según la sección 5. Esta fase es la más delicada —
ir despacio, medir rendimiento (Chrome DevTools Performance tab) en cada
paso, y no dar la fase por terminada sin comprobar FPS estables en móvil
simulado.

**Fase 6 — Formulario, seguridad y pulido**
Formspree, revisión de accesibilidad (contraste, foco, `alt` en imágenes),
`npm audit`, build de producción y verificación del bundle size.

**Fase 7 — Deploy**
GitHub → Vercel/Netlify → conectar dominio.

---

## 7. Estrategia de ramas (Git flow simplificado)

Un repositorio con una sola rama y commits directos no transmite buenas
prácticas a quien lo revise en un proceso de selección. Usamos un flujo
simple pero real:

```
master        # rama de producción. Solo recibe merges desde develop.
  └─ develop  # rama de integración. Todo el desarrollo parte de aquí.
       ├─ feature/setup-proyecto
       ├─ feature/design-tokens
       ├─ feature/layout-base
       ├─ feature/scroll-animations
       ├─ feature/wave-scene-3d
       ├─ feature/formulario-contacto
       └─ feature/deploy-seguridad
```

Reglas:
- **`master`**: siempre desplegable. Nunca se commitea directamente aquí.
- **`develop`**: rama por defecto para trabajar. Se crea al iniciar el repo
  (`git checkout -b develop`) justo después del primer commit en `master`.
- **`feature/*`**: una rama por fase del documento (sección 8) o por
  funcionalidad concreta. Se crea desde `develop`, se hace merge a `develop`
  al terminar (con `--no-ff` para dejar constancia del merge en el historial:
  `git merge --no-ff feature/nombre`).
- Cuando el proyecto esté listo para desplegarse: merge de `develop` a
  `master`, y tag de versión (`git tag v1.0.0`).
- Nombres de rama en inglés, en minúsculas, con guiones: `feature/algo-asi`.

Al configurar el repo remoto en GitHub, protege `master` (Settings → Branches
→ branch protection rule) para que no se pueda hacer push directo — refuerza
la misma idea de cara a quien audite el repo.

Comandos de referencia para el inicio del proyecto:
```bash
git init
git add -A
git commit -m "chore: scaffold inicial del proyecto"
git branch -M master
git checkout -b develop
git checkout -b feature/setup-proyecto
```

## 8. Convenciones de commits

Commits pequeños y descriptivos, en español, formato:
`tipo: qué se hizo` — ej. `feat: añade WaveScene con R3F`,
`fix: corrige memory leak en dispose de geometría`,
`style: ajusta escala tipográfica del hero`,
`chore: configuración inicial del proyecto`.

Tipos permitidos: `feat`, `fix`, `style`, `refactor`, `chore`, `docs`, `test`.

---

## 9. Qué preguntar a Marta antes de asumir

- Cualquier fecha, cifra o descripción de proyecto que no esté ya en
  `src/data/*.json`.
- Si un cambio de diseño se desvía de la sección 3 (paleta, tipografía).
- Antes de añadir cualquier dependencia nueva no listada en la sección 2.
