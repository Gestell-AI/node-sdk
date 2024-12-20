"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gestell = void 0;
const addCategory_1 = require("./collection/addCategory");
const create_1 = require("./collection/create");
const delete_1 = require("./collection/delete");
const get_1 = require("./collection/get");
const list_1 = require("./collection/list");
const removeCategory_1 = require("./collection/removeCategory");
const update_1 = require("./collection/update");
const updateCategory_1 = require("./collection/updateCategory");
const create_2 = require("./document/create");
const delete_2 = require("./document/delete");
const get_2 = require("./document/get");
const list_2 = require("./document/list");
const presign_1 = require("./document/presign");
const update_2 = require("./document/update");
const upload_1 = require("./document/upload");
const cancel_1 = require("./job/cancel");
const get_3 = require("./job/get");
const list_3 = require("./job/list");
const reprocess_1 = require("./job/reprocess");
const create_3 = require("./organization/create");
const delete_3 = require("./organization/delete");
const get_4 = require("./organization/get");
const list_4 = require("./organization/list");
const add_1 = require("./organization/members/add");
const remove_1 = require("./organization/members/remove");
const update_3 = require("./organization/update");
const features_1 = require("./query/features");
const prompt_1 = require("./query/prompt");
const search_1 = require("./query/search");
const table_1 = require("./query/table");
/**
 * The Gestell SDK Instance
 */
class Gestell {
    apiUrl;
    apiKey;
    debug;
    /**
     * Manage organizations you are a part of.
     * Learn more about usage at: https://gestell.ai/docs/reference#organization
     */
    organization;
    /**
     * Manage collections you are a part of.
     * Learn more about usage at: https://gestell.ai/docs/reference#collection
     */
    collection;
    /**
     * Query a collection. This requires your collection ID to query.
     * Note that querying tables and features requires both a collectionId and categoryId.
     * Learn more about usage at: https://gestell.ai/docs/reference#query
     *
     * @param collectionId - The ID of the collection
     */
    query;
    /**
     * Manage documents within a collection. You will need to retrieve the collection id to manage documents.
     * Learn more about usage at: https://gestell.ai/docs/reference#document
     *
     * @param collectionId - The ID of the collection
     * @param documentId - The ID of the document, this is usually required unless creating a document
     */
    document;
    /**
     * Manage jobs within a collection. You will need to retrieve the collection id to manage jobs.
     * Learn more about usage at: https://gestell.ai/docs/reference#job
     *
     * @param collectionId - The ID of the collection
     */
    job;
    /**
     * Configuration options for the Gestell SDK.
     * Review usage in depth at: https://gestell.ai/docs/reference
     *
     * @param GestellInit
     * @property {string} [key] - The API key for authentication.
     * @property {string} [url] - The base URL for the API.
     * @property {boolean} [debug] - Flag to enable debug logging.
     */
    constructor(payload) {
        if (typeof window === 'undefined') {
            require('dotenv').config();
        }
        this.apiUrl =
            payload?.url ||
                process.env.GESTELL_API_URL ||
                'https://platform.gestell.ai';
        this.apiKey = payload?.key || process.env.GESTELL_API_KEY || '';
        this.debug = payload?.debug || false;
        this.organization = {
            get: this.getOrganization.bind(this),
            list: this.getOrganizations.bind(this),
            create: this.createOrganization.bind(this),
            update: this.updateOrganization.bind(this),
            delete: this.deleteOrganization.bind(this),
            addMembers: this.addMembers.bind(this),
            removeMembers: this.removeMembers.bind(this)
        };
        this.collection = {
            get: this.getCollection.bind(this),
            list: this.getCollections.bind(this),
            create: this.createCollection.bind(this),
            update: this.updateCollection.bind(this),
            delete: this.deleteCollection.bind(this),
            addCategory: this.addCategory.bind(this),
            updateCategory: this.updateCategory.bind(this),
            removeCategory: this.removeCategory.bind(this)
        };
        this.query = {
            search: this.searchQuery.bind(this),
            prompt: this.promptQuery.bind(this),
            features: this.featuresQuery.bind(this),
            table: this.tablesQuery.bind(this)
        };
        this.document = {
            get: this.getDocument.bind(this),
            list: this.getDocuments.bind(this),
            upload: this.uploadDocument.bind(this),
            presign: this.presignDocument.bind(this),
            create: this.createDocument.bind(this),
            update: this.updateDocument.bind(this),
            delete: this.deleteDocument.bind(this)
        };
        this.job = {
            get: this.getJob.bind(this),
            list: this.getJobs.bind(this),
            reprocess: this.reprocessJobs.bind(this),
            cancel: this.cancelJobs.bind(this)
        };
    }
    async getOrganization(id) {
        return await (0, get_4.getOrganization)({
            id,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getOrganizations(payload) {
        return await (0, list_4.getOrganizations)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async createOrganization(payload) {
        return await (0, create_3.createOrganization)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async updateOrganization(payload) {
        return await (0, update_3.updateOrganization)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async deleteOrganization(id) {
        return await (0, delete_3.deleteOrganization)({
            id,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async addMembers(payload) {
        return await (0, add_1.addMembers)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async removeMembers(payload) {
        return await (0, remove_1.removeMembers)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getCollection(collectionId) {
        return await (0, get_1.getCollection)({
            collectionId,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getCollections(payload) {
        return await (0, list_1.getCollections)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async createCollection(payload) {
        return await (0, create_1.createCollection)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async updateCollection(payload) {
        return await (0, update_1.updateCollection)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async deleteCollection(id) {
        return await (0, delete_1.deleteCollection)({
            id,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async addCategory(payload) {
        return await (0, addCategory_1.addCategory)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async updateCategory(payload) {
        return await (0, updateCategory_1.updateCategory)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async removeCategory(payload) {
        return await (0, removeCategory_1.removeCategory)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async searchQuery(payload) {
        return await (0, search_1.searchQuery)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async promptQuery(payload) {
        return await (0, prompt_1.promptQuery)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async featuresQuery(payload) {
        return await (0, features_1.featuresQuery)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async tablesQuery(payload) {
        return await (0, table_1.tablesQuery)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getDocument(payload) {
        return await (0, get_2.getDocument)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getDocuments(payload) {
        return await (0, list_2.getDocuments)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async uploadDocument(payload) {
        return await (0, upload_1.uploadDocument)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async presignDocument(payload) {
        return await (0, presign_1.presignDocument)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async createDocument(payload) {
        return await (0, create_2.createDocument)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async updateDocument(payload) {
        return await (0, update_2.updateDocument)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async deleteDocument(payload) {
        return await (0, delete_2.deleteDocument)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getJob(payload) {
        return await (0, get_3.getJob)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getJobs(payload) {
        return await (0, list_3.getJobs)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async reprocessJobs(payload) {
        return await (0, reprocess_1.reprocessDocument)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async cancelJobs(payload) {
        return await (0, cancel_1.cancelJobs)({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
}
exports.Gestell = Gestell;
exports.default = Gestell;
