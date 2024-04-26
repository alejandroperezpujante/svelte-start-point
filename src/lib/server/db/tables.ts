import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('users', {
	id: text('id').primaryKey(),
	githubId: integer('github_id').unique(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash')
});

export const sessionTable = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});
