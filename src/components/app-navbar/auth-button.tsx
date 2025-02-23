"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconBrandGoogle } from "@tabler/icons-react";
import { LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data, status } = useSession();

  if (status === "authenticated") {
    const signOutClick = () =>
      signOut({
        callbackUrl: "/",
      });

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="transition-transform">
            <AvatarImage src={`${data.user?.image}`} />
            <AvatarFallback>{data.user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent aria-label="Profile Actions">
          <DropdownMenuItem key="profile" className="flex flex-col items-start justify-start gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{data.user?.email}</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem key="sign-out" onClick={signOutClick}>
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/profile",
        })
      }
      color="danger"
      variant="ghost"
    >
      <IconBrandGoogle />
      Sign In
    </Button>
  );
}
