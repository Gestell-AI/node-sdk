import type { BaseRequest, BaseResponse } from '../types/base';
import { CategoryType } from '../types/collection';
/**
 * Request payload for adding a new category to a collection.
 */
export interface AddCategoryRequest {
    /** The ID of the collection to which the category will be added. */
    collectionId: string;
    /** The display name of the category. */
    name: string;
    /** The type of category. */
    type: CategoryType;
    /** The instructions or description for this category. */
    instructions: string;
    /** If true, only a single entry is allowed in this category. */
    singleEntry?: boolean;
}
/**
 * Response returned after adding a category.
 */
export interface AddCategoryResponse extends BaseResponse {
    /** The ID of the newly created category. */
    id: string;
}
export declare function addCategory({ apiKey, apiUrl, debug, collectionId, name, type, instructions, singleEntry }: AddCategoryRequest & BaseRequest): Promise<AddCategoryResponse>;
