// import { and, eq } from "drizzle-orm";
// import { db } from "../database/index.js";
// import { votes } from "../database/schema.js";
//
//
// export class VoteModel {
//     static async create(postId: number, userId: number) {
//         const result = await db.insert(votes).values({
//             postId,
//             userId,
//         }).returning();
//         return result[0];
//     }
//
//     static async getByPost(postId: number) {
//         return await db.select().from(votes).where(eq(votes.postId, postId));
//     }
//
//     static async getByUser(postId: number, userId: number) {
//         const result = await db.select().from(votes)
//             .where(and(eq(votes.postId, postId), eq(votes.userId, userId)))
//         return result[0] || null;
//     }
//
//     static async delete(postId: number, userId: number) {
//         const result = await db.delete(votes)
//             .where(and(eq(votes.postId, postId), eq(votes.userId, userId)))
//             .returning();
//         return result[0] || null;
//     }
// }
