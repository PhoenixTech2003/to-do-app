<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { authClient } from '$lib/auth';
	import { toast } from 'svelte-sonner';
	import { ArrowLeft } from 'lucide-svelte';
	import GoogleLogo from '$lib/components/auth/GoogleLogo.svelte';

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

<div
	class="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center p-4 font-['Patrick_Hand']"
>
	<div class="w-full max-w-md">
		<Button variant="ghost" href="/" class="mb-8 pl-0 hover:bg-transparent hover:text-primary">
			<ArrowLeft class="mr-2 h-4 w-4" /> Back to Home
		</Button>

		<div class="bg-white rounded-2xl border-2 border-slate-100 p-8 shadow-sm text-center">
			<h1 class="text-4xl font-bold text-primary mb-2">Welcome Back</h1>
			<p class="text-slate-500 text-lg mb-8">Sign in to continue to your workspace</p>

			<Button
				onclick={handleGoogleSignIn}
				class="w-full h-12 text-lg rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
				variant="outline"
			>
				<GoogleLogo class="mr-2 h-5 w-5" />
				Continue with Google
			</Button>

			<p class="mt-8 text-slate-400 text-sm">
				Don't have an account? <a href="/signup" class="text-primary hover:underline font-bold"
					>Sign up</a
				>
			</p>
		</div>
	</div>
</div>
