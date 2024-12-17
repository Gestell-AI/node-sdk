import type { BaseRequest, BaseResponse } from 'types/base';
import { Organization } from 'types/organization';
export interface GetOrganizationRequest {
    id: string;
}
export interface GetOrganizationResponse extends BaseResponse {
    result: Organization | null;
}
export declare function getOrganization({ apiKey, apiUrl, debug, id }: GetOrganizationRequest & BaseRequest): Promise<GetOrganizationResponse>;
//# sourceMappingURL=getId.d.ts.map