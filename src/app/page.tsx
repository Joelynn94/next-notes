import { UpdateNoteForm } from "./update-note-form";

export default async function Home() {
  return (
    <div className="flex-1 p-6">
      <UpdateNoteForm />
    </div>
  );
}
