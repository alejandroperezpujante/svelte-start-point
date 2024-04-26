// See https://www.totaltypescript.com/ts-reset for more information.
// Essentially, this file is a series of TypeScript definitions overrides for better type-checking and more secure code.
import '@total-typescript/ts-reset';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
