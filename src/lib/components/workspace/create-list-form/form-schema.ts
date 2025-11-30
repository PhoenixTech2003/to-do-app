import z from "zod";

export const CreateListFormSchema = z.object({
    listTitle: z.string().min(1, "List title is required")
})

export type CreateListFormType = typeof CreateListFormSchema