<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type UpdateWorkspaceFormSchemaType, updateWorkspaceFormSchema } from './form-schema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	let {
		data,
		workspaceID,
		workspaceName
	}: {
		data: { updateForm: SuperValidated<Infer<UpdateWorkspaceFormSchemaType>> };
		workspaceID: string;
		workspaceName: string;
	} = $props();

	const form = superForm(data.updateForm, {
		validators: zod4Client(updateWorkspaceFormSchema),
		id: `update-workspace-${workspaceID}`,
		onSubmit: () => {
			toast.loading('Updating workspace');
		},
		onResult({ result }) {
			toast.dismiss();
			if (result.type === 'success') {
				toast.success('Workspace updated successfully');
			}
			if (result.type === 'failure') {
				toast.error('Failed to update workspace');
			}
		}
	});

	const { form: formData, enhance, delayed, submitting } = form;

	$formData.workspaceID = workspaceID;
	$formData.workspaceName = workspaceName;
</script>

<form method="POST" action="/dashboard?/updateWorkspace" use:enhance>
	<Form.Field {form} name="workspaceName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Workspace Name</Form.Label>
				<Input {...props} bind:value={$formData.workspaceName} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="workspaceID">
		<Form.Control>
			{#snippet children({ props })}
				<Input {...props} bind:value={$formData.workspaceID} hidden />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<input type="hidden" name="workspaceID" bind:value={$formData.workspaceID} />
	<Form.Button disabled={$delayed} class="w-full mt-4"
		>{#if !$submitting}Update Workspace{:else}
			Updating...
		{/if}</Form.Button
	>
</form>
