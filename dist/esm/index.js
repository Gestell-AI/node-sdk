"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gestell = void 0;
const collection_1 = __importDefault(require("./service/collection"));
const document_1 = __importDefault(require("./service/document"));
const job_1 = __importDefault(require("./service/job"));
const organization_1 = __importDefault(require("./service/organization"));
const query_1 = __importDefault(require("./service/query"));
/**
 * The **Gestell SDK client**, providing access to all Gestell services.
 *
 * @example
 * ```ts
 * import Gestell from '@gestell/sdk'
 *
 * const client = new Gestell()
 * const orgs = await client.organization.list()
 * console.log(orgs)
 * ```
 *
 * @remarks
 * - Initialize with `debug: true` to emit verbose request/response logs.
 * - All service helpers resolve to a strongly typed `{ status, message, … }` payload.
 *
 * @see https://gestell.ai/docs
 */
class Gestell {
    /**
     * The **organization services** for the Gestell SDK.
     *
     * @remarks
     * - Manage `Organization` resources: get, update, list
     * - Must be an admin to update `Organization`
     * - To create an `Organization` @see https://platform.gestell.ai
     * - To update an `Organization` you must be an `admin`
     *
     * @example
     * ```ts
     * const result = await client.organization.list()
     * console.log(result)
     * ```
     *
     * @see https://gestell.ai/docs/reference#organization
     */
    organization;
    /**
     * The **collection services** for the Gestell SDK.
     *
     * @remarks
     * - CRUD operations on `Collection` entities.
     * - Category management and bulk-import helpers included.
     *
     * @example
     * ```ts
     * const cols = await client.collection.list()
     * console.log(cols)
     * ```
     *
     * @see https://gestell.ai/docs/reference#collection
     */
    collection;
    /**
     * The **query services** for the Gestell SDK.
     *
     * @remarks
     * - Execute semantic searches and prompt-based queries.
     * - Supports customizable search `type`, `method`, and advanced tuning parameters.
     *
     * @example
     * ```ts
     * const search = await client.query.search({
     *   collectionId: 'UUID',
     *   prompt: 'Give me a summary of the ULTA filing from 2024'
     * })
     * console.log(search)
     * ```
     *
     * @see https://gestell.ai/docs/reference#query
     */
    query;
    /**
     * The **document services** for the Gestell SDK.
     *
     * @remarks
     * - Upload, retrieve, update, and delete documents.
     * - Strongly typed responses and optional content streaming.
     * - Debug logs available when `debug: true`.
     *
     * @example
     * ```ts
     * const docs = await client.document.list()
     * console.log(docs)
     * ```
     *
     * @see https://gestell.ai/docs/reference#document
     */
    document;
    /**
     * The **job services** for the Gestell SDK.
     *
     * @remarks
     * - Create long-running jobs (e.g., batch imports, exports).
     * - Poll for status, retrieve results, and manage retries.
     *
     * @example
     * ```ts
     * const job = await client.job.get({ collectionId: 'UUID', documentId: 'UUID' })
     * console.log(job)
     * ```
     *
     * @see https://gestell.ai/docs/reference#job
     */
    job;
    /**
     * Create a new Gestell SDK client.
     *
     * @param {GestellOptions} [options={}] - Configuration options.
     * @param {string} [options.key]        - API key for authentication.
     * @param {string} [options.url]        - Base API URL.
     * @param {boolean} [options.debug]     - Enable debug logging.
     */
    constructor(options = {}) {
        // Load environment variables when running on the server
        if (typeof window === 'undefined') {
            require('dotenv').config();
        }
        this.organization = (0, organization_1.default)(options);
        this.collection = (0, collection_1.default)(options);
        this.query = (0, query_1.default)(options);
        this.document = (0, document_1.default)(options);
        this.job = (0, job_1.default)(options);
    }
}
exports.Gestell = Gestell;
exports.default = Gestell;
