import {
	type BaseSchema,
	email,
	type FlatErrors,
	flatten,
	maxLength,
	minLength,
	type Output,
	safeParse,
	string,
	toLowerCase,
	toTrimmed
} from 'valibot';

// Boolean coercion with the `!` operator is unsafe and unreliable.
// Instead, use this function to check if a value is defined.
export function isDefined<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}

// Checking a property of an object for null or undefined (the function isDefined does that job) does not tell TypeScript that the property is defined.
// Use this function to check if a property is defined.
export function isDefinedIn<T extends object, K extends keyof T>(
	object: T,
	key: K
): object is T & { [key in K]: Exclude<T[K], null | undefined> } {
	return isDefined(object[key]);
}

export const emailSchema = string([
	toTrimmed(),
	toLowerCase(),
	minLength(1, 'Email field must be provided'),
	email('Email must be a valid email address')
]);

export const passwordSchema = string([
	toTrimmed(),
	minLength(1, 'Password field must be provided'),
	minLength(8, 'Password must be at least 8 characters long'),
	maxLength(64, 'Password must be at most 64 characters long')
]);

export type SafeValidateResult<TSchema extends BaseSchema> =
	| {
			success: true;
			data: Output<TSchema>;
	  }
	| {
			success: false;
			errors: FlatErrors<TSchema>['nested'];
	  };
export function safeValidate<TSchema extends BaseSchema>(
	schema: TSchema,
	data: unknown
): SafeValidateResult<TSchema> {
	const parsedData = safeParse(schema, data);
	if (!parsedData.success)
		return {
			success: false,
			errors: flatten(parsedData.issues).nested
		};

	return { success: true, data: parsedData.output };
}
