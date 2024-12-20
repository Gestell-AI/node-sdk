import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { Collection, CollectionStats } from '@gestell/types/collection';
export interface GetCollectionRequest {
    collectionId: string;
}
export interface GetCollectionResponse extends BaseResponse {
    result: Collection | null;
    stats: CollectionStats | null;
}
export declare function getCollection({ apiKey, apiUrl, debug, collectionId }: GetCollectionRequest & BaseRequest): Promise<GetCollectionResponse>;
