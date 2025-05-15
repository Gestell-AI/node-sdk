import type { BaseRequest, BaseResponse } from '../types/base';
/**
 * Request payload for removing a category from a collection.
 */
export interface RemoveCategoryRequest {
    /** The ID of the collection containing the category. */
    collectionId: string;
    /** The ID of the category to be removed. */
    categoryId: string;
}
/**
 * Response returned after removing a category.
 * Inherits standard response fields from BaseResponse.
 */
export type RemoveCategoryResponse = BaseResponse;
export declare function removeCategory({ apiKey, apiUrl, debug, collectionId, categoryId }: RemoveCategoryRequest & BaseRequest): Promise<RemoveCategoryResponse>;
