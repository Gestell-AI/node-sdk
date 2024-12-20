import type { BaseRequest, BaseResponse } from 'types/base';
import { JobType } from 'types/job';
export interface ReprocessDocumentsRequest {
    collectionId: string;
    ids: string[];
    type: JobType;
}
export type ReprocessDocumentsResponse = BaseResponse;
export declare function reprocessDocument({ apiKey, apiUrl, debug, collectionId, ids, type }: ReprocessDocumentsRequest & BaseRequest): Promise<ReprocessDocumentsResponse>;
