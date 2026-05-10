import AppShellLayout from "@/features/layouts/AppShellLayout";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShellLayout>{children}</AppShellLayout>;
}
