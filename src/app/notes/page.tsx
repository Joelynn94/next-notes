import NotesList from "@/components/notes-list";
import db from "@/db";
import { notes } from "@/db/schema";
import { asc, eq, not } from "drizzle-orm";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Notes() {
  const notesResult = await db
    .select()
    .from(notes)
    .where(not(eq(notes.isArchived, true)))
    .orderBy(asc(notes.lastEdited));

  const mostRecentNotes = notesResult.slice(0, 6);

  return (
    <>
      <aside className="flex min-w-[320px] max-w-xs flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-app-950">
        <div className="flex-1 pb-4">
          <NotesList notes={notesResult} />
        </div>
      </aside>
      <div className="flex-1 p-6">
        <h2 className="text-4xl font-extrabold">Recent Notes</h2>

        <div className="mt-3 grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          {mostRecentNotes &&
            mostRecentNotes.map((note) => {
              return (
                <Link key={note.id} href={`/notes/${note.id}`}>
                  <Card className="hover:bg-app-100 dark:hover:bg-app-800">
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
