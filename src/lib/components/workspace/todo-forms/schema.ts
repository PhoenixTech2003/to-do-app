import { z } from "zod";

export const createTodoFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date string!",
    })
});

export type CreateTodoFormSchemaType = typeof createTodoFormSchema;

export const updateTodoFormSchema = z.object({
    todoId: z.string().min(1, "Todo ID is required"),
    title: z.string().min(1, "Title is required").optional(),
    status: z.enum(["IN PROGRESS", "COMPLETED", "OVERDUE"]).optional(),
    dueDate: z.string().optional()
});

export type UpdateTodoFormSchemaType = typeof updateTodoFormSchema;

export const deleteTodoFormSchema = z.object({
    todoId: z.string().min(1, "Todo ID is required")
});

export type DeleteTodoFormSchemaType = typeof deleteTodoFormSchema;

export const submitTodoFormSchema = z.object({
    todoId: z.string().min(1, "Todo ID is required"),
    status: z.enum(["IN PROGRESS", "COMPLETED", "OVERDUE"]).optional(),
    title: z.string().min(1, "Title is required").optional()
});

export type SubmitTodoFormSchemaType = typeof submitTodoFormSchema;
