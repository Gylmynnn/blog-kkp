import { desc, eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { users } from "../database/schema.js";
export class UserModel {
    static async create(username, email, password, avatar) {
        const result = await db.insert(users).values({
            username,
            email,
            password,
            avatar,
        }).returning();
        return result[0];
    }
    static async update({ id, username, avatar, avatarId, internshipStartDate, internshipEndDate, internshipPosition, internshipDivision, school }) {
        const result = await db.update(users).set({
            username,
            avatar,
            avatarId,
            internshipStartDate,
            internshipEndDate,
            internshipPosition,
            internshipDivision,
            school,
            updatedAt: new Date(),
        }).where(eq(users.id, id)).returning();
        return result[0] || null;
    }
    static async findAll() {
        const result = await db.select().from(users).orderBy(desc(users.createdAt));
        return result;
    }
    static async findByEmail(email) {
        const result = await db.select().from(users).where(eq(users.email, email));
        return result[0] || null;
    }
    static async findById(id) {
        const result = await db.select().from(users).where(eq(users.id, id));
        return result[0] || null;
    }
    static async delete(id) {
        const result = await db.delete(users).where(eq(users.id, id)).returning();
        return result[0] || null;
    }
}
