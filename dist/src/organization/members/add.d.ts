import type { BaseRequest, BaseResponse } from 'types/base';
import { OrganizationMemberPayload } from 'types/organization';
export interface AddMembersRequest {
    id: string;
    members: OrganizationMemberPayload[];
}
export declare function addMembers({ apiKey, apiUrl, debug, id, members }: AddMembersRequest & BaseRequest): Promise<BaseResponse>;
//# sourceMappingURL=add.d.ts.map