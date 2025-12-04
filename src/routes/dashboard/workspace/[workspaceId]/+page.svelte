<script lang="ts">
	import CreateListDialog from '$lib/components/workspace/CreateListDialog.svelte';
	import DeleteListDialog from '$lib/components/workspace/DeleteListDialog.svelte';
	import UpdateListDialog from '$lib/components/workspace/UpdateListDialog.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold">Your Lists</h1>
		<CreateListDialog {data} />
	</div>

	{#if !data.userWorkspaceListsData}
		<p>An error occured while loading your lists</p>
	{:else}
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each data.userWorkspaceListsData.userWorkspaceLists as workspaceList (workspaceList.list.id)}
				<div
					class="rounded-lg border-2 border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
				>
					<a
						href="/dashboard/workspace/{workspaceList.member.workspaceId}/{workspaceList.list.id}"
						class="block"
					>
						<h2 class="mb-4 text-xl font-bold text-primary">{workspaceList.list.title}</h2>
					</a>
					<div class="flex gap-2">
						<UpdateListDialog
							listTitle={workspaceList.list.title}
							listID={workspaceList.list.id}
							{data}
						/>
						<DeleteListDialog
							listTitle={workspaceList.list.title}
							listID={workspaceList.list.id}
							{data}
						/>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
