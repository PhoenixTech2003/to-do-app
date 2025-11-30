<script lang="ts">
	import CreateWorkspaceDialog from '$lib/components/dashbaord/CreateWorkspaceDialog.svelte';
	import type { PageProps } from './$types';
	import DeleteWorkspaceDialog from '$lib/components/dashbaord/DeleteWorkspaceDialog.svelte';
	import UpdateWorkspaceDialog from '$lib/components/dashbaord/UpdateWorkspaceDialog.svelte';

	let { data }: PageProps = $props();
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold">Your Workspaces</h1>
		<CreateWorkspaceDialog {data} />
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.userWorkSpacesData.userWorkSpaces as userWorkSpace (userWorkSpace.id)}
			<div
				class="rounded-lg border-2 border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
			>
				<a href="dashboard/workspace/{userWorkSpace.id}" class="block">
					<h2 class="mb-4 text-xl font-bold text-primary">{userWorkSpace.name}</h2>
				</a>
				<div class="flex gap-2">
					<UpdateWorkspaceDialog
						workspaceName={userWorkSpace.name}
						workspaceID={userWorkSpace.id}
						{data}
					/>
					<DeleteWorkspaceDialog
						workspaceName={userWorkSpace.name}
						workspaceID={userWorkSpace.id}
						{data}
					/>
				</div>
			</div>
		{/each}
	</div>
</div>
