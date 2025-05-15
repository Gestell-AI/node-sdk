import type { BaseRequest, BaseResponse } from '../types/base';
import { JobType } from '../types/job';
/**
 * Request parameters for reprocessing one or more documents.
 */
export interface ReprocessDocumentsRequest {
    /** ID of the collection containing the documents */
    collectionId: string;
    /** Array of document IDs to reprocess */
    ids: string[];
    /** Type of reprocessing to perform */
    type: JobType;
}
/**
 * Response data from a document reprocessing operation.
 * Extends the base response with standard status fields.
 */
export type ReprocessDocumentsResponse = BaseResponse;
export declare function reprocessDocuments({ apiKey, apiUrl, debug, collectionId, ids, type }: ReprocessDocumentsRequest & BaseRequest): Promise<ReprocessDocumentsResponse>;
