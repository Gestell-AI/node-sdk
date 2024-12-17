import type { BaseRequest, BaseResponse } from 'types/base';
export interface DeleteCollectionRequest {
    id: string;
}
export declare function deleteCollection({ apiKey, apiUrl, debug, id }: DeleteCollectionRequest & BaseRequest): Promise<BaseResponse>;
//# sourceMappingURL=delete.d.ts.map