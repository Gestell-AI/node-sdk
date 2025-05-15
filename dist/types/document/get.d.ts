import type { BaseRequest, BaseResponse } from '../types/base';
import { Document } from '../types/document';
/**
 * Request parameters for retrieving a specific document from a collection.
 */
export interface GetDocumentRequest {
    /** ID of the collection containing the document */
    collectionId: string;
    /** ID of the document to retrieve */
    documentId: string;
}
/**
 * Response data from a document retrieval operation.
 */
export interface GetDocumentResponse extends BaseResponse {
    /** The retrieved document or null if not found */
    result: Document | null;
}
export declare function getDocument({ apiKey, apiUrl, debug, collectionId, documentId }: GetDocumentRequest & BaseRequest): Promise<GetDocumentResponse>;
