"use client";
import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function GoogleAuthButton() {
  const { data, status } = useSession();

  if (status === "authenticated") {
    const signOutClick = () =>
      signOut({
        callbackUrl: "/",
      });

    return (
      <Button onClick={signOutClick} variant="outline" className="w-full">
        <GoogleIcon />
        Sign Out
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/profile",
        })
      }
    >
      <GoogleIcon />
      Continue with Google
    </Button>
  );
}
