import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { CategoryType } from '@gestell/types/category';
export interface UpdateCategoryRequest {
    collectionId: string;
    categoryId: string;
    name?: string;
    type?: CategoryType;
    instructions?: string;
}
export type UpdateCategoryResponse = BaseResponse;
export declare function updateCategory({ apiKey, apiUrl, debug, collectionId, categoryId, name, type, instructions }: UpdateCategoryRequest & BaseRequest): Promise<UpdateCategoryResponse>;