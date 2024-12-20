"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptQuery = promptQuery;
const query_1 = require("../types/query");
const fetch_1 = __importDefault(require("../util/fetch"));
async function promptQuery({ apiKey, apiUrl, debug, collectionId, categoryId = '', prompt, method = 'normal', type = query_1.QueryKV[method].type, vectorDepth = query_1.QueryKV[method].vectorDepth, nodeDepth = query_1.QueryKV[method].nodeDepth, maxQueries = query_1.QueryKV[method].maxQueries, maxResults = query_1.QueryKV[method].maxResults, template = '', cot = true, threadId = '', chat = false }) {
    const fetch = await (0, fetch_1.default)();
    const url = new URL(`/api/collection/${collectionId}/prompt`, apiUrl);
    const payload = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${apiKey}`,
            'Content-Type': 'application/json'
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
            template,
            cot,
            threadId,
            chat
        })
    });
    if (!payload.body) {
        return new ReadableStream({
            async start(controller) {
                controller.enqueue('Error prompting the collection');
                controller.close();
            }
        });
    }
    const decoder = new TextDecoder();
    return new ReadableStream({
        async start(controller) {
            if (typeof window !== 'undefined') {
                try {
                    const reader = payload.body?.getReader();
                    if (!reader) {
                        throw new Error('The response body is not streamable');
                    }
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done)
                            break;
                        controller.enqueue(decoder.decode(value));
                    }
                    controller.close();
                }
                catch (error) {
                    controller.error(error);
                    if (debug) {
                        console.error('Stream processing error:', error);
                    }
                }
            }
            else {
                const nodeReadableStream = payload.body;
                nodeReadableStream.on('data', (chunk) => {
                    controller.enqueue(decoder.decode(chunk));
                });
                nodeReadableStream.on('end', () => {
                    controller.close();
                });
                nodeReadableStream.on('error', (error) => {
                    controller.error(error);
                    if (debug) {
                        console.error('Stream processing error:', error);
                    }
                });
            }
        }
    });
}
