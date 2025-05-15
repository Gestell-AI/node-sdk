import type { BaseRequest, BaseResponse } from '../../types/base';
/**
 * Request parameters for removing members from an organization.
 */
export interface RemoveMembersRequest {
    /** ID of the organization to remove members from */
    organizationId: string;
    /** Array of member IDs to remove from the organization */
    members: string[];
}
/**
 * Response data from a member removal operation.
 * Extends the base response with standard status fields.
 */
export type RemoveMembersResponse = BaseResponse;
export declare function removeMembers({ apiKey, apiUrl, debug, organizationId, members }: RemoveMembersRequest & BaseRequest): Promise<RemoveMembersResponse>;
