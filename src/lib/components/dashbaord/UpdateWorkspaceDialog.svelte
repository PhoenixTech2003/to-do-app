<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import UpdateWorkspaceForm from './update-workspace-form/UpdateWorkspaceForm.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { UpdateWorkspaceFormSchemaType } from './update-workspace-form/form-schema';
	import { Button } from '$lib/components/ui/button';
	import { Pencil } from 'lucide-svelte';

	let {
		data,
		workspaceID,
		workspaceName
	}: {
		data: { updateForm: SuperValidated<Infer<UpdateWorkspaceFormSchemaType>> };
		workspaceID: string;
		workspaceName: string;
	} = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button variant="outline" size="sm" class="flex-1">
			<Pencil class="mr-2 h-4 w-4" />
			Edit
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Update Workspace</Dialog.Title>
			<Dialog.Description>Update the name of your workspace.</Dialog.Description>
			<UpdateWorkspaceForm {data} {workspaceID} {workspaceName} />
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
