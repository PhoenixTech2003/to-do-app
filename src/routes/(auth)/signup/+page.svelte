<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { authClient } from '$lib/auth';
	import { toast } from 'svelte-sonner';

	function handleGoogleSignUp() {
		const googleSignInHandler = authClient.signIn.social({
			provider: 'google',
			callbackURL: '/dashboard'
		});
		toast.promise(googleSignInHandler, {
			loading: 'Signing up',
			error: 'An error occured while signing up with Google'
		});
	}
</script>

<p>Sign up to TwoDo</p>
<Button onclick={handleGoogleSignUp}>Sign up with Google</Button>
