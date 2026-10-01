---
description: Módulo de Stock / inventario con movimientos y alertas
---

Construí el módulo **Stock** para el negocio de `negocio/PERFIL.md`. Usá su
vocabulario (si dice "insumos" o "artículos", usá eso en vez de "productos").

## 1. Base de datos (MCP de Supabase → `apply_migration`)

- `productos`: nombre, sku (único), categoria, unidad (text, ej. "u", "kg"),
  precio numeric(12,2), costo numeric(12,2), stock integer default 0,
  stock_minimo integer default 5, activo boolean default true.
- `movimientos_stock`: producto_id (fk, on delete cascade), tipo
  (`entrada` | `salida` | `ajuste`), cantidad integer > 0, motivo text,
  created_at.
- Trigger: al insertar un movimiento, actualiza `productos.stock`
  (entrada suma, salida resta, ajuste deja el stock en esa cantidad).
  Que nunca quede negativo (si una salida lo dejaría negativo, error con
  mensaje claro).
- RLS + policy "equipo" + grants (ver CLAUDE.md).
- Datos de ejemplo: 15-20 productos reales del rubro, 3-4 con stock bajo,
  30 movimientos repartidos en los últimos 60 días.
- Tipos → `src/lib/database.types.ts`.

## 2. Pantalla `src/app/(app)/stock/`

- `PageHeader` "Stock" + botones **Nuevo producto** y **Registrar movimiento**.
- Fila de 4 `StatCard`: productos activos, unidades totales, valor del
  inventario a costo (`formatMoney`), productos con stock bajo (tono `warn`).
- Tabla en `glass rounded-2xl`: nombre + sku (mono), categoría, stock con barra
  chica vs. mínimo, precio, estado (punto ámbar "Bajo" / verde "OK").
  Buscador por nombre/sku y filtro por categoría (searchParams, sin librerías).
- Click en fila → `Sheet` lateral con datos editables y los últimos 10
  movimientos del producto.
- Diálogos (client components + Server Actions + `toast`): crear/editar
  producto, registrar movimiento (select de producto, tipo, cantidad, motivo).
- Ítem en `nav-config.ts`: grupo "Operación", label "Stock", ícono `Package`.

## 3. Inicio

En `src/app/(app)/page.tsx`: activá los KPIs que dependen de stock (valor de
inventario, stock bajo) y marcá el módulo Stock como disponible.

Al final: `npx tsc --noEmit` y respondé en 3 líneas. Siguiente: `/modulo-crm`.
