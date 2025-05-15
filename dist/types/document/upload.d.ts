import type { BaseRequest, BaseResponse } from '../types/base';
/**
 * Request parameters for uploading a document to a collection.
 */
export interface UploadDocumentRequest {
    /** ID of the collection to upload the document to */
    collectionId: string;
    /** Name of the document */
    name: string;
    /** Optional MIME type; auto-detected if not provided */
    type?: string;
    /** File content as path, Buffer, or File */
    file: string | Buffer | File;
    /** Optional instructions for the upload */
    instructions?: string;
    /** Whether to process upload as a background job */
    job?: boolean;
    /** Whether to include tables in the document */
    tables?: boolean;
}
/**
 * Response data from a document upload operation.
 */
export interface UploadDocumentResponse extends BaseResponse {
    /** ID of the newly uploaded document */
    id: string;
}
export declare function uploadDocument({ apiKey, apiUrl, debug, collectionId, name, file, type, instructions, job, tables }: UploadDocumentRequest & BaseRequest): Promise<UploadDocumentResponse>;
