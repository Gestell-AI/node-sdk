import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { JobType } from '@gestell/types/job';
export interface ReprocessDocumentsRequest {
    collectionId: string;
    ids: string[];
    type: JobType;
}
export type ReprocessDocumentsResponse = BaseResponse;
export declare function reprocessDocument({ apiKey, apiUrl, debug, collectionId, ids, type }: ReprocessDocumentsRequest & BaseRequest): Promise<ReprocessDocumentsResponse>;
