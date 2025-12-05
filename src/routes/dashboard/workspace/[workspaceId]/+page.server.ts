import { auth } from "$lib/auth.server.js";
import { fail, redirect, error } from "@sveltejs/kit";
import { getAllWorkspaceLists } from "$lib/server/db/queries.js";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { CreateListFormSchema } from "$lib/components/workspace/create-list-form/form-schema.js";
import { updateListFormSchema } from "$lib/components/workspace/update-list-form/form-schema.js";
import { deleteListFormSchema } from "$lib/components/workspace/delete-list-form/form-schema.js";
import { createList, updateList, deleteList } from "$lib/server/db/mutations.js";

export const load = async ({ request, params }) => {
    try {
        const userData = await auth.api.getSession({
            headers: request.headers
        })
        if (!userData) {
            redirect(307, "/")
        }
        const userId = userData.session.userId
        const workspaceId = params.workspaceId

        const userWorkspaceLists = await getAllWorkspaceLists({ userID: userId, workspaceID: workspaceId })
        return {
            createListForm: await superValidate(zod4(CreateListFormSchema)),
            updateForm: await superValidate(zod4(updateListFormSchema)),
            deleteForm: await superValidate(zod4(deleteListFormSchema)),
            userWorkspaceListsData: userWorkspaceLists
        }
    } catch (err) {
        console.error(err)
        throw error(500, "Failed to load user lists")

    }
}

export const actions = {
    createList: async (event) => {
        const form = await superValidate(event, zod4(CreateListFormSchema))
        try {
            if (!form.valid) {
                return fail(400, { form })
            }
            const userData = await auth.api.getSession({
                headers: event.request.headers
            })

            if (!userData) {
                redirect(308, "/signin")
            }

            const userId = userData.session.userId
            const workspaceId = event.params.workspaceId
            const listTitle = form.data.listTitle

            if (!workspaceId) {
                return fail(400, { form })
            }

            await createList({ listTitle, workspaceId, userId })
            return {
                form
            }

        }
        catch (error) {
            console.error(error instanceof Error ? error.message : "Unknown error occured while creating list")
            return fail(400, {
                form
            })
        }
    },
    updateList: async (event) => {
        const form = await superValidate(event, zod4(updateListFormSchema))
        if (!form.valid) {
            return fail(400, { form })
        }
        try {
            const userData = await auth.api.getSession({
                headers: event.request.headers
            })

            if (!userData) {
                redirect(308, "/signin")
            }

            const listId = form.data.listID
            const listTitle = form.data.listTitle

            await updateList({ listId, listTitle })
            return {
                form
            }
        } catch (error) {
            console.error(error instanceof Error ? error.message : "Unknown error occured while updating list")
            return fail(400, {
                form
            })
        }
    },
    deleteList: async (event) => {
        const form = await superValidate(event, zod4(deleteListFormSchema))
        if (!form.valid) {
            return fail(400, { form })
        }
        try {
            const userData = await auth.api.getSession({
                headers: event.request.headers
            })

            if (!userData) {
                redirect(308, "/signin")
            }

            const userId = userData.session.userId
            const listId = form.data.listID

            await deleteList({ userId, listId })
            return {
                form
            }
        } catch (error) {
            console.error(error instanceof Error ? error.message : "Unknown error occured while deleting list")
            return fail(400, {
                form
            })
        }
    }
};