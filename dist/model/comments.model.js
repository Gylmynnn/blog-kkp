import { and, desc, eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { comments, users } from "../database/schema.js";
export class CommentModel {
    static async create({ content, postId, authorId }) {
        const [inserted] = await db.insert(comments).values({
            content,
            postId,
            authorId,
        }).returning({ id: comments.id });
        const [result] = await db
            .select({
            id: comments.id,
            content: comments.content,
            createdAt: comments.createdAt,
            postId: comments.postId,
            author: {
                id: users.id,
                username: users.username,
                avatar: users.avatar,
                email: users.email,
                createdAt: users.createdAt
            },
        })
            .from(comments)
            .leftJoin(users, eq(comments.authorId, users.id))
            .where(eq(comments.id, inserted.id));
        return result;
    }
    static async update({ id, authorId, content }) {
        const result = await db
            .update(comments)
            .set({ content, updatedAt: new Date() })
            .where(and(eq(comments.id, id), eq(comments.authorId, authorId)))
            .returning();
        return result[0] || null;
    }
    static async getByPost(postId) {
        return await db
            .select({
            id: comments.id,
            content: comments.content,
            createdAt: comments.createdAt,
            postId: comments.postId,
            author: {
                id: users.id,
                username: users.username,
                avatar: users.avatar,
                email: users.email,
                createdAt: users.createdAt
            },
        })
            .from(comments)
            .innerJoin(users, eq(comments.authorId, users.id))
            .where(eq(comments.postId, postId))
            .orderBy(desc(comments.createdAt));
    }
    static async getById(id) {
        const result = await db
            .select({
            id: comments.id,
            content: comments.content,
            createdAt: comments.createdAt,
            postId: comments.postId,
            author: {
                id: users.id,
                username: users.username,
                avatar: users.avatar,
                email: users.email,
                createdAt: users.createdAt
            },
        })
            .from(comments)
            .innerJoin(users, eq(comments.authorId, users.id))
            .where(eq(comments.id, id));
        return result[0] || null;
    }
    static async getAll() {
        return await db
            .select({
            id: comments.id,
            content: comments.content,
            createdAt: comments.createdAt,
            postId: comments.postId,
            author: {
                id: users.id,
                username: users.username,
                email: users.email,
                avatar: users.avatar,
                createdAt: users.createdAt
            },
        })
            .from(comments)
            .innerJoin(users, eq(comments.authorId, users.id))
            .orderBy(desc(comments.createdAt));
    }
    static async delete(id, authorId, isAdmin) {
        let result;
        if (isAdmin) {
            result = await db
                .delete(comments)
                .where(eq(comments.id, id))
                .returning();
        }
        else {
            result = await db
                .delete(comments)
                .where(and(eq(comments.id, id), eq(comments.authorId, authorId)))
                .returning();
        }
        return result[0] || null;
    }
}
