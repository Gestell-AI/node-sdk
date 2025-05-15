import type { BaseRequest, BaseResponse } from '../types/base';
import { OrganizationListResult } from '../types/organization';
/**
 * Request parameters for listing organizations with optional filtering and pagination.
 */
export interface GetOrganizationsRequest {
    /** Optional search term to filter organizations by name */
    search?: string;
    /** Maximum number of organizations to return (default: 10) */
    take?: number;
    /** Number of organizations to skip for pagination (default: 0) */
    skip?: number;
    /** Whether to include extended organization details (default: false) */
    extended?: boolean;
}
/**
 * Response data from an organizations listing operation.
 * Extends the base response with an array of organization summaries.
 */
export interface GetOrganizationsResponse extends BaseResponse {
    /** Array of organization summary objects */
    result: OrganizationListResult[];
}
export declare function getOrganizations({ apiKey, apiUrl, debug, search, take, skip, extended }: GetOrganizationsRequest & BaseRequest): Promise<GetOrganizationsResponse>;
