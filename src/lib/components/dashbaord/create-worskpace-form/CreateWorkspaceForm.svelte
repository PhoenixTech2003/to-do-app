<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type CreateWorkspaceFormSchemaType, createWorkspaceFormSchema } from './form-schema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	let { data }: { data: { form: SuperValidated<Infer<CreateWorkspaceFormSchemaType>> } } = $props();
	let creating = $state(false);
	const form = superForm(data.form, {
		validators: zod4Client(createWorkspaceFormSchema),
		delayMs: 500,
		onSubmit: () => {
			toast.loading('Creating workspace');
		},
		onResult({ result }) {
			toast.dismiss();
			if (result.type === 'success') {
				toast.success('Workspace created successfully');
			}
			if (result.type === 'failure') {
				toast.error('Failed to create workspace');
			}
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="workspaceName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Workspace Name</Form.Label>
				<Input {...props} bind:value={$formData.workspaceName} />
			{/snippet}
		</Form.Control>
		<Form.Description>This is the name of the workspace for your Twodo lists</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button disabled={$delayed}
		>{#if !delayed}Submit{:else}
			Creating Workspace
		{/if}</Form.Button
	>
</form>
