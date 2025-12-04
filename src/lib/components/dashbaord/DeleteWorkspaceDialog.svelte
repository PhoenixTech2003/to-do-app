<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	let { workspaceName, workspaceId }: { workspaceName: string; workspaceId: string } = $props();
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>Delete</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title
				>Are you sure you want to delete "{workspaceName}" workspace</AlertDialog.Title
			>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the "{workspaceName}" workspace
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
