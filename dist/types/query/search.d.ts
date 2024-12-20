import type { BaseRequest, BaseResponse } from '../types/base';
import { QueryPayload, SearchResult } from '../types/query';
export interface SearchQueryResponse extends BaseResponse {
    result: SearchResult[];
}
export declare function searchQuery({ apiKey, apiUrl, debug, collectionId, categoryId, prompt, method, type, vectorDepth, nodeDepth, maxQueries, maxResults, includeContent, includeEdges }: QueryPayload & BaseRequest): Promise<SearchQueryResponse>;
