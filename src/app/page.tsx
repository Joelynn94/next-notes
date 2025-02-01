import db from "@/db";
import { notes } from "@/db/schema";
import { desc } from "drizzle-orm";
import { UpdateNoteForm } from "./update-note-form";

export default async function Home() {
  const notesResult = await db.select().from(notes).orderBy(desc(notes.createdAt));

  const tags = [
    "Cooking",
    "Dev",
    "Fitness",
    "Health",
    "Personal",
    "React",
    "Recipes",
    "Shopping",
    "Travel",
    "TypeScript",
  ];

  return (
    <div className="flex-1 p-6">
      <UpdateNoteForm />
    </div>
  );
}
