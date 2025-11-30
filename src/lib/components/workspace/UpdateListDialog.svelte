<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import UpdateListForm from './update-list-form/UpdateListForm.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { UpdateListFormSchemaType } from './update-list-form/form-schema';
	import { Button } from '$lib/components/ui/button';
	import { Pencil } from 'lucide-svelte';

	let {
		data,
		listID,
		listTitle
	}: {
		data: { updateForm: SuperValidated<Infer<UpdateListFormSchemaType>> };
		listID: string;
		listTitle: string;
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
			<Dialog.Title>Update List</Dialog.Title>
			<Dialog.Description>Update the title of your list.</Dialog.Description>
			<UpdateListForm {data} {listID} {listTitle} />
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

