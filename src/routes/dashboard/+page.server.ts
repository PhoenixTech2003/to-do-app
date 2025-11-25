import { superValidate } from "sveltekit-superforms"
import { createWorkspaceFormSchema } from "../../lib/components/dashbaord/create-worskpace-form/form-schema"
import { zod4 } from "sveltekit-superforms/adapters"
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod4(createWorkspaceFormSchema))
    }
}