<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import CreateWorkspaceForm from './create-worskpace-form/CreateWorkspaceForm.svelte';
	import type { CreateWorkspaceFormSchemaType } from './create-worskpace-form/form-schema';
	import { Button } from '$lib/components/ui/button';
	import { Plus } from 'lucide-svelte';

	let { data }: { data: { form: SuperValidated<Infer<CreateWorkspaceFormSchemaType>> } } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button>
			<Plus class="mr-2 h-4 w-4" />
			Create Workspace
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create a Workspace to invite Your buddy</Dialog.Title>
			<Dialog.Description>
				This action will create a workspace for your TwoDo lists
			</Dialog.Description>
			<CreateWorkspaceForm {data} />
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
