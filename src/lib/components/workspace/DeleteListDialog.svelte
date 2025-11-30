<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import DeleteListForm from './delete-list-form/DeleteListForm.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { DeleteListFormSchemaType } from './delete-list-form/form-schema';
	import { Button } from '$lib/components/ui/button';
	import { Trash2 } from 'lucide-svelte';

	let {
		data,
		listID,
		listTitle
	}: {
		data: { deleteForm: SuperValidated<Infer<DeleteListFormSchemaType>> };
		listID: string;
		listTitle: string;
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
			<AlertDialog.Title>Are you sure you want to delete "{listTitle}" list</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the "{listTitle}" list from our
				servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<DeleteListForm {data} {listID} />
	</AlertDialog.Content>
</AlertDialog.Root>
