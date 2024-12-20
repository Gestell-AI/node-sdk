import type { BaseRequest, BaseResponse } from 'types/base';
import { Job, JobStatusType } from 'types/job';
export interface GetJobsRequest {
    collectionId: string;
    take?: number;
    skip?: number;
    status?: JobStatusType;
    nodes?: JobStatusType;
    edges?: JobStatusType;
    vectors?: JobStatusType;
    category?: JobStatusType;
}
export interface GetJobsResponse extends BaseResponse {
    result: Job[];
}
export declare function getJobs({ apiKey, apiUrl, debug, collectionId, take, skip, status, nodes, edges, vectors, category }: GetJobsRequest & BaseRequest): Promise<GetJobsResponse>;
