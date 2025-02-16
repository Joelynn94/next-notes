"use client";

import { archiveNote } from "@/app/notes/actions";
import { Button } from "@/components/ui/button";
import { Archive, RotateCcw } from "lucide-react";

export default function ArchiveNoteButton({
  noteId,
  isArchived,
}: {
  noteId: string;
  isArchived: boolean;
}) {
  async function handleArchive() {
    if (confirm(`Are you sure you want to ${isArchived ? "restore" : "archive"} this note?`)) {
      await archiveNote(noteId, !isArchived);
    }
  }

  return (
    <Button variant="secondary" onClick={handleArchive} className="ml-auto">
      {isArchived ? (
        <>
          <RotateCcw /> Unarchive
        </>
      ) : (
        <>
          <Archive /> Archive
        </>
      )}
    </Button>
  );
}
