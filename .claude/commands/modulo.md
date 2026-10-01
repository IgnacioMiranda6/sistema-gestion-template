---
description: Agrega un módulo nuevo a medida (ej. /modulo pedidos, /modulo turnos)
argument-hint: "<qué módulo querés>"
---

Agregá un módulo nuevo al sistema: **$ARGUMENTS**

Basate en `negocio/PERFIL.md` y seguí exactamente el mismo patrón que los
módulos existentes (mirá `src/app/(app)/stock/` o `src/app/(app)/leads/` si
existen):

1. Tablas con el MCP de Supabase (`apply_migration`) + RLS + grants + datos de
   ejemplo realistas + tipos.
2. Pantalla en `src/app/(app)/<modulo>/`: `PageHeader` + 3-4 `StatCard` +
   tabla o kanban en `glass rounded-2xl` + diálogo para crear + `Sheet` para
   ver/editar. Server Actions + `toast`.
3. Ítem en `nav-config.ts` en el grupo que corresponda.
4. Sus KPIs en el Inicio.

Si el pedido es ambiguo, decidí lo más simple que sirva al negocio y seguí.
Al final: `npx tsc --noEmit` y respondé en 3 líneas.
