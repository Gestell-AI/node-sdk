import type { BaseRequest, BaseResponse } from '../types/base';
export interface CreateDocumentRequest {
    collectionId: string;
    name: string;
    path: string;
    type: string;
    instructions?: string;
    job?: boolean;
    tables?: boolean;
}
export interface CreateDocumentResponse extends BaseResponse {
    id: string;
}
export declare function createDocument({ apiKey, apiUrl, debug, collectionId, name, path, type, instructions, job, tables }: CreateDocumentRequest & BaseRequest): Promise<CreateDocumentResponse>;
