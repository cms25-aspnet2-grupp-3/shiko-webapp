import { redirect } from "next/navigation";
import AppShellLayout from "@/features/layouts/AppShellLayout";
import { auth } from "../../../auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return <AppShellLayout>{children}</AppShellLayout>;
}
