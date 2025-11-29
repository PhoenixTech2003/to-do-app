import { createId } from "@paralleldrive/cuid2"
import { db } from "."
import { user, workspace } from "./schema"
import { and, eq } from "drizzle-orm"

export const createWorkspace = async function createsAWorkspaceForTheLoggedInUser({ workspaceName, userId }: { workspaceName: string, userId: string }) {
    try {
        const usersWorkspace = await db.insert(workspace).values({ id: createId(), ownerId: userId, name: workspaceName })
        return usersWorkspace
    } catch (error) {
        console.error(error instanceof Error ? error.message : "Unknown error occured while creating workspace")
        throw new Error("Failed to create workspace")
    }
}

export const deleteWorkspace = async function deletesSelectedWorkspaceOfAUser({ userId, workspaceId }: { userId: string, workspaceId: string }) {
    try {
        const deletedWorkSpace = await db.delete(workspace).where(and(eq(workspace.id, workspaceId), eq(user.id, userId))).returning()
        return deletedWorkSpace[0]
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occured while deleting a workpace")
    }
}