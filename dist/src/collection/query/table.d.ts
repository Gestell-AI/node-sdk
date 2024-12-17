import type { BaseRequest, BaseResponse } from 'types/base';
export interface TablesQueryRequest {
    categoryId: string;
    skip?: number;
    take?: number;
}
export interface TablesQueryRequestToApi extends TablesQueryRequest {
    id: string;
}
export interface TablesQueryResponse extends BaseResponse {
    result: object[];
}
export declare function tablesQuery({ apiKey, apiUrl, debug, id, categoryId, skip, take }: TablesQueryRequestToApi & BaseRequest): Promise<TablesQueryResponse>;
//# sourceMappingURL=table.d.ts.map