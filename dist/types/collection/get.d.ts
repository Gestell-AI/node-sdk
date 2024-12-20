import type { BaseRequest, BaseResponse } from '../types/base';
import { Collection, CollectionStats } from '../types/collection';
export interface GetCollectionRequest {
    collectionId: string;
}
export interface GetCollectionResponse extends BaseResponse {
    result: Collection | null;
    stats: CollectionStats | null;
}
export declare function getCollection({ apiKey, apiUrl, debug, collectionId }: GetCollectionRequest & BaseRequest): Promise<GetCollectionResponse>;
