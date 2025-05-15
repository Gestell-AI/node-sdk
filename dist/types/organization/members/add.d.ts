import type { BaseRequest, BaseResponse } from '../../types/base';
import { OrganizationMemberRequest } from '../../types/organization';
/**
 * Request parameters for adding members to an organization.
 */
export interface AddMembersRequest {
    /** ID of the organization to add members to */
    organizationId: string;
    /** Array of member objects to add to the organization */
    members: OrganizationMemberRequest[];
}
/**
 * Response data from a member addition operation.
 * Extends the base response with standard status fields.
 */
export type AddMembersResponse = BaseResponse;
export declare function addMembers({ apiKey, apiUrl, debug, organizationId, members }: AddMembersRequest & BaseRequest): Promise<AddMembersResponse>;
