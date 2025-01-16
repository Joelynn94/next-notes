import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getServerSession } from "next-auth";

import options from "@/config/auth";
import requireAuth from "@/utils/require-auth";

export default async function Profile() {
  await requireAuth();
  const session = (await getServerSession(options))!;

  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardContent>
        <Avatar className="transition-transform">
          <AvatarImage src={`${session.user?.image}`} />
          <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
          <p>{session.user?.email}</p>
        </Avatar>
      </CardContent>
    </Card>
  );
}
