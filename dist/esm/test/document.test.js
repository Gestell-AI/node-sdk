"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bun_test_1 = require("bun:test");
const fs_1 = require("fs");
const path_1 = require("path");
const index_1 = __importDefault(require("../src/index"));
const gestell = new index_1.default();
(0, bun_test_1.describe)('Document', () => {
    let organizationId = '';
    let collectionId = '';
    let documentId = '';
    let jobId = '';
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
            type: 'frame'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.id.length).toBeGreaterThan(1);
        collectionId = response.id;
    });
    (0, bun_test_1.test)('Presign, Upload and Create Document', async () => {
        const { default: fetch } = await import('node-fetch');
        const { status, path, url } = await gestell.document.presign({
            collectionId,
            type: 'image/jpeg',
            filename: 'sample.jpg'
        });
        (0, bun_test_1.expect)(status).toEqual('OK');
        await fetch(url, {
            method: 'PUT',
            headers: {
                ContentType: 'image/jpeg'
            },
            body: (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), 'test', 'sample.jpg'))
        });
        const response = await gestell.document.create({
            collectionId,
            name: 'sample.jpg',
            path,
            type: 'image/jpeg'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        documentId = response.id;
    });
    (0, bun_test_1.test)('Upload Document as Buffer and String', async () => {
        const file = (0, path_1.join)(process.cwd(), 'test', 'sample.jpg');
        const response = await gestell.document.upload({
            collectionId,
            name: 'sample-2.jpg',
            file
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        const response2 = await gestell.document.upload({
            collectionId,
            name: 'sample-2.jpg',
            type: 'image/jpeg',
            file: (0, fs_1.readFileSync)(file)
        });
        (0, bun_test_1.expect)(response2.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Update', async () => {
        const response = await gestell.document.update({
            collectionId,
            documentId,
            name: 'sample-updated.jpg'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Get', async () => {
        const response = await gestell.document.get({ collectionId, documentId });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        jobId = response.result?.job?.id || '';
    });
    (0, bun_test_1.test)('Get Document Job', async () => {
        const response = await gestell.job.get({ collectionId, jobId });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Reprocess Document Job', async () => {
        const response = await gestell.job.reprocess({
            collectionId,
            type: 'status',
            ids: [jobId]
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Cancel Document Job', async () => {
        const response = await gestell.job.cancel({ collectionId, ids: [jobId] });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('Delete', async () => {
        const response = await gestell.document.delete({ collectionId, documentId });
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
