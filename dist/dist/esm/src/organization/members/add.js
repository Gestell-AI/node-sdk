"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMembers = addMembers;
const fetch_1 = __importDefault(require("../../util/fetch"));
async function addMembers({ apiKey, apiUrl, debug, organizationId, members }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/organization/${organizationId}/member`, apiUrl);
    const payload = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
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
            message: errorResponse?.message || 'There was an error adding members'
        };
    }
    const response = (await payload.json());
    return response;
}
