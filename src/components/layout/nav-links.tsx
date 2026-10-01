"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navGroups } from "./nav-config";

// Lista de navegación compartida por el sidebar (desktop) y el Sheet (mobile).
export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  // Gana el href más específico: "/stock" no queda activo en "/stock/movimientos"
  // si ese tiene su propio ítem.
  const activeHref = navGroups
    .flatMap((g) => g.items.map((i) => i.href))
    .filter((h) => (h === "/" ? pathname === "/" : pathname === h || pathname.startsWith(`${h}/`)))
    .sort((a, b) => b.length - a.length)[0];

  return (
    <nav className="flex flex-1 flex-col gap-0.5 p-3">
      {navGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-0.5">
          <h3 className="px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
            {group.label}
          </h3>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                item.href === activeHref
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
