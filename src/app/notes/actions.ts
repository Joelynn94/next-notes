"use server";

import db from "@/db";
import { notes } from "@/db/schema";
import { Note } from "@/db/schema/notes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface NoteState {
  message: string | null;
  error: string | null;
  note: Note | null;
}

export async function createNote(formData: FormData): Promise<NoteState> {
  const title = formData.get("title")?.toString().trim() || "Untitled Note";
  const tags = formData.get("tags")?.toString().trim() || "";
  const content = formData.get("content")?.toString().trim() || "";

  console.log({
    title,
    tags,
    content,
  });

  try {
    const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];

    const newNote = await db
      .insert(notes)
      .values({ title, tags: tagsArray, content })
      .returning()
      .then((res) => res[0]);

    // TODO: this path will change eventually - after adding login and user accounts
    revalidatePath("/notes");

    return {
      message: "Note created successfully!",
      error: null,
      note: newNote,
    };
  } catch (error) {
    console.error("Database error:", error);
    return { message: null, error: "Failed to create note.", note: null };
  }
}

export async function updateNote(prevState: NoteState, formData: FormData): Promise<NoteState> {
  const id = formData.get("id")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const tags = formData.get("tags")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  console.log({
    id,
    title,
    tags,
    content,
  });

  if (!id) {
    return { message: null, error: "Note ID is required.", note: null };
  }
  if (!title || title.length < 3) {
    return { message: null, error: "Title must be at least 3 characters long.", note: null };
  }
  if (!content || content.length < 3) {
    return { message: null, error: "Content must be at least 3 characters long.", note: null };
  }

  try {
    // TODO - add validation for tags, capitalize, clean up, etc.
    const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];

    const updatedNote = await db
      .update(notes)
      .set({ title, tags: tagsArray, content, lastEdited: new Date() })
      .where(eq(notes.id, id))
      .returning()
      .then((res) => res[0]);

    if (!updatedNote) {
      return { message: null, error: "Note not found.", note: null };
    }
    // Ensure cache is refreshed after updating the note
    revalidatePath(`/notes/${id}`);

    return {
      message: "Note updated successfully!",
      error: null,
      note: updatedNote,
    };
  } catch (error) {
    console.error("Database error:", error);
    return { message: null, error: "Failed to update note.", note: null };
  }
}

export async function deleteNote(id: string): Promise<void> {
  try {
    const deletedNote = await db
      .delete(notes)
      .where(eq(notes.id, id))
      .returning()
      .then((res) => res[0]);

    if (!deletedNote) {
      console.error("Note not found.");
      return;
    }
    // Ensure cache is refreshed after deleting the note
    revalidatePath(`/`);
    redirect("/");
  } catch (error) {
    console.error("Database error:", error);
  }

  redirect("/");
}
