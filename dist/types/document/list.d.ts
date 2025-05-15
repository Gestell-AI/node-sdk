import type { BaseRequest, BaseResponse } from '../types/base';
import { Document } from '../types/document';
import { JobStatus } from '../types/job';
/**
 * Payload for requesting multiple documents from a specific collection,
 * with support for pagination, filtering, and optional extended data.
 *
 * @interface GetDocumentsRequest
 */
export interface GetDocumentsRequest {
    /**
     * The unique identifier of the collection to query.
     */
    collectionId: string;
    /**
     * Optional text to search within document content or metadata.
     */
    search?: string;
    /**
     * Maximum number of documents to return.
     * Useful for paging through large result sets.
     */
    take?: number;
    /**
     * Number of documents to skip before starting to collect the result set.
     * Useful for paging (e.g., skip = pageIndex * take).
     */
    skip?: number;
    /**
     * Whether to include extended document data (metadata and layout).
     */
    extended?: boolean;
    /**
     * Filter documents by overall enframing states.
     */
    status?: JobStatus;
    /**
     * Filter by the status of the nodes indexing stage.
     */
    nodes?: JobStatus;
    /**
     * Filter by the status of the edges graph-building stage.
     */
    edges?: JobStatus;
    /**
     * Filter by the status of the vector generation stage.
     */
    vectors?: JobStatus;
    /**
     * Filter by the status of the category generation stage.
     */
    category?: JobStatus;
}
/**
 * Response data from a document listing operation.
 * Extends the base response with an array of documents.
 */
export interface GetDocumentsResponse extends BaseResponse {
    /** Array of document objects matching the query */
    result: Document[];
}
export declare function getDocuments({ apiKey, apiUrl, debug, collectionId, search, take, skip, extended, status, nodes, edges, vectors, category }: GetDocumentsRequest & BaseRequest): Promise<GetDocumentsResponse>;
