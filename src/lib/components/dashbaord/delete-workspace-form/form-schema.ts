import { z } from "zod"

export const deleteWorkspaceFormSchema = z.object({
    workspaceID: z.string()
})

export type DeleteWorkspaceFormSchemaType = typeof deleteWorkspaceFormSchema
