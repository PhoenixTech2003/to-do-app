<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { toast } from 'svelte-sonner';
	import { LogOut } from 'lucide-svelte';

	const session = authClient.useSession();

	async function handleSignOut() {
		const signOutHandler = authClient.signOut({
			fetchOptions: { onSuccess: () => goto('/') }
		});
		toast.promise(signOutHandler, {
			loading: 'Signing Out .....',
			success: 'Signed out successfully',
			error: 'An error occured while signing out'
		});
	}
</script>

{#if $session}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			class="flex w-full items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors cursor-pointer"
		>
			<Avatar.Root class="h-10 w-10">
				<Avatar.Image src={$session.data?.user.image} alt={$session.data?.user.name} />
				<Avatar.Fallback>{$session.data?.user.name?.charAt(0)}</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex-1 overflow-hidden text-left">
				<p class="text-sm font-medium truncate">{$session.data?.user.name}</p>
				<p class="text-xs text-muted-foreground truncate">{$session.data?.user.email}</p>
			</div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end" class="w-56">
			<DropdownMenu.Item onclick={handleSignOut}>
				<LogOut class="mr-2 h-4 w-4" />
				Sign Out
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
