import type { BaseRequest, BaseResponse } from 'types/base';
export interface CancelJobsRequest {
    ids: string[];
}
export interface CancelJobsRequestToApi extends CancelJobsRequest {
    collectionId: string;
}
export type CancelJobsResponse = BaseResponse;
export declare function cancelJobs({ apiKey, apiUrl, debug, collectionId, ids }: CancelJobsRequestToApi & BaseRequest): Promise<CancelJobsResponse>;
//# sourceMappingURL=cancel.d.ts.map