import type { BaseRequest, BaseResponse } from '../types/base';
export interface DeleteDocumentRequest {
    collectionId: string;
    documentId: string;
}
export type DeleteDocumentResponse = BaseResponse;
export declare function deleteDocument({ apiKey, apiUrl, debug, collectionId, documentId }: DeleteDocumentRequest & BaseRequest): Promise<DeleteDocumentResponse>;
