"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrganization = createOrganization;
const fetch_1 = __importDefault(require("../util/fetch"));
async function createOrganization({ apiKey, apiUrl, debug, name, description, members = [] }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/organization`, apiUrl);
    const payload = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            name,
            description,
            members
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error creating an organization',
            id: ''
        };
    }
    const response = (await payload.json());
    return response;
}
