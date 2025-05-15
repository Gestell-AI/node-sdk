"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = updateCategory;
const fetch_1 = __importDefault(require("../util/fetch"));
async function updateCategory({ apiKey, apiUrl, debug, collectionId, categoryId, name, type, instructions, singleEntry }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/category`, apiUrl);
    const payload = await fetch(url, {
        method: 'PATCH',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            categoryId,
            name,
            type,
            instructions,
            singleEntry
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error updating the category'
        };
    }
    const response = (await payload.json());
    return response;
}
