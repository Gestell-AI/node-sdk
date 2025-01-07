import type { BaseRequest, BaseResponse } from '../types/base';
export interface ExportTableRequest {
    collectionId: string;
    categoryId: string;
    type?: 'json' | 'csv';
}
export interface ExportTableResponse extends BaseResponse {
    result: object[];
}
export declare function exportTable({ apiKey, apiUrl, debug, collectionId, categoryId, type }: ExportTableRequest & BaseRequest): Promise<ExportTableResponse | string>;
