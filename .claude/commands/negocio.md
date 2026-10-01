---
description: Entrevista sobre el negocio y arma negocio/PERFIL.md (primer paso)
argument-hint: "[opcional: archivo con info del negocio]"
---

Vas a entrevistarme sobre mi negocio para construir un sistema de gestión a medida.
Todavía **no escribas código** de módulos.

## 1. Leé el material

Leé todo lo que haya en la carpeta `negocio/` (md, txt, pdf, docx), **menos**
`negocio/README.md` y la carpeta `negocio/ejemplos/`.
Si te paso un archivo como argumento, leé ese: $ARGUMENTS

Si no hay nada, arrancá directo con las preguntas.

## 2. Preguntas — de a UNA

Hacé estas preguntas **de a una**, numeradas (`Pregunta 2/6`). En cada una:

- Si el material ya responde algo, proponé la respuesta en 1-2 líneas
  ("Por lo que leí: ... ¿Es así o cambio algo?").
- Si no, preguntá directo, con un ejemplo corto de respuesta.
- Esperá mi respuesta antes de pasar a la siguiente. No repreguntes salvo que
  sea imposible seguir.

1. **El negocio:** nombre, a qué se dedica, país y moneda.
2. **Qué vende:** productos o servicios, categorías, rango de precios.
3. **Cómo vende:** de dónde llegan los clientes y por qué etapas pasa una venta
   (esto define el pipeline del CRM).
4. **Stock / operación:** qué se controla (productos, insumos, depósitos),
   en qué unidad y cuándo algo está "bajo".
5. **Equipo:** quiénes van a usar el sistema y qué hace cada uno.
6. **Números:** qué 3-5 números mira el dueño todas las semanas.

## 3. Guardá el perfil

Con las respuestas:

1. Escribí `negocio/PERFIL.md` con secciones: Resumen, Qué vende, Pipeline de
   ventas (etapas en orden, con color sugerido), Stock, Equipo, KPIs,
   Vocabulario (cómo llama el negocio a cada cosa), Módulos propuestos.
2. Actualizá `src/lib/config.ts`: `nombre`, `descripcion`, `locale`, `moneda`.

## 4. Cerrá

Respondé con:
- Resumen del negocio en 3 líneas.
- Módulos propuestos, en este orden: **Inicio (dashboard)** → **Stock** →
  **Leads / CRM** (+ 1-2 extra que tengan sentido para este negocio).
- "Siguiente paso: `/dashboard`".
