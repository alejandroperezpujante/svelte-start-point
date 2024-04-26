import { redirect } from '@sveltejs/kit';
import { isDefined } from '$lib/shared-validation';

export function load({ locals }) {
	if (isDefined(locals.user)) redirect(302, '/');
}
