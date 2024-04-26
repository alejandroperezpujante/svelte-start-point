<script>
	import { enhance } from '$app/forms';
	import { isDefined } from '$lib/shared-validation';

	export let form;
</script>

<main class="flex-1 space-y-4 content-center">
	<form method="post" class="max-w-xs mx-auto space-y-8" use:enhance>
		<fieldset class="space-y-4">
			<div class="space-y-2">
				<label for="email" class="form-label">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					class="form-text-input"
					aria-describedby="email-error"
					aria-invalid={isDefined(form?.errors.email) ? 'true' : undefined}
					autocomplete="email"
					required
				/>
				<span id="email-error" class="text-red-500" aria-live="assertive">
				{#if isDefined(form?.errors.email)}
					{form?.errors.email}
				{/if}
			</span>
			</div>
			<div class="space-y-2">
				<label for="password" class="form-label">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					class="form-text-input"
					aria-describedby="password-error"
					aria-invalid={isDefined(form?.errors.password) ? 'true' : undefined}
					autocomplete="current-password"
					required
				/>
				<span id="password-error" class="text-red-500" aria-live="assertive">
				{#if isDefined(form?.errors.password)}
					{form?.errors.password}
				{/if}
			</span>
			</div>
		</fieldset>

		<button type="submit" class="primary-button w-full">Login</button>
	</form>

	<a href="/api/oauth/github" class="block text-center text-blue-500">Login with GitHub</a>
</main>
