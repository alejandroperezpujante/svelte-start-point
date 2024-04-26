import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '$lib/server/db/connection';
import { sessionTable, userTable } from '$lib/server/db/tables';
import { GitHub } from 'arctic';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { Argon2id } from 'oslo/password';

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => ({
		email: attributes.email,
		githubId: attributes.githubId
	})
});

const argon2id = new Argon2id();
// We call .bind() to ensure that the
// methods are called with the correct context.
export const passwordUtils = {
	hash: argon2id.hash.bind(argon2id),
	verify: argon2id.verify.bind(argon2id)
};

export const oauthGithub = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

type DatabaseUserAttributes = {
	email: string;
	githubId: number | null | undefined;
};

declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
