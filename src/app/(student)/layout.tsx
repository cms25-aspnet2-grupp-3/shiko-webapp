import AppShellLayout from "@/features/layouts/AppShellLayout";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShellLayout>{children}</AppShellLayout>;
}