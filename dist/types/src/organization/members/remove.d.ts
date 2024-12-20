import type { BaseRequest, BaseResponse } from '@gestell/types/base';
export interface RemoveMembersRequest {
    organizationId: string;
    members: string[];
}
export type RemoveMembersResponse = BaseResponse;
export declare function removeMembers({ apiKey, apiUrl, debug, organizationId, members }: RemoveMembersRequest & BaseRequest): Promise<RemoveMembersResponse>;
