<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import { Calendar as CalendarComponent } from '$lib/components/ui/calendar';
	import { createTodoFormSchema, type CreateTodoFormSchemaType } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { CalendarIcon } from 'lucide-svelte';
	import { DateFormatter, type DateValue } from '@internationalized/date';
	import { cn } from '$lib/utils';

	let { data }: { data: { createTodoForm: SuperValidated<Infer<CreateTodoFormSchemaType>> } } =
		$props();

	const form = superForm(data.createTodoForm, {
		validators: zod4Client(createTodoFormSchema)
	});

	const { form: formData, enhance } = form;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value = $state<DateValue | undefined>(undefined);

	$effect(() => {
		if (value) {
			$formData.dueDate = value.toString();
		}
	});
</script>

<form method="POST" action="?/createTodo" use:enhance>
	<Form.Field {form} name="title">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Title</Form.Label>
				<Input {...props} bind:value={$formData.title} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="dueDate" class="flex flex-col">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Due Date</Form.Label>
				<Popover.Root>
					<Popover.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="outline"
								class={cn(
									'w-full justify-start text-left font-normal',
									!value && 'text-muted-foreground'
								)}
							>
								<CalendarIcon class="mr-2 h-4 w-4" />
								{value ? df.format(value.toDate('UTC')) : 'Pick a date'}
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0">
						<CalendarComponent type="single" bind:value initialFocus />
					</Popover.Content>
				</Popover.Root>
				<input type="hidden" {...props} bind:value={$formData.dueDate} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-4">Submit</Form.Button>
</form>
