import type { BaseRequest, BaseResponse } from 'types/base';
import { Document } from 'types/document';
import { JobStatusType } from 'types/job';
export interface GetDocumentsRequest {
    search?: string;
    take?: number;
    skip?: number;
    extended?: boolean;
    status?: JobStatusType;
    nodes?: JobStatusType;
    edges?: JobStatusType;
    vectors?: JobStatusType;
    category?: JobStatusType;
}
export interface GetDocumentsRequestToApi extends GetDocumentsRequest {
    id: string;
}
export interface GetDocumentsResponse extends BaseResponse {
    result: Document[];
}
export declare function getDocuments({ apiKey, apiUrl, debug, id, search, take, skip, extended, status, nodes, edges, vectors, category }: GetDocumentsRequestToApi & BaseRequest): Promise<GetDocumentsResponse>;
//# sourceMappingURL=get.d.ts.map