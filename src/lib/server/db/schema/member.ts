import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { workspace } from "./workspace";
import { user } from "./auth-schema";

export const member = pgTable("member", {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspace.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    role: text("role").notNull().default("member"),
    joinedAt: timestamp("joined_at").defaultNow().notNull()
});
