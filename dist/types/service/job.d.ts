import { GestellOptions } from '../index';
import { CancelJobsRequest, CancelJobsResponse } from '../job/cancel';
import { GetJobRequest, GetJobResponse } from '../job/get';
import { GetJobsRequest, GetJobsResponse } from '../job/list';
import { ReprocessDocumentsRequest, ReprocessDocumentsResponse } from '../job/reprocess';
/**
 * The **job services** for the Gestell SDK.
 *
 * @remarks
 * All helpers resolve to a strongly typed `{ status, message, … }` payload.
 * If the SDK is initialised with `debug: true`, verbose request / response logs
 * will be emitted to the console to aid troubleshooting.
 *
 * @example
 * ```ts
 * import Gestell from '@gestell/sdk'
 *
 * const gestell = new Gestell()
 *
 * // Fetch a single job
 * const { result } = await gestell.job.get({
 *   collectionId: 'col_123',
 *   documentId: 'doc_456'
 * })
 * console.log(result?.status)
 *
 * // Re-process specific documents
 * await gestell.job.reprocess({
 *   collectionId: 'col_123',
 *   ids: ['doc_456', 'doc_789'],
 *   type: 'vectors'
 * })
 * ```
 *
 * @see https://gestell.ai/docs/reference#job
 */
export interface JobServiceApi {
    /**
     * Retrieves job information for a specific document.
     *
     * @param payload - Job information request parameters including:
     * - `collectionId`: ID of the collection containing the document.
     * - `documentId`: ID of the document to get job information for.
     * @returns A promise that resolves to the job information response, including:
     * - `result`: The job details or null if no job is found.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    get(payload: GetJobRequest): Promise<GetJobResponse>;
    /**
     * Lists jobs in a collection with optional filtering and pagination.
     *
     * @param payload - Job listing parameters including:
     * - `collectionId`: ID of the collection to list jobs from.
     * - `status?`: Filter by enframing processing status.
     * - `nodes?`: Filter by node processing status.
     * - `edges?`: Filter by edge processing status.
     * - `vectors?`: Filter by vector processing status.
     * - `category?`: Filter by category processing status.
     * - `search?`: Optional search term to filter jobs.
     * - `take?`: Maximum number of jobs to return (default: 10).
     * - `skip?`: Number of jobs to skip for pagination (default: 0).
     * @returns A promise that resolves to the jobs list response, including:
     * - `result`: Array of job objects matching the query.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    list(payload: GetJobsRequest): Promise<GetJobsResponse>;
    /**
     * Initiates reprocessing for one or more documents.
     *
     * @param payload - Reprocessing parameters including:
     * - `collectionId`: ID of the collection containing the documents.
     * - `ids`: Array of document IDs to reprocess.
     * - `type`: Type of reprocessing to perform (e.g., 'status', 'nodes', 'vectors', 'edges', 'category').
     * @returns A promise that resolves to the reprocessing response, including:
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    reprocess(payload: ReprocessDocumentsRequest): Promise<ReprocessDocumentsResponse>;
    /**
     * Cancels one or more background jobs for the specified documents.
     *
     * @param payload - Job cancellation parameters including:
     * - `collectionId`: ID of the collection containing the jobs.
     * - `ids`: Array of document IDs to cancel jobs for.
     * @returns A promise that resolves to the cancellation response, including:
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    cancel(payload: CancelJobsRequest): Promise<CancelJobsResponse>;
}
/**
 * Factory that returns helpers scoped to **jobs**.
 *
 * @param client - Global Gestell SDK configuration.
 * @returns Strongly typed helpers implementing {@link JobServiceApi}.
 */
export default function JobService(client?: GestellOptions): JobServiceApi;
