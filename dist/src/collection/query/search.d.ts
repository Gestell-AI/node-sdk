import type { BaseRequest, BaseResponse } from 'types/base';
import { QueryPayload, SearchResult } from 'types/query';
export interface SearchQueryRequestToApi extends QueryPayload {
    id: string;
}
export interface SearchQueryResponse extends BaseResponse {
    result: SearchResult[];
}
export declare function searchQuery({ apiKey, apiUrl, debug, id, categoryId, prompt, method, type, vectorDepth, nodeDepth, maxQueries, maxResults, includeContent, includeEdges }: SearchQueryRequestToApi & BaseRequest): Promise<SearchQueryResponse>;
//# sourceMappingURL=search.d.ts.map