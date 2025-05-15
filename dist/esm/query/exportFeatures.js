"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportFeatures = exportFeatures;
const fetch_1 = __importDefault(require("../util/fetch"));
async function exportFeatures({ apiKey, apiUrl, debug, collectionId, categoryId, format = 'json', skip = 0, take = 10 }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/features/export?categoryId=${categoryId}&format=${format}&skip=${skip}&take=${take}`, apiUrl);
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
            message: errorResponse?.message || 'There was an error exporting the table',
            result: []
        };
    }
    if (format === 'json') {
        const response = (await payload.json());
        return response;
    }
    else {
        return await payload.text();
    }
}
