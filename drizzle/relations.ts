import { relations } from "drizzle-orm/relations";
import { posts, comments, users, votes } from "./schema";

export const commentsRelations = relations(comments, ({one}) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id]
	}),
	user: one(users, {
		fields: [comments.authorId],
		references: [users.id]
	}),
}));

export const postsRelations = relations(posts, ({one, many}) => ({
	comments: many(comments),
	votes: many(votes),
	user: one(users, {
		fields: [posts.authorId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	comments: many(comments),
	votes: many(votes),
	posts: many(posts),
}));

export const votesRelations = relations(votes, ({one}) => ({
	post: one(posts, {
		fields: [votes.postId],
		references: [posts.id]
	}),
	user: one(users, {
		fields: [votes.authorId],
		references: [users.id]
	}),
}));