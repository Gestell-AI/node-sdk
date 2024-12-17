import type { BaseRequest, BaseResponse } from 'types/base';
export interface UpdateOrganizationRequest {
    id: string;
    name: string;
    description: string;
}
export declare function updateOrganization({ apiKey, apiUrl, debug, id, name, description }: UpdateOrganizationRequest & BaseRequest): Promise<BaseResponse>;
//# sourceMappingURL=update.d.ts.map