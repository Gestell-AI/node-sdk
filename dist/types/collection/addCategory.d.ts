import type { BaseRequest, BaseResponse } from 'types/base';
import { CategoryType } from 'types/category';
export interface AddCategoryRequest {
    collectionId: string;
    name: string;
    type: CategoryType;
    instructions: string;
}
export interface AddCategoryResponse extends BaseResponse {
    id: string;
}
export declare function addCategory({ apiKey, apiUrl, debug, collectionId, name, type, instructions }: AddCategoryRequest & BaseRequest): Promise<AddCategoryResponse>;
