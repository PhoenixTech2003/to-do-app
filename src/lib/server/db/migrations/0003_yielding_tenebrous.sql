ALTER TABLE "todo" RENAME COLUMN "workspace_id" TO "list_id";--> statement-breakpoint
ALTER TABLE "todo" DROP CONSTRAINT "todo_workspace_id_workspace_id_fk";
--> statement-breakpoint
ALTER TABLE "todo" ADD CONSTRAINT "todo_list_id_list_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."list"("id") ON DELETE cascade ON UPDATE no action;