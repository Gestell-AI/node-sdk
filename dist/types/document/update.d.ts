import type { BaseRequest, BaseResponse } from 'types/base';
export interface UpdateDocumentRequest {
    collectionId: string;
    documentId: string;
    name?: string;
    instructions?: string;
    job?: boolean;
}
export type UpdateDocumentResponse = BaseResponse;
export declare function updateDocument({ apiKey, apiUrl, debug, collectionId, documentId, name, instructions, job }: UpdateDocumentRequest & BaseRequest): Promise<UpdateDocumentResponse>;
