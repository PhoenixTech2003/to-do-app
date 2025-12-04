<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import DeleteTodoForm from './todo-forms/DeleteTodoForm.svelte';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import type { DeleteTodoFormSchemaType } from './todo-forms/schema';
	import { Trash2 } from 'lucide-svelte';

	let {
		data,
		todoId
	}: {
		data: { deleteTodoForm: SuperValidated<Infer<DeleteTodoFormSchemaType>> };
		todoId: string;
	} = $props();
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button variant="ghost" size="icon" class="text-destructive hover:text-destructive">
			<Trash2 class="h-4 w-4" />
		</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete this task.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<DeleteTodoForm {data} {todoId} />
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
