CREATE TYPE "public"."status" AS ENUM('IN PROGRESS', 'COMPLETED', 'OVERDUE');--> statement-breakpoint
ALTER TABLE "todo" RENAME COLUMN "completed" TO "status";--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "due_date" timestamp NOT NULL;