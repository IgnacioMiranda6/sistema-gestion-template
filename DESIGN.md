# Atom — Sistema de Diseño

Estética heredada de **Atom Hub** (el sistema interno de Atom). Ya viene
aplicada en este template: fuente de verdad `src/app/globals.css`.
Este documento explica las reglas para que todo lo nuevo se vea igual.

Stack base: **Next.js 16 (App Router) + Tailwind v4 + shadcn/ui**.

---

## 1. Filosofía

**"Liquid glass de Apple sobre un óleo en movimiento."** Oscuro por defecto,
el contenido manda, el movimiento es sutil y siempre respeta
`prefers-reduced-motion`.

- **Apple HIG / Liquid Glass** → paneles de vidrio muy transparentes que
  **refractan y magnifican** el fondo (no un blur plano); highlight especular.
- **Emil Kowalski (microinteracciones)** → los controles se "sienten": los
  botones se hunden al presionar, transiciones con easings expresivos.
- **Densidad tipo Linear / Notion** → información compacta, jerarquía clara,
  headers de sección chicos, tipografía del sistema.

Principios:
1. **Oscuro por defecto** (con toggle claro disponible).
2. **Contenido sobre cromo**: el vidrio y el fondo nunca compiten con el texto.
3. **Movimiento con propósito** y apagable.
4. **Un solo lenguaje**: todo panel es `.glass`, todo radio sale de `--radius`,
   todo color sale de las CSS vars.

---

## 2. Fundaciones

### Color (OKLCH + CSS vars, dark por defecto)

Todo el color vive en variables CSS en **OKLCH** (mejor interpolación y control
de luminosidad). Hay set claro (`:root`) y oscuro (`.dark`); **el default es
oscuro** (`ThemeProvider attribute="class" defaultTheme="dark"`).

Tokens y valores clave del tema **oscuro**:

```css
--background: oklch(0.08 0.005 270);   /* casi negro, leve azul */
--foreground: oklch(0.985 0 0);        /* casi blanco */
--card:       oklch(1 0 0 / 0.1);      /* blanco al 10% (translúcido) */
--muted-foreground: oklch(0.72 0.01 270);
--primary:    oklch(0.985 0 0);        /* botón sólido = blanco sobre oscuro */
--destructive:oklch(0.704 0.191 22.216);
--border:     oklch(1 0 0 / 12%);
--input:      oklch(1 0 0 / 15%);
--ring:       oklch(0.75 0 0);
```

Regla: **no hardcodear colores** en componentes; usar las utilidades de Tailwind
que mapean a estas vars (`bg-card`, `text-muted-foreground`, `border-border`,
`bg-primary`, etc.). Para acentos puntuales, blancos con alpha
(`bg-white/5`, `bg-white/10`) o el color de dato (chips/estados).

### Tipografía

```css
--font-sans:    "SF Pro Display", "SF Pro Text", -apple-system,
                BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, sans-serif;
--font-mono:    ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace;
--font-heading: "SF Pro Display", -apple-system, system-ui, sans-serif;
```

Fuente del sistema de Apple (SF Pro) con fallback a `system-ui` — cero peso de
red, se ve nativo en Mac/iOS. Patrones de uso:

- **Títulos de página**: `text-2xl font-semibold tracking-tight`.
- **Headers de sección** (chiquitos, tipo Notion): `text-[11px] font-medium
  uppercase tracking-wider text-muted-foreground/70`.
- **Metadatos / números / IDs**: `font-mono` (ej. `ATOM-12`, horas, tokens).
- Cuerpo: `text-sm`, muted con `text-muted-foreground`.

### Radius

```css
--radius: 1.15rem;   /* generoso, estilo Apple */
/* escala derivada: sm .6 · md .8 · lg 1 · xl 1.4 · 2xl 1.8 · 3xl 2.2 · 4xl 2.6 */
```

Paneles y tarjetas: `rounded-2xl`. Chips/botones chicos: `rounded-lg`.

### Espaciado / densidad

Compacto: `gap-0.5` en listas de nav, `gap-2`–`gap-4` entre bloques, padding de
paneles `p-3`–`p-6` (`md:p-6`). El aire lo da el fondo, no los márgenes enormes.

### Motion

```css
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);     /* salidas expresivas */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
```

- **Feedback de pulsación** (Emil): `button:not(:disabled):active { transform: scale(0.98) }`.
- Transiciones de hover/estado con `transition-colors` / `transition-transform`.
- **Reduce-motion**: el fondo animado y los filtros pesados se apagan con
  `@media (prefers-reduced-motion: reduce)`.

---

## 3. Liquid Glass (el sello) 🫧

Utilidades `.glass` y `.glass-strong` — variante **CLEAR** (muy transparente).
El truco: el **blur + refracción** van en un `::before` (`z-index:-1`) para no
degradar el texto; el panel solo aporta tinte, borde y highlight especular.

