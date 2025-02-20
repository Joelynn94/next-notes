"use client";

import NewNoteButton from "@/components/new-note-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Note } from "@/db/schema/notes";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NoteListProps {
  notes: Note[]; // Accepts a single note or undefined
}

const NotesList = ({ notes = [] }: NoteListProps) => {
  const pathname = usePathname();

  return (
    <div className="grid gap-4">
      <div className="flex w-full items-center justify-between">
        <NewNoteButton />
      </div>
      <ul className="space-y-2">
        <Separator />
        {notes &&
          notes.map((note) => {
            const isActive = pathname === `/notes/${note.id}`;
            return (
              <li key={note.id} className="mt-2">
                <Link
                  href={`/notes/${note.id}`}
                  className={`block rounded-lg px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-app-200 dark:bg-app-800" // Active Note
                      : "hover:bg-app-100 dark:hover:bg-app-800" // Hover
                  }`}
                >
                  <div className="grid w-full items-start gap-2">
                    <h3 className="text-lg font-semibold">{note.title}</h3>

                    {/* Tags (if available) */}
                    {note.tags && note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Note Date */}
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {note.lastEdited?.toLocaleString() ?? "Not yet saved"}
                    </p>
                  </div>
                </Link>
                <Separator className="mt-2" />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default NotesList;
