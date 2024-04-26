import { redirect } from '@sveltejs/kit';
import { oauthGithub } from '$lib/server/auth';
import { generateState } from 'arctic';

export async function GET(event) {
	const state = generateState();
	const url = await oauthGithub.createAuthorizationURL(state, {
		scopes: ['user:email']
	});

	event.cookies.set('github_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	redirect(302, url.toString());
}
