"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganization = getOrganization;
const fetch_1 = __importDefault(require("../util/fetch"));
async function getOrganization({ apiKey, apiUrl, debug, id }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/organization/${id}`, apiUrl);
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
            message: errorResponse?.message ||
                'There was an error retrieving the organization',
            result: null
        };
    }
    const response = (await payload.json());
    return response;
}
