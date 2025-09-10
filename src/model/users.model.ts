import { desc, eq } from "drizzle-orm";
import { db } from "../database/index";
import { users } from "../database/schema";
import { UpdateUsersRequest } from "../lib/dto/users";

export class UserModel {
    static async create(username: string, email: string, password: string, avatar?: string) {
        const result = await db.insert(users).values({
            username,
            email,
            password,
            avatar,
        }).returning();
        return result[0];
    }

    static async update({ id, username, avatar, avatarId }: UpdateUsersRequest) {
        const result = await db.update(users).set({
            username,
            avatar,
            avatarId,
            updatedAt: new Date(),
        }).where(eq(users.id, id)).returning();
        return result[0] || null;
    }

    static async findAll() {
        const result = await db.select().from(users).orderBy(desc(users.createdAt))
        return result;
    }

    static async findByEmail(email: string) {
        const result = await db.select().from(users).where(eq(users.email, email));
        return result[0] || null;
    }

    static async findById(id: number) {
        const result = await db.select().from(users).where(eq(users.id, id));
        return result[0] || null;
    }

    static async delete(id: number) {
        const result = await db.delete(users).where(eq(users.id, id)).returning();
        return result[0] || null;
    }
}
