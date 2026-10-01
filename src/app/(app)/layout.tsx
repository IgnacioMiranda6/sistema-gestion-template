import { requireUser } from "@/lib/supabase/server";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import { BackgroundToggle } from "@/components/layout/background-toggle";
import { UserMenu } from "@/components/layout/user-menu";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireUser();

  return (
    <>
      {/* Deja el menú como quedó la última vez antes de pintar (sin parpadeo). */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(localStorage.getItem("app-sidebar")==="collapsed")document.documentElement.dataset.sidebar="collapsed"}catch(e){}`,
        }}
      />
      <div className="oil-bg" aria-hidden />
      <div className="grain" aria-hidden />
      <div className="flex min-h-svh w-full">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="glass sticky top-3 z-20 mx-3 mt-3 flex h-12 items-center gap-2 rounded-2xl px-3">
            <MobileNav />
            <SidebarToggle />
            <div className="ml-auto flex items-center gap-2">
              <BackgroundToggle />
              <UserMenu email={user.email ?? ""} />
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
