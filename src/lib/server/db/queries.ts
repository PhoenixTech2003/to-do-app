import { eq } from "drizzle-orm"
import { db } from "."
import { workspace } from "./schema"


export const getAllUserWorkspaces = async function fetchesAllTheLoggedInUsersWorkspaces({ userId }: { userId: string }) {
    try {
        const userWorkSpaces = await db.select().from(workspace).where(eq(workspace.ownerId, userId))
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