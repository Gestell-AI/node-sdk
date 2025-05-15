import type { BaseRequest, BaseResponse } from '../types/base';
import { CollectionType, PiiIdentifierOption } from '../types/collection';
/**
 * Request payload for updating an existing collection.
 */
export interface UpdateCollectionRequest {
    /** The ID of the collection to update. */
    collectionId: string;
    /** The ID of the organization that owns this collection. */
    organizationId?: string;
    /** The new display name for the collection. */
    name?: string;
    /** The type of collection. */
    type?: CollectionType;
    /** A description of the collection's purpose or contents. */
    description?: string;
    /** Indicates if the collection contains Personally Identifiable Information. */
    pii?: boolean;
    /** Configuration for PII identification and handling. */
    piiControls?: PiiIdentifierOption[];
    /** General instructions for processing this collection. */
    instructions?: string;
    /** Specific instructions for graph operations involving this collection. */
    graphInstructions?: string;
    /** Instructions for prompt generation using this collection. */
    promptInstructions?: string;
    /** Instructions for search operations within this collection. */
    searchInstructions?: string;
    /** Tags to categorize the collection. */
    tags?: string[];
}
/**
 * Response returned after updating a collection.
 * Inherits standard response fields from BaseResponse.
 */
export type UpdateCollectionResponse = BaseResponse;
export declare function updateCollection({ apiKey, apiUrl, debug, collectionId, organizationId, name, type, description, pii, piiControls, instructions, graphInstructions, promptInstructions, searchInstructions, tags }: UpdateCollectionRequest & BaseRequest): Promise<UpdateCollectionResponse>;
