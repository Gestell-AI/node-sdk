import type { BaseRequest, BaseResponse } from 'types/base';
export interface DeleteDocumentRequest {
    collectionId: string;
    documentId: string;
}
export declare function deleteDocument({ apiKey, apiUrl, debug, collectionId, documentId }: DeleteDocumentRequest & BaseRequest): Promise<BaseResponse>;
//# sourceMappingURL=delete.d.ts.map