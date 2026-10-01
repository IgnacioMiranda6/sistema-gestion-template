"use client";

import { useSyncExternalStore } from "react";

/**
 * Estado del menú lateral plegado.
 *
 * Vive en el <html> (data-sidebar) y no en React: un script en el layout lo
 * deja puesto antes de pintar, así al recargar no se ve el menú abierto
 * durante un frame. Los componentes lo leen con useSyncExternalStore, que es
 * la forma correcta de suscribirse a algo que está fuera de React.
 */
export const CLAVE_SIDEBAR = "app-sidebar";
const EVENTO = "app:sidebar";

function subscribe(alCambiar: () => void) {
  window.addEventListener(EVENTO, alCambiar);
  return () => window.removeEventListener(EVENTO, alCambiar);
}

function leerDelDom() {
  return document.documentElement.dataset.sidebar === "collapsed";
}

/** En el servidor siempre abierto: es lo que asume el HTML inicial. */
export function useSidebarColapsado() {
  return useSyncExternalStore(subscribe, leerDelDom, () => false);
}

export function alternarSidebar() {
  const siguiente = !leerDelDom();
  document.documentElement.dataset.sidebar = siguiente ? "collapsed" : "";
  try {
    window.localStorage.setItem(CLAVE_SIDEBAR, siguiente ? "collapsed" : "open");
  } catch {
    // Modo privado o cookies bloqueadas: funciona igual en esta sesión.
  }
  window.dispatchEvent(new Event(EVENTO));
}
