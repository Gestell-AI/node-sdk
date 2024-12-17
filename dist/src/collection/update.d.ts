import type { BaseRequest, BaseResponse } from 'types/base';
import { CollectionType } from 'types/collection';
export interface UpdateCollectionRequest {
    id: string;
    organizationId?: string;
    name?: string;
    type?: CollectionType;
    description?: string;
    instructions?: string;
    graphInstructions?: string;
    promptInstructions?: string;
    searchInstructions?: string;
    tags?: string[];
}
export interface UpdateCollectionResponse extends BaseResponse {
    id: string;
}
export declare function updateCollection({ apiKey, apiUrl, debug, id, organizationId, name, type, description, instructions, graphInstructions, promptInstructions, searchInstructions, tags }: UpdateCollectionRequest & BaseRequest): Promise<UpdateCollectionResponse>;
//# sourceMappingURL=update.d.ts.map