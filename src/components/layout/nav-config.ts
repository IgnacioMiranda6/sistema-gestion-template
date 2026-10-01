import { Home, type LucideIcon } from "lucide-react";

// Menú lateral. Cada módulo nuevo agrega su ítem acá (y nada más:
// el sidebar de desktop y el menú mobile leen esta misma lista).
export type NavItem = { href: string; label: string; icon: LucideIcon };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "General",
    items: [{ href: "/", label: "Inicio", icon: Home }],
  },
];
