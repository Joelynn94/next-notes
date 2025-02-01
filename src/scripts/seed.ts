import db from "@/db";
import { notes } from "@/db/schema";
import seedData from "./seed-data.json";

const seedDatabase = async () => {
  try {
    console.log("🌱 Seeding database...");

    // Clear existing notes (optional)
    await db.delete(notes);

    // Insert seed data
    await db.insert(notes).values(
      seedData.notes.map((note) => ({
        title: note.title,
        tags: note.tags,
        content: note.content,
        lastEdited: new Date(note.lastEdited),
        isArchived: Boolean(note.isArchived),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit();
  }
};

seedDatabase();
