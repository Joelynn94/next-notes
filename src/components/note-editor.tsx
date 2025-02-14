"use client";
import { useMemo, useState } from "react";

import { updateNote } from "@/app/notes/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/db/schema/notes";
import { Clock, Tag } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import DeleteNoteButton from "./delete-note-button";

interface NoteEditorProps {
  note?: Note; // Accepts a single note or undefined
}

const initialState = {
  message: null as string | null,
  error: null as string | null,
  note: null as Note | null,
};

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Saving..." : "Save Note"}
    </Button>
  );
}

export default function NoteEditor({ note }: NoteEditorProps) {
  const [state, formAction] = useActionState(updateNote, initialState);

  // store initial state of the note so we can reset it later
  const [title, setTitle] = useState(note?.title ?? "");
  const [tags, setTags] = useState(note?.tags?.join(", ") ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  // reset the form to the initial state
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to discard changes?")) {
      setTitle(note?.title ?? "");
      setTags(note?.tags?.join(", ") ?? "");
      setContent(note?.content ?? "");
    }
  };

  const hasNoteChanged = useMemo(
    () => title !== note?.title || tags !== note?.tags?.join(", ") || content !== note?.content,
    [title, tags, content, note]
  );

  return (
    <form action={formAction} className="flex h-full flex-col">
      <Input type="hidden" name="id" value={note?.id} />

      {/* Title Input */}
      <div>
        <Input
          type="text"
          name="title"
          placeholder="Enter a title..."
          className="h-auto border-none bg-transparent pl-1 !text-4xl font-semibold leading-tight focus:ring-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Meta Information (Tags & Last Edited) */}
      <div className="mt-3 flex flex-col gap-2 border-b pb-2 text-sm text-gray-500 dark:text-gray-400">
        {/* Tags */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-3">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <span className="w-24">Tags</span>
          </div>
          <Input
            type="text"
            name="tags"
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            className="w-full border-none bg-transparent pl-1 focus:ring-0"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Last Edited */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-3">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="w-24">Last Edited</span>
          </div>
          <span className="rounded-md bg-transparent py-1 pl-1 text-gray-400">
            {new Date(note?.lastEdited || "").toLocaleString() || "Not yet saved"}
          </span>
        </div>
      </div>

      {/* Note Content (Text Editor) */}
      <div className="flex flex-1 flex-col">
        <Textarea
          name="content"
          placeholder="Start typing your note here..."
          className="flex-1 resize-none border-none bg-transparent pl-1 text-lg focus:ring-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      {/* stay to bottom with save and cancel buttons */}
      <div className="mt-3 flex items-center justify-between space-x-2 border-t pt-2">
        <div className="flex space-x-2">
          <SaveButton />
          <Button
            variant="secondary"
            type="button"
            onClick={handleCancel}
            disabled={!hasNoteChanged}
          >
            Cancel
          </Button>
        </div>

        <DeleteNoteButton noteId={note?.id || ""} />
      </div>

      {/* ✅ Display Message or Error */}
      {state?.message && (
        <p aria-live="polite" className="mt-2 text-sm text-green-600">
          {state.message}
        </p>
      )}
      {state?.error && (
        <p aria-live="polite" className="mt-2 text-sm text-red-500">
          {state.error}
        </p>
      )}
    </form>
  );
}
