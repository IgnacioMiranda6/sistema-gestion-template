// Esqueleto que Next muestra al instante en cada navegación mientras el server
// component trae los datos. Sin esto, la pantalla vieja queda congelada ~2s y
// parece colgada. Con esto hay feedback inmediato (percepción de rapidez).
export default function Loading() {
  return (
    <div className="space-y-6" aria-busy>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 animate-pulse rounded-lg bg-white/10" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-white/5" />
        </div>
        <div className="h-9 w-32 animate-pulse rounded-xl bg-white/10" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="glass h-32 animate-pulse rounded-2xl"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
