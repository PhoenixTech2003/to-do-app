import { and, eq, lt, gte, ne } from "drizzle-orm"
import { db } from "."
import { workspace, member, list, user } from "./schema"
import { todo } from "./schema";


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

export const getWorkspaceMembers = async function fetchesAllMembersInAWorkspace({ workspaceId }: { workspaceId: string }) {
    try {
        const workspaceMembers = await db
            .select({
                user: user,
                member: member
            })
            .from(member)
            .innerJoin(user, eq(member.userId, user.id))
            .where(eq(member.workspaceId, workspaceId));

        return {
            workspaceMembers,
            workspaceMembersError: null
        }
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occured while fetching workspace members")
        return {
            workspaceMembers: null,
            workspaceMembersError: "An error occured while fetching workspace members"
        }
    }
}


export const getListById = async function fetchesListById({ listId }: { listId: string }) {
    try {
        const listData = await db.select().from(list).where(eq(list.id, listId)).limit(1);

        if (listData.length === 0) {
            return {
                list: null,
                listError: "List not found"
            }
        }

        return {
            list: listData[0],
            listError: null
        }
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occured while fetching list")
        return {
            list: null,
            listError: "An error occured while fetching list"
        }
    }
}

export const getListTodos = async function fetchesTodosForAList({ 
    listId, 
    userId, 
    taskstatus, 
    date 
}: { 
    listId: string, 
    userId?: string,
    taskstatus?: 'overdue' | 'completed' | 'today' | null,
    date?: string | null
}) {
    try {
        const conditions = [eq(todo.listId, listId)];

        if (userId) {
            conditions.push(eq(todo.createdById, userId));
        }

        // Apply taskstatus filtering
        if (taskstatus === 'completed') {
            conditions.push(eq(todo.status, 'COMPLETED'));
        } else if (taskstatus === 'overdue') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            conditions.push(lt(todo.dueDate, today));
            conditions.push(ne(todo.status, 'COMPLETED'));
        } else if (taskstatus === 'today') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            conditions.push(gte(todo.dueDate, today));
            conditions.push(lt(todo.dueDate, tomorrow));
        }

        // Apply date filtering if provided
        if (date) {
            const filterDate = new Date(date);
            filterDate.setHours(0, 0, 0, 0);
            const nextDay = new Date(filterDate);
            nextDay.setDate(nextDay.getDate() + 1);
            conditions.push(gte(todo.dueDate, filterDate));
            conditions.push(lt(todo.dueDate, nextDay));
        }

        const listTodos = await db.select().from(todo).where(and(...conditions));

        return {
            listTodos,
            listTodosError: null
        }
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occured while fetching list todos")
        return {
            listTodos: null,
            listTodosError: "An error occured while fetching todos"
        }
    }
}