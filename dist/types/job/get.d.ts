import type { BaseRequest, BaseResponse } from '../types/base';
import { Job } from '../types/job';
/**
 * Request parameters for retrieving job information for a specific document.
 */
export interface GetJobRequest {
    /** ID of the collection containing the document */
    collectionId: string;
    /** ID of the document to get job information for */
    documentId: string;
}
/**
 * Response data from a job information request.
 * Extends the base response with job details.
 */
export interface GetJobResponse extends BaseResponse {
    /** The job details or null if no job is found */
    result: Job | null;
}
export declare function getJob({ apiKey, apiUrl, debug, collectionId, documentId }: GetJobRequest & BaseRequest): Promise<GetJobResponse>;
