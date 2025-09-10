ALTER TABLE "comments" RENAME COLUMN "user_id" TO "author_id";--> statement-breakpoint
ALTER TABLE "votes" RENAME COLUMN "user_id" TO "author_id";--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "votes" DROP CONSTRAINT "votes_user_id_users_id_fk";
--> statement-breakpoint
DROP INDEX "votes_post_user_idx";--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "votes_post_user_idx" ON "votes" USING btree ("post_id","author_id");