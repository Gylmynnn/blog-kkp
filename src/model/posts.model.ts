import { and, desc, eq } from "drizzle-orm";
import { db } from "../database/index";
import { posts, users } from "../database/schema";
import { CreatePostsRequest, UpdatePostsRequest } from "../lib/dto/posts";

export class PostsModel {

    static async create({ title, content, authorId, image, imageId }: CreatePostsRequest) {
        const [inserted] = await db.insert(posts).values({
            title,
            content,
            image,
            imageId,
            authorId,
        }).returning({ id: posts.id });

        const [post] = await db
            .select({
                id: posts.id,
                title: posts.title,
                content: posts.content,
                image: posts.image,
                createdAt: posts.createdAt,
                author: {
                    id: users.id,
                    username: users.username,
                    email: users.email,
                    avatar: users.avatar,
                    createdAt: users.createdAt,
                },
            })
            .from(posts)
            .leftJoin(users, eq(posts.authorId, users.id))
            .where(eq(posts.id, inserted.id));

        return post;
    }
    // static async create({ title, content, authorId, image, imageId }: CreatePostsRequest) {
    //     const result = await db.insert(posts).values({
    //         title,
    //         content,
    //         image,
    //         imageId,
    //         authorId,
    //     }).returning();
    //     return result[0];
    // }

    static async update({ id, title, authorId, content, image, imageId, }: UpdatePostsRequest) {
        const result = await db.update(posts).set({
            title,
            image,
            authorId,
            content,
            imageId,
            updatedAt: new Date(),
        }).where(eq(posts.id, id)).returning();
        return result[0] || null;
    }

    static async getAll() {
        return await db
            .select({
                id: posts.id,
                title: posts.title,
                content: posts.content,
                image: posts.image,
                createdAt: posts.createdAt,
                author: {
                    id: users.id,
                    username: users.username,
                    email: users.email,
                    avatar: users.avatar,
                    createdAt: users.createdAt,
                },
            })
            .from(posts)
            .leftJoin(users, eq(posts.authorId, users.id))
            .orderBy(desc(posts.createdAt));
    }
    static async getById(id: number) {
        const result = await db
            .select({
                id: posts.id,
                title: posts.title,
                content: posts.content,
                image: posts.image,
                imageId: posts.imageId,
                createdAt: posts.createdAt,
                author: {
                    id: users.id,
                    username: users.username,
                    email: users.email,
                    avatar: users.avatar,
                    createdAt: users.createdAt,
                },
            })
            .from(posts)
            .leftJoin(users, eq(posts.authorId, users.id))
            .where(eq(posts.id, id));
        return result[0] || null;
    }


    // static async getByAuthorId(id: number) {
    //     return await db
    //         .select(
    //             {
    //                 id: posts.id,
    //                 title: posts.title,
    //                 content: posts.content,
    //                 image: posts.image,
    //                 created_at: posts.createdAt,
    //                 author: {
    //                     id: users.id,
    //                     username: users.username,
    //                     email: users.email,
    //                     avatar: users.avatar
    //                 },
    //             }
    //         )
    //         .from(posts)
    //         .innerJoin(users, eq(posts.authorId, users.id))
    //         .where(eq(posts.authorId, id))
    //         .orderBy(desc(posts.createdAt));
    // }


    static async getByAuthorId(authorId: number) {
        return await db
            .select({
                id: posts.id,
                title: posts.title,
                content: posts.content,
                image: posts.image,
                createdAt: posts.createdAt,
                author: {
                    id: users.id,
                    username: users.username,
                    email: users.email,
                    avatar: users.avatar,
                    createdAt: users.createdAt,
                },
            })
            .from(posts)
            .innerJoin(users, eq(posts.authorId, users.id))
            .where(eq(posts.authorId, authorId))
            .orderBy(desc(posts.createdAt));
    }


    static async delete(id: number, authorId: number, isAdmin: boolean) {
        let result: any[];
        if (isAdmin) {
            result = await db
                .delete(posts)
                .where(eq(posts.id, id))
                .returning();
        } else {
            result = await db
                .delete(posts)
                .where(and(eq(posts.id, id), eq(posts.authorId, authorId)))
                .returning();
        }
        return result[0] || null;
    }
}
