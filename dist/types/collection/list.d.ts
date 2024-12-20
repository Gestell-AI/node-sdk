import type { BaseRequest, BaseResponse } from 'types/base';
import { Collection } from 'types/collection';
export interface GetCollectionsRequest {
    search?: string;
    take?: number;
    skip?: number;
    extended?: boolean;
}
export interface GetCollectionsResponse extends BaseResponse {
    result: Collection[];
}
export declare function getCollections({ apiKey, apiUrl, debug, search, take, skip, extended }: GetCollectionsRequest & BaseRequest): Promise<GetCollectionsResponse>;
