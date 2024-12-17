import type { BaseRequest, BaseResponse } from 'types/base';
import { Job, JobStatusType } from 'types/job';
export interface GetJobsRequest {
    take?: number;
    skip?: number;
    status?: JobStatusType;
    nodes?: JobStatusType;
    edges?: JobStatusType;
    vectors?: JobStatusType;
    category?: JobStatusType;
}
export interface GetJobsRequestToApi extends GetJobsRequest {
    id: string;
}
export interface GetJobsResponse extends BaseResponse {
    result: Job[];
}
export declare function getJobs({ apiKey, apiUrl, debug, id, take, skip, status, nodes, edges, vectors, category }: GetJobsRequestToApi & BaseRequest): Promise<GetJobsResponse>;
//# sourceMappingURL=get.d.ts.map