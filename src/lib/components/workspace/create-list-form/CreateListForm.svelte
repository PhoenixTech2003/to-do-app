<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { Infer } from 'zod';
	import { CreateListFormSchema, type CreateListFormType } from './form-schema';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';

	let { data }: { data: { createListForm: SuperValidated<Infer<CreateListFormType>> } } = $props();
	const form = superForm(data.createListForm, {
		validators: zod4Client(CreateListFormSchema),
		onSubmit: () => {
			toast.loading('Creating list');
		},
		onResult({ result }) {
			toast.dismiss();
			if (result.type === 'success') {
				toast.success('List created successfully');
			}
			if (result.type === 'failure') {
				toast.error('Failed to create list');
			}
		}
	});
	const { enhance, form: formData, delayed, submitting } = form;
</script>

<form method="POST" use:enhance action="?/createList">
	<Form.Field {form} name="listTitle">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>List Title</Form.Label>
				<Input {...props} bind:value={$formData.listTitle} />
			{/snippet}
		</Form.Control>
		<Form.Description>Provide a title and create a list</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button disabled={$delayed} class="w-full mt-4"
		>{#if !$submitting}Create List{:else}
			Creating...
		{/if}</Form.Button
	>
</form>
