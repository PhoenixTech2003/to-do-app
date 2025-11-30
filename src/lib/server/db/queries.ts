import { and, eq } from "drizzle-orm"
import { db } from "."
import { workspace, member, list, user } from "./schema"


export const getAllUserWorkspaces = async function fetchesAllTheLoggedInUsersWorkspaces({ userId }: { userId: string }) {
    try {
        const userWorkSpaces = await db
            .select({
                id: workspace.id,
                name: workspace.name,
                ownerId: workspace.ownerId,
                createdAt: workspace.createdAt,
                role: member.role
            })
            .from(member)
            .innerJoin(workspace, eq(member.workspaceId, workspace.id))
            .where(eq(member.userId, userId));

        return {
            userWorkSpaces,
            userWorkSpacesError: null
        }
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occured while fetching users workspaces")
        return {
            userWorkSpaces: null,
            userWorkSpacesError: "An error occured while fetching user workspaces"
        }

    }
}

export const getAllWorkspaceLists = async function fetchesAllListsInAWorkspace({ userID, workspaceID }: { userID: string, workspaceID: string }) {
    try {
        const userWorkspaceLists = await db.select().from(list).innerJoin(member, eq(list.workspaceId, member.workspaceId)).innerJoin(user, eq(user.id, member.userId)).where(and(eq(list.workspaceId, workspaceID), eq(member.userId, userID)))
        return {
            userWorkspaceLists: userWorkspaceLists,
            userWorkspaceListsError: null
        }
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occured while fetching the user workspace lists")
        return {
            userWorkspaceLists: null,
            userWorkspaceListsError: "An error occured while getting your lists"
        }
    }
}