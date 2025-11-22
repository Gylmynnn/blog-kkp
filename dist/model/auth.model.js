import { eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { users } from "../database/schema.js";
export class AuthModel {
    static async register(username, email, password, avatar, school) {
        const result = await db.insert(users).values({ username, email, password, avatar, school }).returning();
        return result[0];
    }
    static async login(email) {
        const result = await db.select().from(users).where(eq(users.email, email));
        return result[0] || null;
    }
}
