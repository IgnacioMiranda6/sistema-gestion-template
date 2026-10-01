import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { APP } from "@/lib/config";

// Pantalla de inicio. El comando /dashboard la reemplaza por el panel real.
export default function HomePage() {
  return (
    <>
      <PageHeader title="Inicio" description={APP.descripcion} />
      <EmptyState
        icon={Sparkles}
        title="Tu sistema empieza acá"
        description="Abrí Claude Code en esta carpeta y escribí /negocio. Te va a hacer unas preguntas y va a construir los módulos a medida."
      />
    </>
  );
}
