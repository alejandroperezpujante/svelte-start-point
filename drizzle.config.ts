import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { isDefined } from './src/lib/shared-validation';

const SQLiteFilename = process.env.SQLITE_FILENAME;
if (!isDefined(SQLiteFilename)) {
	throw new Error('Missing env var SQLITE_FILENAME');
}

export default defineConfig({
	schema: './src/lib/server/db/tables.ts',
	out: './src/lib/server/db/migrations',

	driver: 'better-sqlite',
	dbCredentials: { url: SQLiteFilename },
	strict: true,
	verbose: true
});
