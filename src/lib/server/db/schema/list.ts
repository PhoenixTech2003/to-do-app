import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { workspace } from "./workspace";
import { user } from "./auth-schema";

export const list = pgTable("list", {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspace.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    createdById: text("created_by_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});
