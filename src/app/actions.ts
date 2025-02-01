"use server";

import db from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateNote(
  prevState: { message?: string; error?: string },
  formData: FormData
) {
  const id = formData.get("id")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  if (!id) {
    return { error: "Note ID is required." };
  }
  if (!content || content.length < 3) {
    return { error: "Content must be at least 3 characters long." };
  }

  try {
    const updatedNote = await db
      .update(notes)
      .set({ content })
      .where(eq(notes.id, id))
      .returning()
      .then((res) => res[0]);

    if (!updatedNote) {
      return { error: "Note not found." };
    }
    // Ensure cache is refreshed after updating the note
    revalidatePath("/");

    return {
      message: "Note updated successfully!",
      note: updatedNote,
    };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Failed to update note." };
  }
}
