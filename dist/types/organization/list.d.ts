import type { BaseRequest, BaseResponse } from 'types/base';
import { Organization } from 'types/organization';
export interface GetOrganizationsRequest {
    search?: string;
    take?: number;
    skip?: number;
    extended?: boolean;
}
export interface GetOrganizationsResponse extends BaseResponse {
    result: Organization[];
}
export declare function getOrganizations({ apiKey, apiUrl, debug, search, take, skip, extended }: GetOrganizationsRequest & BaseRequest): Promise<GetOrganizationsResponse>;
