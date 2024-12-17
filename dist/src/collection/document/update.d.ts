import type { BaseRequest, BaseResponse } from 'types/base';
export interface UpdateDocumentRequest {
    name?: string;
    instructions?: string;
    job?: boolean;
}
export interface UpdateDocumentRequestToApi extends UpdateDocumentRequest {
    id: string;
    documentId: string;
}
export declare function updateDocument({ apiKey, apiUrl, debug, id, documentId, name, instructions, job }: UpdateDocumentRequestToApi & BaseRequest): Promise<BaseResponse>;
//# sourceMappingURL=update.d.ts.map