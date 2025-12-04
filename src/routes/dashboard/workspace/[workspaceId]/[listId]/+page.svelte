<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Calendar, Filter, CheckCircle2, AlertCircle, CalendarDays } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import CreateTodoDialog from '$lib/components/workspace/CreateTodoDialog.svelte';
	import UpdateTodoDialog from '$lib/components/workspace/UpdateTodoDialog.svelte';
	import DeleteTodoDialog from '$lib/components/workspace/DeleteTodoDialog.svelte';
	import { enhance } from '$app/forms';
	import SubmitTodoForm from '$lib/components/workspace/todo-forms/SubmitTodoForm.svelte';

	let { data } = $props();

	function handleTabChange(userId: string) {
		const params = new URLSearchParams();
		params.set('userId', userId);
		if (data.taskstatus) {
			params.set('taskstatus', data.taskstatus);
		}
		if (data.date) {
			params.set('date', data.date);
		}
		goto(`/dashboard/workspace/${data.workspaceId}/${data.listId}?${params.toString()}`);
	}

	// Get heading based on filter
	const pageHeading = (() => {
		const listName = data.list?.title || 'Project Todos';
		switch (data.taskstatus) {
			case 'today':
				return "Today's Tasks";
			case 'overdue':
				return 'Overdue Tasks';
			case 'completed':
				return 'Completed Tasks';
			default:
				return listName;
		}
	})();

	// Build filter link URLs
	function getFilterUrl(taskstatus: string | null) {
		const params = new URLSearchParams();
		if (data.selectedUserId) {
			params.set('userId', data.selectedUserId);
		}
		if (taskstatus) {
			params.set('taskstatus', taskstatus);
		}
		if (data.date) {
			params.set('date', data.date);
		}
		return `/dashboard/workspace/${data.workspaceId}/${data.listId}?${params.toString()}`;
	}
</script>

