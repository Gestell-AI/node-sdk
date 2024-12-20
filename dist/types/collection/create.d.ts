import type { BaseRequest, BaseResponse } from '../types/base';
import { CreateCategoryPayload } from '../types/category';
import { CollectionType } from '../types/collection';
export interface CreateCollectionRequest {
    organizationId: string;
    name: string;
    type: CollectionType;
    tags?: string[];
    description?: string;
    instructions?: string;
    graphInstructions?: string;
    promptInstructions?: string;
    searchInstructions?: string;
    categories?: CreateCategoryPayload[];
}
export interface CreateCollectionResponse extends BaseResponse {
    id: string;
}
export declare function createCollection({ apiKey, apiUrl, debug, organizationId, name, description, type, instructions, graphInstructions, promptInstructions, searchInstructions, categories }: CreateCollectionRequest & BaseRequest): Promise<CreateCollectionResponse>;
