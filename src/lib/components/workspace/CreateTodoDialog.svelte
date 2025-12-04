<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import CreateTodoForm from './todo-forms/CreateTodoForm.svelte';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import type { CreateTodoFormSchemaType } from './todo-forms/schema';
	import { Plus } from 'lucide-svelte';

	let { data }: { data: { createTodoForm: SuperValidated<Infer<CreateTodoFormSchemaType>> } } =
		$props();
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button>
			<Plus class="mr-2 h-4 w-4" />
			Add Task
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create New Task</Dialog.Title>
			<Dialog.Description>Add a new task to your list.</Dialog.Description>
		</Dialog.Header>
		<CreateTodoForm {data} />
	</Dialog.Content>
</Dialog.Root>
