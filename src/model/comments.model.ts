import { and, desc, eq } from "drizzle-orm";
import { db } from "../database/index";
import { comments, users } from "../database/schema";
import { CreateCommentsRequest, UpdateCommentsRequest } from "../lib/dto/comments";


export class CommentModel {
    static async create({ content, postId, authorId }: CreateCommentsRequest) {
        const result = await db.insert(comments).values({
            content,
            postId,
            authorId,
        }).returning();
        return result[0];
    }

    static async update({ id, authorId, content }: UpdateCommentsRequest) {
        const result = await db
            .update(comments)
            .set({ content, updatedAt: new Date() })
            .where(and(eq(comments.id, id), eq(comments.authorId, authorId)))
            .returning();
        return result[0] || null;
    }


    static async getByPost(postId: number) {
        return await db
            .select({
                id: comments.id,
                content: comments.content,
                created_at: comments.createdAt,
                author: {
                    id: users.id,
                    username: users.username,
                    avatar: users.avatar,
                    email: users.email
                },
            })
            .from(comments)
            .innerJoin(users, eq(comments.authorId, users.id))
            .where(eq(comments.postId, postId))
            .orderBy(desc(comments.createdAt));
    }

    static async getById(id: number) {
        const result = await db
            .select({
                id: comments.id,
                content: comments.content,
                created_at: comments.createdAt,
                author: {
                    id: users.id,
                    username: users.username,
                    avatar: users.avatar,
                    email: users.email
                },
            })
            .from(comments)
            .innerJoin(users, eq(comments.authorId, users.id))
            .where(eq(comments.id, id))
        return result[0] || null;
    }

    static async getAll() {
        return await db
            .select({
                id: comments.id,
                content: comments.content,
                created_at: comments.createdAt,
                author: {
                    id: users.id,
                    username: users.username,
                    email: users.email,
                    avatar: users.avatar,
                },
            })
            .from(comments)
            .innerJoin(users, eq(comments.authorId, users.id))
            .orderBy(desc(comments.createdAt));
    }

    static async delete(id: number, authorId: number, isAdmin: boolean) {
        let result;
        if (isAdmin) {
            result = await db
                .delete(comments)
                .where(eq(comments.id, id))
                .returning();
        } else {
            result = await db
                .delete(comments)
                .where(and(eq(comments.id, id), eq(comments.authorId, authorId)))
                .returning();
        }
        return result[0] || null;
    }

}
