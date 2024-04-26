import { isDefined } from '$lib/shared-validation';
import type { User } from 'lucia';
import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

type RootLayoutProps = { isUserLoggedIn: true; user: User } | { isUserLoggedIn: false; user: null };

export function load({ locals }) {
	const isUserLoggedIn = isDefined(locals.user) && isDefined(locals.session);

	return {
		isUserLoggedIn,
		user: locals.user
	} as RootLayoutProps;
}
