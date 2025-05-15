import { AddCategoryRequest, AddCategoryResponse } from '../collection/addCategory';
import { CreateCollectionRequest, CreateCollectionResponse } from '../collection/create';
import { DeleteCollectionResponse } from '../collection/delete';
import { GetCollectionResponse } from '../collection/get';
import { GetCollectionsRequest, GetCollectionsResponse } from '../collection/list';
import { RemoveCategoryRequest, RemoveCategoryResponse } from '../collection/removeCategory';
import { UpdateCollectionRequest, UpdateCollectionResponse } from '../collection/update';
import { UpdateCategoryRequest, UpdateCategoryResponse } from '../collection/updateCategory';
import { GestellOptions } from '../index';
/**
 * The **collection services** for the Gestell SDK.
 *
 * @remarks
 * All helpers resolve to a strongly typed `{ status, message, … }` payload.
 * If the SDK is initialised with `debug: true`, verbose request / response logs
 * will be emitted to the console to aid troubleshooting.
 *
 * @example
 * ```ts
 * import Gestell from '@gestell/sdk'
 *
 * const gestell = new Gestell()
 * const { result } = await gestell.collection.get({ collectionId: 'abc123' })
 * console.log(result?.name)
 * ```
 *
 * @see https://gestell.ai/docs/reference#collection
 */
export interface CollectionServiceApi {
    /**
     * Fetches the details of a specific collection using its unique ID.
     *
     * @param payload - The collection request parameters including:
     * - `collectionId`: The unique identifier of the collection to retrieve.
     * @returns A promise that resolves to the collection details, including:
     * - `result`: The collection data, or null if not found.
     * - `stats`: Statistics about the collection, or null if not available.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    get(collectionId: string): Promise<GetCollectionResponse>;
    /**
     * Retrieves a list of collections with optional search, pagination, and
     * detail-level controls.
     *
     * @param payload - Optional parameters including:
     * - `search?`: Search term to filter collections by name.
     * - `take?`: Maximum number of collections to return.
     * - `skip?`: Number of collections to skip for pagination.
     * - `extended?`: If true, returns extended collection details.
     * @returns A promise that resolves to the collection list response, including:
     * - `result`: Array of collection objects.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    list(payload?: GetCollectionsRequest): Promise<GetCollectionsResponse>;
    /**
     * Creates a new collection with the specified configuration.
     *
     * @param payload - The collection creation parameters including:
     * - `organizationId`: The ID of the organization that will own this collection.
     * - `name`: The display name for the collection.
     * - `type`: The type of collection being created.
     * - `tags?`: Optional tags to categorize the collection.
     * - `description?`: A description of the collection's purpose or contents.
     * - `pii?`: Indicates if the collection contains Personally Identifiable Information.
     * - `piiControls?`: Configuration for PII identification and handling.
     * - `instructions?`: General instructions for processing this collection.
     * - `graphInstructions?`: Specific instructions for graph operations.
     * - `promptInstructions?`: Instructions for prompt generation.
     * - `searchInstructions?`: Instructions for search operations.
     * - `categories?`: Initial set of categories to create within this collection.
     * @returns A promise that resolves to the creation response, including:
     * - `id`: The ID of the newly created collection.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    create(payload: CreateCollectionRequest): Promise<CreateCollectionResponse>;
    /**
     * Updates an existing collection.
     *
     * @param payload - The collection update parameters including:
     * - `collectionId`: The ID of the collection to update.
     * - `organizationId?`: The ID of the organization that owns this collection.
     * - `name?`: The new display name for the collection.
     * - `type?`: The type of collection.
     * - `description?`: A description of the collection's purpose or contents.
     * - `pii?`: Indicates if the collection contains Personally Identifiable Information.
     * - `piiControls?`: Configuration for PII identification and handling.
     * - `instructions?`: General instructions for processing this collection.
     * - `graphInstructions?`: Specific instructions for graph operations.
     * - `promptInstructions?`: Instructions for prompt generation.
     * - `searchInstructions?`: Instructions for search operations.
     * - `tags?`: Tags to categorize the collection.
     * @returns A promise that resolves to the update response, including:
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    update(payload: UpdateCollectionRequest): Promise<UpdateCollectionResponse>;
    /**
     * Deletes a collection by its ID.
     *
     * @param payload - The delete request parameters including:
     * - `collectionId`: The ID of the collection to be deleted.
     * @returns A promise that resolves to the delete response, including:
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    delete(collectionId: string): Promise<DeleteCollectionResponse>;
    /**
     * Adds a new category to a collection.
     *
     * @param payload - The category addition parameters including:
     * - `collectionId`: The ID of the collection to which the category will be added.
     * - `name`: The display name of the category.
     * - `type`: The type of category.
     * - `instructions`: The instructions or description for this category.
     * - `singleEntry?`: If true, only a single entry is allowed in this category. (optional)
     * @returns A promise that resolves to the add-category response, including:
     * - `id`: The ID of the newly created category.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    addCategory(payload: AddCategoryRequest): Promise<AddCategoryResponse>;
    /**
     * Updates a category within a collection.
     *
     * @param payload - The category update parameters including:
     * - `collectionId`: The ID of the collection containing the category.
     * - `categoryId`: The ID of the category to update.
     * - `name?`: The new display name for the category.
     * - `type?`: The type of category.
     * - `instructions?`: The instructions or description for this category.
     * - `singleEntry?`: If true, only a single entry is allowed in this category.
     * @returns A promise that resolves to the update-category response, including:
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    updateCategory(payload: UpdateCategoryRequest): Promise<UpdateCategoryResponse>;
    /**
     * Removes a category from a collection.
     *
     * @param payload - The category removal parameters including:
     * - `collectionId`: The ID of the collection containing the category.
     * - `categoryId`: The ID of the category to be removed.
     * @returns A promise that resolves to the remove-category response, including:
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    removeCategory(payload: RemoveCategoryRequest): Promise<RemoveCategoryResponse>;
}
/**
 * Factory that returns helpers scoped to **collections**.
 *
 * @param client - Global Gestell SDK configuration.
 * @returns Strongly typed helpers implementing {@link CollectionServiceApi}.
 */
export default function CollectionService(client?: GestellOptions): CollectionServiceApi;
