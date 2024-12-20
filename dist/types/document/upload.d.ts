import type { BaseRequest, BaseResponse } from 'types/base';
export interface UploadDocumentRequest {
    collectionId: string;
    name: string;
    type?: string;
    file: string | Buffer | File;
    instructions?: string;
    job?: boolean;
}
export interface UploadDocumentResponse extends BaseResponse {
    id: string;
}
export declare function uploadDocument({ apiKey, apiUrl, debug, collectionId, name, file, type, instructions, job }: UploadDocumentRequest & BaseRequest): Promise<UploadDocumentResponse>;
