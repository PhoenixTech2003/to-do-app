<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import DeleteWorkspaceForm from './delete-workspace-form/DeleteWorkspaceForm.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { DeleteWorkspaceFormSchemaType } from './delete-workspace-form/form-schema';
	import { Button } from '$lib/components/ui/button';
	import { Trash2 } from 'lucide-svelte';

	let {
		workspaceName,
		workspaceID,
		data
	}: {
		workspaceName: string;
		workspaceID: string;
		data: { deleteForm: SuperValidated<Infer<DeleteWorkspaceFormSchemaType>> };
	} = $props();
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button variant="destructive" size="sm" class="flex-1">
			<Trash2 class="mr-2 h-4 w-4" />
			Delete
		</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title
				>Are you sure you want to delete "{workspaceName}" workspace</AlertDialog.Title
			>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the "{workspaceName}" workspace
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<DeleteWorkspaceForm {data} {workspaceID} />
	</AlertDialog.Content>
</AlertDialog.Root>
