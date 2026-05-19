import { auth } from "@/auth";
import AppShellClient from "@/features/layouts/AppShellClient";
import type { MenuItem } from "@/components/Sidebar";

type AppShellLayoutProps = Readonly<{
  children: React.ReactNode;
  gapClassName?: string;
  outerPaddingClassName?: string;
}>;

type SidebarResponse = {
  menu?: MenuItem[];
  general?: MenuItem[];
};

async function getSidebarLinks(): Promise<{ menu: MenuItem[]; general: MenuItem[] }> {
  try {
    const response = await fetch(
      "https://shikosidebar-mike.azurewebsites.net/api/sidebar",
      {
        cache: "no-store",
      },
    );
    if (!response.ok) {
      return { menu: [], general: [] };
    }

    const data = (await response.json()) as SidebarResponse;
    return {
      menu: Array.isArray(data.menu) ? data.menu : [],
      general: Array.isArray(data.general) ? data.general : [],
    };
  } catch {
    return { menu: [], general: [] };
  }
}

export default async function AppShellLayout({
  children,
  gapClassName = "gap-8",
  outerPaddingClassName = "p-4",
}: AppShellLayoutProps) {
  const session = await auth();
  const { menu, general } = await getSidebarLinks();

  return (
    <AppShellClient
      gapClassName={gapClassName}
      outerPaddingClassName={outerPaddingClassName}
      session={session}
      menu={menu}
      general={general}
    >
      {children}
    </AppShellClient>
  );
}
