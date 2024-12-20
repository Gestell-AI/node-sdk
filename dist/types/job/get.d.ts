import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { Job } from '@gestell/types/job';
export interface GetJobRequest {
    collectionId: string;
    jobId: string;
}
export interface GetJobResponse extends BaseResponse {
    result: Job | null;
}
export declare function getJob({ apiKey, apiUrl, debug, collectionId, jobId }: GetJobRequest & BaseRequest): Promise<GetJobResponse>;
