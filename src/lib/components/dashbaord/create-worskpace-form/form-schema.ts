import { z } from "zod"

export const createWorkspaceFormSchema = z.object({
    workspaceName: z.string()
})

export type CreateWorkspaceFormSchemaType = typeof createWorkspaceFormSchema