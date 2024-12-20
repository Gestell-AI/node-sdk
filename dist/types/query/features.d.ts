import type { BaseRequest, BaseResponse } from 'types/base';
import { FeatureLayout } from 'types/layout';
export interface FeaturesQueryRequest {
    collectionId: string;
    categoryId: string;
    skip?: number;
    take?: number;
}
export interface FeaturesQueryResponse extends BaseResponse {
    result: FeatureLayout[];
}
export declare function featuresQuery({ apiKey, apiUrl, debug, collectionId, categoryId, skip, take }: FeaturesQueryRequest & BaseRequest): Promise<FeaturesQueryResponse>;
