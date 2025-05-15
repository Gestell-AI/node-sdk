import type { BaseRequest, BaseResponse } from '../types/base';
export interface TablesQueryRequest {
    collectionId: string;
    categoryId: string;
    skip?: number;
    take?: number;
    prompt?: string;
}
export interface TablesQueryResponse extends BaseResponse {
    result: Record<string, string>[];
}
export declare function tablesQuery({ apiKey, apiUrl, debug, collectionId, categoryId, skip, take, prompt }: TablesQueryRequest & BaseRequest): Promise<TablesQueryResponse>;
