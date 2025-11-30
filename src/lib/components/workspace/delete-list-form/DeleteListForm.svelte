<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type DeleteListFormSchemaType, deleteListFormSchema } from './form-schema';
	import * as Form from '$lib/components/ui/form';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input';

	let {
		data,
		listID
	}: {
		data: { deleteForm: SuperValidated<Infer<DeleteListFormSchemaType>> };
		listID: string;
	} = $props();

	const form = superForm(data.deleteForm, {
		validators: zod4Client(deleteListFormSchema),
		id: `delete-list-${listID}`,
		onSubmit: () => {
			toast.loading('Deleting list');
		},
		onResult({ result }) {
			toast.dismiss();
			if (result.type === 'success') {
				toast.success('List deleted successfully');
			}
			if (result.type === 'failure') {
				toast.error('Failed to delete list');
			}
		}
	});

	const { form: formData, enhance, delayed, submitting } = form;

	$formData.listID = listID;
</script>

<form method="POST" action="?/deleteList" use:enhance>
	<Form.Field {form} name="listID">
		<Form.Control>
			{#snippet children({ props })}
				<Input {...props} bind:value={$formData.listID} hidden />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<input type="hidden" name="listID" bind:value={$formData.listID} />
	<AlertDialog.Footer>
		<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
		<Form.Button variant="destructive" type="submit" disabled={$delayed}
			>{#if !$submitting}Delete{:else}
				Deleting...
			{/if}</Form.Button
		>
	</AlertDialog.Footer>
</form>

