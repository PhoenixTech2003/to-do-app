<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

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

<div>
	{#if $session}
		<Button onclick={handleSignOut}>Sign Out</Button>
		<p>Welome Back {$session.data?.user.name} What would you like to achieve today</p>
	{:else}
		<Button href="/signin">Sign In</Button>
	{/if}
</div>
