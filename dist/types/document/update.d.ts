import type { BaseRequest, BaseResponse } from '../types/base';
/**
 * Request parameters for updating an existing document in a collection.
 */
export interface UpdateDocumentRequest {
    /** ID of the collection containing the document */
    collectionId: string;
    /** ID of the document to update */
    documentId: string;
    /** New name for the document */
    name?: string;
    /** Updated instructions or description for the document */
    instructions?: string;
    /** Whether to perform additional OCR processing for tables */
    tables?: boolean;
    /** Whether to dispatch a background job for processing */
    job?: boolean;
}
/**
 * Response data from a document update operation.
 * Extends the base response with standard status fields.
 */
export type UpdateDocumentResponse = BaseResponse;
export declare function updateDocument({ apiKey, apiUrl, debug, collectionId, documentId, name, instructions, job, tables }: UpdateDocumentRequest & BaseRequest): Promise<UpdateDocumentResponse>;
