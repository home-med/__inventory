// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {PocketBase} from 'pocketbase';

declare global {
	namespace App {
		interface Error {
			message: string,
			errorId: string
		}
		interface Locals {
			pb: PocketBase
			authClient: any
			brands: any[]
			vendors: any[]
			sessionId: string
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
