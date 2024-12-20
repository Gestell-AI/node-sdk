"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bun_test_1 = require("bun:test");
const index_1 = __importDefault(require("../src/index"));
const gestell = new index_1.default();
(0, bun_test_1.describe)('Collection', () => {
    let organizationId = '';
    let collectionId = '';
    let featureId = '';
    let tableId = '';
    (0, bun_test_1.test)('Create Test Organization', async () => {
        const response = await gestell.organization.create({
            name: 'Automated Test Organization',
            description: 'This is an automated test organization'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.id.length).toBeGreaterThan(1);
        organizationId = response.id;
    });
    (0, bun_test_1.test)('Create Test Collection', async () => {
        const response = await gestell.collection.create({
            organizationId,
            name: 'Automated Test Collection',
            description: 'An automated test collection',
            type: 'canon',
            categories: [
                {
                    name: 'Unga Bunga Features',
                    type: 'features',
                    instructions: 'Unga Bunga, Features, Unga Bunga'
                },
                {
                    name: 'Unga Bunga Tables',
                    type: 'table',
                    instructions: 'Unga Bunga, Tables, Unga Bunga'
                }
            ]
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.id.length).toBeGreaterThan(1);
        collectionId = response.id;
    });
    (0, bun_test_1.test)('Retrieve Category IDs', async () => {
        const response = await gestell.collection.get(collectionId);
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        for (const category of response.result?.categories || []) {
            if (category.type === 'features') {
                featureId = category.id;
            }
            if (category.type === 'table') {
                tableId = category.id;
            }
        }
    });
    (0, bun_test_1.test)('Query Search', async () => {
        const response = await gestell.query.search({
            collectionId,
            prompt: 'Unga Bunga, do not return anything, Unga Bunga',
            method: 'fast'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Query Prompt', async () => {
        const response = await gestell.query.prompt({
            collectionId,
            prompt: 'Unga Bunga, do not return anything, Unga Bunga',
            method: 'fast',
            cot: false,
            chat: false,
            threadId: ''
        });
        const stream = response.getReader();
        let result = '';
        while (true) {
            const { done, value } = await stream.read();
            if (done)
                break;
            result += value; // Append the chunk to the result
        }
        (0, bun_test_1.expect)(result.length).toBeGreaterThan(1);
    });
    (0, bun_test_1.test)('Query Features', async () => {
        const response = await gestell.query.features({
            collectionId,
            categoryId: featureId
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Query Table', async () => {
        const response = await gestell.query.table({
            collectionId,
            categoryId: tableId
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Delete Test Collection', async () => {
        const response = await gestell.collection.delete(collectionId);
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Delete Test Organization', async () => {
        const response = await gestell.organization.delete(organizationId);
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
});
