import type { BaseRequest, BaseResponse } from '@gestell/types/base';
import { QueryPayload, SearchResult } from '@gestell/types/query';
export interface SearchQueryResponse extends BaseResponse {
    result: SearchResult[];
}
export declare function searchQuery({ apiKey, apiUrl, debug, collectionId, categoryId, prompt, method, type, vectorDepth, nodeDepth, maxQueries, maxResults, includeContent, includeEdges }: QueryPayload & BaseRequest): Promise<SearchQueryResponse>;
