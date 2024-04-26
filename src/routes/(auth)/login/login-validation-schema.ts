import { emailSchema, passwordSchema, safeValidate } from '$lib/shared-validation';
import { object } from 'valibot';

export const loginValidationSchema = object({
	email: emailSchema,
	password: passwordSchema
});

export function validateLoginForm(form: unknown) {
	return safeValidate(loginValidationSchema, form)
}
