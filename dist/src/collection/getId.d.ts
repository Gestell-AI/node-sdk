import type { BaseRequest, BaseResponse } from 'types/base';
import { Collection, CollectionStats } from 'types/collection';
export interface GetCollectionRequest {
    id: string;
}
export interface GetCollectionResponse extends BaseResponse {
    result: Collection | null;
    stats: CollectionStats | null;
}
export declare function getCollection({ apiKey, apiUrl, debug, id }: GetCollectionRequest & BaseRequest): Promise<GetCollectionResponse>;
//# sourceMappingURL=getId.d.ts.map