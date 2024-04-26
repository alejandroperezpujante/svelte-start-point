import { auth, oauthGithub } from '$lib/server/auth';
import { db } from '$lib/server/db/connection';
import { userTable } from '$lib/server/db/tables';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { error } from '@sveltejs/kit';

interface GitHubUser {
	id: number;
	email: string;
}

export async function GET(event) {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await oauthGithub.validateAuthorizationCode(code);
		const githubUserResponse = await event.fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const githubUser = (await githubUserResponse.json()) as GitHubUser;
		const existingUser = await db.query.userTable.findFirst({
			where: (users, { eq }) => eq(users.githubId, githubUser.id)
		});

		if (!existingUser) {
			const userId = generateId(15);

			try {
				await db.insert(userTable).values({
					id: userId,
					githubId: githubUser.id,
					email: githubUser.email
				});
			} catch (e) {
				console.error('[GitHub OAuth] Error creating user:', e);
				return error(
					500,
					JSON.stringify({
						errors: { message: ['An unexpected error occurred, please try again later.'] }
					})
				);
			}

			const session = await auth.createSession(userId, {});
			const sessionCookie = auth.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/'
				}
			});
		}

		const session = await auth.createSession(existingUser.id, {});
		const sessionCookie = auth.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		console.error('Error during GitHub OAuth callback:', e);
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}
