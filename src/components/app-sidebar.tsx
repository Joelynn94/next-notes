"use client";

import { Archive, Home, StickyNote } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "All Notes",
    url: "/notes",
    icon: StickyNote,
  },
  {
    title: "Archived Notes",
    url: "/notes/archived",
    icon: Archive,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <g clipPath="url(#clip0_2425_3623)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27.3995 2.15785C26.3677 0.192253 22.9741 0.809653 20.0411 1.59505C7.29135 6.29345 2.78055 15.8415 1.19575 21.5297C1.11735 21.6725 1.06975 21.8363 1.06555 22.0113C0.43835 24.4249 0.35295 26.0335 0.35155 26.0867C0.32775 26.6649 0.77715 27.1535 1.35535 27.1773C1.37075 27.1787 1.38615 27.1787 1.40155 27.1787C1.96015 27.1787 2.42495 26.7377 2.45015 26.1735C2.45715 26.0027 2.52155 24.8281 2.91775 23.0725C6.42895 22.9241 9.96395 21.6165 13.4359 19.1749C13.7075 18.9845 13.8727 18.6765 13.8825 18.3461C13.8923 18.0143 13.7439 17.6979 13.4849 17.4935L11.8833 16.2251L17.1389 15.7099C17.3531 15.6889 17.5547 15.6035 17.7185 15.4635C17.8319 15.3683 20.5073 13.0779 23.0525 10.4081C26.9235 6.34805 28.2633 3.80425 27.3995 2.15785Z"
                    fill="#335CFF"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.1785 25.0801H12.2045C11.6249 25.0801 11.1545 25.5505 11.1545 26.1301C11.1545 26.7097 11.6249 27.1801 12.2045 27.1801H21.1785C21.7581 27.1801 22.2285 26.7097 22.2285 26.1301C22.2285 25.5505 21.7581 25.0801 21.1785 25.0801Z"
                    fill="#335CFF"
                  />
                </g>
              </svg>
              <h3 className="text-3xl font-semibold">Notes</h3>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`block h-full rounded-lg py-2 transition-colors ${
                          isActive
                            ? "bg-app-200 dark:bg-app-800" // Active Note
                            : "hover:bg-app-100 dark:hover:bg-app-800" // Hover
                        }`}
                      >
                        <item.icon className="mr-2 h-5 w-5" />
                        <span>{item.title}</span>
                        {isActive && ( // Conditionally render the arrow
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="ml-auto h-4 w-4" // Position arrow to the right
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m9 18 6-6-6-6"
                            />
                          </svg>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