<div class="container mx-auto max-w-4xl py-4 md:py-8 px-4 md:px-0 relative">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-2xl md:text-3xl font-bold text-gray-800">{pageHeading}</h1>
			<p class="text-gray-500">Manage tasks for your team</p>
		</div>
		<CreateTodoDialog {data} />
	</div>

	<!-- Floating Filter Menu -->
	<div class="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="flex items-center justify-center rounded-full border border-input bg-background shadow-lg hover:bg-accent hover:text-accent-foreground h-10 w-10 transition-colors"
			>
				<Filter class="h-5 w-5" />
				<span class="sr-only">Filter tasks</span>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end" class="w-48">
				<DropdownMenu.Label>Filter Tasks</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item 
					onSelect={() => goto(getFilterUrl(null))} 
					class={!data.taskstatus ? 'bg-accent' : ''}
				>
					<CalendarDays class="mr-2 h-4 w-4" />
					<span>All Tasks</span>
				</DropdownMenu.Item>
				<DropdownMenu.Item 
					onSelect={() => goto(getFilterUrl('today'))} 
					class={data.taskstatus === 'today' ? 'bg-accent' : ''}
				>
					<Calendar class="mr-2 h-4 w-4" />
					<span>Today</span>
				</DropdownMenu.Item>
				<DropdownMenu.Item 
					onSelect={() => goto(getFilterUrl('overdue'))} 
					class={data.taskstatus === 'overdue' ? 'bg-accent' : ''}
				>
					<AlertCircle class="mr-2 h-4 w-4" />
					<span>Overdue</span>
				</DropdownMenu.Item>
				<DropdownMenu.Item 
					onSelect={() => goto(getFilterUrl('completed'))} 
					class={data.taskstatus === 'completed' ? 'bg-accent' : ''}
				>
					<CheckCircle2 class="mr-2 h-4 w-4" />
					<span>Completed</span>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>

	<Tabs.Root value={data.selectedUserId} onValueChange={handleTabChange} class="w-full">
		<Tabs.List class="mb-8 flex w-full justify-start gap-2 overflow-x-auto bg-transparent p-0">
			{#if data.workspaceMembers}
				{#each data.workspaceMembers as member (member.user.id)}
					<Tabs.Trigger
						value={member.user.id}
						class="flex items-center gap-2 rounded-t-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-sm"
					>
						<Avatar class="h-6 w-6">
							<AvatarImage src={member.user.image} alt={member.user.name} />
							<AvatarFallback>{member.user.name?.charAt(0)}</AvatarFallback>
						</Avatar>
						<span>{member.user.name}</span>
					</Tabs.Trigger>
				{/each}
			{/if}
		</Tabs.List>

		<div
			class="min-h-[400px] md:min-h-[600px] rounded-lg bg-white p-4 md:p-8 shadow-lg"
			style="background-image: linear-gradient(#e5e7eb 1px, transparent 1px); background-size: 100% 2rem; background-attachment: local;"
		>
			{#if !data.listTodos || data.listTodos.length === 0}
				<div class="flex h-full flex-col items-center justify-center pt-20 text-gray-400">
					<p class="text-xl italic">
						{#if data.taskstatus === 'today'}
							No tasks due today.
						{:else if data.taskstatus === 'overdue'}
							No overdue tasks.
						{:else if data.taskstatus === 'completed'}
							No completed tasks.
						{:else}
							No tasks found for this user.
						{/if}
					</p>
				</div>
			{:else}
				<div class="flex flex-col pt-1">
					<!-- Header Row -->
					<div class="hidden md:grid md:grid-cols-[1fr_120px_150px_120px] gap-4 py-4 border-b-2 border-gray-200 bg-gray-50 mb-4 sticky top-0 z-10">
						<div class="font-bold text-sm uppercase tracking-wide text-gray-700 py-2">Task</div>
						<div class="font-bold text-sm uppercase tracking-wide text-gray-700 py-2 text-center">Status</div>
						<div class="font-bold text-sm uppercase tracking-wide text-gray-700 py-2 text-center">Due Date</div>
						<div class="font-bold text-sm uppercase tracking-wide text-gray-700 py-2 text-center">Actions</div>
					</div>

					<!-- Todo Items -->
					<div class="space-y-4 md:space-y-0">
						{#each data.listTodos as todo (todo.id)}
							<!-- Mobile: Card Layout -->
							<Card.Root class="md:hidden">
								<Card.Content class="pt-6">
									<div class="flex flex-col gap-4">
										<!-- Task Title -->
										<div class="flex items-start justify-between gap-2">
											<SubmitTodoForm {data} {todo} />
										</div>

										<!-- Status and Due Date Row -->
										<div class="flex items-center justify-between gap-4">
											<!-- Status -->
											<div class="flex items-center gap-2">
												<span class="text-xs font-medium text-gray-500">Status:</span>
												<span
													class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {todo.status === 'COMPLETED'
														? 'bg-green-100 text-green-800'
														: todo.status === 'OVERDUE'
															? 'bg-red-100 text-red-800'
															: 'bg-blue-100 text-blue-800'}"
												>
													{todo.status || 'IN PROGRESS'}
												</span>
											</div>

											<!-- Due Date -->
											<div class="flex items-center gap-2 text-sm {todo.status === 'COMPLETED' ? 'text-gray-400' : ''}">
												<Calendar class="h-4 w-4" />
												<span>{new Date(todo.dueDate).toLocaleDateString()}</span>
											</div>
										</div>

										<!-- Actions -->
										<div class="flex items-center justify-end gap-2 pt-2 border-t">
											<UpdateTodoDialog
												{data}
												todoId={todo.id}
												title={todo.title}
												dueDate={new Date(todo.dueDate).toISOString()}
											/>
											<DeleteTodoDialog {data} todoId={todo.id} />
										</div>
									</div>
								</Card.Content>
							</Card.Root>

							<!-- Desktop: Table Layout -->
							<div class="hidden md:grid md:grid-cols-[1fr_120px_150px_120px] md:gap-4 md:items-center md:py-2 group">
								<!-- Task Column -->
								<div class="flex items-center min-h-8 justify-start">
									<SubmitTodoForm {data} {todo} />
								</div>

								<!-- Status Column -->
								<div class="flex items-center min-h-8 justify-center">
									<span
										class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {todo.status === 'COMPLETED'
											? 'bg-green-100 text-green-800'
											: todo.status === 'OVERDUE'
												? 'bg-red-100 text-red-800'
												: 'bg-blue-100 text-blue-800'}"
									>
										{todo.status || 'IN PROGRESS'}
									</span>
								</div>

								<!-- Due Date Column -->
								<div class="flex items-center min-h-8 justify-center {todo.status === 'COMPLETED' ? 'text-gray-400' : ''}">
									<div class="flex items-center gap-2 text-sm">
										<Calendar class="h-3 w-3" />
										<span>{new Date(todo.dueDate).toLocaleDateString()}</span>
									</div>
								</div>

								<!-- Actions Column -->
								<div class="flex items-center min-h-8 justify-center">
									<div class="flex gap-2">
										<UpdateTodoDialog
											{data}
											todoId={todo.id}
											title={todo.title}
											dueDate={new Date(todo.dueDate).toISOString()}
										/>
										<DeleteTodoDialog {data} todoId={todo.id} />
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</Tabs.Root>
</div>
