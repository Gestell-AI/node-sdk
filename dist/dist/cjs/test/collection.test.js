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
    let categoryId = '';
    (0, bun_test_1.test)('Create Test Organization', async () => {
        const response = await gestell.organization.create({
            name: 'Automated Test Organization',
            description: 'This is an automated test organization'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.id.length).toBeGreaterThan(1);
        organizationId = response.id;
    });
    (0, bun_test_1.test)('Create', async () => {
        const response = await gestell.collection.create({
            organizationId,
            name: 'Automated Test Collection',
            description: 'An automated test collection',
            type: 'canon'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.id.length).toBeGreaterThan(1);
        collectionId = response.id;
    });
    (0, bun_test_1.test)('List', async () => {
        const response = await gestell.collection.list();
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('List with skip', async () => {
        const response = await gestell.collection.list({
            skip: 1000,
            take: 0
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.result.length).toBe(0);
    });
    (0, bun_test_1.test)('List with Search', async () => {
        const response = await gestell.collection.list({
            search: 'Unga Bunga 42 42'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.result.length).toBe(0);
    });
    (0, bun_test_1.test)('Get', async () => {
        const response = await gestell.collection.get(collectionId);
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Update', async () => {
        const response = await gestell.collection.update({
            collectionId,
            name: 'Automated Test Collection updated',
            description: 'An automated test collection updated'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Add Category', async () => {
        const response = await gestell.collection.addCategory({
            collectionId,
            name: 'Automated Test Category',
            type: 'concepts',
            instructions: 'Hello World'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        categoryId = response.id;
    });
    (0, bun_test_1.test)('Update Category', async () => {
        const response = await gestell.collection.updateCategory({
            collectionId,
            categoryId,
            name: 'Automated Test Category Update',
            instructions: 'Hello World Update'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Remove Category', async () => {
        const response = await gestell.collection.removeCategory({
            collectionId,
            categoryId
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Delete', async () => {
        const response = await gestell.collection.delete(collectionId);
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Delete Test Organization', async () => {
        const response = await gestell.organization.delete(organizationId);
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
});
