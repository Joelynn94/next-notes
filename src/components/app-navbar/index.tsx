"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";

import { IconPackage } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

import AuthButton from "./auth-button";
import { ThemeSwitcher } from "./theme-switcher";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { status } = useSession();

  const menuItems = [
    {
      label: "Home",
      href: "/",
    },
  ];

  if (status === "authenticated") {
    menuItems.push({
      label: "Profile",
      href: "/profile",
    });
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <IconPackage />
          <p className="font-bold text-inherit">Next.js Starter</p>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        <NavigationMenuItem>
          <ThemeSwitcher showLabel />
        </NavigationMenuItem>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={`${item}-${index}`}>
            <NavigationMenuLink className="w-full" href={item.href}>
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <AuthButton minimal={false} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
