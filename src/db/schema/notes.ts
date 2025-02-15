import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
// import users from "./users";

const notes = pgTable("notes", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  content: text(),
  tags: text().array(),
  lastEdited: timestamp({ mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date()),
  isArchived: boolean().notNull().default(false),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  // userId: uuid("userId")
  // .notNull()
  // .references(() => users.id, { onDelete: "cascade" }),
});

export default notes;

export type Note = InferSelectModel<typeof notes>; // Single note type
export type NewNote = InferInsertModel<typeof notes>; // Type for inserting new notes
