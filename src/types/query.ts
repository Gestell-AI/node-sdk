export type SearchType = 'summary' | 'phrase' | 'keywords'
export type SearchMethod = 'fast' | 'normal' | 'precise'

export interface QueryPayload {
  collectionId: string
  categoryId?: string
  prompt: string
  method?: SearchMethod
  type?: SearchType
  vectorDepth?: number
  nodeDepth?: number
  maxQueries?: number
  maxResults?: number
  includeContent?: boolean
  includeEdges?: boolean
}

export interface PromptPayload
  extends Omit<QueryPayload, 'includeContent' | 'includeEdges'> {
  template?: string
  cot?: boolean
  threadId?: string
  chat?: boolean
}

export interface QueryDefaults {
  type: SearchType
  vectorDepth: number
  nodeDepth: number
  maxQueries: number
  maxResults: number
}

export const QueryFast: QueryDefaults = {
  type: 'phrase' as SearchType,
  vectorDepth: 10,
  nodeDepth: 1,
  maxQueries: 1,
  maxResults: 10
}

export const QueryNormal: QueryDefaults = {
  type: 'summary' as SearchType,
  vectorDepth: 8,
  nodeDepth: 2,
  maxQueries: 3,
  maxResults: 10
}

export const QueryPrecise: QueryDefaults = {
  type: 'summary' as SearchType,
  vectorDepth: 10,
  nodeDepth: 5,
  maxQueries: 3,
  maxResults: 10
}

export const QueryKV = {
  fast: QueryFast,
  normal: QueryNormal,
  precise: QueryPrecise
}

export interface SearchResult {
  content: string
  citation: string
  reason: string
}
