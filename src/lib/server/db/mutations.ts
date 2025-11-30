import { createId } from "@paralleldrive/cuid2"
import { db } from "."
import { user, workspace, member, list } from "./schema"
import { and, eq } from "drizzle-orm"

export const createWorkspace = async function createsAWorkspaceForTheLoggedInUser({ workspaceName, userId }: { workspaceName: string, userId: string }) {
    try {
        const workspaceId = createId();

        // Create workspace
        await db.insert(workspace).values({
            id: workspaceId,
            ownerId: userId,
            name: workspaceName
        });

        // Create membership for the owner
        await db.insert(member).values({
            id: createId(),
            workspaceId: workspaceId,
            userId: userId,
            role: "owner"
        });

        return { id: workspaceId, name: workspaceName };
    } catch (error) {
        console.error(error instanceof Error ? error.message : "Unknown error occured while creating workspace")
        throw new Error("Failed to create workspace")
    }
}

export const deleteWorkspace = async function deletesSelectedWorkspaceOfAUser({ userId, workspaceId }: { userId: string, workspaceId: string }) {
    try {
        const deletedWorkSpace = await db.delete(workspace).where(and(eq(workspace.id, workspaceId), eq(workspace.ownerId, userId))).returning()
        return deletedWorkSpace[0]
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occured while deleting a workpace")
        throw new Error("An error occured while deleting the workspace")
    }
}

export const updateWorkspace = async function updatesTheValuesOfWorkspace({ workspaceName, workspaceId }: { workspaceName: string, workspaceId: string }) {
    try {
        const updatedWorkspace = await db.update(workspace).set({ name: workspaceName }).where(eq(workspace.id, workspaceId)).returning()
        return {
            updatedWorkspace: updatedWorkspace[0]
        }
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occured while updating the workspace")
        throw new Error(`Error occured while updating workpace ${workspaceId}`)

    }
}

export const createList = async function createsAListForAWorkspace({ listTitle, workspaceId, userId }: { listTitle: string, workspaceId: string, userId: string }) {
    try {
        const listId = createId();

        // Create list
        await db.insert(list).values({
            id: listId,
            workspaceId: workspaceId,
            title: listTitle,
            createdById: userId
        });

        return { id: listId, title: listTitle };
    } catch (error) {
        console.error(error instanceof Error ? error.message : "Unknown error occured while creating list")
        throw new Error("Failed to create list")
    }
}

export const updateList = async function updatesTheValuesOfList({ listTitle, listId }: { listTitle: string, listId: string }) {
    try {
        const updatedList = await db.update(list).set({ title: listTitle }).where(eq(list.id, listId)).returning()
        return {
            updatedList: updatedList[0]
        }
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occured while updating the list")
        throw new Error(`Error occured while updating list ${listId}`)

    }
}

export const deleteList = async function deletesSelectedListOfAUser({ userId, listId }: { userId: string, listId: string }) {
    try {
        const deletedList = await db.delete(list).where(and(eq(list.id, listId), eq(list.createdById, userId))).returning()
        return deletedList[0]
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occured while deleting a list")
        throw new Error("An error occured while deleting the list")
    }
}