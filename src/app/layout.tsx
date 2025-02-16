import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import Providers from "@/components/providers";
import { SidebarProvider } from "@/components/ui/sidebar";

import AppNavbar from "@/components/app-navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Starter App",
  description: "A basic starter for next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        />
      </head>
      <body className="flex h-screen flex-col">
        <Providers>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="min-h- flex flex-1 flex-col">
              <AppNavbar />
              <div className="flex min-h-0 flex-1 overflow-hidden">
                <Suspense>{children}</Suspense>
              </div>
            </main>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
