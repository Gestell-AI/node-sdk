import { AddCategoryRequest, AddCategoryResponse } from './collection/addCategory';
import { CreateCollectionRequest, CreateCollectionResponse } from './collection/create';
import { DeleteCollectionResponse } from './collection/delete';
import { GetCollectionResponse } from './collection/get';
import { GetCollectionsRequest, GetCollectionsResponse } from './collection/list';
import { RemoveCategoryRequest, RemoveCategoryResponse } from './collection/removeCategory';
import { UpdateCollectionRequest, UpdateCollectionResponse } from './collection/update';
import { UpdateCategoryRequest, UpdateCategoryResponse } from './collection/updateCategory';
import { CreateDocumentRequest, CreateDocumentResponse } from './document/create';
import { DeleteDocumentRequest, DeleteDocumentResponse } from './document/delete';
import { ExportDocumentRequest, ExportDocumentResponse } from './document/export';
import { GetDocumentRequest, GetDocumentResponse } from './document/get';
import { GetDocumentsRequest, GetDocumentsResponse } from './document/list';
import { PresignDocumentRequest, PresignDocumentResponse } from './document/presign';
import { UpdateDocumentRequest, UpdateDocumentResponse } from './document/update';
import { UploadDocumentRequest, UploadDocumentResponse } from './document/upload';
import { CancelJobsRequest, CancelJobsResponse } from './job/cancel';
import { GetJobRequest, GetJobResponse } from './job/get';
import { GetJobsRequest, GetJobsResponse } from './job/list';
import { ReprocessDocumentsRequest, ReprocessDocumentsResponse } from './job/reprocess';
import { GetOrganizationResponse } from './organization/get';
import { GetOrganizationsRequest, GetOrganizationsResponse } from './organization/list';
import { AddMembersRequest, AddMembersResponse } from './organization/members/add';
import { RemoveMembersRequest, RemoveMembersResponse } from './organization/members/remove';
import { UpdateOrganizationRequest, UpdateOrganizationResponse } from './organization/update';
import { ExportFeaturesRequest, ExportFeaturesResponse } from './query/exportFeatures';
import { ExportTableRequest, ExportTableResponse } from './query/exportTable';
import { FeaturesQueryRequest, FeaturesQueryResponse } from './query/features';
import { SearchQueryResponse } from './query/search';
import { TablesQueryRequest, TablesQueryResponse } from './query/table';
import { PromptPayload, QueryPayload } from './types/query';
export interface GestellInit {
    key?: string;
    url?: string;
    debug?: boolean;
}
/**
 * The Gestell SDK Instance
 */
