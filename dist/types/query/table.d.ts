import type { BaseRequest, BaseResponse } from '../types/base';
export interface TablesQueryRequest {
    collectionId: string;
    categoryId: string;
    skip?: number;
    take?: number;
}
export interface TablesQueryResponse extends BaseResponse {
    result: object[];
}
export declare function tablesQuery({ apiKey, apiUrl, debug, collectionId, categoryId, skip, take }: TablesQueryRequest & BaseRequest): Promise<TablesQueryResponse>;
