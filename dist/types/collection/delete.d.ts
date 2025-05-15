import type { BaseRequest, BaseResponse } from '../types/base';
/**
 * Request payload for deleting a collection.
 */
export interface DeleteCollectionRequest {
    /** The ID of the collection to be deleted. */
    collectionId: string;
}
/**
 * Response returned after a collection deletion operation.
 * Inherits standard response fields from BaseResponse.
 */
export type DeleteCollectionResponse = BaseResponse;
export declare function deleteCollection({ apiKey, apiUrl, debug, collectionId }: DeleteCollectionRequest & BaseRequest): Promise<DeleteCollectionResponse>;
