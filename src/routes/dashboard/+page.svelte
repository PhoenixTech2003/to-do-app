<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import CreateWorkspaceDialog from '$lib/components/dashbaord/CreateWorkspaceDialog.svelte';
	import type { PageProps } from './$types';
	import DeleteWorkspaceDialog from '$lib/components/dashbaord/DeleteWorkspaceDialog.svelte';
	import UpdateWorkspaceDialog from '$lib/components/dashbaord/UpdateWorkspaceDialog.svelte';

	let { data, form }: PageProps = $props();

	const session = authClient.useSession();
	async function handleSignOut() {
		const signOutHandler = authClient.signOut({
			fetchOptions: { onSuccess: () => goto('/') }
		});
		toast.promise(signOutHandler, {
			loading: 'Signing Out .....',
			success: 'Signed out successfully',
			error: 'An error occured while signing out'
		});
	}
</script>

<div>
	{#if $session}
		<Button onclick={handleSignOut}>Sign Out</Button>
		<p>Welome Back {$session.data?.user.name} What would you like to achieve today</p>
	{:else}
		<Button href="/signin">Sign In</Button>
	{/if}
	<CreateWorkspaceDialog {data} />
	<h1 class="text-2xl">Your Workspaces</h1>

	{#each data.userWorkSpacesData.userWorkSpaces as userWorkSpace (userWorkSpace.id)}
		<p>
			<a href="dashboard/workspace/{userWorkSpace.id}">{userWorkSpace.name}</a>
			<DeleteWorkspaceDialog
				workspaceName={userWorkSpace.name}
				workspaceID={userWorkSpace.id}
				{data}
			/>
			<UpdateWorkspaceDialog
				workspaceName={userWorkSpace.name}
				workspaceID={userWorkSpace.id}
				{data}
			/>
		</p>
	{/each}
</div>
