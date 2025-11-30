<script lang="ts">
	import { authClient } from '$lib/auth';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Briefcase } from 'lucide-svelte';
	import UserProfileDropdown from '$lib/components/dashbaord/UserProfileDropdown.svelte';

	let { children } = $props();

	const session = authClient.useSession();
</script>

<Sidebar.Provider>
	<Sidebar.Sidebar>
		<Sidebar.SidebarHeader>
			<div class="flex items-center gap-2 px-4 py-2">
				<h1 class="text-2xl font-bold">TwoDo</h1>
			</div>
		</Sidebar.SidebarHeader>

		<Sidebar.SidebarContent>
			<Sidebar.SidebarGroup>
				<Sidebar.SidebarGroupLabel>Navigation</Sidebar.SidebarGroupLabel>
				<Sidebar.SidebarGroupContent>
					<Sidebar.SidebarMenu>
						<Sidebar.SidebarMenuItem>
							<Sidebar.SidebarMenuButton>
								<a href="/dashboard" class="flex items-center gap-2">
									<Briefcase class="h-4 w-4" />
									<span>Workspaces</span>
								</a>
							</Sidebar.SidebarMenuButton>
						</Sidebar.SidebarMenuItem>
					</Sidebar.SidebarMenu>
				</Sidebar.SidebarGroupContent>
			</Sidebar.SidebarGroup>
		</Sidebar.SidebarContent>

		<Sidebar.SidebarFooter>
			<Sidebar.SidebarMenu>
				<Sidebar.SidebarMenuItem>
					<UserProfileDropdown />
				</Sidebar.SidebarMenuItem>
			</Sidebar.SidebarMenu>
		</Sidebar.SidebarFooter>
	</Sidebar.Sidebar>

	<Sidebar.SidebarInset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.SidebarTrigger />
			<div class="flex-1">
				{#if $session.data}
					<p class="text-lg">Welcome back, {$session.data.user.name}!</p>
				{/if}
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			{@render children()}
		</div>
	</Sidebar.SidebarInset>
</Sidebar.Provider>
