import { z } from "zod"

export const updateListFormSchema = z.object({
    listTitle: z.string().min(1, "List title is required"),
    listID: z.string()
})

export type UpdateListFormSchemaType = typeof updateListFormSchema

