import { drizzle } from "drizzle-orm/postgres-js";
import { createClient } from '@supabase/supabase-js'
import postgres from "postgres";
import * as dotenv from "dotenv";
dotenv.config();

const client = postgres(process.env.DATABASE_URL!, {
    ssl: "require",
    max: 1,
});
const db = drizzle(client);

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)
export { db, supabase }

