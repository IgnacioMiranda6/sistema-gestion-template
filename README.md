# Sistema de gestión con IA — Template de Atom

Creá el sistema interno de tu negocio (dashboard, stock, CRM con pipeline) en
una hora, hablando con Claude. Sin escribir código.

**Stack:** Next.js 16 · Supabase (base de datos + login) · Vercel (hosting) ·
Claude Code. Estética oscura con *liquid glass*, la misma que usamos en Atom.

```
Vos ──► Claude Code ──► código (esta carpeta) ──► Vercel ──► tu app online
              │                                        │
              └──── MCP ────► Supabase ◄───────────────┘
                         (tablas + login)
```

---

## 0. Antes de empezar (10 min, una sola vez)

| Qué | Dónde | Para qué |
|---|---|---|
| Node.js 20 o más | [nodejs.org](https://nodejs.org) | Correr la app en tu compu |
| Claude Code | [claude.com/claude-code](https://claude.com/claude-code) (app de escritorio) | El que construye |
| Cuenta de GitHub | [github.com](https://github.com) | Guardar tu código |
| Cuenta de Supabase | [supabase.com](https://supabase.com) → *Start your project* (entrá con GitHub) | Base de datos y login |
| Cuenta de Vercel | [vercel.com](https://vercel.com) → *Sign up* con GitHub | Publicar la app |

### Supabase: crear el proyecto

1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
2. Nombre: el de tu negocio. Región: **South America (São Paulo)**. Guardá la
   contraseña de la base en algún lado.
3. Mientras se crea (2 min): **Authentication → Sign In / Providers → Email** →
   desactivá **Confirm email** y guardá. Así no tenés que confirmar mails para
   probar.

### Conectar Supabase con Claude

1. [claude.ai](https://claude.ai) → **Configuración → Conectores** → buscá
   **Supabase** → **Conectar** → autorizá tu organización.
2. Reiniciá Claude Code. Listo: Claude ya puede crear tablas en tu proyecto.

### Vercel: instalar la CLI

```bash
npm i -g vercel
```

```bash
vercel login
```

---

## 1. Copiá este template

Entrá a [github.com/IgnacioMiranda6/sistema-gestion-template](https://github.com/IgnacioMiranda6/sistema-gestion-template) → **Use this template → Create a new repository** (nombralo `mi-sistema`).
Después clonalo (o en Claude Code: *Open folder* → *Clone repository*):

```bash
git clone https://github.com/TU-USUARIO/mi-sistema.git
```

```bash
cd mi-sistema && npm install
```

## 2. Prendé la app

```bash
npm run dev
```

Abrí [localhost:3000](http://localhost:3000). Vas a ver **"Falta conectar
Supabase"**: es normal.

## 3. Construí con Claude

Abrí Claude Code en la carpeta y escribí estos comandos **en orden**:

| Comando | Qué hace | Tiempo aprox. |
|---|---|---|
| `/conectar` | Busca tu proyecto de Supabase y escribe `.env.local` | 1 min |
| `/negocio` | Lee la carpeta `negocio/`, te hace 6 preguntas y arma el perfil | 5 min |
| `/dashboard` | Pantalla de Inicio a medida, con tus KPIs | 4 min |
| `/modulo-stock` | Inventario: productos, movimientos, alertas de stock bajo | 8 min |
| `/modulo-crm` | Leads con pipeline arrastrable (kanban) y notas | 10 min |
| `/modulo <lo que quieras>` | Un módulo extra: pedidos, turnos, proveedores… | 8 min |
| `/deploy` | La publica en Vercel y te da la URL | 3 min |

> **Tip:** antes de `/negocio`, tirá en la carpeta `negocio/` cualquier cosa que
> describa tu negocio (un doc, la lista de precios, notas). Si no tenés nada,
> usá el ejemplo: `/negocio negocio/ejemplos/mates-del-sur.md`

Después de `/conectar`, reiniciá `npm run dev` y creá tu usuario en la pantalla
de login (**¿Primera vez? Crear cuenta**).

## 4. Instalala en el escritorio

Abrí tu URL de Vercel en **Chrome** o **Edge** → ícono de **Instalar** en la
barra de direcciones (o menú ⋮ → *Transmitir, guardar y compartir* → *Instalar
página como app*). Queda con ícono propio en el Dock / menú inicio y se abre en
su propia ventana.

---

## Qué trae el template

- Login con Supabase (email + contraseña) y rutas protegidas.
- Layout con sidebar *liquid glass*, menú mobile, modo claro/oscuro y fondo
  animado (o negro puro).
- Componentes listos: tablas, diálogos, paneles laterales, kanban con drag &
  drop, tarjetas de KPI, gráficos (recharts).
- `CLAUDE.md` con las reglas para que Claude construya rápido y siempre con la
  misma estética. `DESIGN.md` con el sistema de diseño.
- PWA: instalable como app de escritorio.

## Problemas comunes

| Síntoma | Solución |
|---|---|
| "Falta conectar Supabase" después de `/conectar` | Cortá `npm run dev` (Ctrl+C) y volvé a correrlo. |
| Claude dice que no tiene herramientas de Supabase | Conectá el conector en claude.ai y reiniciá Claude Code. |
| Al crear cuenta pide confirmar el mail | Desactivá *Confirm email* en Supabase (paso 0). |
| En Vercel el login no anda | Supabase → Authentication → URL Configuration → *Site URL* = tu URL de Vercel. |
| Algo se rompió | Decile a Claude qué ves: *"en /stock me sale este error: …"*. |

---

Hecho por Atom · Estética basada en Atom Hub.
