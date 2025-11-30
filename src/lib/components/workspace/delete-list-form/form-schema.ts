import { z } from "zod"

export const deleteListFormSchema = z.object({
    listID: z.string()
})

export type DeleteListFormSchemaType = typeof deleteListFormSchema

