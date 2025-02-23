import type { Metadata } from "next";
import { Suspense } from "react";

import { AppSidebar } from "@/components/app-sidebar";

import AppNavbar from "@/components/app-navbar";
import Providers from "@/components/providers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Next.js Starter App",
  description: "A basic starter for next.js",
};

export default async function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <Providers>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="min-h- flex flex-1 flex-col">
          <AppNavbar />
          <div className="flex min-h-0 flex-1">
            <Suspense>{children}</Suspense>
          </div>
        </main>
      </SidebarProvider>
    </Providers>
  );
}
