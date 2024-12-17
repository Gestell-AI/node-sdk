import type { BaseRequest, BaseResponse } from 'types/base';
import { JobType } from 'types/job';
export interface ReprocessDocumentsRequest {
    ids: string[];
    type: JobType;
}
export interface ReprocessDocumentsRequestToApi extends ReprocessDocumentsRequest {
    collectionId: string;
}
export type ReprocessDocumentsResponse = BaseResponse;
export declare function reprocessDocument({ apiKey, apiUrl, debug, collectionId, ids, type }: ReprocessDocumentsRequestToApi & BaseRequest): Promise<ReprocessDocumentsResponse>;
//# sourceMappingURL=reprocess.d.ts.map