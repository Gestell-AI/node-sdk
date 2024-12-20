import type { BaseRequest, BaseResponse } from '../types/base';
export interface DeleteCollectionRequest {
    id: string;
}
export type DeleteCollectionResponse = BaseResponse;
export declare function deleteCollection({ apiKey, apiUrl, debug, id }: DeleteCollectionRequest & BaseRequest): Promise<DeleteCollectionResponse>;
