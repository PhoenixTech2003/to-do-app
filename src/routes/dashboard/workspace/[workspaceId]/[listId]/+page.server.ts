import { auth } from "$lib/auth.server";
import { redirect, error, fail } from "@sveltejs/kit";
import { getListTodos, getWorkspaceMembers, getListById } from "$lib/server/db/queries";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { createTodoFormSchema, updateTodoFormSchema, deleteTodoFormSchema, submitTodoFormSchema } from "$lib/components/workspace/todo-forms/schema";
import { createTodo, updateTodo, deleteTodo } from "$lib/server/db/mutations";

export const load = async ({ request, params, url }) => {
    try {
        const userData = await auth.api.getSession({
            headers: request.headers
        });
        if (!userData) {
            redirect(307, "/");
        }

        const workspaceId = params.workspaceId;
        const listId = params.listId;
        const selectedUserId = url.searchParams.get("userId") || userData.session.userId;
        const taskstatus = url.searchParams.get("taskstatus") as 'overdue' | 'completed' | 'today' | null;
        const date = url.searchParams.get("date");

        const [membersResult, todosResult, listResult] = await Promise.all([
            getWorkspaceMembers({ workspaceId }),
            getListTodos({ 
                listId, 
                userId: selectedUserId,
                taskstatus: taskstatus || undefined,
                date: date || undefined
            }),
            getListById({ listId })
        ]);

        if (membersResult.workspaceMembersError) {
            throw error(500, membersResult.workspaceMembersError);
        }

        if (todosResult.listTodosError) {
            throw error(500, todosResult.listTodosError);
        }

        if (listResult.listError) {
            throw error(500, listResult.listError);
        }

        return {
            workspaceId,
            listId,
            workspaceMembers: membersResult.workspaceMembers,
            listTodos: todosResult.listTodos,
            list: listResult.list,
            selectedUserId,
            taskstatus: taskstatus || null,
            date: date || null,
            submitTodoForm: await superValidate(zod4(submitTodoFormSchema)),
            createTodoForm: await superValidate(zod4(createTodoFormSchema)),
            updateTodoForm: await superValidate(zod4(updateTodoFormSchema)),
            deleteTodoForm: await superValidate(zod4(deleteTodoFormSchema))
        };

    } catch (err) {
        if (err && typeof err === 'object' && 'status' in err) {
            throw err;
        }
        console.error(err);
        throw error(500, "Failed to load list details");
    }
};

export const actions = {
    createTodo: async (event) => {
        const form = await superValidate(event, zod4(createTodoFormSchema));
        if (!form.valid) {
            return fail(400, { form });
        }
        try {
            const userData = await auth.api.getSession({
                headers: event.request.headers
            });

            if (!userData) {
                redirect(308, "/signin");
            }

            const userId = userData.session.userId;
            const listId = event.params.listId;

            if (!listId) {
                return fail(400, { form });
            }

            await createTodo({
                listId,
                title: form.data.title,
                dueDate: new Date(form.data.dueDate),
                createdById: userId
            });

            return { form };
        } catch (error) {
            console.error(error);
            return fail(500, { form });
        }
    },
    updateTodo: async (event) => {
        console.log("we are here now first")

        const form = await superValidate(event, zod4(updateTodoFormSchema));
        if (!form.valid) {
            return fail(400, { form });
        }
        console.log("we are here now")
        try {
            await updateTodo({
                todoId: form.data.todoId,
                title: form.data.title,
                status: form.data.status,
                dueDate: form.data.dueDate ? new Date(form.data.dueDate) : undefined
            });
            return { submitTodoForm: form };
        } catch (error) {
            console.error(error);
            return fail(500, { form });
        }
    },
    deleteTodo: async (event) => {
        const form = await superValidate(event, zod4(deleteTodoFormSchema));
        if (!form.valid) {
            return fail(400, { form });
        }
        try {
            const userData = await auth.api.getSession({
                headers: event.request.headers
            });

            if (!userData) {
                redirect(308, "/signin");
            }

            await deleteTodo({
                todoId: form.data.todoId,
                userId: userData.session.userId
            });
            return { form };
        } catch (error) {
            console.error(error);
            return fail(500, { form });
        }
    }
};
