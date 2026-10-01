import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { APP } from "@/lib/config";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: APP.nombre, template: `%s — ${APP.nombre}` },
  description: APP.descripcion,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Aplica la preferencia de fondo (negro/textura) antes de pintar. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('bg-plain')==='1')document.documentElement.classList.add('bg-plain')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
