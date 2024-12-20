import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { OrganizationMemberPayload } from '@gestell/types/organization';
export interface AddMembersRequest {
    organizationId: string;
    members: OrganizationMemberPayload[];
}
export type AddMembersResponse = BaseResponse;
export declare function addMembers({ apiKey, apiUrl, debug, organizationId, members }: AddMembersRequest & BaseRequest): Promise<AddMembersResponse>;
