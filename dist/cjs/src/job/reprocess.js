"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reprocessDocument = reprocessDocument;
const fetch_1 = __importDefault(require("../util/fetch"));
async function reprocessDocument({ apiKey, apiUrl, debug, collectionId, ids, type }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/job`, apiUrl);
    const payload = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            ids,
            type
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error reprocessing jobs'
        };
    }
    const response = (await payload.json());
    return response;
}
