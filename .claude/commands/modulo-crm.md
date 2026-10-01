---
description: Módulo de Leads / CRM con pipeline kanban (drag & drop)
---

Construí el módulo **Leads** (CRM) para el negocio de `negocio/PERFIL.md`.
Las etapas del pipeline salen de la sección "Pipeline de ventas" del perfil
(en orden, con sus colores). Siempre terminá con `ganado` y `perdido`.

## 1. Base de datos (MCP de Supabase → `apply_migration`)

- `leads`: nombre, empresa, email, telefono, origen (text: ej. Instagram,
  WhatsApp, Referido, Web), etapa (text con check de las etapas del perfil),
  valor_estimado numeric(12,2), responsable text, proximo_paso text,
  proximo_paso_fecha date, orden integer default 0, created_at, updated_at.
- `lead_notas`: lead_id (fk, on delete cascade), texto, created_at.
- RLS + policy "equipo" + grants (ver CLAUDE.md).
- Datos de ejemplo: 20-25 leads realistas del rubro repartidos en todas las
  etapas, algunos con próximo paso vencido, 1-3 notas en varios.
- Tipos → `src/lib/database.types.ts`.

## 2. Pantalla `src/app/(app)/leads/`

- `PageHeader` "Leads" + botón **Nuevo lead** + toggle **Pipeline / Lista**
  (searchParam `?vista=`).
- Fila de 4 `StatCard`: pipeline abierto (suma valor_estimado sin
  ganado/perdido), leads nuevos esta semana, tasa de conversión
  (ganados / cerrados), próximos pasos vencidos (tono `bad` si > 0).
- **Vista Pipeline**: `KanbanBoard` de `@/components/kanban/kanban-board`. Una
  columna por etapa con punto de color, cantidad y total en `formatMoney`.
  Card compacta (`glass rounded-xl p-3`): nombre, empresa, valor (mono),
  origen como badge, fecha de próximo paso (roja si venció). Al soltar en otra
  columna → Server Action que actualiza `etapa` y `orden`, con update optimista
  y `toast`.
- **Vista Lista**: tabla en `glass rounded-2xl` ordenada por próximo paso.
- Click en un lead → `Sheet` con datos editables, cambio de etapa y notas
  (agregar nota + historial).
- Ítem en `nav-config.ts`: grupo "Ventas", label "Leads", ícono `Target`.

## 3. Inicio

En `src/app/(app)/page.tsx`: activá los KPIs de ventas (pipeline abierto,
conversión) y reemplazá "Pendientes de hoy" por la lista real de próximos pasos
vencidos o de hoy (leads) + productos con stock bajo (si existe Stock).

Al final: `npx tsc --noEmit` y respondé en 3 líneas. Siguiente: `/deploy`.
