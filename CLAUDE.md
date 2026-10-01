@AGENTS.md

# Sistema de gestión — guía para Claude

Sistema interno de gestión a medida de un negocio. Next.js 16 + Supabase + Vercel,
con la estética de Atom (oscuro, liquid glass).

**Contexto del negocio:** `negocio/PERFIL.md` (lo genera `/negocio`). Leelo antes de
construir cualquier módulo y usá el vocabulario del negocio en tablas, textos y
datos de ejemplo.

## Cómo trabajar

Este proyecto se usa en clases en vivo: **velocidad > perfección**.

- No preguntes lo que podés decidir vos. Decidí lo razonable y seguí.
  Única excepción: `/negocio`, que es una entrevista.
- Al terminar, respuesta corta: 3-5 líneas con qué hiciste y qué abrir para verlo.
  Sin explicar el código.
- Sin tests, sin Storybook, sin refactors que nadie pidió, sin README nuevos.
- Al terminar cada tarea: `npx tsc --noEmit` y arreglá los errores.
  No corras `npm run build` (salvo en `/deploy`).
- No toques: `src/lib/supabase/*`, `src/proxy.ts`, `src/components/ui/*`,
  `src/app/globals.css`.

## Estructura

- Páginas privadas: `src/app/(app)/<modulo>/page.tsx` (Server Components).
- Un módulo nuevo = carpeta en `src/app/(app)/` + un ítem en
  `src/components/layout/nav-config.ts` (ícono de `lucide-react`). Nada más:
  el sidebar y el menú mobile leen esa lista.
- Cada módulo nuevo **suma sus KPIs al Inicio** (`src/app/(app)/page.tsx`).
- Nombre de la app, moneda y locale: `src/lib/config.ts`.

## Código

- Leer datos (server): `const { supabase } = await requireUser()` de
  `@/lib/supabase/server`.
- Escribir datos: Server Actions en `src/app/(app)/<modulo>/actions.ts`
  (`"use server"`), después `revalidatePath`.
- Interacción (formularios, diálogos, drag): componentes cliente en la carpeta del
  módulo. Feedback con `toast` de `sonner`.
- Formatos: `formatMoney`, `formatNumber`, `formatDate` de `@/lib/format`.
- Gráficos: `recharts`. Pipeline / kanban: `KanbanBoard` de
  `@/components/kanban/kanban-board`.
- Next 16: `params` y `searchParams` son `Promise` (hacé `await`).
  `proxy.ts` reemplaza a `middleware.ts`.

## Base de datos (Supabase)

- Cambios de esquema **siempre con el MCP de Supabase** (`apply_migration`, nombre
  en snake_case). Guardá una copia del SQL en
  `supabase/migrations/<YYYYMMDDHHMMSS>_<nombre>.sql`.
- Si hay más de un proyecto de Supabase, usá el de `NEXT_PUBLIC_SUPABASE_URL` en
  `.env.local` (el id es el subdominio).
- Tablas en español, snake_case, plural. `id uuid primary key default
  gen_random_uuid()`, `created_at timestamptz not null default now()`.
- RLS siempre activo. Sistema interno = todo usuario logueado es del equipo:
  `create policy "equipo" on <tabla> for all to authenticated using (true) with check (true);`
  y `grant select, insert, update, delete on <tabla> to authenticated;`
- Montos `numeric(12,2)`. Estados como `text` con `check (estado in (...))`.
- Después de crear tablas, cargá **datos de ejemplo realistas del negocio**
  (15-25 filas, fechas repartidas en los últimos 60 días) para que se vea vivo.
- Después de cada migración: `generate_typescript_types` del MCP →
  `src/lib/database.types.ts`.

## Diseño (estética Atom — detalle en `DESIGN.md`)

- Oscuro por defecto. **Todo panel = `glass rounded-2xl`**. Nunca fondos sólidos
  blancos o grises.
- Colores solo con variables (`bg-card`, `text-muted-foreground`, `border-border`)
  o blancos con alpha (`bg-white/5`, `bg-white/10`). No hardcodear hex salvo el
  punto de color de un estado.
- Título de página: `<PageHeader>`. KPIs: `<StatCard>`. Vacíos: `<EmptyState>`.
- Tablas: `Table` de shadcn dentro de un `div.glass.rounded-2xl`.
- Headers de sección: `text-[11px] font-medium uppercase tracking-wider
  text-muted-foreground/70`. Números, montos e IDs: `font-mono`.
- Estados y etapas: punto de color + label
  (`<span className="size-2 rounded-full" style={{ backgroundColor }} />`).
- Densidad compacta tipo Linear. Íconos `size-4`. Tiene que verse bien en mobile.
