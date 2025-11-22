import { boolean, integer, pgTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

// drizzle orm

// Table Users
const users = pgTable("users", {
   id: serial("id").primaryKey(),
   username: varchar("username", { length: 50 }).notNull(),
   avatar: text("avatar"),
   avatarId: text("avatar_id"),
   email: varchar("email", { length: 100 }).notNull().unique(),
   password: varchar("password", { length: 255 }).notNull(),
   isAdmin: boolean().default(false),
   internshipStartDate: varchar("internship_start_date", { length: 100 }),
   internshipEndDate: varchar("internship_end_date", { length: 100 }),
   internshipPosition: varchar("internship_position", { length: 100 }),
   internshipDivision: varchar("internship_division", { length: 100 }),
   school: varchar("school", { length: 200 }),
   createdAt: timestamp("created_at").defaultNow(),
   updatedAt: timestamp("updated_at").defaultNow(),
});

// Table Posts
const posts = pgTable("posts", {
   id: serial("id").primaryKey(),
   title: varchar("title", { length: 255 }).notNull(),
   content: text("content").notNull(),
   image: text("image"),
   imageId: text("image_id"),
   authorId: integer("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
   createdAt: timestamp("created_at").defaultNow(),
   updatedAt: timestamp("updated_at").defaultNow(),
});

// Table Comments
const comments = pgTable("comments", {
   id: serial("id").primaryKey(),
   content: text("content").notNull(),
   postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
   authorId: integer("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
   createdAt: timestamp("created_at").defaultNow(),
   updatedAt: timestamp("updated_at").defaultNow(),
});

// Table Votes
const votes = pgTable("votes", {
   id: serial("id").primaryKey(),
   postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
   authorId: integer("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
   createdAt: timestamp("created_at").defaultNow(),
}, (table) => [uniqueIndex("votes_post_user_idx").on(table.postId, table.authorId)]);

export { users, posts, comments, votes }