```css
:root { /* (dark) */
  --glass-bg:        oklch(1 0 0 / 0.08);
  --glass-bg-strong: oklch(1 0 0 / 0.14);
  --glass-border:    oklch(1 0 0 / 0.18);
  --glass-highlight: oklch(1 0 0 / 0.3);
  --glass-shadow: inset 0 1px 0 var(--glass-highlight),
                  inset 0 0 0 1px oklch(1 0 0 / 0.03),
                  0 14px 48px oklch(0 0 0 / 0.5);
}

@utility glass {
  position: relative; isolation: isolate;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}
@utility glass-strong { /* igual pero con --glass-bg-strong */ }

.glass::before, .glass-strong::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  border-radius: inherit; pointer-events: none;
  -webkit-backdrop-filter: blur(24px) saturate(1.8) brightness(1.08);
  backdrop-filter: blur(24px) saturate(1.8) brightness(1.08);
}

/* Fallback sin backdrop-filter → panel sólido */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass, .glass-strong { background: var(--popover); }
}
```

Uso:
- **`.glass`** para casi todo (sidebar, header, cards, diálogos).
- **`.glass-strong`** cuando el panel va sobre zonas muy contrastadas y necesita
  más tinte/blur (blur 34px).
- Siempre con `rounded-2xl` para que el highlight siga el borde.

---

## 4. Fondo vivo (óleo en movimiento)

Una imagen horizontal líquida que **ondula** (turbulencia SVG animada) con una
deriva Ken Burns suave, más una viñeta para contraste y un grano sutil que tapa
el banding del JPEG.

```css
.oil-bg {
  position: fixed; inset: -6%; z-index: -10;
  background: url("/textures/liquid.jpg") center / cover no-repeat;
  animation: oil-drift 48s ease-in-out infinite alternate;
  will-change: transform; pointer-events: none;
}
.oil-bg::after {                          /* viñeta radial oscura */
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(120% 120% at 50% 30%,
    transparent 0%, oklch(0.05 0 0 / 0.3) 70%, oklch(0.04 0 0 / 0.55) 100%);
}
.grain {                                  /* ruido fractal, casi invisible */
  position: fixed; inset: 0; z-index: -9; pointer-events: none;
  opacity: 0.05; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,...feTurbulence...");
}
@keyframes oil-drift {
  0%   { transform: scale(1.06) translate3d(-1.5%, -1%, 0); }
  100% { transform: scale(1.14) translate3d(2%, 1.5%, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .oil-bg { animation: none; filter: none; transform: scale(1.06); }
}
```

Se montan **una vez** en el layout, detrás de todo:
```tsx
<div className="oil-bg" aria-hidden />
<div className="grain" aria-hidden />
```
Requiere una textura horizontal en `/public/textures/liquid.jpg` (metálica/óleo).
Tip: subir una imagen **ancha** (se estira ~1.3×) para no pixelar al hacer zoom.

---

## 5. Patrones de componente (sobre shadcn/ui)

- **Sidebar** `.glass m-3 rounded-2xl` con **grupos + headers chicos**; se oculta
  en mobile (`hidden md:flex`) y se reemplaza por un **Sheet** (drawer) con la
  misma navegación. La config de nav vive una sola vez y la comparten ambos.
- **Header** `.glass sticky rounded-2xl` con toggles + menú de usuario.
- **Card**: shadcn `Card` sobre `.glass` / `bg-card`.
- **Kanban** genérico (dnd-kit) reutilizado para tareas y CRM.
- **Badges con punto de color**: `<span className="size-2 rounded-full" style={{backgroundColor}}/>` + label (estados, etapas, calendarios).
- **Avatares** con fallback de iniciales; cuando falta el nombre, `@username`.
- **Toasts**: `sonner` con `richColors`.
- **Estados vacíos**: contenedor `border border-dashed rounded-2xl` centrado con
  ícono `lucide-react` + texto muted.
- **Iconografía**: `lucide-react`, tamaño `size-4` en línea con texto.

---

## 6. Stack de diseño

- **Tailwind v4** (`@theme inline`, `@utility`, `@custom-variant dark`)
- **shadcn/ui** (Radix + Tailwind) — base de componentes
- **tw-animate-css** + **@tailwindcss/typography** (`prose`)
- **next-themes** (dark por defecto, `attribute="class"`)
- **lucide-react** (íconos) · **sonner** (toasts) · **recharts** (gráficos)
- **dnd-kit** (kanban: `src/components/kanban/kanban-board.tsx`)

---

## 7. Checklist para llevar la estética a otro proyecto

1. Copiar los **tokens** (`:root` + `.dark`) y `@theme inline` de `globals.css`
   (color OKLCH, `--radius`, fuentes, eases).
2. Copiar las utilidades **`.glass` / `.glass-strong`** + sus `::before` + el
   fallback `@supports`.
3. Copiar **`.oil-bg`**, **`.grain`**, el keyframe `oil-drift` y montar los dos
   `<div>` en el layout. Poner una textura en `/public/textures/liquid.jpg`.
4. Envolver la app en **`ThemeProvider attribute="class" defaultTheme="dark"`**.
5. Regla de oro: **todo panel = `.glass rounded-2xl`**, **todo color = una var**,
   **botones que se hunden** (`active:scale-.98`), **movimiento apagable**.
