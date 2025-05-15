import CollectionService from '@gestell/service/collection'
import DocumentService from '@gestell/service/document'
import JobService from '@gestell/service/job'
import OrganizationService from '@gestell/service/organization'
import QueryService from '@gestell/service/query'

/**
 * Options for configuring the Gestell SDK client.
 *
 * @interface GestellOptions
 * @property {string} [key]          - API key for authenticating requests. Obtain one at https://platform.gestell.ai.
 * @property {string} [url]          - Base URL of the Gestell API. Defaults to "https://platform.gestell.ai".
 * @property {boolean} [debug=false] - Enable verbose logging for debugging purposes.
 */
export interface GestellOptions {
  key?: string
  url?: string
  debug?: boolean
}

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
export class Gestell {
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
  public organization: ReturnType<typeof OrganizationService>

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
  public collection: ReturnType<typeof CollectionService>

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
  public query: ReturnType<typeof QueryService>

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
  public document: ReturnType<typeof DocumentService>

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
  public job: ReturnType<typeof JobService>

  /**
   * Create a new Gestell SDK client.
   *
   * @param {GestellOptions} [options={}] - Configuration options.
   * @param {string} [options.key]        - API key for authentication.
   * @param {string} [options.url]        - Base API URL.
   * @param {boolean} [options.debug]     - Enable debug logging.
   */
  constructor(options: GestellOptions = {}) {
    // Load environment variables when running on the server
    if (typeof window === 'undefined') {
      require('dotenv').config()
    }

    this.organization = OrganizationService(options)
    this.collection = CollectionService(options)
    this.query = QueryService(options)
    this.document = DocumentService(options)
    this.job = JobService(options)
  }
}

export default Gestell
