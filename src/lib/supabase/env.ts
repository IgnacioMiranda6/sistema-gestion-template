// Las claves vienen de .env.local (local) o de Vercel (producción).
// Aceptamos el nombre nuevo (publishable) y el viejo (anon) para que funcione
// tanto con `vercel env pull` como con la integración Supabase ↔ Vercel.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

export const hasSupabaseEnv = Boolean(SUPABASE_URL && SUPABASE_KEY);
