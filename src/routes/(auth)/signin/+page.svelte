<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { authClient } from '$lib/auth';
	import { toast } from 'svelte-sonner';

	function handleGoogleSignIn() {
		const googleSignInHandler = authClient.signIn.social({
			provider: 'google',
			callbackURL: '/dashboard'
		});
		toast.promise(googleSignInHandler, {
			loading: 'Signing In',
			error: 'An error occured while signing in with Google'
		});
	}
</script>

<p>Sign In to TwoDo</p>
<Button onclick={handleGoogleSignIn}>Sign In with Google</Button>
