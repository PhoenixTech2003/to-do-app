<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { SuperValidated } from 'sveltekit-superforms';
	import Button from '../ui/button/button.svelte';
	import type { Infer } from 'zod';
	import type { CreateListFormType } from './create-list-form/form-schema';
	import CreateListForm from './create-list-form/CreateListForm.svelte';
	let { data }: { data: { createListForm: SuperValidated<Infer<CreateListFormType>> } } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button>Create List</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create a List</Dialog.Title>
			<Dialog.Description>
				This will create a list where you can organise your tasks
			</Dialog.Description>
			<CreateListForm {data} />
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
