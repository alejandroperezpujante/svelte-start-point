import { type ActionFailure, fail, redirect } from '@sveltejs/kit';
import { validateLoginForm } from './login-validation-schema';
import { auth, passwordUtils } from '$lib/server/auth';
import { db } from '$lib/server/db/connection';
import { isDefined, isDefinedIn } from '$lib/shared-validation';

type LoginActionReturn =
	| ActionFailure<{
			errors: Partial<{
				email: [string, ...string[]];
				password: [string, ...string[]];
				message: [string, ...string[]];
			}>;
	  }>
	| never;

export const actions = {
	default: async ({ request, cookies }): Promise<LoginActionReturn> => {
		// Get the form data and validate it
		const form = Object.fromEntries(await request.formData());
		const validatedForm = validateLoginForm(form);
		if (!validatedForm.success) return fail(400, { errors: validatedForm.errors });

		const { email, password } = validatedForm.data;

		// Check if the user exists and return an email error if they don't.
		const user = await db.query.userTable.findFirst({
			where: (users, { eq }) => eq(users.email, email)
		});
		if (!isDefined(user)) {
			return fail(400, { errors: { email: ['Email not found'] } });
		}

		// Check if the user has a password set
		const isPasswordPresent = isDefinedIn(user, 'passwordHash');
		if (!isPasswordPresent) {
			return fail(400, {
				errors: { password: ['Password not set, please use the social login you signed up with'] }
			});
		}

		// Check if the password is correct
		const passwordCorrect = await passwordUtils.verify(user.passwordHash, password);
		if (!passwordCorrect) {
			return fail(400, { errors: { password: ['Incorrect password'] } });
		}

		// Generate a new session
		const session = await auth.createSession(user.id, {});
		const sessionCookie = auth.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
