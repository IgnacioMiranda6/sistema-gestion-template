---
description: Publica la app en Vercel (con las claves de Supabase)
---

Publicá la app en Vercel con la CLI. Pasos, en orden:

1. `npx tsc --noEmit` y `npm run build`. Si falla, arreglalo antes de seguir.
2. `vercel whoami`. Si no está instalada o no hay sesión, frená y decí:
   `npm i -g vercel` y `vercel login` (lo hace la persona, no vos).
3. Git: si no hay repo, `git init`. Commit de todo con mensaje
   "Sistema de gestión: <módulos>". (`.env.local` no se sube: ya está en
   `.gitignore`.)
4. `vercel link --yes` (crea el proyecto con el nombre de la carpeta).
5. Cargá las 2 variables de `.env.local` en **production** y **preview**:
   `printf '%s' "<valor>" | vercel env add <NOMBRE> production` (y lo mismo con
   `preview`). Si ya existen, salteá.
6. `vercel --prod --yes`. Tomá la URL final.
7. Respondé corto:
   - URL de producción.
   - Recordatorio: Supabase → Authentication → URL Configuration → poné esa
     URL como **Site URL**.
   - Para instalarla en el escritorio: abrí la URL en Chrome → ícono de
     "Instalar" en la barra de direcciones.
