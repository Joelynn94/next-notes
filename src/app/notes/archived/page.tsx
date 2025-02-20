import ArchivedList from "@/components/archived-list";
import db from "@/db";
import { notes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ArchivedNotes() {
  const archivedNotes = await db
    .select()
    .from(notes)
    .where(eq(notes.isArchived, true))
    .orderBy(desc(notes.lastEdited));

  return (
    <>
      <aside className="hidden min-w-[320px] max-w-xs flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-app-950 xl:flex">
        <div className="flex-1 pb-4">
          <ArchivedList notes={archivedNotes} />
        </div>
      </aside>

      <div className="flex-1 p-6">
        <h2 className="text-4xl font-extrabold">Archived Notes</h2>

        <div className="mt-3 grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {archivedNotes &&
            archivedNotes.map((note) => {
              return (
                <Link key={note.id} href={`/notes/${note.id}`}>
                  <Card className="h-full hover:bg-app-100 dark:hover:bg-app-800">
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
    </>
  );
}
