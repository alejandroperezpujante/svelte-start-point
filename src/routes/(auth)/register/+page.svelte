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
					name="email"
					class="form-text-input"
					id="email"
					aria-describedby="email-errors"
					aria-invalid={isDefined(form?.errors.email) ? 'true' : undefined}
					autocomplete="email"
					required
				/>
				<span id="email-errors" aria-live="assertive">
				{#if isDefined(form?.errors.email)}
					<p class="text-red-600">{form?.errors.email}</p>
				{/if}
			</span>
			</div>

			<div class="space-y-2">
				<label for="password" class="form-label">Password</label>
				<input
					type="password"
					name="password"
					class="form-text-input"
					aria-describedby="password-errors"
					aria-invalid={isDefined(form?.errors.password) ? 'true' : undefined}
					id="password"
					autocomplete="new-password"
					required
				/>
				<span id="password-errors" aria-live="assertive">
				{#if isDefined(form?.errors.password)}
					<p class="text-red-600">{form?.errors.password}</p>
				{/if}
			</span>
			</div>

			<div class="space-y-2">
				<label for="confirmPassword" class="form-label">Confirm Password</label>
				<input
					type="password"
					name="confirmPassword"
					class="form-text-input"
					id="confirmPassword"
					aria-describedby="confirmPassword-errors"
					aria-invalid={isDefined(form?.errors.confirmPassword) ? 'true' : undefined}
					autocomplete="new-password"
					required
				/>
				<span id="confirmPassword-errors" aria-live="assertive">
				{#if isDefined(form?.errors.confirmPassword)}
					<p class="text-red-600">{form?.errors.confirmPassword}</p>
				{/if}
			</span>
			</div>
		</fieldset>

		<button type="submit" class="primary-button w-full">Register</button>
	</form>

	<a href="/api/oauth/github" class="block text-center text-blue-500">Login with GitHub</a>

</main>
