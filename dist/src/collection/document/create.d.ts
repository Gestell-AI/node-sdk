import type { BaseRequest, BaseResponse } from 'types/base';
export interface CreateDocumentRequest {
    name: string;
    path: string;
    type: string;
    instructions?: string;
    job?: boolean;
}
export interface CreateDocumentRequestToApi extends CreateDocumentRequest {
    id: string;
}
export interface CreateDocumentResponse extends BaseResponse {
    id: string;
}
export declare function createDocument({ apiKey, apiUrl, debug, id, name, path, type, instructions, job }: CreateDocumentRequestToApi & BaseRequest): Promise<CreateDocumentResponse>;
//# sourceMappingURL=create.d.ts.map