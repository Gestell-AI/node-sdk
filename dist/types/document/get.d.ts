import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { Document } from '@gestell/types/document';
export interface GetDocumentRequest {
    collectionId: string;
    documentId: string;
}
export interface GetDocumentResponse extends BaseResponse {
    result: Document | null;
}
export declare function getDocument({ apiKey, apiUrl, debug, collectionId, documentId }: GetDocumentRequest & BaseRequest): Promise<GetDocumentResponse>;
