"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bun_test_1 = require("bun:test");
const index_1 = __importDefault(require("../src/index"));
const gestell = new index_1.default({
    key: 'INVALID KEY',
    debug: true
});
(0, bun_test_1.describe)('Error', () => {
    (0, bun_test_1.test)('organization.get', async () => {
        const response = await gestell.organization.get('...');
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('organization.list', async () => {
        const response = await gestell.organization.list();
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('organization.update', async () => {
        const response = await gestell.organization.update({
            organizationId: '...',
            name: '...',
            description: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('organization.create', async () => {
        const response = await gestell.organization.create({
            name: '...',
            description: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('organization.addMembers', async () => {
        const response = await gestell.organization.addMembers({
            organizationId: '...',
            members: []
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('organization.removeMembers', async () => {
        const response = await gestell.organization.removeMembers({
            organizationId: '...',
            members: []
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('organization.delete', async () => {
        const response = await gestell.organization.delete('...');
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.get', async () => {
        const response = await gestell.collection.get('...');
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.list', async () => {
        const response = await gestell.collection.list();
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.create', async () => {
        const response = await gestell.collection.create({
            organizationId: '...',
            name: '...',
            description: '...',
            type: 'canon'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.update', async () => {
        const response = await gestell.collection.update({
            collectionId: '...',
            name: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.addCategory', async () => {
        const response = await gestell.collection.addCategory({
            collectionId: '...',
            name: '...',
            type: 'concepts',
            instructions: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.updateCategory', async () => {
        const response = await gestell.collection.updateCategory({
            collectionId: '...',
            categoryId: '...',
            name: '...',
            type: 'concepts',
            instructions: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.removeCategory', async () => {
        const response = await gestell.collection.removeCategory({
            collectionId: '...',
            categoryId: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.delete', async () => {
        const response = await gestell.collection.delete('...');
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.query.search', async () => {
        const response = await gestell.query.search({
            collectionId: '...',
            prompt: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.query.prompt', async () => {
        const response = await gestell.query.prompt({
            collectionId: '...',
            prompt: '...'
        });
        const stream = response.getReader();
        let result = '';
        while (true) {
            const { done, value } = await stream.read();
            if (done)
                break;
            result += value; // Append the chunk to the result
        }
        (0, bun_test_1.expect)(result).toBe('Invalid token');
    });
    (0, bun_test_1.test)('collection.query.table', async () => {
        const response = await gestell.query.table({
            collectionId: '...',
            categoryId: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.query.features', async () => {
        const response = await gestell.query.features({
            collectionId: '...',
            categoryId: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.job.get', async () => {
        const response = await gestell.job.get({
            collectionId: '...',
            jobId: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.job.list', async () => {
        const response = await gestell.job.list({ collectionId: '...' });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.job.reprocess', async () => {
        const response = await gestell.job.reprocess({
            collectionId: '...',
            type: 'status',
            ids: []
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.job.cancel', async () => {
        const response = await gestell.job.cancel({
            collectionId: '...',
            ids: []
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.document.get', async () => {
        const response = await gestell.document.get({
            collectionId: '...',
            documentId: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.document.list', async () => {
        const response = await gestell.document.list({
            collectionId: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.document.presign', async () => {
        const response = await gestell.document.presign({
            collectionId: '...',
            type: '...',
            filename: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.document.create', async () => {
        const response = await gestell.document.create({
            collectionId: '...',
            type: '...',
            name: '...',
            path: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.document.upload', async () => {
        const response = await gestell.document.upload({
            collectionId: '...',
            type: '...',
            name: '...',
            file: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.document.update', async () => {
        const response = await gestell.document.update({
            collectionId: '...',
            documentId: '...',
            name: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
    (0, bun_test_1.test)('collection.document.delete', async () => {
        const response = await gestell.document.delete({
            collectionId: '...',
            documentId: '...'
        });
        (0, bun_test_1.expect)(response.status).toBe('ERROR');
    });
});
