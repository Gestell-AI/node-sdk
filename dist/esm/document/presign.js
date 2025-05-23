"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presignDocument = presignDocument;
const fetch_1 = __importDefault(require("../util/fetch"));
async function presignDocument({ apiKey, apiUrl, debug, collectionId, filename, type }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/document/presign`, apiUrl);
    const payload = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            filename,
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
            message: errorResponse?.message || 'There was an error presigning the document',
            path: '',
            url: ''
        };
    }
    const response = (await payload.json());
    return response;
}
