import type { MetadataRoute } from "next";
import { APP } from "@/lib/config";

// Hace la app instalable en el escritorio (PWA) desde Chrome o Edge:
// ícono de "Instalar" en la barra de direcciones. Se sirve en /manifest.webmanifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP.nombre,
    short_name: APP.nombre,
    description: APP.descripcion,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#0b0b0f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
