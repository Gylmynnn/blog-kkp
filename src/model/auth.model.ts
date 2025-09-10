import { eq } from "drizzle-orm";
import { db } from "../database/index";
import { users } from "../database/schema";

export class AuthModel {
    static async register(username: string, email: string, password: string, avatar: string) {
        const result = await db.insert(users).values({ username, email, password, avatar }).returning()
        return result[0];
    }

    static async login(email: string) {
        const result = await db.select().from(users).where(eq(users.email, email));
        return result[0] || null;
    }

}
