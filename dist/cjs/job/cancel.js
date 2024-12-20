"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelJobs = cancelJobs;
const fetch_1 = __importDefault(require("../util/fetch"));
async function cancelJobs({ apiKey, apiUrl, debug, collectionId, ids }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/job`, apiUrl);
    ids.forEach((id) => {
        url.searchParams.append('ids', id);
    });
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
            message: errorResponse?.message || 'There was an error cancelling jobs'
        };
    }
    const response = (await payload.json());
    return response;
}
