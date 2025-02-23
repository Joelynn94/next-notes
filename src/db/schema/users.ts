import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const users = pgTable("user", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()), // ✅ Change to UUID
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export default users;
