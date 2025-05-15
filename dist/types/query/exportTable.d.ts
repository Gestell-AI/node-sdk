import type { BaseRequest, BaseResponse } from '../types/base';
export interface ExportTableRequest {
    collectionId: string;
    categoryId: string;
    format?: 'json' | 'csv';
    take?: number;
    skip?: number;
}
export interface ExportTableResponse extends BaseResponse {
    result: Record<string, string>[] | string;
}
export declare function exportTable({ apiKey, apiUrl, debug, collectionId, categoryId, format, skip, take }: ExportTableRequest & BaseRequest): Promise<ExportTableResponse | string>;
