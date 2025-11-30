<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type UpdateListFormSchemaType, updateListFormSchema } from './form-schema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	let {
		data,
		listID,
		listTitle
	}: {
		data: { updateForm: SuperValidated<Infer<UpdateListFormSchemaType>> };
		listID: string;
		listTitle: string;
	} = $props();

	const form = superForm(data.updateForm, {
		validators: zod4Client(updateListFormSchema),
		id: `update-list-${listID}`,
		onSubmit: () => {
			toast.loading('Updating list');
		},
		onResult({ result }) {
			toast.dismiss();
			if (result.type === 'success') {
				toast.success('List updated successfully');
			}
			if (result.type === 'failure') {
				toast.error('Failed to update list');
			}
		}
	});

	const { form: formData, enhance, delayed, submitting } = form;

	$formData.listID = listID;
	$formData.listTitle = listTitle;
</script>

<form method="POST" action="?/updateList" use:enhance>
	<Form.Field {form} name="listTitle">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>List Title</Form.Label>
				<Input {...props} bind:value={$formData.listTitle} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="listID">
		<Form.Control>
			{#snippet children({ props })}
				<Input {...props} bind:value={$formData.listID} hidden />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<input type="hidden" name="listID" bind:value={$formData.listID} />
	<Form.Button disabled={$delayed} class="w-full mt-4"
		>{#if !$submitting}Update List{:else}
			Updating...
		{/if}</Form.Button
	>
</form>

