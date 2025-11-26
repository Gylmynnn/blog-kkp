import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config();

export const runAutoMigration = async () => {
    // Only run in production or when AUTO_MIGRATE is enabled
    if (process.env.NODE_ENV === 'production' || process.env.AUTO_MIGRATE === 'true') {
        console.log("🔄 Checking for pending migrations...");
        
        const migrationClient = postgres(process.env.DATABASE_URL!, {
            ssl: "require",
            max: 1,
        });
        
        const db = drizzle(migrationClient);
        
        try {
            await migrate(db, { migrationsFolder: "./drizzle" });
            console.log("✅ Database is up to date!");
        } catch (error) {
            console.error("❌ Auto-migration failed:", error);
            // Don't throw error to prevent app from crashing
            // Just log it for debugging
        } finally {
            await migrationClient.end();
        }
    }
};
