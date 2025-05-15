import type { BaseRequest, BaseResponse } from '../types/base';
import { CategoryType } from '../types/collection';
/**
 * Request payload for updating a category within a collection.
 */
export interface UpdateCategoryRequest {
    /** The ID of the collection containing the category. */
    collectionId: string;
    /** The ID of the category to update. */
    categoryId: string;
    /** The new display name for the category. */
    name?: string;
    /** The type of category. */
    type?: CategoryType;
    /** The instructions or description for this category. */
    instructions?: string;
    /** If true, only a single entry is allowed in this category. */
    singleEntry?: boolean;
}
/**
 * Response returned after updating a category.
 * Inherits standard response fields from BaseResponse.
 */
export type UpdateCategoryResponse = BaseResponse;
export declare function updateCategory({ apiKey, apiUrl, debug, collectionId, categoryId, name, type, instructions, singleEntry }: UpdateCategoryRequest & BaseRequest): Promise<UpdateCategoryResponse>;
