import { GestellOptions } from '../index';
/**
 * Resolved client configuration used by every Gestell service call.
 *
 * @property apiKey - The API key for authentication.
 * @property apiUrl - The Gestell API base URL.
 * @property debug  - Enables verbose logging when `true`.
 */
export interface GestellClient {
    apiKey: string;
    apiUrl: string;
    debug: boolean;
}
/**
 * Converts user-supplied {@link GestellOptions} into a concrete, browser-safe
 * {@link GestellClient} object.
 *
 * **Resolution order (per field)**
 * 1. Explicit value passed in `client`.
 * 2. `process.env` value (only when running in Node-compatible environments).
 * 3. Sensible fallback default.
 *
 * @param client - Partial configuration provided by the SDK consumer.
 * @returns A fully populated, environment-agnostic client configuration.
 */
export default function SetupClientOptions(client?: GestellOptions): GestellClient;
