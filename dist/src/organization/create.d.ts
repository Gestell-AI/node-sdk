import type { BaseRequest, BaseResponse } from 'types/base';
import { OrganizationMemberPayload } from 'types/organization';
export interface CreateOrganizationRequest {
    name: string;
    description: string;
    members?: OrganizationMemberPayload[];
}
export interface CreateOrganizationResponse extends BaseResponse {
    id: string;
}
export declare function createOrganization({ apiKey, apiUrl, debug, name, description, members }: CreateOrganizationRequest & BaseRequest): Promise<CreateOrganizationResponse>;
//# sourceMappingURL=create.d.ts.map