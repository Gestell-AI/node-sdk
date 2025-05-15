import type { BaseRequest, BaseResponse } from '../types/base';
import { Job, JobStatus } from '../types/job';
/**
 * Request parameters for listing jobs in a collection with optional filtering and pagination.
 */
export interface GetJobsRequest {
    /** ID of the collection to list jobs from */
    collectionId: string;
    /** Filter jobs by enframing status */
    status?: JobStatus;
    /** Filter jobs by node processing status */
    nodes?: JobStatus;
    /** Filter jobs by edge processing status */
    edges?: JobStatus;
    /** Filter jobs by vector processing status */
    vectors?: JobStatus;
    /** Filter jobs by category processing status */
    category?: JobStatus;
    /** Search term to filter jobs */
    search?: string;
    /** Maximum number of jobs to return (default: 10) */
    take?: number;
    /** Number of jobs to skip for pagination (default: 0) */
    skip?: number;
}
/**
 * Response data from a jobs listing operation.
 * Extends the base response with an array of jobs.
 */
export interface GetJobsResponse extends BaseResponse {
    /** Array of job objects matching the query */
    result: Job[];
}
export declare function getJobs({ apiKey, apiUrl, debug, collectionId, take, skip, status, nodes, edges, vectors, category }: GetJobsRequest & BaseRequest): Promise<GetJobsResponse>;
