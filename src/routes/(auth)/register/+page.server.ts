import { type ActionFailure, fail, redirect } from '@sveltejs/kit';
import { validateRegisterForm } from './register-validation-schema';
import { db } from '$lib/server/db/connection';
import { isDefined } from '$lib/shared-validation';
import { generateIdFromEntropySize } from 'lucia';
import { userTable } from '$lib/server/db/tables';
import { auth, passwordUtils } from '$lib/server/auth';

type RegisterActionReturn =
	| ActionFailure<{
			errors: Partial<{
				email: [string, ...string[]];
				password: [string, ...string[]];
				confirmPassword: [string, ...string[]];
				message: [string, ...string[]];
			}>;
	  }>
	| never;

export const actions = {
	default: async ({ request, cookies }): Promise<RegisterActionReturn> => {
		// Get the form data and validate it
		const form = Object.fromEntries(await request.formData());
		const validatedForm = validateRegisterForm(form);
		if (!validatedForm.success) return fail(400, { errors: validatedForm.errors });

		const { email, password } = validatedForm.data;

		// Check if the user already exists
		// and return an email error if they do.
		const existingUser = await db.query.userTable.findFirst({
			where: (users, { eq }) => eq(users.email, email)
		});
		if (isDefined(existingUser)) {
			return fail(400, { errors: { email: ['Email already in use'] } });
		}

		// Create the user
		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await passwordUtils.hash(password);
		try {
			await db.insert(userTable).values({
				id: userId,
				email,
				passwordHash
			});
		} catch (error) {
			console.error('[oauth/register/+page.server.ts] Error creating user:', error);
			return fail(500, { errors: { message: ['Something went wrong, please try again'] } });
		}

		// Generate a new session
		const session = await auth.createSession(userId, {});
		const sessionCookie = auth.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
