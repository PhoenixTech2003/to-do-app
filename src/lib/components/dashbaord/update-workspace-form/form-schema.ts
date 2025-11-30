import { z } from "zod"

export const updateWorkspaceFormSchema = z.object({
    workspaceName: z.string().min(1, "Workspace name is required"),
    workspaceID: z.string()
})

export type UpdateWorkspaceFormSchemaType = typeof updateWorkspaceFormSchema
