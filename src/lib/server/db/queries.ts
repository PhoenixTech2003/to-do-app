import { eq } from "drizzle-orm"
import { db } from "."
import { workspace, member } from "./schema"


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

}