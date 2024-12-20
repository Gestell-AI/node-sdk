"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganizations = getOrganizations;
const fetch_1 = __importDefault(require("../util/fetch"));
async function getOrganizations({ apiKey, apiUrl, debug, search = '', take = 10, skip = 0, extended = false }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/organization`, apiUrl);
    url.searchParams.set('search', search);
    url.searchParams.set('take', take.toString());
    url.searchParams.set('skip', skip.toString());
    url.searchParams.set('extended', extended.toString());
    const payload = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `BEARER ${apiKey}`
        }
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error retrieving organizations',
            result: []
        };
    }
    const response = (await payload.json());
    return response;
}
