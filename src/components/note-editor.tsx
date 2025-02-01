"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/db/schema/notes";
import { Clock, Tag } from "lucide-react";
import { useEffect, useState } from "react";

interface NoteEditorProps {
  note?: Note; // Accepts a single note or undefined
}

export default function NoteEditor({ note }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [tags, setTags] = useState(note?.tags?.join(", ") || "");
  const [lastEdited, setLastEdited] = useState(
    note?.lastEdited ? new Date(note.lastEdited).toLocaleString() : "Not yet saved"
  );
  const [content, setContent] = useState(note?.content || "");

  // Update state when new note is selected
  useEffect(() => {
    setTitle(note?.title || "");
    setTags(note?.tags?.join(", ") || "");
    setLastEdited(note?.lastEdited ? new Date(note.lastEdited).toLocaleString() : "Not yet saved");
    setContent(note?.content || "");
  }, [note]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setLastEdited(new Date().toLocaleString());
  };

  return (
    <div className="flex h-full flex-col p-3">
      {/* Title Input */}
      <div>
        <Input
          type="text"
          placeholder="Enter a title..."
          className="h-auto border-none bg-transparent pl-1 !text-4xl font-semibold leading-tight focus:ring-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          <span className="rounded-md bg-transparent py-1 pl-1 text-gray-400">{lastEdited}</span>
        </div>
      </div>

      {/* Note Content (Text Editor) */}
      <div className="flex flex-1 flex-col">
        <Textarea
          placeholder="Start typing your note here..."
          className="flex-1 resize-none border-none bg-transparent pl-1 text-lg focus:ring-0"
          value={content}
          onChange={handleContentChange}
        />
      </div>

      {/* stay to bottom with save and cancel buttons */}
      <div className="mt-3 flex space-x-2 border-t pt-2">
        <Button variant="default">Save Note</Button>
        <Button variant="secondary" disabled>
          Cancel
        </Button>
      </div>
    </div>
  );
}
