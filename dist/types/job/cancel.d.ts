import type { BaseRequest, BaseResponse } from '../types/base';
export interface CancelJobsRequest {
    collectionId: string;
    ids: string[];
}
export type CancelJobsResponse = BaseResponse;
export declare function cancelJobs({ apiKey, apiUrl, debug, collectionId, ids }: CancelJobsRequest & BaseRequest): Promise<CancelJobsResponse>;
