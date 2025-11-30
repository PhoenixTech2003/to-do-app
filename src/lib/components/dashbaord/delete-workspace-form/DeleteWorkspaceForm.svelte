<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type DeleteWorkspaceFormSchemaType, deleteWorkspaceFormSchema } from './form-schema';
	import * as Form from '$lib/components/ui/form';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input';

	let {
		data,
		workspaceID
	}: {
		data: { deleteForm: SuperValidated<Infer<DeleteWorkspaceFormSchemaType>> };
		workspaceID: string;
	} = $props();

	const form = superForm(data.deleteForm, {
		validators: zod4Client(deleteWorkspaceFormSchema),
		id: `delete-workspace-${workspaceID}`,
		onSubmit: () => {
			toast.loading('Deleting workspace');
		},
		onResult({ result }) {
			toast.dismiss();
			if (result.type === 'success') {
				toast.success('Workspace deleted successfully');
			}
			if (result.type === 'failure') {
				toast.error('Failed to delete workspace');
			}
		}
	});

	const { form: formData, enhance, delayed, submitting } = form;

	$formData.workspaceID = workspaceID;
</script>

<form method="POST" action="/dashboard?/deleteWorkspace" use:enhance>
	<Form.Field {form} name="workspaceID">
		<Form.Control>
			{#snippet children({ props })}
				<Input {...props} bind:value={$formData.workspaceID} hidden />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<input type="hidden" name="workspaceID" bind:value={$formData.workspaceID} />
	<AlertDialog.Footer>
		<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
		<Form.Button variant="destructive" type="submit" disabled={$delayed}
			>{#if !$submitting}Delete{:else}
				Deleting...
			{/if}</Form.Button
		>
	</AlertDialog.Footer>
</form>
