<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import UpdateTodoForm from './todo-forms/UpdateTodoForm.svelte';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import type { UpdateTodoFormSchemaType } from './todo-forms/schema';
	import { Pencil } from 'lucide-svelte';

	let {
		data,
		todoId,
		title,
		dueDate
	}: {
		data: { updateTodoForm: SuperValidated<Infer<UpdateTodoFormSchemaType>> };
		todoId: string;
		title: string;
		dueDate: string;
	} = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button variant="ghost" size="icon">
			<Pencil class="h-4 w-4" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Update Task</Dialog.Title>
			<Dialog.Description>Update the details of your task.</Dialog.Description>
		</Dialog.Header>
		<UpdateTodoForm {data} {todoId} {title} {dueDate} />
	</Dialog.Content>
</Dialog.Root>
