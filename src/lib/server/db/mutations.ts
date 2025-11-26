import { createId } from "@paralleldrive/cuid2"
import { db } from "."
import { workspace } from "./schema"

export const createWorkspace = async function createsAWorkspaceForTheLoggedInUser({ workspaceName, userId }: { workspaceName: string, userId: string }) {
    try {
        const usersWorkspace = await db.insert(workspace).values({ id: createId(), ownerId: userId, name: workspaceName })
        return usersWorkspace
    } catch (error) {
        console.error(error instanceof Error ? error.message : "Unknown error occured while creating workspace")
        throw new Error("Failed to create workspace")
    }
}