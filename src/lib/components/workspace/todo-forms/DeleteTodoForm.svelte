<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { deleteTodoFormSchema, type DeleteTodoFormSchemaType } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';

	let {
		data,
		todoId
	}: {
		data: { deleteTodoForm: SuperValidated<Infer<DeleteTodoFormSchemaType>> };
		todoId: string;
	} = $props();

	const form = superForm(data.deleteTodoForm, {
		validators: zod4Client(deleteTodoFormSchema)
	});

	const { form: formData, enhance } = form;
	$formData.todoId = todoId;
</script>

<form method="POST" action="?/deleteTodo" use:enhance>
	<input type="hidden" name="todoId" value={todoId} />
	<Form.Button variant="destructive">Delete</Form.Button>
</form>
