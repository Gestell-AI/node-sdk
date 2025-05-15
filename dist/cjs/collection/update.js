"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCollection = updateCollection;
const fetch_1 = __importDefault(require("../util/fetch"));
async function updateCollection({ apiKey, apiUrl, debug, collectionId, organizationId, name, type, description, pii, piiControls, instructions, graphInstructions, promptInstructions, searchInstructions, tags }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}`, apiUrl);
    const payload = await fetch(url, {
        method: 'PATCH',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            organizationId,
            name,
            description,
            type,
            pii,
            piiControls,
            instructions,
            graphInstructions,
            promptInstructions,
            searchInstructions,
            tags
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error updating the collection'
        };
    }
    const response = (await payload.json());
    return response;
}
