import type { BaseRequest, BaseResponse } from '../types/base';
/**
 * Request parameters for deleting a specific document from a collection.
 */
export interface DeleteDocumentRequest {
    /** ID of the collection containing the document */
    collectionId: string;
    /** ID of the document to delete */
    documentId: string;
}
/**
 * Response data from a document deletion operation.
 */
export type DeleteDocumentResponse = BaseResponse;
export declare function deleteDocument({ apiKey, apiUrl, debug, collectionId, documentId }: DeleteDocumentRequest & BaseRequest): Promise<DeleteDocumentResponse>;
