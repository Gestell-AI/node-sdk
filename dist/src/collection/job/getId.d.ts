import type { BaseRequest, BaseResponse } from 'types/base';
import { Job } from 'types/job';
export interface GetJobRequest {
    collectionId: string;
    jobId: string;
}
export interface GetJobResponse extends BaseResponse {
    result: Job | null;
}
export declare function getJob({ apiKey, apiUrl, debug, collectionId, jobId }: GetJobRequest & BaseRequest): Promise<GetJobResponse>;
//# sourceMappingURL=getId.d.ts.map