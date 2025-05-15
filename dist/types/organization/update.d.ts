import type { BaseRequest, BaseResponse } from '../types/base';
/**
 * Request parameters for updating an organization's details.
 */
export interface UpdateOrganizationRequest {
    /** Unique identifier of the organization to update */
    organizationId: string;
    /** New name for the organization */
    name: string;
    /** New description for the organization */
    description: string;
}
/**
 * Response data from an organization update operation.
 * Extends the base response with standard status fields.
 */
export type UpdateOrganizationResponse = BaseResponse;
export declare function updateOrganization({ apiKey, apiUrl, debug, organizationId, name, description }: UpdateOrganizationRequest & BaseRequest): Promise<UpdateOrganizationResponse>;
