import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";
dotenv.config();
const runMigrations = async () => {
    console.log("🚀 Starting migration...");
    const migrationClient = postgres(process.env.DATABASE_URL, {
        ssl: "require",
        max: 1,
    });
    const db = drizzle(migrationClient);
    try {
        await migrate(db, { migrationsFolder: "./drizzle" });
        console.log("✅ Migration completed successfully!");
    }
    catch (error) {
        console.error("❌ Migration failed:", error);
        throw error;
    }
    finally {
        await migrationClient.end();
    }
};
runMigrations()
    .then(() => {
    console.log("✨ All migrations done!");
    process.exit(0);
})
    .catch((err) => {
    console.error("💥 Migration error:", err);
    process.exit(1);
});