export declare class Gestell {
    private apiUrl;
    private apiKey;
    private debug;
    /**
     * Manage organizations you are a part of.
     * Learn more about usage at: https://gestell.ai/docs/reference#organization
     */
    organization: {
        /**
         * Fetches the details of a specific organization using its unique ID.
         * Learn more about usage at: https://gestell.ai/docs/reference#organization
         *
         * @param organizationId - The ID of the organization to retrieve.
         * @returns A promise that resolves to the organization details, including:
         * - `id`: The unique identifier of the organization.
         * - `name`: The name of the organization.
         * - `description`: A brief description of the organization.
         * - `members`: An array of members belonging to the organization.
         * - `collections`: An array of collections associated with the organization.
         * - `dateCreated`: The date the organization was created.
         * - `dateUpdated`: The date the organization was last updated.
         */
        get: (organizationId: string) => Promise<GetOrganizationResponse>;
        /**
         * Fetches a list of organizations that the user is associated with, with optional filters or pagination parameters.
         * Learn more about usage at: https://gestell.ai/docs/reference#organization
         *
         * @param payload - Optional parameters for filtering or pagination, including:
         * - `search`: A search query to filter organizations by name or description.
         * - `take`: The number of organizations to retrieve.
         * - `skip`: The number of organizations to skip (useful for pagination).
         * - `extended`: Whether to include extended details for each organization.
         * @returns A promise that resolves to an array of organization details, where each organization includes:
         * - `id`: The unique identifier of the organization.
         * - `name`: The name of the organization.
         * - `description`: A brief description of the organization.
         * - `members`: An optional array of members belonging to the organization.
         * - `collections`: An optional array of collections associated with the organization.
         * - `dateCreated`: The date the organization was created.
         * - `dateUpdated`: The date the organization was last updated.
         */
        list: (payload?: GetOrganizationsRequest) => Promise<GetOrganizationsResponse>;
        /**
         * Allows updating the details of an existing organization. Requires the organization ID and the updated information in the payload.
         * Learn more about usage at: https://gestell.ai/docs/reference#organization
         *
         * @param payload - The details of the organization to update, including:
         * - `organizationId`: The unique identifier of the organization to update.
         * - `name`: The updated name of the organization.
         * - `description`: The updated description of the organization.
         * @returns A promise that resolves to the response of the update request, including:
         * - `status`: The status of the update request.
         * - `message`: An optional message providing additional details about the request result.
         */
        update: (payload: UpdateOrganizationRequest) => Promise<UpdateOrganizationResponse>;
        /**
         * Adds new members to the organization based on the provided payload.
         * Learn more about usage at: https://gestell.ai/docs/reference#organization
         *
         * @param payload - The details of the members to add, including:
         * - `organizationId`: The id of the organization
         * - `members`: An array of the members which include the following:
         *    - `id`: The identifier of the member to add, which can be a UUID or an email.
         *    - `role`: The role of the member within the organization, either `member` or `admin`.
         * @returns A promise that resolves to the response of the add member request, including:
         * - `status`: The status of the add request.
         * - `message`: An optional message providing additional details about the request result.
         */
        addMembers: (payload: AddMembersRequest) => Promise<AddMembersResponse>;
        /**
         * Removes existing members from the organization based on the provided payload.
         * Learn more about usage at: https://gestell.ai/docs/reference#organization
         *
         * @param payload - The details of the members to remove:
         * - `organizationId`: The id of the organization
         * - `members`: The identifier of the member to remove, which can be a UUID or an email.
         * @returns A promise that resolves to the response of the remove member request, including:
         * - `status`: The status of the remove request.
         * - `message`: An optional message providing additional details about the request result.
         */
        removeMembers: (payload: RemoveMembersRequest) => Promise<RemoveMembersResponse>;
    };
    /**
     * Manage collections you are a part of.
     * Learn more about usage at: https://gestell.ai/docs/reference#collection
     */
    collection: {
        /**
         * Fetches the details of a specific collection using its unique ID.
         * Learn more about usage at: https://gestell.ai/docs/reference#collection
         *
         * @param collectionId - The ID of the collection to retrieve.
         * @returns A promise that resolves to the collection details, including:
         * - `result`: The details of the collection, or `null` if not found. The collection includes:
         *   - `id`: The unique identifier of the collection.
         *   - `organizationId`: The ID of the organization that owns the collection.
         *   - `organization`: The organization associated with the collection.
         *   - `name`: The name of the collection.
         *   - `type`: The type of the collection (`frame`, `searchable-frame`, `canon`, or `features`).
         *   - `description`: A brief description of the collection.
         *   - `tags`: An array of tags associated with the collection.
         *   - `instructions`: Optional general instructions for the collection.
         *   - `graphInstructions`: Optional graph-specific instructions for the collection.
         *   - `promptInstructions`: Optional prompt-specific instructions for the collection.
         *   - `searchInstructions`: Optional search-specific instructions for the collection.
         *   - `categories`: An optional array of categories included in the collection.
         *   - `documents`: An optional array of documents associated with the collection.
         *   - `dateCreated`: The date the collection was created.
         *   - `dateUpdated`: The date the collection was last updated.
         * - `stats`: The statistics of the collection, or `null` if unavailable. The stats include:
         *   - `docs`: The total number of documents in the collection.
         *   - `size`: The total size of the collection.
         *   - `nodes`: The number of nodes in the collection.
         *   - `status`: An object representing the status of the collection, including:
         *     - `documents`: The number of documents processed.
         *     - `nodes`: The number of nodes processed.
         *     - `edges`: The number of edges processed.
         *     - `vectors`: The number of vectors processed.
         *     - `category`: The number of categories processed.
         * - `status`: The status of the fetch request.
         * - `message`: An optional message providing additional details about the request result.
         */
        get: (collectionId: string) => Promise<GetCollectionResponse>;
        /**
         * Fetches a list of collections, with optional filters or pagination parameters.
         * Learn more about usage at: https://gestell.ai/docs/reference#collection
         *
         * @param payload - Optional parameters for filtering or pagination, including:
         * - `search`: A search query to filter collections by name, description, or tags.
         * - `take`: The number of collections to retrieve.
         * - `skip`: The number of collections to skip (useful for pagination).
         * - `extended`: Whether to include extended details for each collection.
         * @returns A promise that resolves to an array of collections, where each collection includes:
         * - `id`: The unique identifier of the collection.
         * - `organizationId`: The ID of the organization that owns the collection.
         * - `organization`: The organization associated with the collection.
         * - `name`: The name of the collection.
         * - `type`: The type of the collection (`frame`, `searchable-frame`, `canon`, or `features`).
         * - `description`: A brief description of the collection.
         * - `tags`: An array of tags associated with the collection.
         * - `instructions`: Optional general instructions for the collection.
         * - `graphInstructions`: Optional graph-specific instructions for the collection.
         * - `promptInstructions`: Optional prompt-specific instructions for the collection.
         * - `searchInstructions`: Optional search-specific instructions for the collection.
         * - `categories`: An optional array of categories included in the collection.
         * - `documents`: An optional array of documents associated with the collection.
         * - `dateCreated`: The date the collection was created.
         * - `dateUpdated`: The date the collection was last updated.
         */
        list: (payload?: GetCollectionsRequest) => Promise<GetCollectionsResponse>;
        /**
         * Allows the creation of a new collection by providing the required details in the payload.
         * Learn more about usage at: https://gestell.ai/docs/reference#collection
         *
         * @param payload - The details of the new collection to create, including:
         * - `organizationId`: The ID of the organization to which the collection belongs.
         * - `name`: The name of the collection.
         * - `type`: The type of the collection (`frame`, `searchable-frame`, `canon`, or `features`).
         * - `tags`: An optional array of tags associated with the collection.
         * - `description`: An optional description of the collection.
         * - `instructions`: Optional general instructions for the collection.
         * - `graphInstructions`: Optional graph-specific instructions for the collection.
         * - `promptInstructions`: Optional prompt-specific instructions for the collection.
         * - `searchInstructions`: Optional search-specific instructions for the collection.
         * - `categories`: An optional array of categories to associate with the collection. Each category includes:
         *   - `name`: The name of the category.
         *   - `type`: The type of the category.
         *   - `instructions`: The instructions for the category.
         * @returns A promise that resolves to the response of the collection creation request, including:
         * - `status`: The status of the creation request.
         * - `message`: An optional message providing additional details about the request result.
         * - `id`: The unique identifier of the newly created collection.
         */
        create: (payload: CreateCollectionRequest) => Promise<CreateCollectionResponse>;
        /**
         * Allows the update of an existing collection by providing the necessary details in the payload.
         * Learn more about usage at: https://gestell.ai/docs/reference#collection
         *
         * @param payload - The details of the collection to update, including:
         * - `collectionId`: The unique identifier of the collection to update.
         * - `organizationId`: An optional update for the organization ID associated with the collection.
         * - `name`: An optional new name for the collection.
         * - `type`: An optional new type for the collection (`frame`, `searchable-frame`, `canon`, or `features`).
         * - `description`: An optional new description for the collection.
         * - `instructions`: Optional general instructions for the collection.
         * - `graphInstructions`: Optional graph-specific instructions for the collection.
         * - `promptInstructions`: Optional prompt-specific instructions for the collection.
         * - `searchInstructions`: Optional search-specific instructions for the collection.
         * - `tags`: An optional array of new tags to associate with the collection.
         * @returns A promise that resolves to the response of the collection update request, including:
         * - `status`: The status of the update request.
         * - `message`: An optional message providing additional details about the request result.
         */
        update: (payload: UpdateCollectionRequest) => Promise<UpdateCollectionResponse>;
        /**
         * Deletes an existing collection based on its unique ID.
         * Learn more about usage at: https://gestell.ai/docs/reference#collection
         *
         * @param collectionId - The ID of the collection to delete.
         * @returns A promise that resolves to the response of the collection update request, including:
         * - `status`: The status of the update request.
         * - `message`: An optional message providing additional details about the request result.
         */
        delete: (collectionId: string) => Promise<DeleteCollectionResponse>;
        /**
         * Adds a new category to an existing collection.
         * Learn more about usage at: https://gestell.ai/docs/reference#collection
         *
         * @param payload - The details of the category to add, including:
         * - `collectionId`: The ID of the collection to which the category will be added.
         * - `name`: The name of the new category.
         * - `type`: The type of the category (e.g., custom or predefined).
         * - `instructions`: Additional instructions or notes related to the category.
         *
         * @returns A promise that resolves to the response of the category addition, including:
         * - `status`: The status of the request (`OK` or `ERROR`).
         * - `message`: An optional message providing additional details about the request result.
         * - `id`: The unique identifier of the newly added category.
         */
        addCategory: (payload: AddCategoryRequest) => Promise<AddCategoryResponse>;
        /**
         * Updates an existing category within a collection.
         * Learn more about usage at: https://gestell.ai/docs/reference#collection
         *
         * @param payload - The details of the category to update, including:
         * - `collectionId`: The ID of the collection containing the category.
         * - `categoryId`: The unique identifier of the category to update.
         * - `name`: (Optional) The updated name of the category.
         * - `type`: (Optional) The updated type of the category (e.g., custom or predefined).
         * - `instructions`: (Optional) Additional updated instructions or notes related to the category.
         *
         * @returns A promise that resolves to the response of the category update, including:
         * - `status`: The status of the request (`OK` or `ERROR`).
         * - `message`: An optional message providing additional details about the request result.
         */
        updateCategory: (payload: UpdateCategoryRequest) => Promise<UpdateCategoryResponse>;
        /**
         * Removes an existing category from a collection.
         * Learn more about usage at: https://gestell.ai/docs/reference#collection
         *
         * @param payload - The details of the category to remove, including:
         * - `collectionId`: The ID of the collection containing the category.
         * - `categoryId`: The unique identifier of the category to remove.
         *
         * @returns A promise that resolves to the response of the category removal, including:
         * - `status`: The status of the request (`OK` or `ERROR`).
         * - `message`: An optional message providing additional details about the request result.
         */
        removeCategory: (payload: RemoveCategoryRequest) => Promise<RemoveCategoryResponse>;
    };
    /**
     * Query a collection. This requires your collection ID to query.
     * Note that querying tables and features requires both a collectionId and categoryId.
     * Learn more about usage at: https://gestell.ai/docs/reference#query
     *
     * @param collectionId - The ID of the collection
     */
    query: {
        /**
         * Performs a search operation on a specific collection using the provided payload.
         * Learn more about usage at: https://gestell.ai/docs/reference#query
         *
         * @param collectionId - The ID of the collection to search.
         * @param payload - The search parameters, including:
         * - `categoryId`: An optional category ID to filter results by.
         * - `prompt`: The search query or prompt.
         * - `method`: An optional search method to use.
         * - `type`: An optional search type to specify.
         * - `vectorDepth`: An optional depth of vector search.
         * - `nodeDepth`: An optional depth of node search.
         * - `maxQueries`: An optional maximum number of queries to run.
         * - `maxResults`: An optional maximum number of results to return.
         * - `includeContent`: A flag to indicate whether to include content in the search results.
         * - `includeEdges`: A flag to indicate whether to include edges in the search results.
         * @returns A promise that resolves to the search results, including:
         * - `status`: The status of the search request.
         * - `message`: An optional message providing additional details about the request result.
         * - `result`: An array of search results, where each result includes:
         *   - `content`: The content found in the search.
         *   - `citation`: The citation or reference for the content.
         *   - `reason`: The reason or explanation for the result.
         */
        search: (payload: QueryPayload) => Promise<SearchQueryResponse>;
        /**
         * Performs a query operation using a prompt on a specific collection.
         * Learn more about usage at: https://gestell.ai/docs/reference#query
         *
         * @param collectionId - The ID of the collection to query.
         * @param payload - The prompt parameters, including:
         * - `categoryId`: An optional category ID to filter results by.
         * - `prompt`: The prompt or query to execute.
         * - `method`: An optional search method to use.
         * - `type`: An optional search type to specify.
         * - `vectorDepth`: An optional depth of vector search.
         * - `nodeDepth`: An optional depth of node search.
         * - `maxQueries`: An optional maximum number of queries to run.
         * - `maxResults`: An optional maximum number of results to return.
         * - `template`: An optional template to use for the prompt.
         * - `cot`: A flag indicating whether to use chain-of-thought reasoning (optional).
         * - `threadId`: An optional thread ID to associate with the query.
         * - `chat`: A flag indicating whether the query is part of a chat (optional).
         * @returns A promise that resolves to a readable stream of the prompt query response.
         */
        prompt: (payload: PromptPayload) => Promise<ReadableStream<string>>;
        /**
         * Retrieves feature-related information from a specific collection.
         * Learn more about usage at: https://gestell.ai/docs/reference#query
         *
         * @param collectionId - The ID of the collection to query.
         * @param payload - The features query parameters, including:
         * - `categoryId`: The ID of the category to retrieve features for.
         * - `skip`: An optional parameter to skip a specified number of results (for pagination).
         * - `take`: An optional parameter to limit the number of results returned (for pagination).
         * @returns A promise that resolves to the features query response, including:
         * - `status`: The status of the query request.
         * - `message`: An optional message providing additional details about the request result.
         * - `result`: An array of `FeatureLayout` objects, where each feature includes:
         *   - `position`: An array representing the position of the feature.
         *   - `label`: The label for the feature.
         *   - `description`: A description of the feature.
         */
        features: (payload: FeaturesQueryRequest) => Promise<FeaturesQueryResponse>;
        /**
         * Exports the feature-related information from a specific collection.
         * Learn more about usage at: https://gestell.ai/docs/reference#query
         *
         * @param collectionId - The ID of the collection to query.
         * @param categoryId - The category id of the feature
         * @param type - "json" or "csv"
         * @returns A promise that resolves to a dynamic feature array that depends on your category instructions.
         */
        featuresExport: (payload: ExportFeaturesRequest) => Promise<ExportFeaturesResponse | string>;
        /**
         * Retrieves table-related information from a specific collection.
         * Learn more about usage at: https://gestell.ai/docs/reference#query
         *
         * @param collectionId - The ID of the collection to query.
         * @param payload - The features query parameters, including:
         * - `categoryId`: The ID of the category to retrieve features for.
         * - `skip`: An optional parameter to skip a specified number of results (for pagination).
         * - `take`: An optional parameter to limit the number of results returned (for pagination).
         * @returns A promise that resolves to a dynamic table array that depends on your category instructions.
         */
        table: (payload: TablesQueryRequest) => Promise<TablesQueryResponse>;
        /**
         * Exports the table information from a specific collection.
         * Learn more about usage at: https://gestell.ai/docs/reference#query
         *
         * @param collectionId - The ID of the collection to query.
         * @param categoryId - The category id of the table
         * @param type - "json" or "csv"
         * @returns A promise that resolves to a dynamic table array that depends on your category instructions.
         */
        tableExport: (payload: ExportTableRequest) => Promise<ExportTableResponse | string>;
    };
    /**
     * Manage documents within a collection. You will need to retrieve the collection id to manage documents.
     * Learn more about usage at: https://gestell.ai/docs/reference#document
     *
     * @param collectionId - The ID of the collection
     * @param documentId - The ID of the document, this is usually required unless creating a document
     */
    document: {
        /**
         * Fetches a specific document from a collection using its unique document ID.
         * Learn more about usage at: https://gestell.ai/docs/reference#document
         *
         * @param collectionId - The ID of the collection containing the document.
         * @param documentId - The ID of the document to retrieve.
         * @returns A promise that resolves to the document details, including:
         * - `status`: The status of the request.
         * - `message`: An optional message providing additional details about the request result.
         * - `result`: An array of `Document` objects, where each document includes:
         *   - `id`: The unique ID of the document.
         *   - `collectionId`: The ID of the collection the document belongs to.
         *   - `path`: The file path of the document.
         *   - `name`: The name of the document.
         *   - `type`: The type of the document (e.g., PDF, Word).
         *   - `layoutType`: The type of layout for the document.
         *   - `layoutNodes`: The number of layout nodes in the document.
         *   - `instructions`: Instructions related to the document.
         *   - `job`: An optional job associated with the document.
         *   - `layout`: An optional array containing layout details (could be `DocumentLayout[]`, `PhotoLayout[]`, `VideoLayout[]`, or `AudioLayout[]`).
         *   - `dateCreated`: The creation date of the document.
         *   - `dateUpdated`: The date the document was last updated.
         */
        get: (payload: GetDocumentRequest) => Promise<GetDocumentResponse>;
        /**
         * Fetches a specific document from a collection using its unique document ID.
         * Learn more about usage at: https://gestell.ai/docs/reference#document
         *
         * @param collectionId - The ID of the collection containing the document.
         * @param documentId - The ID of the document to retrieve.
         * @param type - "json" for layout or "text" for raw text output
         * @returns A promise that resolves to the document layout or text
         */
        export: (payload: ExportDocumentRequest) => Promise<ExportDocumentResponse>;
        /**
         * Fetches a list of documents from a collection, with optional filtering and pagination.
         * Learn more about usage at: https://gestell.ai/docs/reference#document
         *
         * @param collectionId - The ID of the collection containing the documents.
         * @param payload - Optional parameters for filtering or pagination, including:
         *   - `search`: A search query string to filter documents.
         *   - `take`: The number of documents to retrieve.
         *   - `skip`: The number of documents to skip for pagination.
         *   - `extended`: Whether to retrieve extended information for the documents.
         *   - `status`: Filter by the job status type.
         *   - `nodes`: Filter by the job status for nodes.
         *   - `edges`: Filter by the job status for edges.
         *   - `vectors`: Filter by the job status for vectors.
         *   - `category`: Filter by the job status for category.
         * @returns A promise that resolves to the list of documents, including:
         * - `status`: The status of the request.
         * - `message`: An optional message providing additional details about the request result.
         * - `result`: An array of `Document` objects, where each document includes:
         *   - `id`: The unique ID of the document.
         *   - `collectionId`: The ID of the collection the document belongs to.
         *   - `path`: The file path of the document.
         *   - `name`: The name of the document.
         *   - `type`: The type of the document (e.g., PDF, Word).
         *   - `layoutType`: The type of layout for the document.
         *   - `layoutNodes`: The number of layout nodes in the document.
         *   - `instructions`: Instructions related to the document.
         *   - `job`: An optional job associated with the document.
         *   - `layout`: An optional array containing layout details (could be `DocumentLayout[]`, `PhotoLayout[]`, `VideoLayout[]`, or `AudioLayout[]`).
         *   - `dateCreated`: The creation date of the document.
         *   - `dateUpdated`: The date the document was last updated.
         */
        list: (payload: GetDocumentsRequest) => Promise<GetDocumentsResponse>;
        /**
         * Fetches a pre-signed URL for uploading a document to a collection.
         * Learn more about usage at: https://gestell.ai/docs/reference#document
         *
         * @param collectionId - The ID of the collection for the document upload.
         * @param payload - The document upload request details, including:
         *   - `filename`: The name of the document file to upload.
         *   - `type`: The MIME type of the document (e.g., 'application/pdf').
         * @returns A promise that resolves to the pre-signed URL response, including:
         *   - `status`: The status of the request.
         *   - `message`: An optional message providing additional details about the request result.
         *   - `path`: The path where the document will be uploaded.
         *   - `url`: The pre-signed URL for uploading the document.
         */
        presign: (payload: PresignDocumentRequest) => Promise<PresignDocumentResponse>;
        /**
         * Allows the creation of a new document in a collection by providing the document details in the payload.
         * Learn more about usage at: https://gestell.ai/docs/reference#document
         *
         * @param collectionId - The ID of the collection where the document will be created.
         * @param payload - The details of the document to create, including:
         *   - `name`: The name of the document.
         *   - `path`: The file path of the document.
         *   - `type`: The MIME type of the document (e.g., 'application/pdf').
         *   - `instructions` (optional): Additional instructions related to the document.
         *   - `job` (optional): Set to false to not dispatch a job
         *   - `tables` (optional): A boolean that flags for additional table processing and analysis is performed on the document, use this for pdfs with complex tables
         * @returns A promise that resolves to the response of the document creation request, including:
         *   - `status`: The status of the document creation request.
         *   - `message`: An optional message providing additional details about the request result.
         *   - `id`: The unique identifier of the created document.
         */
        create: (payload: CreateDocumentRequest) => Promise<CreateDocumentResponse>;
        /**
         * Uploads a new document to a collection by providing the document details in the payload.
         * Learn more about usage at: https://gestell.ai/docs/reference#document
         *
         * @param payload - The details of the document to upload, including:
         * - `collectionId`: The ID of the collection where the document will be created.
         * - `name`: The name of the document.
         * - `type` (optional): The MIME type of the document (e.g., 'application/pdf').
         * - `file`: The file to upload, which can be a string, Buffer, or File.
         * - `instructions` (optional): Additional instructions related to the document.
         * - `job` (optional): Set to `false` to skip dispatching a job for processing the document.
         * - `tables`: A boolean that flags for additional table processing and analysis is performed on the document, use this for pdfs with complex tables
         *
         * @returns A promise that resolves to the response of the document upload request, including:
         * - `status`: The status of the request (`OK` or `ERROR`).
         * - `message`: An optional message providing additional details about the request result.
         * - `id`: The unique identifier of the uploaded document.
         */
        upload: (payload: UploadDocumentRequest) => Promise<UploadDocumentResponse>;
        /**
         * Allows the updating of a document’s details in a collection. Requires the document ID and updated information.
         * Learn more about usage at: https://gestell.ai/docs/reference#document
         *
         * @param collectionId - The ID of the collection containing the document.
         * @param documentId - The ID of the document to update.
         * @param payload - The updated document details, including:
         *   - `name` (optional): The updated name of the document.
         *   - `instructions` (optional): Updated instructions related to the document.
         *   - `job` (optional): Set to true to dispatch a reprocessing job
         *   - `tables`: A boolean that flags for additional table processing and analysis is performed on the document, use this for pdfs with complex tables
         * @returns A promise that resolves to the response of the update request, including:
         *   - `status`: The status of the update request.
         *   - `message`: An optional message providing additional details about the update result.
         */
        update: (payload: UpdateDocumentRequest) => Promise<UpdateDocumentResponse>;
        /**
         * Deletes an existing document from a collection based on its unique document ID.
         * Learn more about usage at: https://gestell.ai/docs/reference#document
         *
         * @param collectionId - The ID of the collection containing the document.
         * @param documentId - The ID of the document to delete.
         * @returns A promise that resolves to the response of the delete request, including:
         *   - `status`: The status of the delete request.
         *   - `message`: An optional message providing additional details about the delete result.
         */
        delete: (paylaod: DeleteDocumentRequest) => Promise<DeleteDocumentResponse>;
    };
    /**
     * Manage jobs within a collection. You will need to retrieve the collection id to manage jobs.
     * Learn more about usage at: https://gestell.ai/docs/reference#job
     *
     * @param collectionId - The ID of the collection
     */
    job: {
        /**
         * Fetches the details of a job using its unique job ID.
         * Learn more about usage at: https://gestell.ai/docs/reference#job
         *
         * @param collectionId - The ID of the collection where the job exists.
         * @param jobId - The ID of the job to retrieve.
         * @returns A promise that resolves to the job details, including:
         *   - `status`: The status of the job.
         *   - `message`: An optional message providing additional details about the job.
         *   - `result`: The detailed job information, including:
         *     - `id`: The job's unique ID.
         *     - `collectionId`: The collection to which the job belongs.
         *     - `documentId`: The associated document ID.
         *     - `status`: The current status of the job.
         *     - `nodes`, `edges`, `vectors`, `category`: The job status for each of these components.
         *     - `message`: A message providing job status details.
         *     - `dateCreated`: The date the job was created.
         *     - `dateUpdated`: The date the job was last updated.
         */
        get: (payload: GetJobRequest) => Promise<GetJobResponse>;
        /**
         * Fetches a list of jobs associated with a collection, with optional filtering or pagination.
         * Learn more about usage at: https://gestell.ai/docs/reference#job
         *
         * @param collectionId - The ID of the collection for which to fetch jobs.
         * @param payload - Optional parameters for filtering or pagination.
         * @returns A promise that resolves to a list of jobs.
         */
        list: (payload: GetJobsRequest) => Promise<GetJobsResponse>;
        /**
         * Initiates a new job in the collection based on the provided parameters.
         * Learn more about usage at: https://gestell.ai/docs/reference#job
         *
         * @param collectionId - The ID of the collection where the job will be created.
         * @param payload - The job creation parameters, including:
         *   - `ids`: An array of string IDs representing the entities to process in the job.
         *   - `type`: The type of the job to create (e.g., 'status', 'nodes', 'vectors', 'edges', 'category').
         * @returns A promise that resolves to the response of the job creation request, including:
         *   - `status`: The result status of the job creation request.
         *   - `message`: An optional message providing additional details about the job creation.
         */
        reprocess: (payload: ReprocessDocumentsRequest) => Promise<ReprocessDocumentsResponse>;
        /**
         * Deletes an existing job from a collection based on its unique job ID.
         * Learn more about usage at: https://gestell.ai/docs/reference#job
         *
         * @param collectionId - The ID of the collection where the job exists.
         * @param jobId - The ID of the job to delete.
         * @returns A promise that resolves to the response of the job deletion request, including:
         *   - `status`: The result status of the job deletion request.
         *   - `message`: An optional message providing additional details about the job deletion.
         */
        cancel: (payload: CancelJobsRequest) => Promise<CancelJobsResponse>;
    };
    /**
     * Configuration options for the Gestell SDK.
     * Review usage in depth at: https://gestell.ai/docs/reference
     *
     * @param GestellInit
     * @property {string} [key] - The API key for authentication.
     * @property {string} [url] - The base URL for the API.
     * @property {boolean} [debug] - Flag to enable debug logging.
     */
    constructor(payload?: GestellInit);
    private getOrganization;
    private getOrganizations;
    private updateOrganization;
    private addMembers;
    private removeMembers;
    private getCollection;
    private getCollections;
    private createCollection;
    private updateCollection;
    private deleteCollection;
    private addCategory;
    private updateCategory;
    private removeCategory;
    private searchQuery;
    private promptQuery;
    private featuresQuery;
    private featuresExport;
    private tablesQuery;
    private tableExport;
    private getDocument;
    private exportDocument;
    private getDocuments;
    private uploadDocument;
    private presignDocument;
    private createDocument;
    private updateDocument;
    private deleteDocument;
    private getJob;
    private getJobs;
    private reprocessJobs;
    private cancelJobs;
}
export default Gestell;
