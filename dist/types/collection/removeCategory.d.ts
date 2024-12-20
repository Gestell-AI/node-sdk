import type { BaseRequest, BaseResponse } from 'types/base';
export interface RemoveCategoryRequest {
    collectionId: string;
    categoryId: string;
}
export type RemoveCategoryResponse = BaseResponse;
export declare function removeCategory({ apiKey, apiUrl, debug, collectionId, categoryId }: RemoveCategoryRequest & BaseRequest): Promise<RemoveCategoryResponse>;
