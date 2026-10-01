"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { alternarSidebar, useSidebarColapsado } from "@/components/layout/sidebar-store";

/** Pliega el menú lateral para trabajar a pantalla completa. Solo desktop:
 *  en mobile el menú ya es un panel que se abre y cierra. */
export function SidebarToggle() {
  const colapsado = useSidebarColapsado();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={alternarSidebar}
      className="hidden md:inline-flex"
      aria-pressed={colapsado}
      title={colapsado ? "Mostrar menú" : "Ocultar menú"}
    >
      {colapsado ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
      <span className="sr-only">{colapsado ? "Mostrar menú" : "Ocultar menú"}</span>
    </Button>
  );
}
