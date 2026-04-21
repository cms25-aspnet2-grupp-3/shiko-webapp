type AppShellLayoutProps = Readonly<{
  children: React.ReactNode;
  gapClassName?: string;
  outerPaddingClassName?: string;
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  sidebar?: React.ReactNode;
}>;

export default function AppShellLayout({
  children,
  gapClassName = "gap-8",
  outerPaddingClassName = "p-4",
  topLeft = "Logo",
  topRight = "Search task...",
  sidebar = "Sidebar",
}: AppShellLayoutProps) {
  return (
    <div className={`grid ${outerPaddingClassName} ${gapClassName}`}>
      <div
        className={`grid ${gapClassName} grid-cols-1 lg:grid-cols-[370px_minmax(0,_1fr)]`}
      >
        <div className="rounded rounded-2xl p-8 bg-white">{topLeft}</div>
        <div className="rounded rounded-2xl p-8 bg-white">{topRight}</div>
      </div>

      <div
        className={`grid ${gapClassName} grid-cols-1 lg:grid-cols-[370px_minmax(0,_1fr)]`}
      >
        <aside className="rounded-2xl p-8 self-start bg-white">{sidebar}</aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
