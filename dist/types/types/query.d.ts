/**
 * Modes for formulating search queries.
 */
export type SearchType = /** Compare and analyze documents from their summaries */ 'summary' | /** Compare and analyze documents from a one sentence phrase (RECOMMENDED) */ 'phrase' | /** Compare and analyze documents from their keywords */ 'keywords';
/**
 * Performance vs. accuracy trade-offs for search execution.
 */
export type SearchMethod = /** Prioritizes speed over depth. */ 'fast' | /** Balanced search depth and performance (RECOMMENDED) */ 'normal' | /** Full-depth search for maximum accuracy. */ 'precise';
/**
 * Payload for executing a search against a collection.
 */
export interface SearchRequestBody {
    /** Identifier of the target collection. */
    collectionId: string;
    /** Optional category filter within the collection. */
    categoryId?: string;
    /** Natural-language query or prompt. */
    prompt: string;
    /** Desired search performance/accuracy mode. */
    method?: SearchMethod;
    /** Desired output format of the search. */
    type?: SearchType;
    /** Number of vector hops to explore. */
    vectorDepth?: number;
    /** Number of node hops to explore. */
    nodeDepth?: number;
    /** Maximum number of sub-queries to issue. */
    maxQueries?: number;
    /** Maximum number of results to return. */
    maxResults?: number;
    /** Include full content in each result. */
    includeContent?: boolean;
    /** Include edge references in each result. */
    includeEdges?: boolean;
    /** Embed edge data within result objects. */
    edgesInResult?: boolean;
}
/**
 * Single message in a prompt-driven interaction.
 */
export interface PromptMessage {
    /** Origin of the message. */
    role: 'user' | 'model' | 'system';
    /** Textual content of the message. */
    content: string;
}
/**
 * Payload for prompt-based operations, extending core search options.
 */
export interface PromptRequestBody extends Omit<SearchRequestBody, 'includeContent' | 'includeEdges' | 'edgesInResult'> {
    /** Optional prompt instructions for the model. */
    template?: string;
    /** Enable chain-of-thought reasoning (RECOMMENDED) */
    cot?: boolean;
    /** Chat history and context in order (oldest to newest). */
    messages?: PromptMessage[];
}
/**
 * Default parameter set for a search mode.
 */
export interface SearchDefaults {
    /** Default search output format. */
    type: SearchType;
    /** Default vector exploration depth. */
    vectorDepth: number;
    /** Default node exploration depth. */
    nodeDepth: number;
    /** Default maximum sub-queries. */
    maxQueries: number;
    /** Default maximum results returned. */
    maxResults: number;
}
/** Fast search defaults: minimal depth for speed. */
export declare const SearchFast: SearchDefaults;
/** Normal search defaults: balanced speed and coverage. */
export declare const SearchNormal: SearchDefaults;
/** Precise search defaults: deeper exploration for accuracy. */
export declare const SearchPrecise: SearchDefaults;
/**
 * Mapping of search methods to their default parameter sets.
 */
export declare const SearchModes: {
    fast: SearchDefaults;
    normal: SearchDefaults;
    precise: SearchDefaults;
};
/**
 * Single entry in the search results array.
 */
export interface SearchResult {
    /** Extracted or generated content snippet. */
    content: string;
    /** Source or citation reference for the content. */
    citation: string;
    /** Explanation of why the result was chosen. */
    reason: string;
}
