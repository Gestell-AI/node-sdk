import type { BaseRequest, BaseResponse } from '../types/base';
import { CollectionType, CreateCategoryPayload, PiiIdentifierOption } from '../types/collection';
/**
 * Request payload for creating a new collection.
 */
export interface CreateCollectionRequest {
    /** The ID of the organization that will own this collection. */
    organizationId: string;
    /** The display name for the collection. */
    name: string;
    /** The type of collection being created. */
    type: CollectionType;
    /** Optional tags to categorize the collection. */
    tags?: string[];
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
    /** Initial set of categories to create within this collection. */
    categories?: CreateCategoryPayload[];
}
/**
 * Response returned after creating a collection.
 */
export interface CreateCollectionResponse extends BaseResponse {
    /** The ID of the newly created collection. */
    id: string;
}
export declare function createCollection({ apiKey, apiUrl, debug, organizationId, name, description, type, tags, pii, piiControls, instructions, graphInstructions, promptInstructions, searchInstructions, categories }: CreateCollectionRequest & BaseRequest): Promise<CreateCollectionResponse>;
