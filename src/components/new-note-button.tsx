"use client";

import { createNote } from "@/app/notes/actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewNoteButton() {
  const router = useRouter();

  const handleClick = async () => {
    // TODO: handle loading state when creating a new note
    const formData = new FormData();
    formData.append("title", "Untitled Note");
    formData.append("content", "");
    formData.append("tags", "");

    const newNote = await createNote(formData);
    if (newNote) {
      router.push(`/notes/${newNote.note?.id}`);
    }
  };
  return (
    <Button type="submit" variant="default" className="w-full" onClick={handleClick}>
      <Plus /> Create New Note
    </Button>
  );
}
