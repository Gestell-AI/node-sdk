"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bun_test_1 = require("bun:test");
const index_1 = __importDefault(require("../src/index"));
const gestell = new index_1.default();
(0, bun_test_1.describe)('Organization', () => {
    let organizationId = '';
    (0, bun_test_1.test)('Create', async () => {
        const response = await gestell.organization.create({
            name: 'Automated Test Organization',
            description: 'This is an automated test organization'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.id.length).toBeGreaterThan(1);
        organizationId = response.id;
    });
    (0, bun_test_1.test)('Get', async () => {
        const response = await gestell.organization.get(organizationId);
        (0, bun_test_1.expect)(response.status).toEqual('OK');
    });
    (0, bun_test_1.test)('List', async () => {
        const response = await gestell.organization.list();
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.result.length).toBeGreaterThan(0);
    });
    (0, bun_test_1.test)('List with Skip', async () => {
        const response = await gestell.organization.list({
            skip: 100,
            take: 0
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.result.length).toBe(0);
    });
    (0, bun_test_1.test)('List with Search', async () => {
        const response = await gestell.organization.list({
            search: 'Unga Bunga 42 42'
        });
        (0, bun_test_1.expect)(response.status).toEqual('OK');
        (0, bun_test_1.expect)(response.result.length).toBe(0);
    });
    (0, bun_test_1.test)('Update', async () => {
        const response = await gestell.organization.update({
            organizationId,
            name: 'Automated Test Organization Updated',
            description: 'This is an automated test organization updated'
        });
        (0, bun_test_1.expect)(response.status).toBe('OK');
    });
    (0, bun_test_1.test)('Add Member', async () => {
        const response = await gestell.organization.addMembers({
            organizationId,
            members: [
                {
                    id: 'test@chriscates.ca',
                    role: 'member'
                }
            ]
        });
        (0, bun_test_1.expect)(response.status).toBe('OK');
    });
    (0, bun_test_1.test)('Remove Member', async () => {
        const response = await gestell.organization.removeMembers({
            organizationId,
            members: ['test@chriscates.ca']
        });
        (0, bun_test_1.expect)(response.status).toBe('OK');
    });
    (0, bun_test_1.test)('Delete', async () => {
        const response = await gestell.organization.delete(organizationId);
        (0, bun_test_1.expect)(response.status).toBe('OK');
    });
});
