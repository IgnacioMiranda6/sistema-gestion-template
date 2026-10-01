"use client";

import { useEffect, useState } from "react";
import { Sparkles, SquareDashedBottom } from "lucide-react";
import { Button } from "@/components/ui/button";

// Deja al usuario elegir entre el fondo con textura (óleo) y negro puro.
// La preferencia se guarda en localStorage y se aplica en <html> con .bg-plain.
export function BackgroundToggle() {
  const [plain, setPlain] = useState(false);

  useEffect(() => {
    // La preferencia vive en <html> (la pone un script antes de pintar).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlain(document.documentElement.classList.contains("bg-plain"));
  }, []);

  function toggle() {
    const next = !plain;
    setPlain(next);
    document.documentElement.classList.toggle("bg-plain", next);
    try {
      localStorage.setItem("bg-plain", next ? "1" : "0");
    } catch {}
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      title={plain ? "Volver al fondo con textura" : "Fondo negro"}
      aria-label="Cambiar fondo"
      className="text-muted-foreground hover:text-foreground"
    >
      {plain ? (
        <Sparkles className="size-4" />
      ) : (
        <SquareDashedBottom className="size-4" />
      )}
    </Button>
  );
}
