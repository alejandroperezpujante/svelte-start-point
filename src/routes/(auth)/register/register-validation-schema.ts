import { emailSchema, passwordSchema, safeValidate } from '$lib/shared-validation';
import { custom, forward, object } from 'valibot';

export const registerValidationSchema = object(
	{
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: passwordSchema
	},
	[
		// Forwards the custom validation error to the confirmPassword field.
		forward(
			// Validate that the password and confirmPassword fields match.
			custom(
				({ password, confirmPassword }) => password === confirmPassword,
				'Passwords do not match'
			),
			['confirmPassword']
		)
	]
);

export function validateRegisterForm(form: unknown) {
	return safeValidate(registerValidationSchema, form);
}
