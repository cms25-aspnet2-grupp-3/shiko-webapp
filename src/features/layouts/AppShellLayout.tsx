"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

type AppShellLayoutProps = Readonly<{
  children: React.ReactNode;
  gapClassName?: string;
  outerPaddingClassName?: string;
}>;

export default function AppShellLayout({
  children,
  gapClassName = "gap-8",
  outerPaddingClassName = "p-4",
}: AppShellLayoutProps) {

  const [open, setOpen] = useState(true);

  return (
    <div className={`grid ${outerPaddingClassName} ${gapClassName}`}>

      {/* Top row */}
      <div className={`grid ${gapClassName} grid-cols-1 lg:grid-cols-[370px_minmax(0,_1fr)]`}>
        <div className="rounded-2xl p-8 bg-white">
          <TopBar onToggle={() => setOpen(!open)} />
        </div>

        <div className="rounded-2xl bg-white">
          <Header />
        </div>
      </div>

      {/* Bottom row */}
      <div
        className={`grid ${gapClassName} grid-cols-1 ${
          open
            ? "lg:grid-cols-[370px_minmax(0,_1fr)]"
            : "lg:grid-cols-[0px_minmax(0,_1fr)]"
        } transition-all duration-300 ease-in-out overflow-hidden`}
      >

        {/* Sidebar */}
        <aside
          className={`rounded-2xl p-8 self-start bg-white 
          transform transition-all duration-300 ease-in-out delay-75
          ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
        >
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="transition-all duration-300 ease-in-out">
          {children}
        </main>

      </div>
    </div>
  );
}