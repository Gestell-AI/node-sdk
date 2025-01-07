"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportDocument = exportDocument;
const fetch_1 = __importDefault(require("../util/fetch"));
async function exportDocument({ apiKey, apiUrl, debug, collectionId, documentId, type = 'json' }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/document/${documentId}/export?type=${type}`, apiUrl);
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
        return 'ERROR EXPORTING DOCUMENT';
    }
    const response = type === 'json'
        ? await payload.json()
        : (await payload.text());
    return response;
}
