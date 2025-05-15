import type { BaseRequest, BaseResponse } from '../types/base';
/**
 * Request parameters for creating a new document in a collection.
 */
export interface CreateDocumentRequest {
    /** ID of the collection to create the document in */
    collectionId: string;
    /** Name of the new document */
    name: string;
    /** Path for the document */
    path: string;
    /** Document mime type (e.g., application/pdf) */
    type: string;
    /** Optional instructions for document creation */
    instructions?: string;
    /** Whether to run creation as a background job */
    job?: boolean;
    /** Whether to do additional table processing in the document */
    tables?: boolean;
}
/**
 * Response data from a document creation operation.
 */
export interface CreateDocumentResponse extends BaseResponse {
    /** ID of the newly created document */
    id: string;
}
export declare function createDocument({ apiKey, apiUrl, debug, collectionId, name, path, type, instructions, job, tables }: CreateDocumentRequest & BaseRequest): Promise<CreateDocumentResponse>;
