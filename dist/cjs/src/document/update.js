"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDocument = updateDocument;
const fetch_1 = __importDefault(require("../util/fetch"));
async function updateDocument({ apiKey, apiUrl, debug, collectionId, documentId, name, instructions, job }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/document/${documentId}`, apiUrl);
    const payload = await fetch(url, {
        method: 'PATCH',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            name,
            instructions,
            job
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error updating the document'
        };
    }
    const response = (await payload.json());
    return response;
}
