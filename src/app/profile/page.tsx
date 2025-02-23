import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getServerSession } from "next-auth";

import SignOutButton from "@/components/sign-out-button";
import options from "@/config/auth";
import requireAuth from "@/utils/require-auth";

export default async function Profile() {
  await requireAuth();
  const session = (await getServerSession(options))!;
  console.log(session);

  return (
    <Card className="w-full">
      <CardContent>
        <h1 className="text-2xl font-bold">Profile</h1>
        <Avatar className="transition-transform">
          <AvatarImage src={`${session.user?.image}`} />
        </Avatar>
        <p>{session.user?.name}</p>
        <p>{session.user?.email}</p>

        <SignOutButton />
      </CardContent>
    </Card>
  );
}
