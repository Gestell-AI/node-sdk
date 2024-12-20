"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuery = searchQuery;
const query_1 = require("../types/query");
const fetch_1 = __importDefault(require("../util/fetch"));
async function searchQuery({ apiKey, apiUrl, debug, collectionId, categoryId = '', prompt, method = 'normal', type = query_1.QueryKV[method].type, vectorDepth = query_1.QueryKV[method].vectorDepth, nodeDepth = query_1.QueryKV[method].nodeDepth, maxQueries = query_1.QueryKV[method].maxQueries, maxResults = query_1.QueryKV[method].maxResults, includeContent = true, includeEdges = false }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/search`, apiUrl);
    const payload = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            categoryId,
            prompt,
            method,
            type,
            vectorDepth,
            nodeDepth,
            maxQueries,
            maxResults,
            includeContent,
            includeEdges
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error running the search query',
            result: []
        };
    }
    const response = (await payload.json());
    return response;
}
