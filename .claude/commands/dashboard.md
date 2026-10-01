---
description: Construye el Inicio (dashboard) a medida del negocio
---

Construí la pantalla de **Inicio** (`src/app/(app)/page.tsx`) a medida del negocio
de `negocio/PERFIL.md`. Esta pantalla crece: cada módulo que agreguemos después
suma acá sus KPIs.

## Qué tiene que tener

1. **Saludo** con la fecha de hoy (`PageHeader`): "Buen día" / "Buenas tardes"
   según la hora, y la descripción del negocio.
2. **Fila de KPIs** (`StatCard`, grid de 4 en desktop, 2 en mobile) con los
   números que el dueño mira (sección KPIs del perfil). Si el dato depende de
   un módulo que todavía no existe, mostrá `—` y como hint "Se activa con
   <módulo>". No inventes tablas para esto.
3. **Módulos**: grid de tarjetas `glass rounded-2xl` con cada módulo propuesto
   en el perfil (ícono, nombre, 1 línea de qué resuelve). Los que existen
   linkean a su ruta; los que no, se ven atenuados con badge "Próximamente".
4. **Pendientes de hoy**: un panel con `EmptyState` ("Cuando agregues Stock y
   CRM, acá vas a ver lo urgente").

## Reglas

- Server Component. Nada de datos falsos hardcodeados en los KPIs.
- Estructurá el archivo para que sumar un KPI o un panel sea agregar un elemento
  a un array (`const kpis = [...]`, `const modulos = [...]`). Comentá arriba de
  cada array que los módulos nuevos se agregan ahí.
- Mantené la estética (glass, densidad compacta). Verificá en mobile mental:
  nada de anchos fijos.

Al final: `npx tsc --noEmit`, y respondé en 3 líneas. Siguiente paso:
`/modulo-stock`.
