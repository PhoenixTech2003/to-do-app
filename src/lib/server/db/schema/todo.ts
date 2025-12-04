import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { list } from "./list";

export const statusEnum = pgEnum("status", ['IN PROGRESS', 'COMPLETED', 'OVERDUE']);

export const todo = pgTable("todo", {
    id: text("id").primaryKey(),
    listId: text("list_id").notNull().references(() => list.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    status: statusEnum("status").default("IN PROGRESS"),
    createdById: text("created_by_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    dueDate: timestamp("due_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});

