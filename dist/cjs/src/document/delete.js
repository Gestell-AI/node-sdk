"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = deleteDocument;
const fetch_1 = __importDefault(require("../util/fetch"));
async function deleteDocument({ apiKey, apiUrl, debug, collectionId, documentId }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/document/${documentId}`, apiUrl);
    const payload = await fetch(url, {
        method: 'DELETE',
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
            message: errorResponse?.message || 'There was an error deleting the document'
        };
    }
    const response = (await payload.json());
    return response;
}
