import type { BaseRequest, BaseResponse } from '../types/base';
/**
 * Request parameters for generating a presigned upload URL for a document.
 */
export interface PresignDocumentRequest {
    /** ID of the collection to upload the document to */
    collectionId: string;
    /** Filename for the document to be uploaded */
    filename: string;
    /** MIME type of the document */
    type: string;
}
/**
 * Response data containing the presigned URL and storage path.
 */
export interface PresignDocumentResponse extends BaseResponse {
    /** Storage path where the document will be saved */
    path: string;
    /** Presigned URL to upload the document */
    url: string;
}
export declare function presignDocument({ apiKey, apiUrl, debug, collectionId, filename, type }: PresignDocumentRequest & BaseRequest): Promise<PresignDocumentResponse>;
