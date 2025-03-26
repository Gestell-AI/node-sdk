import type { BaseRequest, BaseResponse } from '../types/base';
import { Job } from '../types/job';
export interface GetJobRequest {
    collectionId: string;
    documentId: string;
}
export interface GetJobResponse extends BaseResponse {
    result: Job | null;
}
export declare function getJob({ apiKey, apiUrl, debug, collectionId, documentId }: GetJobRequest & BaseRequest): Promise<GetJobResponse>;
