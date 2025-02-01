"use client";

import { updateNote } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState: {
  message?: string;
  error?: string;
  note?: {
    id: string;
    title: string;
    content: string | null;
    tags: string[] | null;
    lastEdited: Date | null;
    isArchived: boolean;
    createdAt: Date;
  };
} = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Updating..." : "Update Note"}
    </Button>
  );
}

export function UpdateNoteForm() {
  const [state, formAction] = useActionState(updateNote, initialState);

  return (
    <form action={formAction} className="space-y-2">
      {/* Note ID Input */}
      <Label htmlFor="id">Enter Note ID</Label>
      <Input
        type="text"
        name="id"
        placeholder="Enter Note ID"
        className="w-full rounded-md border border-gray-300 p-2"
        defaultValue={state?.note?.id ?? ""}
        required
      />

      {/* Content Input */}
      <Label htmlFor="content">Enter Content</Label>
      <Input
        type="text"
        name="content"
        placeholder="New Note Content"
        className="w-full rounded-md border border-gray-300 p-2"
        defaultValue={state?.note?.content ?? ""}
        required
      />

      {/* Submit Button */}
      <SubmitButton />

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
