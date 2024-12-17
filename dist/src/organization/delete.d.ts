import type { BaseRequest, BaseResponse } from 'types/base';
export interface DeleteOrganizationRequest {
    id: string;
}
export declare function deleteOrganization({ apiKey, apiUrl, debug, id }: DeleteOrganizationRequest & BaseRequest): Promise<BaseResponse>;
//# sourceMappingURL=delete.d.ts.map