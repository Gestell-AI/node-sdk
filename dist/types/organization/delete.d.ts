import type { BaseRequest, BaseResponse } from 'types/base';
export interface DeleteOrganizationRequest {
    id: string;
}
export type DeleteOrganizationResponse = BaseResponse;
export declare function deleteOrganization({ apiKey, apiUrl, debug, id }: DeleteOrganizationRequest & BaseRequest): Promise<DeleteOrganizationResponse>;
