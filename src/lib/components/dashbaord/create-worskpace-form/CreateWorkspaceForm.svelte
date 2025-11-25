<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type CreateWorkspaceFormSchemaType, createWorkspaceFormSchema } from './form-schema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zod4Client } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<CreateWorkspaceFormSchemaType>> } } = $props();

	const form = superForm(data.form, {
		validators: zod4Client(createWorkspaceFormSchema)
	});

	const { form: formData, enhance } = form;
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
	<Form.Button>Submit</Form.Button>
</form>
