"use client";

import { deleteNote } from "@/app/notes/actions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function DeleteNoteButton({ noteId }: { noteId: string }) {
  async function handleDelete() {
    if (confirm("Are you sure you want to delete this note?")) {
      await deleteNote(noteId);
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete} className="ml-auto">
      <Trash />
      Delete
    </Button>
  );
}

// function DeleteButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button variant="destructive" type="submit" aria-disabled={pending}>
//       {pending ? "Deleting..." : <Trash />}
//     </Button>
//   );
// }

// export default function DeleteNoteButton({ noteId }: { noteId: string }) {
//   return (
//     <form
//       action={async (formData) => {
//         if (confirm("Are you sure you want to delete this note?")) {
//           await deleteNote(noteId);
//         }
//       }}
//       className="absolute bottom-2 right-2 p-2"
//     >
//       <input type="hidden" name="id" value={noteId} />
//       <DeleteButton />
//     </form>
//   );
// }
