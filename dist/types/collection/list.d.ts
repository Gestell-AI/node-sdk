import type { BaseRequest, BaseResponse } from '../types/base';
import { Collection } from '../types/collection';
/**
 * Request parameters for listing collections with optional filtering and pagination.
 */
export interface GetCollectionsRequest {
    /** Search term to filter collections by name. */
    search?: string;
    /** Maximum number of collections to return. */
    take?: number;
    /** Number of collections to skip for pagination. */
    skip?: number;
    /** If true, returns extended collection details. */
    extended?: boolean;
}
/**
 * Response containing an array of collections.
 */
export interface GetCollectionsResponse extends BaseResponse {
    /** Array of collection objects. */
    result: Collection[];
}
export declare function getCollections({ apiKey, apiUrl, debug, search, take, skip, extended }: GetCollectionsRequest & BaseRequest): Promise<GetCollectionsResponse>;
