import type { BaseRequest, BaseResponse } from '@gestell/types/base';
export interface UpdateOrganizationRequest {
    organizationId: string;
    name: string;
    description: string;
}
export type UpdateOrganizationResponse = BaseResponse;
export declare function updateOrganization({ apiKey, apiUrl, debug, organizationId, name, description }: UpdateOrganizationRequest & BaseRequest): Promise<UpdateOrganizationResponse>;
