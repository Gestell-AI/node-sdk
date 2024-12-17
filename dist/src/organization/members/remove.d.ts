import type { BaseRequest, BaseResponse } from 'types/base';
export interface RemoveMembersRequest {
    id: string;
    members: string[];
}
export declare function removeMembers({ apiKey, apiUrl, debug, id, members }: RemoveMembersRequest & BaseRequest): Promise<BaseResponse>;
//# sourceMappingURL=remove.d.ts.map