---
description: Conecta la app con tu proyecto de Supabase (escribe .env.local)
---

Conectá esta app con Supabase usando el MCP de Supabase. Pasos:

1. Si las herramientas del MCP de Supabase no están disponibles, frená y explicá en
   3 líneas cómo conectarlo: claude.ai → Configuración → Conectores → Supabase →
   Conectar, y después reiniciar Claude Code. No sigas sin el MCP.
2. Listá los proyectos (`list_projects`).
   - Si hay uno solo, usalo.
   - Si hay varios, preguntá cuál con las opciones (nombre + región).
   - Si no hay ninguno, decí: "Creá un proyecto en supabase.com/dashboard (región
     São Paulo) y volvé a correr /conectar". No lo crees vos.
3. Traé la URL (`get_project_url`) y la publishable key (`get_publishable_keys`;
   si no hay publishable, la anon).
4. Escribí `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
   ```
5. Respondé corto:
   - Conectado a <proyecto>.
   - Reiniciá `npm run dev` y abrí http://localhost:3000 → creá tu usuario.
   - Recordatorio: en Supabase → Authentication → Sign In / Providers → Email,
     desactivá **Confirm email** para no tener que confirmar por mail en la demo.
