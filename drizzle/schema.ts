import { pgTable, unique, serial, varchar, text, timestamp, boolean, foreignKey, integer, uniqueIndex } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: varchar({ length: 50 }).notNull(),
	avatar: text(),
	email: varchar({ length: 100 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	isAdmin: boolean().default(false),
	avatarId: text("avatar_id"),
	internshipStartDate: varchar("internship_start_date", { length: 100 }),
	internshipEndDate: varchar("internship_end_date", { length: 100 }),
	internshipPosition: varchar("internship_position", { length: 100 }),
	internshipDivision: varchar("internship_division", { length: 100 }),
	school: varchar({ length: 200 }),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const comments = pgTable("comments", {
	id: serial().primaryKey().notNull(),
	content: text().notNull(),
	postId: integer("post_id").notNull(),
	authorId: integer("author_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: "comments_post_id_posts_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [users.id],
			name: "comments_author_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const votes = pgTable("votes", {
	id: serial().primaryKey().notNull(),
	postId: integer("post_id").notNull(),
	authorId: integer("author_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	uniqueIndex("votes_post_user_idx").using("btree", table.postId.asc().nullsLast().op("int4_ops"), table.authorId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: "votes_post_id_posts_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [users.id],
			name: "votes_author_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const posts = pgTable("posts", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	content: text().notNull(),
	image: text(),
	authorId: integer("author_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	imageId: text("image_id"),
}, (table) => [
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [users.id],
			name: "posts_author_id_users_id_fk"
		}).onDelete("cascade"),
]);
