import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { OrganizationMemberPayload } from '@gestell/types/organization';
export interface CreateOrganizationRequest {
    name: string;
    description: string;
    members?: OrganizationMemberPayload[];
}
export interface CreateOrganizationResponse extends BaseResponse {
    id: string;
}
export declare function createOrganization({ apiKey, apiUrl, debug, name, description, members }: CreateOrganizationRequest & BaseRequest): Promise<CreateOrganizationResponse>;
