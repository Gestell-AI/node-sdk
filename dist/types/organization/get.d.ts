import type { BaseRequest, BaseResponse } from '../types/base';
import { OrganizationResult } from '../types/organization';
/**
 * Request parameters for retrieving organization details.
 */
export interface GetOrganizationRequest {
    /** Unique identifier of the organization to retrieve */
    id: string;
}
/**
 * Response data from an organization details request.
 * Extends the base response with organization information.
 */
export interface GetOrganizationResponse extends BaseResponse {
    /** The organization details or null if not found */
    result: OrganizationResult | null;
}
export declare function getOrganization({ apiKey, apiUrl, debug, id }: GetOrganizationRequest & BaseRequest): Promise<GetOrganizationResponse>;
