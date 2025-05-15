"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SetupClientOptions;
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
function SetupClientOptions(client = {}) {
    const apiKey = client.key ??
        (typeof process !== 'undefined' ? process.env.GESTELL_API_KEY : '') ??
        '';
    const apiUrl = client.url ??
        (typeof process !== 'undefined'
            ? process.env.GESTELL_API_URL
            : undefined) ??
        'https://platform.gestell.ai';
    const debug = client.debug ?? false;
    return { apiKey, apiUrl, debug };
}
