import type { BaseRequest, BaseResponse } from '../types/base';
export interface ExportFeaturesRequest {
    collectionId: string;
    categoryId: string;
    type?: 'json' | 'csv';
}
export interface ExportFeaturesResponse extends BaseResponse {
    result: object[];
}
export declare function exportFeatures({ apiKey, apiUrl, debug, collectionId, categoryId, type }: ExportFeaturesRequest & BaseRequest): Promise<ExportFeaturesResponse | string>;
