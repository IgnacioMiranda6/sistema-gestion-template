import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Tarjeta de KPI para dashboards: label chico, número grande, detalle opcional.
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon?: LucideIcon;
  tone?: "default" | "good" | "warn" | "bad";
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
          {label}
        </span>
        {Icon && <Icon className="size-4 text-muted-foreground" />}
      </div>
      <div className="mt-2 font-mono text-2xl font-semibold tracking-tight">{value}</div>
      {hint && (
        <div
          className={cn(
            "mt-1 text-xs",
            tone === "good" && "text-emerald-400",
            tone === "warn" && "text-amber-400",
            tone === "bad" && "text-destructive",
            tone === "default" && "text-muted-foreground",
          )}
        >
          {hint}
        </div>
      )}
    </div>
  );
}
