export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh items-center justify-center p-4">
      <div className="oil-bg" aria-hidden />
      <div className="grain" aria-hidden />
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
