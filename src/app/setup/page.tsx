import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Configurar" };

// Se muestra mientras falten las claves de Supabase en .env.local
export default function SetupPage() {
  return (
    <div className="relative flex min-h-svh items-center justify-center p-4">
      <div className="oil-bg" aria-hidden />
      <div className="grain" aria-hidden />
      <Card className="glass w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl">Falta conectar Supabase</CardTitle>
          <CardDescription>
            La app ya corre. Solo le falta la base de datos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            Abrí Claude Code en esta carpeta y escribí{" "}
            <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono">/conectar</code>
          </p>
          <p className="text-muted-foreground">
            O a mano: copiá <code className="font-mono">.env.example</code> a{" "}
            <code className="font-mono">.env.local</code>, pegá la URL y la publishable key
            de tu proyecto (Supabase → Project Settings → API Keys) y reiniciá{" "}
            <code className="font-mono">npm run dev</code>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
