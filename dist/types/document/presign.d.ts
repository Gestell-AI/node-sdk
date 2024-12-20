import type { BaseRequest, BaseResponse } from 'types/base';
export interface PresignDocumentRequest {
    collectionId: string;
    filename: string;
    type: string;
}
export interface PresignDocumentResponse extends BaseResponse {
    path: string;
    url: string;
}
export declare function presignDocument({ apiKey, apiUrl, debug, collectionId, filename, type }: PresignDocumentRequest & BaseRequest): Promise<PresignDocumentResponse>;
