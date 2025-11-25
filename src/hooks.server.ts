import { auth } from "$lib/auth.server"; // path to your auth file
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from '$app/environment'
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
    const session = await auth.api.getSession({
        headers: event.request.headers,
    });
    const protectedroute = event.route.id?.startsWith("/dashboard")

    if (protectedroute) {
        if (!session) {
            redirect(307, "/")
        }
    }
    if (session) {
        event.locals.session = session.session;
        event.locals.user = session.user;
    }
    return svelteKitHandler({ event, resolve, auth, building });
}