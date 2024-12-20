import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { Organization } from '@gestell/types/organization';
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
