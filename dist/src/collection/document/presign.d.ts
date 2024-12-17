import type { BaseRequest, BaseResponse } from 'types/base';
export interface PresignDocumentRequest {
    filename: string;
    type: string;
}
export interface PresignDocumentRequestToApi extends PresignDocumentRequest {
    id: string;
}
export interface PresignDocumentResponse extends BaseResponse {
    path: string;
    url: string;
}
export declare function presignDocument({ apiKey, apiUrl, debug, id, filename, type }: PresignDocumentRequestToApi & BaseRequest): Promise<PresignDocumentResponse>;
//# sourceMappingURL=presign.d.ts.map