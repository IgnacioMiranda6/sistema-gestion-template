"use client";

import { useId, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  type CollisionDetection,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

// Board genérico: lo usan el módulo de tareas y (fase 2) el pipeline del CRM.

export type KanbanItem = { id: string };

export type KanbanColumnDef<T extends KanbanItem> = {
  id: string;
  title: string;
  color?: string;
  items: T[];
  // "grid" = cards compactas en cuadrícula (ej. videos subidos/virales).
  layout?: "list" | "grid";
  // Ancho de la columna; default w-72. Útil para columnas grid más anchas.
  width?: string;
};

export function KanbanBoard<T extends KanbanItem>({
  columns,
  renderCard,
  renderColumnHeader,
  onMove,
  collisionDetection = closestCorners,
}: {
  columns: KanbanColumnDef<T>[];
  /**
   * Cómo se decide sobre qué columna se soltó. Por defecto, por esquinas.
   *
   * Por esquinas falla cuando las columnas tienen alturas muy distintas:
   * con una columna de 80 tarjetas y otras vacías, al llevar una tarjeta de
   * abajo hacia el costado, las esquinas más cercanas siguen siendo las de
   * sus vecinas, y el tablero cree que se soltó en la misma columna.
   */
  collisionDetection?: CollisionDetection;
  renderCard: (item: T, dragging: boolean) => React.ReactNode;
  renderColumnHeader?: (column: KanbanColumnDef<T>) => React.ReactNode;
  onMove: (itemId: string, toColumnId: string, toIndex: number) => void;
}) {
  // Copia local para feedback visual durante el drag; se resincroniza con props.
  const [cols, setCols] = useState(columns);
  const [activeItem, setActiveItem] = useState<T | null>(null);

  // Si cambian las columnas desde afuera (ej. revalidación), resincronizamos.
  const [prevColumns, setPrevColumns] = useState(columns);
  if (columns !== prevColumns) {
    setPrevColumns(columns);
    setCols(columns);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // id estable (coincide server/cliente) para los aria-* de dnd-kit;
  // evita el hydration mismatch de "DndDescribedBy-N".
  const dndContextId = useId();

  function findColumn(id: string): KanbanColumnDef<T> | undefined {
    if (id.startsWith("col:")) {
      return cols.find((c) => c.id === id.slice(4));
    }
    return cols.find((c) => c.items.some((i) => i.id === id));
  }

  function handleDragStart(event: DragStartEvent) {
    const col = findColumn(String(event.active.id));
    setActiveItem(col?.items.find((i) => i.id === event.active.id) ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const fromCol = findColumn(String(active.id));
    const toCol = findColumn(String(over.id));
    if (!fromCol || !toCol || fromCol.id === toCol.id) return;

    setCols((prev) => {
      const item = fromCol.items.find((i) => i.id === active.id);
      if (!item) return prev;
      const overIndex = toCol.items.findIndex((i) => i.id === over.id);
      const insertAt = overIndex >= 0 ? overIndex : toCol.items.length;
      return prev.map((c) => {
        if (c.id === fromCol.id) {
          return { ...c, items: c.items.filter((i) => i.id !== active.id) };
        }
        if (c.id === toCol.id) {
          const items = [...c.items];
          items.splice(insertAt, 0, item);
          return { ...c, items };
        }
        return c;
      });
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveItem(null);
    if (!over) {
      setCols(columns);
      return;
    }

    const toCol = findColumn(String(over.id));
    if (!toCol) {
      setCols(columns);
      return;
    }

    let toIndex: number;
    if (String(over.id).startsWith("col:")) {
      toIndex = toCol.items.length;
    } else {
      toIndex = toCol.items.findIndex((i) => i.id === over.id);
      if (toIndex < 0) toIndex = toCol.items.length;
    }

    // Reorden dentro de la misma columna (el estado local aún no lo refleja)
    const fromIndex = toCol.items.findIndex((i) => i.id === active.id);
    if (fromIndex >= 0 && fromIndex !== toIndex) {
      setCols((prev) =>
        prev.map((c) => {
          if (c.id !== toCol.id) return c;
          const items = [...c.items];
          const [moved] = items.splice(fromIndex, 1);
          items.splice(toIndex, 0, moved);
          return { ...c, items };
        })
      );
    }

    onMove(String(active.id), toCol.id, toIndex);
  }

  return (
    <DndContext
      id={dndContextId}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full gap-4 overflow-x-auto pb-4">
        {cols.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            renderCard={renderCard}
            renderColumnHeader={renderColumnHeader}
          />
        ))}
      </div>
      <DragOverlay>
        {activeItem ? (
          <div className="rotate-2 opacity-90">{renderCard(activeItem, true)}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function KanbanColumn<T extends KanbanItem>({
  column,
  renderCard,
  renderColumnHeader,
}: {
  column: KanbanColumnDef<T>;
  renderCard: (item: T, dragging: boolean) => React.ReactNode;
  renderColumnHeader?: (column: KanbanColumnDef<T>) => React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `col:${column.id}` });
  const isGrid = column.layout === "grid";

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col rounded-2xl border border-white/10 bg-white/5 dark:bg-white/[0.03]",
        column.width ?? "w-72"
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        {renderColumnHeader ? (
          renderColumnHeader(column)
        ) : (
          <>
            {column.color && (
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: column.color }}
              />
            )}
            <span className="text-sm font-medium">{column.title}</span>
            <span className="text-xs text-muted-foreground">
              {column.items.length}
            </span>
          </>
        )}
      </div>
      <SortableContext
        items={column.items.map((i) => i.id)}
        strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={cn(
            "min-h-24 flex-1 p-2 pt-0 transition-colors",
            isGrid ? "grid grid-cols-3 gap-1.5 content-start" : "flex flex-col gap-2",
            isOver && "bg-accent/40"
          )}
        >
          {column.items.map((item) => (
            <SortableCard key={item.id} item={item} renderCard={renderCard} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableCard<T extends KanbanItem>({
  item,
  renderCard,
}: {
  item: T;
  renderCard: (item: T, dragging: boolean) => React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(isDragging && "opacity-40")}
      {...attributes}
      {...listeners}
    >
      {renderCard(item, isDragging)}
    </div>
  );
}
