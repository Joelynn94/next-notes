import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
// import users from "./users";

const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content"),
  tags: text("tags").array(),
  lastEdited: timestamp("lastEdited", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date()),
  isArchived: boolean("isArchived").notNull().default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  // userId: uuid("userId")
  // .notNull()
  // .references(() => users.id, { onDelete: "cascade" }),
});

export default notes;

export type Note = InferSelectModel<typeof notes>; // Single note type
export type NewNote = InferInsertModel<typeof notes>; // Type for inserting new notes
