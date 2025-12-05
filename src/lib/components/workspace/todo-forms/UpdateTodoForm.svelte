<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { updateTodoFormSchema, type UpdateTodoFormSchemaType } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';

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

	const form = superForm(data.updateTodoForm, {
		validators: zod4Client(updateTodoFormSchema)
	});

	const { form: formData, enhance } = form;

	$formData.todoId = todoId;
	$formData.title = title;
	$formData.dueDate = dueDate ? new Date(dueDate).toISOString().split('T')[0] : '';
</script>

<form method="POST" action="?/updateTodo" use:enhance>
	<input type="hidden" name="todoId" value={todoId} />
	<Form.Field {form} name="title">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Title</Form.Label>
				<Input {...props} bind:value={$formData.title} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="dueDate">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Due Date</Form.Label>
				<Input type="date" {...props} bind:value={$formData.dueDate} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-4">Update</Form.Button>
</form>
