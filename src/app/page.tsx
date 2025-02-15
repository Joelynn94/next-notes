import db from "@/db";
import { notes } from "@/db/schema";
import { asc, not } from "drizzle-orm";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const notesResult = await db
    .select()
    .from(notes)
    .where(not(notes.isArchived))
    .orderBy(asc(notes.lastEdited))
    .limit(6);

  return (
    <div className="flex-1 p-6">
      <h2 className="text-4xl font-extrabold">Recent Notes</h2>

      <div className="mt-3 grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        {notesResult &&
          notesResult.map((note) => {
            return (
              <Link href={`/notes/${note.id}`}>
                <Card key={note.id} className="hover:bg-app-100 dark:hover:bg-app-800">
                  <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {note.lastEdited?.toLocaleString() ?? "Not yet saved"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
