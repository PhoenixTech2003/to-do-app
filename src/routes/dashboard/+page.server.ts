import { superValidate } from "sveltekit-superforms"
import { createWorkspaceFormSchema } from "../../lib/components/dashbaord/create-worskpace-form/form-schema"
import { zod4 } from "sveltekit-superforms/adapters"
import type { PageServerLoad } from './$types';
import { fail, redirect } from "@sveltejs/kit";
import { createWorkspace } from "$lib/server/db/mutations.js"
import { auth } from "$lib/auth.server.js";
import { getAllUserWorkspaces } from "$lib/server/db/queries.js";

export const load: PageServerLoad = async ({ request }) => {
    const userData = await auth.api.getSession({
        headers: request.headers
    })
    if (!userData) {
        redirect(307, "/")
    }
    const userId = userData.session.userId
    const userWorkSpacesData = await getAllUserWorkspaces({ userId })
    return {
        form: await superValidate(zod4(createWorkspaceFormSchema)),
        userWorkSpacesData
    }
}

export const actions = {
    createWorkspace: async (event) => {
        const form = await superValidate(event, zod4(createWorkspaceFormSchema))
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
            const workspaceName = form.data.workspaceName

            await createWorkspace({ workspaceName, userId })
            return {
                form
            }

        }
        catch (error) {
            console.error(error instanceof Error ? error.message : "Unknown error occured while creating workspace")
            fail(400, {
                form
            })
        }
    }
}