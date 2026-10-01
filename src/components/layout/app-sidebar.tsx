"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { APP } from "@/lib/config";
import { useSidebarColapsado } from "./sidebar-store";
import { NavLinks } from "./nav-links";

export function AppSidebar() {
  const colapsado = useSidebarColapsado();

  return (
    <aside
      className={cn(
        "glass sticky top-3 m-3 hidden h-[calc(100svh-1.5rem)] w-56 shrink-0 flex-col rounded-2xl md:flex",
        colapsado && "md:hidden",
      )}
    >
      <div className="flex h-12 items-center px-4">
        <Link href="/" className="truncate text-lg font-semibold tracking-tight">
          {APP.nombre}
        </Link>
      </div>
      <NavLinks />
    </aside>
  );
}
