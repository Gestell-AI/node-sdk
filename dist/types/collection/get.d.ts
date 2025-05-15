import type { BaseRequest, BaseResponse } from '../types/base';
import { Collection, CollectionStats } from '../types/collection';
/**
 * Request payload for retrieving a specific collection.
 */
export interface GetCollectionRequest {
    /** The unique identifier of the collection to retrieve. */
    collectionId: string;
}
/**
 * Response containing collection details and statistics.
 */
export interface GetCollectionResponse extends BaseResponse {
    /** The collection data, or null if not found. */
    result: Collection | null;
    /** Statistics about the collection, or null if not available. */
    stats: CollectionStats | null;
}
export declare function getCollection({ apiKey, apiUrl, debug, collectionId }: GetCollectionRequest & BaseRequest): Promise<GetCollectionResponse>;
