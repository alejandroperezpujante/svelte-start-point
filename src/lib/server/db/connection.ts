import SQLite from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { SQLITE_FILENAME } from '$env/static/private';
import { isDefined } from '$lib/shared-validation';
import * as schema from './tables';

let _sql: SQLite.Database | null = null;

export function getSQL() {
	if (!isDefined(_sql)) {
		_sql = new SQLite(SQLITE_FILENAME);
	}

	return _sql;
}

export const db = drizzle(getSQL(), { schema });
