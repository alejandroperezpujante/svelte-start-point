<script>
	export let data;
</script>


{#if data.isUserLoggedIn}
	<p>Welcome {data.user.email}</p>
{:else}
	<p>
		Welcome to the Svelte Start Point template!
	</p>
{/if}
