"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocuments = getDocuments;
const fetch_1 = __importDefault(require("../util/fetch"));
async function getDocuments({ apiKey, apiUrl, debug, collectionId, search = '', take = 10, skip = 0, extended = false, status = 'all', nodes = 'all', edges = 'all', vectors = 'all', category = 'all' }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/document`, apiUrl);
    url.searchParams.set('search', search);
    url.searchParams.set('take', take.toString());
    url.searchParams.set('skip', skip.toString());
    url.searchParams.set('extended', extended.toString());
    url.searchParams.set('status', status);
    url.searchParams.set('nodes', nodes);
    url.searchParams.set('edges', edges);
    url.searchParams.set('vectors', vectors);
    url.searchParams.set('category', category);
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
            message: errorResponse?.message || 'There was an error retrieving documents',
            result: []
        };
    }
    const response = (await payload.json());
    return response;
}
