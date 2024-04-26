<script>
	import '../app.pcss'
	import { enhance } from '$app/forms';

	export let data;
</script>

<svelte:head>
	<title>Svelte Start Point</title>
	<meta
		name="description"
		content="Svelte Start Point is a basic Svelte template with styling through Tailwind CSS, database connection with Drizzle and Auth with Lucia."
	/>
</svelte:head>

<header class="px-4 py-2 flex items-center justify-between">
	<h1 class="text-3xl font-bold">Svelte Start Point</h1>

	{#if data.isUserLoggedIn}
		<form action="/?/logout" method="post" use:enhance>
			<button type="submit">Log Out</button>
		</form>
	{:else}
		<nav class="space-x-4">
			<a href="/login" class="link">Log In</a>
			<a href="/register" class="primary-button">Create new account</a>
		</nav>
	{/if}
</header>

<slot />
