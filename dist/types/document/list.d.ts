import type { BaseRequest, BaseResponse } from 'types/base';
import { Document } from 'types/document';
import { JobStatusType } from 'types/job';
export interface GetDocumentsRequest {
    collectionId: string;
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
export interface GetDocumentsResponse extends BaseResponse {
    result: Document[];
}
export declare function getDocuments({ apiKey, apiUrl, debug, collectionId, search, take, skip, extended, status, nodes, edges, vectors, category }: GetDocumentsRequest & BaseRequest): Promise<GetDocumentsResponse>;
