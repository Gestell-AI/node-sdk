import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { Organization } from '@gestell/types/organization';
export interface GetOrganizationRequest {
    id: string;
}
export interface GetOrganizationResponse extends BaseResponse {
    result: Organization | null;
}
export declare function getOrganization({ apiKey, apiUrl, debug, id }: GetOrganizationRequest & BaseRequest): Promise<GetOrganizationResponse>;
