```typescript
import { pgTable, text, timestamp, boolean, pgEnum, type AnyPgColumn } from "drizzle-orm/pg-core";
import { workspace } from "./workspace";
import { user } from "./auth-schema";
import { list } from "./list";

export const statusEnum = pgEnum("status", ['IN PROGRESS', 'COMPLETED', 'OVERDUE']);

export const todo = pgTable("todo", {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspace.id, { onDelete: "cascade" }),
    listId: text("list_id").references(() => list.id, { onDelete: "cascade" }),
    parentId: text("parent_id").references((): AnyPgColumn => todo.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    status: statusEnum("status").default("IN PROGRESS"),
    createdById: text("created_by_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    dueDate: timestamp("due_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull()
});
```
