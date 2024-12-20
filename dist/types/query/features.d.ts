import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { FeatureLayout } from '@gestell/types/layout';
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
