import { addCategory } from 'collection/addCategory';
import { createCollection } from 'collection/create';
import { deleteCollection } from 'collection/delete';
import { getCollection } from 'collection/get';
import { getCollections } from 'collection/list';
import { removeCategory } from 'collection/removeCategory';
import { updateCollection } from 'collection/update';
import { updateCategory } from 'collection/updateCategory';
import { createDocument } from 'document/create';
import { deleteDocument } from 'document/delete';
import { getDocument } from 'document/get';
import { getDocuments } from 'document/list';
import { presignDocument } from 'document/presign';
import { updateDocument } from 'document/update';
import { uploadDocument } from 'document/upload';
import { cancelJobs } from 'job/cancel';
import { getJob } from 'job/get';
import { getJobs } from 'job/list';
import { reprocessDocument } from 'job/reprocess';
import { createOrganization } from 'organization/create';
import { deleteOrganization } from 'organization/delete';
import { getOrganization } from 'organization/get';
import { getOrganizations } from 'organization/list';
import { addMembers } from 'organization/members/add';
import { removeMembers } from 'organization/members/remove';
import { updateOrganization } from 'organization/update';
import { featuresQuery } from 'query/features';
import { promptQuery } from 'query/prompt';
import { searchQuery } from 'query/search';
import { tablesQuery } from 'query/table';
/**
 * The Gestell SDK Instance
 */
export class Gestell {
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
            require('dotenv');
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
        return await getOrganization({
            id,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getOrganizations(payload) {
        return await getOrganizations({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async createOrganization(payload) {
        return await createOrganization({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async updateOrganization(payload) {
        return await updateOrganization({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async deleteOrganization(id) {
        return await deleteOrganization({
            id,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async addMembers(payload) {
        return await addMembers({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async removeMembers(payload) {
        return await removeMembers({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getCollection(collectionId) {
        return await getCollection({
            collectionId,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getCollections(payload) {
        return await getCollections({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async createCollection(payload) {
        return await createCollection({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async updateCollection(payload) {
        return await updateCollection({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async deleteCollection(id) {
        return await deleteCollection({
            id,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async addCategory(payload) {
        return await addCategory({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async updateCategory(payload) {
        return await updateCategory({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async removeCategory(payload) {
        return await removeCategory({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async searchQuery(payload) {
        return await searchQuery({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async promptQuery(payload) {
        return await promptQuery({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async featuresQuery(payload) {
        return await featuresQuery({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async tablesQuery(payload) {
        return await tablesQuery({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getDocument(payload) {
        return await getDocument({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getDocuments(payload) {
        return await getDocuments({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async uploadDocument(payload) {
        return await uploadDocument({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async presignDocument(payload) {
        return await presignDocument({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async createDocument(payload) {
        return await createDocument({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async updateDocument(payload) {
        return await updateDocument({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async deleteDocument(payload) {
        return await deleteDocument({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getJob(payload) {
        return await getJob({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async getJobs(payload) {
        return await getJobs({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async reprocessJobs(payload) {
        return await reprocessDocument({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
    async cancelJobs(payload) {
        return await cancelJobs({
            ...payload,
            apiKey: this.apiKey,
            apiUrl: this.apiUrl,
            debug: this.debug
        });
    }
}
export default Gestell;
