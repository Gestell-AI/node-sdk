export type SearchType = 'summary' | 'phrase' | 'keywords';
export type SearchMethod = 'fast' | 'normal' | 'precise';
export interface QueryPayload {
    collectionId: string;
    categoryId?: string;
    prompt: string;
    method?: SearchMethod;
    type?: SearchType;
    vectorDepth?: number;
    nodeDepth?: number;
    maxQueries?: number;
    maxResults?: number;
    includeContent?: boolean;
    includeEdges?: boolean;
}
export interface PromptMessage {
    role: 'user' | 'model' | 'system';
    content: string;
}
export interface PromptPayload extends Omit<QueryPayload, 'includeContent' | 'includeEdges'> {
    template?: string;
    cot?: boolean;
    messages?: PromptMessage[];
}
export interface QueryDefaults {
    type: SearchType;
    vectorDepth: number;
    nodeDepth: number;
    maxQueries: number;
    maxResults: number;
}
export declare const QueryFast: QueryDefaults;
export declare const QueryNormal: QueryDefaults;
export declare const QueryPrecise: QueryDefaults;
export declare const QueryKV: {
    fast: QueryDefaults;
    normal: QueryDefaults;
    precise: QueryDefaults;
};
export interface SearchResult {
    content: string;
    citation: string;
    reason: string;
}
