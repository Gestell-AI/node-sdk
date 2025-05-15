"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = createCollection;
const fetch_1 = __importDefault(require("../util/fetch"));
async function createCollection({ apiKey, apiUrl, debug, organizationId, name, description, type, tags, pii, piiControls, instructions, graphInstructions, promptInstructions, searchInstructions, categories }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection`, apiUrl);
    const payload = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            organizationId,
            name,
            description,
            type,
            tags,
            pii,
            piiControls,
            instructions,
            graphInstructions,
            promptInstructions,
            searchInstructions,
            categories
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error creating a collection',
            id: ''
        };
    }
    const response = (await payload.json());
    return response;
}
