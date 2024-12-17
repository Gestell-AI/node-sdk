import type { BaseRequest, BaseResponse } from 'types/base';
import { FeatureLayout } from 'types/layout';
export interface FeaturesQueryRequest {
    categoryId: string;
    skip?: number;
    take?: number;
}
export interface FeaturesQueryRequestToApi extends FeaturesQueryRequest {
    id: string;
}
export interface FeaturesQueryResponse extends BaseResponse {
    result: FeatureLayout[];
}
export declare function featuresQuery({ apiKey, apiUrl, debug, id, categoryId, skip, take }: FeaturesQueryRequestToApi & BaseRequest): Promise<FeaturesQueryResponse>;
//# sourceMappingURL=features.d.ts.map