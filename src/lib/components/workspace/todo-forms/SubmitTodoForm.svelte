<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import {
		submitTodoFormSchema,
		type SubmitTodoFormSchemaType
	} from '$lib/components/workspace/todo-forms/schema';
	import { CheckCircle2 } from 'lucide-svelte';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';

	type Todo = {
		id: string;
		title: string;
		status: 'IN PROGRESS' | 'COMPLETED' | 'OVERDUE' | null;
		dueDate: Date;
	};

	let {
		data,
		todo
	}: {
		data: { submitTodoForm: SuperValidated<Infer<SubmitTodoFormSchemaType>>, workspaceId: string, listId: string };
		todo: Todo;
	} = $props();

	// Initialize form with default values from todo
	const form = superForm(
		{
			...data.submitTodoForm,
			data: {
				todoId: todo.id,
				title: todo.title,
				status: undefined // Status is calculated conditionally on submit
			}
		},
		{
			validators: zod4Client(submitTodoFormSchema),
			resetForm: false
		}
	);
	const { form: formData, enhance } = form;

	// Ensure form values are always in sync with todo (except status which is conditional)
	$effect(() => {
		$formData.todoId = todo.id;
		$formData.title = todo.title;
	});
</script>

<form method="POST" action="/dashboard/workspace/{data.workspaceId}/{data.listId}/?/updateTodo" use:enhance class="flex items-center gap-3">
	<Form.Button
		type="submit"
		variant="ghost"
		size="sm"
		class="h-10 w-10 p-0 transition-colors {todo.status === 'COMPLETED'
			? 'text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700'
			: 'text-gray-400 hover:text-green-600 hover:bg-green-50'}"
		title={todo.status === 'COMPLETED' ? 'Mark as in progress' : 'Mark as completed'}
	>
		<CheckCircle2 class="h-5 w-5" />
		<span class="sr-only">Toggle completion</span>
	</Form.Button>
	<Form.Field {form} name="todoId">
		<Form.Control>
			{#snippet children({ props })}
				<Input {...props} type="hidden" bind:value={$formData.todoId} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="status">
		<Form.Control>
			{#snippet children({ props })}
				<Input
					{...props}
					type="hidden"
					value={todo.status === 'COMPLETED' ? 'IN PROGRESS' : 'COMPLETED'}
					name="status"
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="title">
		<Form.Control>
			{#snippet children({ props })}
				<Input {...props} type="hidden" bind:value={$formData.title} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Label class="text-lg font-medium">{todo.title}</Label>

	
</form>
