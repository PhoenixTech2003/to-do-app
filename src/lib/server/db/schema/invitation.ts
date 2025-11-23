import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { workspace } from "./workspace";
import { user } from "./auth-schema";

export const invitation = pgTable("invitation", {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspace.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    status: text("status").notNull().default("pending"), // pending, accepted, rejected
    inviterId: text("inviter_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull()
});
