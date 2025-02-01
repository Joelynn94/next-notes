import NoteEditor from "@/components/note-editor";
import db from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const note = await db
    .select()
    .from(notes)
    .where(eq(notes.id, params.id))
    .then((results) => results[0]); // Fetch first result

  if (!note) {
    return <p className="p-6 text-red-500">Note not found.</p>;
  }

  return (
    <div className="flex-1 p-6">
      <NoteEditor note={note} />
    </div>
  );
}
