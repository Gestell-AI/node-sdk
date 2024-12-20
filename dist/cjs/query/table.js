"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tablesQuery = tablesQuery;
const fetch_1 = __importDefault(require("../util/fetch"));
async function tablesQuery({ apiKey, apiUrl, debug, collectionId, categoryId, skip = 0, take = 10 }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/table`, apiUrl);
    const payload = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            collectionId,
            categoryId,
            skip,
            take
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error running the table query',
            result: []
        };
    }
    const response = (await payload.json());
    return response;
}
