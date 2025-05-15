import type { BaseRequest, BaseResponse } from '../types/base';
/**
 * Request parameters for cancelling one or more background jobs.
 */
export interface CancelJobsRequest {
    /** ID of the collection containing the jobs */
    collectionId: string;
    /** Array of Document IDs to cancel jobs for */
    ids: string[];
}
/**
 * Response data from a job cancellation operation.
 * Extends the base response with standard status fields.
 */
export type CancelJobsResponse = BaseResponse;
export declare function cancelJobs({ apiKey, apiUrl, debug, collectionId, ids }: CancelJobsRequest & BaseRequest): Promise<CancelJobsResponse>;
