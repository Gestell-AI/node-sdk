import type { BaseRequest, BaseResponse } from '../types/base';
export interface ExportFeaturesRequest {
    collectionId: string;
    categoryId: string;
    format?: 'json' | 'csv';
    skip?: number;
    take?: number;
}
export interface ExportFeaturesResponse extends BaseResponse {
    result: object[] | string;
}
export declare function exportFeatures({ apiKey, apiUrl, debug, collectionId, categoryId, format, skip, take }: ExportFeaturesRequest & BaseRequest): Promise<ExportFeaturesResponse | string>;
